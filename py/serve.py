#!/usr/bin/env python3
import os
import subprocess
import sys
import threading
# for magic, which deb python3-magic puts here:
sys.path.append('/usr/lib/python3/dist-packages')
import magic
import cv2
import numpy as np
from flask import Flask, jsonify, send_from_directory, abort
from flask_cors import CORS
import json
import re
import time

app = Flask(__name__)
app.debug = True  # Enable verbose mode and auto reload on code changes
CORS(app)
semaphore = threading.Semaphore(2)  # Limit to two parallel media conversions
dirlock = threading.Lock()

# region: dir
artdir = '/v'
thumbdir = '/app/static/thumb'
# thumbnail filenames, of dir+f.f, may have .webp or .gif extensions
def chop_filename(file):
    directory, file = os.path.split(file)
    file = re.sub(r'\.(webp|gif)$', '', file)
    return [directory, file]
def ensure_foldered(file):
    dir = os.path.dirname(file)
    if not os.path.exists(dir):
        # a flock of requests in this dir may race here
        with dirlock:
            if not os.path.exists(dir):  # Double-check within the lock
                os.makedirs(dir)

def delta(t):
    start_time = time.time()
    return lambda: print(str(round((time.time() - start_time) * 1000)) + "ms", t)

@app.route('/dir/', defaults={'path': ''})
@app.route('/dir/<path:path>')
def dir(path):
    directory_path = artdir
    if path:
        directory_path = os.path.join(directory_path, path)
    if os.path.isfile(directory_path):
        # originals
        directory, filename = os.path.split(directory_path)
        return send_from_directory(directory, filename)
    if not os.path.isdir(directory_path):
        abort(404,"none shell path")
    
    file_list = []
    for filename in os.listdir(directory_path):
        f = {'f':filename}
        if os.path.isdir(os.path.join(directory_path, filename)):
            # is dir
            f['d'] = 1
        else:
            if (os.path.isfile(os.path.join(thumbdir, filename))):
                # has thumbnail already
                f['t'] = 1
        
        file_list.append(f)
    
    return jsonify(file_list)

# endregion

# region: thu

@app.route('/thu/<path:file>')
def thu(file):
    directory, file = chop_filename(file)
    thuname = file+".webp"
    place = os.path.join(thumbdir,directory)
    whole = os.path.join(place, thuname)
    if (not os.path.isfile(whole)):
        # not cached
        original = os.path.join(artdir, directory, file)
        if (not os.path.isfile(original)):
            abort(404, "no such original: "+original)
        with semaphore:
            thumbnail(original,whole)
    return send_from_directory(place, thuname)

def thumbnail (src,dst):
    ensure_foldered(dst)
    
    mime_type = magic.from_file(src, mime=True)
    if mime_type.startswith('image/'):
        thumbnail_image(src,dst)
    elif mime_type.startswith('video/'):
        thumbnail_video(src,dst)
    else:
        # not an image or video
        abort(400, "Not an image or video: "+mime_type+" from "+src)


def thumbnail_image (src,dst):
    command = ['gm', 'convert', '-auto-orient', src, '-thumbnail', '400x400>', dst]
    result = subprocess.run(command, capture_output=True, text=True)
    
    if result.returncode != 0:
        # An error occurred while generating the thumbnail
        abort(500,"Thumbnail generation failed:"+result.stderr)

# make one thumbnail, for a video, at 5s
def thumbnail_video(src, dst, timestamp='00:00:05'):
    ta = delta('ffmpeg '+dst)
    bail = lambda t,res: abort(500,"Thumbnail "+t+" failed:\n"+res.stderr)
    # from video at timestamp
    # < figure out perfect resize from ffmpeg
    resizer = dst+'.jpg'
    if os.path.isfile(resizer):
        os.remove(resizer)
    command = ['ffmpeg', '-ss', timestamp, '-i', src, '-vframes', '1', resizer]
    res = subprocess.run(command, capture_output=True, text=True)
    ta()
    if (res.returncode != 0 or not os.path.isfile(resizer)):
        # small file?
        if 'Output file is empty, nothing was encoded (check -ss' in res.stderr:
            short = '00:00:01'
            if timestamp == short:
                bail("resizer<---video - is it <1s?)",res)
            print("Thumbnail resizer retry at 1s")
            return thumbnail_video(src,dst,short)
        
        bail("<---video",res)

    if res.returncode != 0:
        # An error occurred while generating the thumbnail
        bail("resizer<-video",res)
    else:
        # resizes
        command = ['gm', 'convert', '-auto-orient', resizer, '-thumbnail', '400x400>', dst]
        res = subprocess.run(command, capture_output=True, text=True)
        if (not os.path.isfile(dst)):
            bail("dst<---video",res)
        os.remove(resizer)
        if res.returncode != 0:
            # An error occurred while generating the thumbnail
            bail("resizer",res)

# endregion




# region: vid
# read video metadata
def to_k(v):
    return round(int(v)/1000)
@app.route('/vid/<path:file>')
def vid(file):
    src = os.path.join(artdir,file)
    directory, file = chop_filename(file)
    
    f = {'f':file}
    with semaphore:
        f.update( get_video_info(src) )
    return jsonify(f)
def get_video_info(src):
    command = ['ffprobe', '-v', 'quiet', '-print_format', 'json', '-show_format', '-show_streams', src]
    res = subprocess.run(command, capture_output=True, text=True)
    meta = json.loads(res.stdout)

    if 'format' not in meta:
        return meta

    info = {
        'duration': meta['format']['duration'],
        'kbps': to_k(meta['format']['bit_rate']),
        'kb': to_k(meta['format']['size']),
    }

    def infotags(info, item):
        tags = info.get('tags', {})
        for k, v in item['tags'].items():
            if tags.get(k) and tags[k] != v:
                tags["another " + k] = v
                continue
            tags[k] = v
        if len(tags) > 0:
            info['tags'] = tags

    infotags(info, meta['format'])

    knowcodectype = ['video', 'audio', 'subtitle']
    for stream in meta['streams']:
        ct = stream['codec_type']
        k = ct[0] if ct in knowcodectype else ct or '?'
        if k + 'b' in info and info[k + 'b']:
            info[k + 'many'] = info.get(k + 'many', 0) + 1
        info[k + 'b'] = to_k(stream.get('bit_rate'))
        info[k + 'c'] = stream.get('codec_name')

        if 'tags' in stream:
            infotags(info, stream)

        # < needs a refactor already. is now int|str rigid.
        if stream.get('bits_per_raw_sample') and stream.get('bits_per_raw_sample') != '8':
            info[k + 'bits'] = stream.get('bits_per_raw_sample')
        if stream.get('color_space') and stream.get('color_space') != 'bt709':
            info[k + 'cs'] = stream.get('color_space')
        if stream.get('pix_fmt') and stream.get('pix_fmt') != 'yuvj420p':
            info[k + 'pf'] = stream.get('pix_fmt')
        igframerates = ['0/0', '24000/1001', '24/1', '25/1']
        if stream.get('avg_frame_rate') and stream.get('avg_frame_rate') not in igframerates:
            info[k + 'fps'] = stream.get('avg_frame_rate')

        if stream.get('channels') and stream.get('channels') != 2:
            info[k + 'ch'] = stream.get('channels')
        if stream.get('channel_layout') and stream.get('channel_layout') != 'stereo':
            info[k + 'chla'] = stream.get('channel_layout')
        if stream.get('bits_per_sample') and stream.get('bits_per_sample') != 16:
            info[k + 'bits'] = stream.get('bits_per_sample')
        igaudiohz = ['1/48000']
        if stream.get('codec_time_base') and stream.get('codec_time_base') not in igaudiohz:
            info[k + 'hz'] = stream.get('codec_time_base')

        if stream.get('duration') and stream.get('duration') != info['duration']:
            info[k + 'duration'] = stream.get('duration')

        for key in ['width', 'height']:
            if not stream.get(key):
                continue
            elif key in info and info[key] != stream[key]:
                info["another " + key] = stream[key]
            else:
                info[key] = stream[key]

    #info['z meta'] = meta
    return info
# endregion


# region: thv
# a dreamy function: makes a gif of unique frames from a video
#  < the thumbnails occur in triplets 1s apart in ideally three places across the video
# < selecting representative footage?
#   ~~ k-means clustering what is going on in a bunch of footage.
# 
# < where these are in the video, if everything is like this
# < ideal num_frames? search for it based on similarity between frames?
# < /vid/ describing a set of thumbnails of video.
@app.route('/thv/<path:file>')
def thv(file):
    directory, file = chop_filename(file)

    place = os.path.join(thumbdir,directory)
    thuname = file+".gif"
    whole = os.path.join(place, thuname)
    if (not os.path.isfile(whole)):
        # not cached
        original = os.path.join(artdir, directory, file)
        if (not os.path.isfile(original)):
            abort(404, "no such original: "+original)
        
        with semaphore:
            dst = os.path.join(place,file)
            make_gif_unique_frames(original,dst)
    
    return send_from_directory(place, thuname)
def make_gif_unique_frames(original,dst):
    ensure_foldered(dst)
    # make .1-9.jpg
    extract_unique_frames(original,dst)
    # -> .gif
    make_gif_at_dst(dst)
def make_gif_at_dst(dst):
    ta = delta('stitch thv '+dst)
    def bail (t,res=0):
        abort(500,"make_gif "+t+" failed:\n"+(res and res.stderr or ''))

    frames = []
    # we might not have 9 frames if cap.read() feels like it
    for i in range(3):
        frame = dst+".%d.jpg" % (i+1)
        if (not os.path.isfile(frame)):
            bail("very few "+frame)
        frames.append(frame)
    
    srcglob = dst+".*.jpg"
    dst += '.gif'
    # resizes and converts to gif
    command = ['gm', 'convert', '-auto-orient', '-delay','15', '-loop','0',
               srcglob, '-thumbnail', '400x400>', dst]
    res = subprocess.run(command, capture_output=True, text=True)
    if (not os.path.isfile(dst)):
        bail("!gif<---video",res)
    if not len(frames):
        bail("!len frames")

    for frame in frames:
        print("rm "+frame)
        os.remove(frame)
    if res.returncode != 0:
        # An error occurred while generating the thumbnail
        bail("non-zero",res)
    ta()

def extract_unique_frames(src, dst, num_frames=9):
    ta = delta('extract_unique_frames '+src)
    cap = cv2.VideoCapture(src)
    if not cap.isOpened():
        abort(500,"!isOpened")

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    indices = np.linspace(0, total_frames - 1, num=num_frames, dtype=int)
    frames = []
    for index in indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES, index)
        ret, frame = cap.read()
        if ret:
            frames.append(frame)
    
    if not frames:
        abort(500,"No frames")
    
    for i, frame in enumerate(frames):
        file = dst+'.%d.jpg' % (i+1)
        cv2.imwrite(file, frame)
        if (not os.path.isfile(file)):
            ta()
            abort(500,"!uniques<---video "+file)
        print("Wrote "+file+" the "+frame.shape.__str__())

    cap.release()
    ta()
# endregion

if __name__ == '__main__':
    app.run(host='0.0.0.0')
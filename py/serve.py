import os
import subprocess
import sys
from threading import Semaphore
# for magic, which deb python3-magic puts here:
sys.path.append('/usr/lib/python3/dist-packages')
import magic
import cv2
import numpy as np
from flask import Flask, jsonify, send_from_directory, abort
from flask_cors import CORS
import re
import time

app = Flask(__name__)
app.debug = True  # Enable verbose mode and auto reload on code changes
CORS(app)
semaphore = Semaphore(2)  # Limit to two parallel media conversions

# region: dir
artdir = '/v'
thumbdir = '/app/static/thumb'

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
@app.route('/thu/<path:filename>')
def thu(filename):
    directory, filename = os.path.split(filename)
    filename = re.sub(r'\.webp$', '', filename)
    thuname = filename+".webp"
    place = os.path.join(thumbdir,directory)
    whole = os.path.join(place, thuname)
    if (not os.path.isfile(whole)):
        # not cached
        original = os.path.join(artdir, directory, filename)
        if (not os.path.isfile(original)):
            abort(404, "no such original: "+original)
        with semaphore:
            thumbnail(original,whole)
    return send_from_directory(place, thuname)


def thumbnail (src,dst):
    dist_dir = os.path.dirname(dst)
    if not os.path.exists(dist_dir):
        os.makedirs(dist_dir)
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

# < this python flask server makes json describing a set of thumbnails of video. the thumbnails should occur in triplets 2s apart in ideally three places across the video, selecting unique bits of footage- sort of k-means clustering what is going on in a bunch of footage.
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
        # resize
        print('begin resizer '+dst)
        command = ['gm', 'convert', '-auto-orient', resizer, '-thumbnail', '400x400>', dst]
        res = subprocess.run(command, capture_output=True, text=True)
        if (not os.path.isfile(dst)):
            bail("dst<---video",res)
        os.remove(resizer)
        if res.returncode != 0:
            # An error occurred while generating the thumbnail
            bail("resizer",res)

# < sort this out
def extract_unique_frames(video_path, num_frames=3):
    ta = delta('extract_unique_frames '+dst)
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    indices = np.linspace(0, total_frames - 1, num=num_frames, dtype=int)
    frames = []

    for index in indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES, index)
        ret, frame = cap.read()
        if ret:
            frames.append(frame)

    cap.release()
    ta()
    return frames
# endregion

if __name__ == '__main__':
    app.run(host='0.0.0.0')
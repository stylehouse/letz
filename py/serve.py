import os
import subprocess
import sys
# for magic, which deb python3-magic puts here:
sys.path.append('/usr/lib/python3/dist-packages')
import magic
import cv2
import numpy as np
from flask import Flask, jsonify, send_from_directory, abort
from flask_cors import CORS

app = Flask(__name__)
app.debug = True  # Enable verbose mode
CORS(app)

artdir = '/v'
thumbdir = '/app/static/thumb'


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




@app.route('/thu/<path:filename>')
def thu(filename):
    directory, filename = os.path.split(filename)
    place = os.path.join(thumbdir,directory)
    thuname = filename+".webp"
    whole = os.path.join(place, thuname)
    if (not os.path.isfile(whole)):
        # not cached
        original = os.path.join(artdir, directory, filename)
        print("Lookding for "+artdir+" -> "+original)
        if (not os.path.isfile(original)):
            abort(404, "no such original: "+original)
        thumbnail(original,whole)
        print (" Existo! "+whole)
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

# this python flask server makes json describing a set of thumbnails of video. the thumbnails should occur in triplets 2s apart in ideally three places across the video, selecting unique bits of footage- sort of k-means clustering what is going on in a bunch of footage.
def thumbnail_video(src, dst, timestamp='00:00:05'):
    command = ['ffmpeg', '-i', src, '-ss', timestamp, '-vframes', '1', dst]
    result = subprocess.run(command, capture_output=True, text=True)


    if result.returncode != 0:
        # An error occurred while generating the thumbnail
        print("Thumbnail generation failed:", result.stderr)
    else:
        print("Thumbnail generated successfully")

# < sort this out
def extract_unique_frames(video_path, num_frames=3):
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
    return frames


if __name__ == '__main__':
    app.run(host='0.0.0.0')
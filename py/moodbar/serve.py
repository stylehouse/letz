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
from flask import Flask, jsonify, send_from_directory, abort, request
from flask_cors import CORS
import json
import re
import time
import tempfile

app = Flask(__name__)
app.debug = True  # Enable verbose mode and auto reload on code changes
CORS(app)
moodbarlock = threading.Lock()
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024


from PIL import Image

@app.route('/moodbar', methods=['POST'])
def http_moodbar():
    if 'opusdata' not in request.files:
        print("No opusdata")
        abort(400, "No Opus file provided")
    opusfile = request.files['opusdata']

    webpdata = moodbar(opusfile)
    print("yay, webpdata is "+str(len(webpdata)))
    # Return webpdata as image/webp response
    return webpdata, 200, {'Content-Type': 'image/webp'}
    


def moodbar(opusfile):
    # file for input
    with tempfile.NamedTemporaryFile(suffix='.opus') as temp_opus_file:
        opusfile.save(temp_opus_file.name)

        mime_type = magic.from_file(temp_opus_file.name, mime=True)
        print("mime_type: "+mime_type)
        # file for .rgb output
        with tempfile.NamedTemporaryFile(suffix='.rgb') as temp_rgb_file:
            # moodbar program
            subprocess.run(["./moodbar", "-o", temp_rgb_file.name, temp_opus_file.name])
            webpdata = rgb_to_webp(temp_rgb_file.name)
            return webpdata
    1


def rgb_to_webp(filename):
    # Read pixel values from the output file
    with open(filename, 'rb') as f:
        pixel_values = f.read()

    # Create image from pixel values
    width = len(pixel_values) // 3
    height = 1
    image = Image.frombytes('RGB', (width, height), pixel_values)

    with tempfile.NamedTemporaryFile(suffix='.webp') as temp_webp_file:
        # Save image as .webp
        image.save(temp_webp_file.name)
        with open(temp_webp_file.name, 'rb') as f:
            return f.read()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
#!/usr/bin/env python3
import os
import subprocess
import sys
import threading
from flask import Blueprint, jsonify, send_from_directory, abort, request
from flask_cors import CORS
import time
import tempfile
from PIL import Image
# for magic, which deb python3-magic puts here:
sys.path.append('/usr/lib/python3/dist-packages')
import magic

moodbar_blueprint = Blueprint('moodbar_blueprint',__name__)

@moodbar_blueprint.route('/moodbar', methods=['POST'])
def http_moodbar():
    if 'opusdata' not in request.files:
        print("No opusdata")
        abort(400, "No Opus file provided")
    opusfile = request.files['opusdata']

    webpdata = moodbar(opusfile)
    # Return webpdata as image/webp response
    return webpdata, 200, {'Content-Type': 'image/webp'}
    

moodbar_binary_path = os.path.join(os.path.dirname(__file__), 'moodbar')
def moodbar(opusfile):
    # file for input
    with tempfile.NamedTemporaryFile(suffix='.opus') as temp_opus_file:
        opusfile.save(temp_opus_file.name)

        mime_type = magic.from_file(temp_opus_file.name, mime=True)
        # file for .rgb output
        with tempfile.NamedTemporaryFile(suffix='.rgb') as temp_rgb_file:
            # moodbar program
            subprocess.run([moodbar_binary_path, "-o", temp_rgb_file.name, temp_opus_file.name])
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
import os
from flask import Flask, jsonify, send_from_directory

app = Flask(__name__)

@app.route('/thumbnails/<path:filename>')
def thumbnails(filename):
    thumbnail_path = os.path.join('thumbnails', filename)
    return send_from_directory('static/thumb', thumbnail_path)

@app.route('/directory')
def directory():
    directory_path = '/v'
    file_list = []
    for filename in os.listdir(directory_path):
        if filename.endswith(('.jpg', '.jpeg', '.png', '.gif', '.mp4')):
            file_info = {
                'name': filename,
                'thumbnail_url': f"/thumbnails/{filename}"
            }
        file_list.append(filename)
    
    return jsonify(file_list)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
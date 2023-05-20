import os
from flask import Flask, jsonify, send_from_directory

app = Flask(__name__)
app.debug = True  # Enable verbose mode

thumbdir = 'static/thumb'

@app.route('/thumbnails/<path:filename>')
def thumbnails(filename):
    directory, filename = os.path.split(filename)
    place = os.path.join(thumbdir,directory)
    print("Looking for "+place+" + "+filename)
    if os.path.isfile(os.path.join(place, filename)):
        print (" Existo!")
    return send_from_directory(place, filename)

@app.route('/directory/', defaults={'path': ''})
@app.route('/directory/<path:path>')
def directory(path):
    directory_path = '/v'
    if path:
        directory_path = os.path.join(directory_path, path)
    # may request a file
    if os.path.isfile(directory_path):
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

if __name__ == '__main__':
    app.run(host='0.0.0.0')
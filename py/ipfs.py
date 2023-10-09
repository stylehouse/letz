#!/usr/bin/env python3
# pip install flask flask-cors
import http.server
import hashlib
import json
import os
from flask import Flask, request, Response
from flask_cors import CORS
app = Flask(__name__)
app.debug = True  # Enable verbose mode and auto reload on code changes
CORS(app)
# @stylehouse/zap was having buffering woes
#  see github issue #1, which still kind of happens if we dont:
os.environ["PYTHONUNBUFFERED"] = "1"

# serve k:v where k = usu sha256sum(v)

# not really ipfs
# not really git
#  just the hash->blob part
#  our client decodes blob to find more hash, etc
# < periodically gc somehow
#    periodically repeated writes encouraged, they update mtime

storage_dir = 'ipfs'


# scheme for translating any GET|PUT into  /ipfs/xx/xxxxx... path
def dige_to_file(dige):
    return os.path.join(storage_dir, part_hash_to_path(dige))

# dige on filesystem gets /^(..)/ partitioned
def part_hash_to_path(dige):
    return os.path.join(dige[:2],dige[2:])

def sanstring(s):
    s = s[:50]+"..." if len(s) > 50 else s
    return json.dumps(s)[1:-1]

# Ensure the path is within the storage_dir
#  for eg GET /../package.json
def is_valid_path(path):
    abs_path = os.path.abspath(os.path.join(storage_dir, path.lstrip('/')))
    return abs_path.startswith(os.path.abspath(storage_dir))


#  also 
@app.route('/', methods=['PUT'])
def do_PUT():
    content = request.get_data()
    if not len(content):
        return Response("no content given", status=400)

    
    dige = hashlib.sha256(content).hexdigest()
    content = content.decode('utf-8')
    print("PUT: "+dige+"    "+sanstring(content))
    # for HTTP file hosting:
    # path = self.translate_path(self.path)
    # for ipfs-like content-addressing:
    path = dige_to_file(dige)
    
    if os.path.exists(path):
        # we have it already
        os.utime(path, None)
    else:
        dir = os.path.dirname(path)
        os.makedirs(dir, exist_ok=True)
        with open(path, "w", encoding='utf-8') as dst:
            dst.write(content)
    
    return Response(status=204, headers={"Location": "/" + dige})

@app.route('/<path:path>', methods=['GET'])
def do_GET(path):
    dige = path.strip('/')
    headers = {}

    if not is_valid_path(dige):
        return Response("Invalid path", status=400)

    path = os.path.join(storage_dir,dige)
    if os.path.exists(path):
        # ipns, arbitrary string 
        # not dige, not /^(..)/ partitioned
        # probably a symlink to a dige
        print("Exists: "+path)
        1
    else:
        path = dige_to_file(dige)
    print("File: "+path)
    if os.path.exists(path):
        # Read and send the file content to the client
        with open(path, "r", encoding='utf-8') as src:
            content = src.read()
            rawcontent = content.encode('utf-8')

            content_length = len(rawcontent)

            headers["Content-Type"] = "text/plain"
            headers["Content-Length"] = str(content_length)

            if 0:
                got_dige = hashlib.sha256(rawcontent).hexdigest()
                if not got_dige == dige:
                    print("Wrong dige in storage: "+got_dige)
            
            return Response(rawcontent, status=200, headers=headers)
    else:
        return Response("Not Found", status=404, headers=headers)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
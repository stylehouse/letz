#!/usr/bin/env python3
import http.server
import hashlib
import json
import os
from flask import Flask, request, Response
app = Flask(__name__)
app.debug = True  # Enable verbose mode and auto reload on code changes
CORS(app)


# not really ipfs
# not really git
#  just the hash->blob part
#  our client decodes blob to find more hash, etc
# < periodically gc somehow
#    periodically repeated writes encouraged, they update mtime
storage_dir = 'ipfs'
# scheme for translating any GET|PUT into  /ipfs/../... path
def dige_to_file(dige):
    return os.path.join(storage_dir, part_hash_to_path(dige))
# dige on filesystem gets /^(..)/ partitioned
def part_hash_to_path(dige):
    return os.path.join(dige[:2],dige[2:])
def CORS(self):
    self.send_header("Access-Control-Allow-Origin", "*")
def sanstring(s):
    s = s[:50]+"..." if len(s) > 50 else s
    return json.dumps(s)[1:-1]

#  also 
@app.route('/', methods=['PUT'])
def do_PUT():
    CORS(self)
    length = int(self.headers["Content-Length"])
    rawcontent = self.rfile.read(length)
    if not len(rawcontent):
        self.send_response(400,"no content given")
        return
    
    dige = hashlib.sha256(rawcontent).hexdigest()
    content = rawcontent.decode('utf-8')
    print("PUT: "+dige+"    "+sanstring(content))
    # for HTTP file hosting:
    # path = self.translate_path(self.path)
    # for ipfs-like content-addressing:
    path = dige_to_file(self,dige)
    
    if os.path.exists(path):
        os.utime(path, None)
        self.send_response(204)
    else:
        dir = os.path.dirname(path)
        os.makedirs(dir, exist_ok=True)

        with open(path, "w", encoding='utf-8') as dst:
            dst.write(content)
        self.send_response(204)  # Created

    # Include the dige in the Location header of the response
    self.send_header("Location", "/"+dige)
    self.send_header("Content-Length", 0)
    self.end_headers()

@app.route('/', methods=['GET'])
def do_GET(self):
    CORS(self)
    dige = self.path.strip('/')
    
    path = '.'+storage_dir+dige
    if os.path.exists(path):
        # ipns, arbitrary string 
        # not dige, not /^(..)/ partitioned
        # probably a symlink to a dige
        1
    else:
        path = dige_to_file(self,dige)
    if os.path.exists(path):
        # Read and send the file content to the client
        with open(path, "r", encoding='utf-8') as src:
            content = src.read()
            rawcontent = content.encode('utf-8')

            # Calculate the content length
            content_length = len(rawcontent)

            # Set the response headers
            self.send_response(200)
            self.send_header("Content-Type", "text/plain")
            self.send_header("Content-Length", str(content_length))
            self.end_headers()
            if 0:
                got_dige = hashlib.sha256(rawcontent).hexdigest()
                if not got_dige == dige:
                    print("Wrong dige in storage: "+got_dige)
            
            self.wfile.write(rawcontent)
    else:
        self.send_response(404, 'Not Found')



if __name__ == '__main__':
    http.server.test(HandlerClass=SputHTTPRequestHandler)

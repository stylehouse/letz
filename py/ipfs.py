#!/usr/bin/env python3
import http.server
import hashlib
import os

def part_hash_to_path(dige):
    os.path.join(dige[:2],dige[2:])

# given this scheme for translating any PUT into that /ipfs/../... path
class SputHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_PUT(self):
        print(self.headers)
        length = int(self.headers["Content-Length"])
        content = self.rfile.read(length)
        dige = hashlib.sha256(content).hexdigest()
        # for HTTP file hosting:
        # path = self.translate_path(self.path)
        # for ipfs-like content-addressing:
        path = os.path.join(
            self.translate_path('/ipfs/'),
            part_hash_to_path(dige),
        )

        # exists - update its modification time and return
        if os.path.exists(path):
            os.utime(path, None)
            self.send_response(200)
            return
        
        dir = os.path.dirname(path)
        os.makedirs(dir, exist_ok=True)


        with open(path, "wb") as dst:
            dst.write(content)
        self.send_response(200)
    
    def do_GET(self):
        dige = self.path.strip('/')
        path = os.path.join(
            self.translate_path('/ipfs/'),
            part_hash_to_path(dige),
        )
        # exists - update its modification time and return
        if os.path.exists(path):
            os.utime(path, None)
            self.send_response(200)
            return
        else:
            self.send_response(404, 'Not Found')



if __name__ == '__main__':
    http.server.test(HandlerClass=SputHTTPRequestHandler)
content = self.rfile.read(length)

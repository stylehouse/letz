import type { RequestHandler } from '../$types';
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { isst, isob, sha256, isnum, isar, isspace, hak, havs, haks, ex } from '$lib/Y/Pic.ts'
// am immutable blob store
//  t:sha256(s) => s
// PUT t,s(,z=[dependency t+])
// GET t(,mime=Content-Type to serve it with, allowing javascript, image etc)

// db, schema 
    const db = await open({
        filename: 'ipfs.sqlite',
        driver: sqlite3.verbose().Database
    });
    // await db.get(`DROP TABLE ipfs`)
    // await db.get(`DROP TABLE ipfs_in`)
    await db.exec(`
        CREATE TABLE IF NOT EXISTS ipfs (
            t TEXT PRIMARY KEY UNIQUE,
            ts_heartbeat TIMESTAMP,
            ts_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            s BLOB
        );
        
        CREATE TABLE IF NOT EXISTS ipfs_in (
            t TEXT,
            ot TEXT,
            FOREIGN KEY (t) REFERENCES ipfs(t),
            FOREIGN KEY (ot) REFERENCES ipfs(t)
        );
    
        CREATE INDEX IF NOT EXISTS idx_ipfs_in_t ON ipfs_in(t);
        CREATE INDEX IF NOT EXISTS idx_ipfs_in_ot ON ipfs_in(ot);
        CREATE INDEX IF NOT EXISTS idx_ipfs_t ON ipfs(t);
        CREATE INDEX IF NOT EXISTS idx_ipfs_ts_heartbeat ON ipfs(ts_heartbeat);
    `);


// API
    // note: req is a bunch of things like:
    //  params is not 
    export const GET: RequestHandler = async (req:Request) => {
        try {
            const t = req.url.searchParams.get('t');
            const result = await db.get("SELECT s from ipfs where t = ?",t);
            
            return mimeable(req,result)
        } catch (error) {
            return createResponse({ error: error.message }, 500)
        }
    };
    export const POST: RequestHandler = async (req: Request) => {
        try {
            const t = req.url.searchParams.get('t');
            // console.log("PUT: "+t)
            let que = req.request
            let type = que.headers.get('content-type')
            let s = type.startsWith("text") ? await que.text()
                : await que.arrayBuffer()

            let tt = await sha256(s)
            // console.log("PUT hash: "+tt)
            if (t != tt) {
                return createResponse({ error: "t should be "+tt }, 400);
            }
            let result = await db.get(`SELECT t,
                 strftime('%s', CURRENT_TIMESTAMP) - strftime('%s', ts_heartbeat) as heartbeat_ago
                 from ipfs where t = ?`,t);
            // result = {}
            // await db.get(`DELETE FROM ipfs`)
            // await db.get(`DELETE FROM ipfs_in`)
            if (!hak(result)) {
                // new
                // console.log("PUT new: "+t)
                result = await db.get(`INSERT INTO ipfs (t,s,ts_heartbeat)
                    VALUES (?,?,CURRENT_TIMESTAMP)`,     t,s)
                // with links to other ipfs directly inside this one
                // unused except to sanity check your deps are known to the server.
                let z = req.url.searchParams.get('z');
                z = z && z.split(',') || []
                each i,ot z {
                    // console.log("PUT links: "+ot)
                    await db.get(`INSERT INTO ipfs_in (t,ot)
                        VALUES (?,?)`, t,ot)
                    // these FK dont seem to be enforced, so:
                    result = await db.get(`SELECT t from ipfs where t = ?`,ot)
                    if (!hak(result)) {
                        return createResponse({ error: "dependency not known: "+ot }, 400);
                    }
                }
            }
            else {
                // update row heartbeat if > two minutes old
                if (result.heartbeat_ago > 120) {
                    result = await db.get(`UPDATE ipfs
                        SET ts_heartbeat = CURRENT_TIMESTAMP
                        where t = ?`,t);
                }
                // console.log("PUT uptime: ",result)
            }
    
            return mimeable(req)
        } catch (error) {
            console.error(error)
            return createResponse({ error: error.message }, 500);
        }
    };

// serverjunk
    function mimeable(req:Request, data:any) {
        let mime = req.url.searchParams.get('mime')
        if (mime) {
            // we send whatever content type they want
            // which abandons a slight semblance of security
            mime = mime.replace(/[^-+\w\/]/g,'')
        }
        else {
            // guess header for string now
            if (isst(data)) {
                mime = 'text/plain'
            }
            // default header for json later
        }
        return createResponse(data, 200, mime && { 'Content-Type': mime });
    }
    function createResponse(data: any, status: number = 200, headers?: HeadersInit): Response {
        headers ||= {}
        headers['Content-Type'] ||= 'application/json'
        if (isob(data)) {
            data = JSON.stringify(data);
        }
        // new Headers(headers)
        return new Response(data, { status, headers });
    }





import type { RequestHandler } from '../$types';
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { isst, isob, sha256, isnum, isar, isspace, hak, havs, haks, ex, map } from '$lib/Y/Pic.ts'
// am immutable blob store
//  t:sha256(s) => s
// PUT t,s(,z=[dependency t+])
// GET t(,mime=Content-Type to serve it with, allowing javascript, image etc)

// db, schema 
    let db
    try {
    db = await open({
        filename: 'ipfs.sqlite',
        driver: sqlite3.verbose().Database,
        //pool: { min: 1, max: 6 } // allow up to 6 concurrent connections
    });

    if (0) {
        console.log("recreating database!")
        await db.get(`
            DROP INDEX IF EXISTS idx_ipfs_in_t;
            DROP INDEX IF EXISTS idx_ipfs_in_ot;
            DROP INDEX IF EXISTS idx_ipfs_t;
            DROP INDEX IF EXISTS idx_ipfs_ts_heartbeat;
            DROP TABLE IF EXISTS ipfs_in;
            DROP TABLE IF EXISTS ipfs;
        `)
    }
    await db.exec(`
        CREATE TABLE IF NOT EXISTS ipfs (
            t TEXT PRIMARY KEY UNIQUE,
            ts_heartbeat REAL,
            ts_created REAL DEFAULT (strftime('%s', 'now')),
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
    } catch (error) {
        console.error("Database setup error: "+error.message)
        throw error
    }

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
                 strftime('%s', 'now') - ts_heartbeat as heartbeat_ago
                 from ipfs where t = ?`,t);


            if (!hak(result)) {
                // new

                // with links to other ipfs directly inside this one
                // unused except to sanity check your deps are known to the server.
                // these FK dont seem to be enforced, so:
                let z = req.url.searchParams.get('z');
                z = z && z.split(',') || []
                try {
                    await ipfs_in_check(z)
                } catch (err) {
                    return createResponse({ error: err.message }, 400);  
                }

                result = await db.get(`INSERT OR REPLACE INTO ipfs (t,s,ts_heartbeat)
                    VALUES (?,?,strftime('%s', 'now'))`, t,s)
                each i,ot z {
                    // console.log("PUT links: "+ot)
                    await db.get(`INSERT OR REPLACE INTO ipfs_in (t,ot)
                        VALUES (?,?)`, t,ot)
                }
                try {
                } catch (err) {
                    if (err.message.startsWith('SQLITE_CONSTRAINT: UNIQUE constraint failed: ipfs.t')) {
                        // a race from read to insert. since immutable it is no problem at all.
                    }
                    else {
                        throw err
                    }
                }
            }
            else {
                // update row heartbeat if > five minutes old
                if (result.heartbeat_ago > 300) {
                    result = await db.get(`UPDATE ipfs
                        SET ts_heartbeat = strftime('%s', 'now')
                        where t = ?`,t);
                }
                // console.log("PUT uptime: ",result)
            }
    
            return mimeable(req)
        } catch (error) {
            console.error("Error in ipfs PUT: "+error.message)
            return createResponse({ error: error.message }, 500);
        }
    };

    async function ipfs_in_check(z) {
        let dependencyChecks = z.map(
            ot => db.get(`SELECT t from ipfs where t = ?`,ot)
                .then(result => {
                    if (!hak(result)) {
                        throw new Error(`Dependency not found: ${ot}`)
                    }  
                })
        )
        await Promise.all(dependencyChecks);
    }

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





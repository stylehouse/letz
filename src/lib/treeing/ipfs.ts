import { ac, ahsk,ahk,theone,hak,haks,havs, dec,dig, sha256,sex,ex,nex,now,grep,grop,armap,map,sum,ksaf,hashkv,flatten,fatal,heq,reverse } from "$lib/Y/Pic.ts"
import { pit,C_,i_,o_,pito,o_path,o_up,inlace } from "$lib/St"
import {diff,enj,enL,deL,indents} from "$lib/Y/Text"
# it's not really ipfs
#  server is in src/routes/ipfs/+server.ts

    # < cause async flickering in the uploading -Rec
    # < then come back here (a Promise group?)
    export async function upload_to_ipfs(s,deps_by_dige) {
        # create|get|check sy&store
        $sto = store_init(s)

        stos&ok and return
        
        let t = stos&dige
        let para = {t}

        # check deps
        $deps = deps_by_dige[stos&dige]
        if (deps) {
            $ready = []
            $diges = []
            $unready = grep(z => {
                $zto = zy&store
                if (zto && ztos&ok) {
                    ready.push(zto)
                    diges.push(ztos&dige)
                }
                else return 1
            },deps)
            # updating faster than storage gets ready can get you here
            # < hmm we are probably not supposed to happen anymore?
            if (hak(unready)) {
                console.log("unready to "+s.t+" "+t+": ",
                    unready.map(n => n.t+" "+n.sc['░']))
                return
            }
            # make (s)/sto** (no y&up)
            stos&z = ready
            # as a URI, z becomes comma-separated, server must know this means array
            # < didnt it used to make multiples? eg [1,2] -> ?z=1&z=2
            para.z = diges
        }

        # console.log("upload_to_ipfs: ",para)
        para.body = stos&string
        await store_send(para,s,sto)
    }
    function store_init(s) {
        $sto = sy&store ||= C_('store '+s.t)
        # what we copy from s%*
        $ons = {dige:s.sc['░'],string:sy&string}

        # checks:
            # check sto%dige,string are same
            #  we may be repeating this (from Aroundiness)
            #  sto should be deleted by Recolink pushing news
            $onsto = sex({},sto.sc,haks(ons))
            hak(onsto) && !heq(ons,onsto) and debugger
        
            # the server checks the given dige (called t in the PUT handler) is for the string
        
        ex(sto.sc,ons)
        return sto
    }
    async function store_send(para,s,sto) {
        # < global fetch queue? getContext a proxy, see g-j / R%Inn
        #  < testable calls to ipfs|sessionStorage
        $body = delete para.body
        let params = new URLSearchParams(para);

        let res = await fetch(
            `/ipfs?${params.toString()}`,
            {method:'POST',body}
        )

        if (res.ok) {
            delete stos&errors
            stos&ok = 1
        }
        else {
            # res doesn't .hasOwnProperty() all its info, peel it with map()
            res = sex({res},map(n=>n,res),'status,statusText')
            ahk(sto.sc,['errors'],res);
            debugger
        }
        # storage may get ready before Rec.svelte reacts to having this bit of Record/**
        #!sy&wake and debugger
        # 1 makes this not Construct
        sy&wake && sy&wake(1)
    }

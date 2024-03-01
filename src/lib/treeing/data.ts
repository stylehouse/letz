import { ac, ahsk,ahk,theone,hak,haks,havs, dec,dig, sha256,sex,ex,nex,now,grep,grop,armap,map,sum,ksaf,hashkv,flatten,fatal,heq,reverse } from "$lib/Y/Pic.ts"
import { pit,C_,i_,o_,pito,o_path,o_up,inlace } from "$lib/St"
import {diff,enj,enL,deL,indents} from "$lib/Y/Text"

# f
    # s^^^ -> a/pa/th
    export function slupath(s,d) {
        # < d.til?
        return o_up(s).reverse().map(s => s.t).join("/")
    }

    function Klone(C,d) {
        $K = C_(C.t)
        # we reinput /*, no up
        nex(K.y,C.y,'up')
        ex(K.c,C.c)
        nex(K.sc,C.sc,'z')
        d.K and i_(d.K,K)
        d.K = K
        return K
    }

    # sync n/#@z with N[z]
    #  i $n/#@z:e o N/:z
    #  instead of recreating them every time (immutable state), which is also possible...
    # as in Record C/kommit -> B/times
    # usually adds one new item, sometimes they vanish
    export function makeso(n,N,d) {
        d ||= {}
        $was = ns&z || []
        $neu = N.slice()
        # find the old in the new (removingly)
        $goners = was.filter(e => !hak(grop(z => z == ey&be, neu)))
        # make them slink away
        goners.map(e => es&going ||= now())
        # z have a spacer made (#@z)
        neu.map(z => {
            # pit() here makes a new C with only .t (spacer)
            #  inserts into n/* with zy&up=n
            $e = pit(n,z.t)
            ey&be = z
            d.creation && d.creation(e,z,n)
        })
    }

# Reco
    # Reco = print C**
    export async function mkReco(C) {
        $topK
        $encode = (C,d) => {
            # C cloning, compressing and encoding
            #  in eg C:"treeh $i"/C:Diring%dige are needed to look up that version of C:Diring

            # clone the C** into K**
            $K = Klone(C,d)
            topK ||= K
            
            # < compress: mute unstorables adhoc
            # < maybe any C in K.*.*, maybe any ref in K.c...
            #   but leaving enough to find origin etc.

            # encode Lines
            $L = enL(K)
            K.y.string = L
            K.y.d = d

            # indentedly joining these
            return L
        }
        $string = inlace(C,{
            grab: (C,d) => indents(d.d*2, encode(C,d), 'notailnl'),
        }).join("\n")
        !topK and debugger

        $dige = await sha256(string)

        # < Betime could rename these better than 'a'
        $Reco = C_('a','-Reco',{},{string,dige})
        # also, have an immutable copy of it all
        Recos&z = [topK]

        return Reco
    }
    # multiple Reco compete for use
    # < the Reco+ and kommit|been/* serial-numbered lists
    #    are the same things. see Recolink_stillness
    export function electReco(s,Reco,g) {
        # staging and recent states pool in N[Reco]
        # < s says it wants something else reset to, for undo
        #    git work via s, who might show all Reco?
        #    they want naming intelligently wrt the diff, enclosing headings etc...
        $co = s.y.collect ||= C_('collect','-Recollector')
        
        $latest = o_(co).slice(-1)[0]
        if (latest && latests&dige == Recos&dige) {
            # same, recycle object
            Reco = latest 
        }
        else {
            # < GOING unused, we put atreeh%time
            Recos&time = g && g.fenow && g.fenow() || now()
            i_(co,Reco)
            ahk(co,'y','Reco_by_dige',Recos&dige,Reco)
        }
        return Reco
    }
    # Reco download to a C that hosts them 
    #  sto should be deleted by Recolink pushing news
    export function Recolink(guest,Reco,s) {
        guest.y.be = s
        guest.sc['░'] != Recos&dige and delete guesty&store
        guest.sc['░'] = Recos&dige
        guest.y.string = Recos&string
    }
    # "same, recycle object" for bloube/:guest
    export function Recolink_stillness(guest,Reco) {
        return guest?.sc['░'] == Recos&dige
    }
    # "same, recycle object" for kommit|been/* serial-numbered lists
    # for when you will later Recolink(guest,Reco) if ~
    export function host_Recolink_stillness(host,Reco) {
        $la = o_(host).slice(-1)[0]
        # < why this errors (read prop 'sc' of undefined)
        #    when la?.sc is supposed to prevent that?
        #return la?.sc['░'] == Recos&dige
        return la && la.sc['░'] == Recos&dige
    }

import { ac, ahsk,ahk,theone,hak,haks,havs, dec,dig, sha256,sex,ex,nex,now,grep,grop,armap,map,sum,ksaf,hashkv,flatten,fatal,heq,reverse } from "$lib/Y/Pic.ts"
import { pit,C_,i_,o_,pito,o_path,o_up,inlace } from "$lib/St"
import {diff,enj,enL,deL,indents} from "$lib/Y/Text"

import { mkReco,electReco,
    Recolink,Recolink_stillness,host_Recolink_stillness,
    makeso,slupath} from "$lib/treeing/data";
import { generate_diff} from "$lib/treeing/diff";
import { upload_to_ipfs} from "$lib/treeing/ipfs";
export { Recolink,Recolink_stillness,host_Recolink_stillness,makeso};

# Recollect Reco <- guest ...
    # Rec.svelte may be given Record/in/$guest-Rec
    # g is Record, and it is Construct()ing around this:
    export async function Recollect(g,s) {
        $This = sc&This
        $C = This?.C || s
        # always encode the latest thing (working dir state -> staging)
        $Reco = await mkReco(C)
        # pool it in sy&collect/-Reco, picking one to be now
        Reco = electReco(s,Reco,g)
        s.y.Reco = Reco

        # tell Record that it has an s ready
        g.o_done(s)
        # went via component for no reason
        # g.output_to(Reco)
    }


# Aroundiness
    # note: things compile: '$N =' -> 'var N =', '...and...' -> 'if(...) { ... }'
    # a picture looking back through kommit:s/**
    # < when to make sure everything is stored
    export function Aroundiness(g,s) {
        # tumble down s/* and sy&be=s@origin
        #  looking back through the i ... that advanced it
        $links_by_depth = {}
        $deps_by_dige = {}
        $N = inroundce(s,{
            a_link: &sd{
                # collect all storables
                ahk(links_by_depth,[d.d],s)

                # track dependencies
                d.was_link = d
                $dependant = d.up?.was_link?.s
                if (dependant) {
                    # by the time we fine this, s should be stored anyway
                    #  the schema has that ipfs_in joint
                    $dige = dependant.sc['░']
                    ahk(deps_by_dige,[dige],s)
                }
            },
            climbs: &sdN{
                # do only the latest /been/Arounding
                d.d == 0 and N.splice(0,hak(N)-1)
            }
        })
        # deepest layers first
        $layers = reverse(havs(links_by_depth))
        # go async
        Around_layers(g,s,layers,deps_by_dige)

        # < drive an event now

        $by_path = map(N => hashkv(N.map(s => [slupath(s), s])), layers)
        return {deps_by_dige,layers}
    }
    # asyncily PUT each layers of requests
    async function Around_layers(g,s,layers,deps_by_dige) {
        each iN layers {
            $waits = map(s => upload_to_ipfs(s,deps_by_dige), N)
            await Promise.all(waits)
            # < handling errors?
        }
        g.o_done(s)
    }

    # tumble down s/* or sy&be=s@origin
    #  the latter are given to d.a_link()
    function inroundce(s,d) {
        fatal.isC(s)
        !d.a_link and debugger
        # tumble down s/* and sy&be=s@origin
        return inlace(s,{
            ...d,
            # include the first node, s|kommit
            inc:1,
            climb: &sd{
                # they sy&be=s@origin and s%░
                $linkish = sum(sy&be && 1, s.sc['░'] && 1)
                $z = o_(s)
                if (linkish) {
                    hak(z) and debugger

                    d.a_link and d.a_link(s,d)

                    # go to its origin
                    return [sy&be]
                }
                # have a This at the end our link trail
                if (sc&This) {
                    hak(z) and debugger
                    return []
                }
                # nothing but links and lists of links
                !hak(z) and debugger
                return z
            }
        })
    }
    
# Betime, the UI functions
        # switch planes
        let beof = (s) => fatal.isC(s.y.be)
  # Betime per -Kom
    # Record B/items|times** iterates here (at do_Pi_early) 
    export function Betime({C,s,d,times}) {
        # < inheritable C%somethings, targeting
        # the Con-Kom(s)/s-Kom
        let Con = C.y.up
        fatal.isC(times)

        Inspherical({Con,s})

        let uC = C.y.up?.c.Kom
        let us = s.y.up
        if (times == us) {
            # B/times/*
            o_times_star(s)
        }
        # us && console.log("Seeing "+us.t+"/"+s.t, {C,s})
    }

    # B/times/*
    function o_times_star(s) {
        let prev = null
        if (!timeses_realthing(s)) {
            # someone has deleted s, and it's just hanging around...
            # leave diff as it was, commit log is lies until its gone
        }
        else {
            # find previous real commit
            prev = timeses_prev_realthing(s)
        }
        if (prev) {
            # to the previous (parent commit)
            # < make specific to -Kom somehow...
            o_times_Kom__pairwise(prev,s)
        }
    }
    # to the previous (parent commit)
    function o_times_Kom__pairwise(prev,s) {
        # time difference
        # times/*%delta = pairwise *//@be%time 
        let [a,b] = grep(map(s => beof(s).sc.time, [prev,s]))
        a && b and s.sc.delta = dec(b - a,0)

        # text difference
        # times/*%diff = pairwise *(//@be)+:treeh/**(//@be)+:bloub
        s.sc.diff ||= generate_diff(prev,s)
    }


    # B/times/* only diff things that are real
    function timeses_prev_realthing(s,direction) {
        $times = sy&up
        # things
        !timess&z and return
        # in order of proximity
        $c = {near:1}
        # either direction from s
        direction ||= 'bow'
        c[direction] = s
        return ksaf(timess&z,c)
            # that could be diffed to
            .filter(s => timeses_realthing(s)) [0]
    }
    # B/times/* only diff things that are real
    function timeses_realthing(s) {
        return !(ss&going || ss&goable)
    }

  # Betimes altogether
    # Record B finishes up here (at do_later)
    $disable_other_cull_process = 1
    export function Betimes({items,times,kommit}) {
        $N = o_(times)
        hak(N) < 8 and return
        # these times/* are from kommit/*
        $one = N[0]
        $ori = oney&be
        $kommit = oriy&up
        $desired_number = 6
        # how to change times/*
        $add = []
        $remove = []
        
        # not things already going
        $maybe = grep(s => !(ss&going || ss&goable), N)
        # separate just the data we want to look at
        #  and our o.delta is now looking the other way
        #   just to avoid having to look at the stayer's delta when considering a merge...
        # < another layer of C for this
        $look = make_look_from_times(maybe)
        $delook = N => map(o => o.s, N)

        # find unconscious commits
        $would_cull = times_cullable(look)
        $couldda_culled = would_cull

        # see if those rules alproduce enough squishing
        $desired_reduction = hak(look) - desired_number
        if (hak(would_cull) < desired_reduction) {
            # subbranch
            #   < we finally replace them with a Recolink to the kommit including them
            $would_subbranch = agoodchunkof(look)
            remove.push(...delook(would_subbranch))
            # < find a /kommit including them
            $branch = C_('TODO kommit')
            add.push(branch)
        }
        else {
            # only so many
            would_cull = would_cull.slice(0, desired_reduction)
            remove.push(...delook(would_cull))
        }



        # < wake certain of them
        #   atm in bop() / Betimes(),Construct() 
        #    ie we wake|compute everything in B**
        #     all Kom.svelte getting a new $C with mostly the same in it
        #    > reConstruct() a subset of B** depending on what's happening
        #      would need to subset resolve $n, or insert into branched times/-Kom**
        map(&s{
            # the pairs of things
            $ne = timeses_prev_realthing(s,'aft')
            !ne and debugger
            
            # sanity check which two are involved...
            #  we can't possibly be merging across conscious (%msg|level) things
                # < define all these subselects, make one "main"
            $o = theone(grep(o => o.s == s,couldda_culled))
            !o and debugger
            if (ne != o.mergible_with.s) {
                # avoid merging anywhere near conscious (%msg|level) things
                # which the ne doesn't know about 
                debugger
                ne = o.mergible_with.s
            }

            if (ne) {
                # drop diff cache
                delete nes&diff

                # < GOING we dont have to wake anyone?
                # ney&wake && ney&wake()
                
                # the earlier thing (s) goes away
                #  but gives its earlier %time to ne
                # < %time is a range, delta is computed for a pair
                $earlier = sy&be.sc.time
                $later = ney&be.sc.time
                earlier > later and debugger
                ney&be.sc.time = earlier
            }
        },remove)
        # < GOING we dont have to wake everyone?
        # o_(times).map(s => sy&wake && sy&wake())



        # apply the change
        map(&s{
            debugger
            # top-post this grouper thing
            kommits&z.unshift(s)
        },add)
        # properly delete one round later
        grop(s => ss&goable && ss&going, timess&z)
        map(&s{
            $be = sy&be
            # allow delete from times/*, becomes translucent
            ss&goable = now()
            # delete from kommit/*
            $ko = bey&up
            grop(be,kos&z)
        },remove)


        $c = {desired_reduction,couldda_culled,add,remove}
        c.times = times
        c.kommit = kommit
        # timesc&look = c
        console.log("Betimes", c)
    }
    function make_look_from_times (N) {
        $look = map(s => sex({t:s.t,s},s.sc,'msg,level'),N)
        $prev_o = null
        map((o) => {
            if (prev_o) {
                $s = o.s
                let [a,b] = grep(map(s => beof(s).sc.time, [prev_o.s,s]))
                !(a && b) and debugger
                # this o.delta is to the next thing now
                #  whereas s%delta is to the previous (see o_times_Kom__pairwise())
                prev_o.delta = dec(b - a,0)
            }
            prev_o = o
        }, look)
        return look
    }


    # find sequences (>1) of unconscious commits
    #  we never squish into conscious commits
    #  only the vague units of time between events with potentially minimal meaning
    function times_cullable(look) {
        # go in reverse to throw away the earlier of the two
        #  the going patch merges into the next one with|based-on it
        $la = null
        $la_o = null
        look = reverse(look)
        $cullable = grep(&o{
            $conscious = o.msg || o.level
            $yup = !conscious && !la
            # this is actually next (reverse)
            yup and o.mergible_with = la_o
            la = conscious
            la_o = o
            return yup
        }, look)
        # max delta before a commit should be subbranched rather than squished
        #  otherwise with no %msg or %level we would never leave a trail
        $max_delta = 30
        cullable = grep(&o{
            return o.delta < max_delta
        },cullable)
        $most_cullable = cullable.sort((a, b) => a.delta - b.delta)
        $would_cull = agoodchunkof(most_cullable)
        return would_cull
    }
    # a bit more than most of them, eg 20->12, 12->7
    function agoodchunkof(N) {
        return N.slice(0,Math.floor(hak(N) / 1.618))
    }

    
    # < treeh//@collect/* garbage collect where times says

# Inspherical
    # a mode, complements I.Pi
    #  suppose they (s**) don't all have c&pi, so dont Pi, but would this...
    function Inspherical({Con,s}) {
        # give ^-Conz/-Con better names
        #  from s.t, the insphere - rather than its position in the -Conz%z array indice, which is senile
        #   see 'atm we use the array indices to individuate [C,C,C]'
        Con.t = s.t
        fatal.isC(s)

        # do some Con%$style hacks to not double-label it, etc
        $Cont = Conc&Cont
        if (Con.t == Conts&Ct) {
            # avoid stating this twice (as Con.t and Cont%Ct)
            Con.sc.avoid_restating_Ct = 1
        }
        # make coming and going smooth
        Con.sc.animal = 1
    }

#  cull*
    # deletes history
    # < shrinking ooze
    #   
    export function cull_around(s) {
        hak(ss&z) < 10 and return
        # we have many moments of "out"
        $cull = ss&z
        # keep any commits we made
        # < commit when we type into any of the Record** things
        # < folding it all up into a book after a while, %we and all
        cull = cull.filter(n => !ns&we)
        # < keep definitive moments in time
        #    ie before and after a bunch of stuff changed
        #     aggregating many rapid moments of stuff changing
        # < content-awareness is now all over there in Reco pools
        cull = cull.slice(1,-4)
        grop((s,i) => i%2,cull)
        
        !hak(cull) and debugger
        !disable_other_cull_process and grop(cull,ss&z)
    }
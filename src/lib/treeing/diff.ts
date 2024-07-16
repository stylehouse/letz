import { ac, ahsk,ahk,theone,hak,haks,havs, dec,dig, sha256,sex,ex,nex,now,grep,grop,armap,map,sum,ksaf,hashkv,flatten,fatal,heq,reverse } from "$lib/Y/Pic.ts"
import { pit,C_,i_,o_,pito,o_path,o_up,inlace } from "$lib/St"
import {diff,enj,enL,deL,indents} from "$lib/Y/Text"

# only works on B/times/*
# < more than one bloube
export function generate_diff(a,b) {
    # a+b are W containing links to things we actually want to diff
    # .t unioned
    #  ie /$t/$i/$Reco, with the x.i treated like an array for the pair
    $by_ti = {}
    $null_from_to = null
    map(&si{
        !s and return null_from_to = i
        $Recotreeh = Recolink_lookup(sy&be)
        Recolink_discovery(Recotreeh)
            .map(link => {
                $Recobloube = Recolink_lookup(link)
                # the above doesn't know the name 'Diring' anymore
                # < it should probably come from $origin
                # so index these
                ahk(by_ti, link.t,i, Recobloube)
            })
    }, [a,b])

    # fill in the blank in the datastructure,
    #  so [null,$b] doesn't become N=[$b]
    if (null_from_to != null) {
        $present_t = haks(by_ti)[0]
        present_t == null and throw "diff none"
        ahk(by_ti, present_t,null_from_to, null)

    }

    # C:$t /C:new|gone|same with c&s='text'
    return armap(&Nt{
        # N are all just named 'a'
        # ensure this is two long
        N[0] ||= ''
        N[1] ||= ''
        $M = diff(
            ...armap(s => s && ss&string || '', N),
            {},
        )
        return C_(t,1,{},{z:M})
    },by_ti)
}
function Recolink_lookup(link) {
    $dige = link.sc['░']
    !dige and debugger
    # C:treeh, but is not immutable
    $origin = linky&be
    # look up the version
    $co = originy&collect
    $Reco = ahsk(co,'y','Reco_by_dige',dige)
    !Reco and debugger
    return Reco
}
function Recolink_discovery(s) {
    # s can be Reco, since Reco%dige
    #  aot the uber-presentable alternative name:
    return inlace(s,{grab:(s) => s.sc['░'] && s})
}
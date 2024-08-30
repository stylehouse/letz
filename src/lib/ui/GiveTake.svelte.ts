
import { hak,ex,dex,map,dec,haks,joint } from "$lib/Y/Pic"
import {o_,o_up}  from '$lib/St.svelte'
function uninlineablelabelable(C,perma) {
        let el_size = (er) => er.width * er.height

        $fail = 0
        $it = o_(C).map(n => {
            let givetake = n.y.givetake
            if (!givetake) return fail = 1
            # measure the differences in area
            let use = el_size(givetake.taker) / el_size(givetake.giver)
            if (isNaN(use)) debugger
            # extend this record with its current use ratio
            return {...givetake, use}
        })
        fail and return null
        # it is Con/(Cont,Kom?,Conz)
        # < all the possibilities
        #    eg Kom probably wants to overlay on Conz/Con*/Kom/...
        let Conz = it.pop()
        $doit = Conz.use > 0.6 && !it.some(c => c.use > 0.5) && "UNIN"
        doit ||= perma && "perma"
        if (!Conz.giver.el) debugger
        ex(Conz.giver.el.style,
            doit ? {display:'block',     'margin-left':'1em'}
                 : {display:'table-cell','margin-left':'none'}
            )
        it.push(Conz)
        $it_uses = it.map(c => dec(c.use,2))
        # console.log("Ennn "+C.t+"   "+doit, it_uses)
        return doit ? 1 : 0
}
export {uninlineablelabelable} 
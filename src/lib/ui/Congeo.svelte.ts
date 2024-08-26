
import { hak,ex,dex,map,dec,haks,joint } from "$lib/Y/Pic"
import {o_,o_up}  from '$lib/St.svelte'
function uninlineablelabelable(C) {
        let el_size = (el) => el.offsetWidth * el.offsetHeight

        $fail = 0
        $it = o_(C).map(n => {
            if (!(n.y.el_takerto && n.y.el_giverto)) return fail = 1
            let use = el_size(n.y.el_takerto) / el_size(n.y.el_giverto)
            return {el:n.y.el_giverto, use}
        })
        fail and return null
        # it is Con/(Cont,Kom?,Conz)
        # < all the possibilities
        #    eg Kom probably wants to overlay on Conz/Con*/Kom/...
        let Conz = it.pop()
        $doit = Conz.use > 0.6 && !it.some(c => c.use > 0.5) && "UNIN"
        ex(Conz.el.style,
            doit ? {display:'block',     'margin-left':'1em'}
                 : {display:'table-cell','margin-left':'none'}
            )
        it.push(Conz)
        $it_uses = it.map(c=>dec(c.use,2))
        console.log("Ennn kommit", it_uses)
        return doit ? 1 : 0
}
export {uninlineablelabelable} 
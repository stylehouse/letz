import { syntaxTree } from "@codemirror/language"
import type { EditorState } from "@codemirror/state"

# codemirror integration layer

# and system for letters getting around doing science

# library of objects to support nested Components of:
#  git-like remote,
#   commits coming,
#  codemirror that can incorporate and rebase or not
  
#   this is the Inc+Pro+Run hierarchy again
#    aka ghost+travel+wormhole

#  such that one big git remote at the tree level
#   can along the editors sprouts unfurl git remotes focused to that file/chunk
# diff-match-patch

# peers:
#  https://lezer-playground.vercel.app/
#   in the classic x+y+z+3d formation
#   cursor in one cm mapped onto other cm (parsetree <-> input)
#   he recommends looking at:
#    https://codesandbox.io/s/github/danilowoz/sandpack-tsserver?file=/public/workers/tsserver.js
#   bit beyond me to pick apart
#    a phylograph would be nice!
#    studying code tool, the editor must also be...

# docs:
#  https://codemirror.net/docs/ref/
#  https://codemirror.net/docs/guide/
#  [@codemirror/state Github](https://github.com/codemirror/state/blob/main/src/state.ts)
# random cm notes:
#   Decoration.line requires setting the RangeSet to be line.from, line.from
#    rather than line.from, line.to
#   https://discuss.codemirror.net/t/merge-view-implementation/5072/8
#    kind of buggy:
#    someone https://github.com/codemirror/dev/issues/1174
#     regarding the (==  one)(++\n  phi)(==\n  two) ugly, see Diff / Ploy / %stretch
#      might also be (==  one\n  )(++phi\n  )(==two)
#      but ideally: (==  one\n)(++phi  \n)(==  two)
 
# cm howtobe:
#   show all headings all the time, without whatever between when folded

# so:
#   Code will <-> -Con/-Things to interact with
#    eg a -Colour picker, might use nearby stylesense
#     the code target presents options
#      qua to be inferred|enumerated at presentation time: unique bold cool, enervating...
#      green good red bad? fizzle? sizzle? film grain?
#    for rigging the io machinery for features
#     such as panning around reviewing a bunch of patches
#   is the plan
#    we have now instruction-following:
#     PlayDramatics gives N to Con
#     Diring gives N to Con
#     Coning gives N to Con
#      Coning is 

#    it seems:
#     Code is fast becoming -Con/-Code
    
#     routes/PlayDramatics.svelte
#      is ~~Travel: it restarts|continues a situation
#      feeds ~~This (dat) to:
#      D = Construct(C)
#       -> -Con**
    
#     lib/Diring is for filesystems
#      posits a '/'-Dir to start with
#       -> -Con** /-Dir do <img> pile
#       async unfurl can dispatch('reCon') to ^^-Con
       
#       lib/Coning is data graphing
#        noC for not iterating C/* but the .t,.y, etc substructure
#         kind of like -hat|Fez|Bow
       
#        < to be drag-scale|aroundable
      
#       we want only a few things on the screen
#        constantly pulling everything away, ~~ WebGL-Fluid-Simulation



import { pit,C_,i_ } from "$lib/St"
import { me } from "$lib/Y/Text"
import { pex,ex,sex } from "$lib/Y/Pic"

$mkrange = &cu,{
    return sex({},cu,'from,to')
}
# resumable state across app reloads
$save_selection_state = &st,{
    $C = C_('state','-cmglance')
    # everything 
    each in st.selection {
        $range = mkrange(n)
        i_(C,C_('sel','-cmsel',{range}))
    }
    return C
}

// return an object about whatever is going on
$whatsthis = &state,{
    let about = state.selection.main
    $getstr = cur => state.sliceDoc(cur.from,cur.to)
    let str = getstr(about)
    let tree = syntaxTree(state)
    let s = C_('lezing',1,{pi:'lezing'},{length:str.length,...sex({},about,'from,to')})
    
    $cursor = tree.cursorAt(about.from, 1)
    $nod = &m,cursor,c{
        $range = mkrange(cursor)
        return i_(m,C_(cursor.name,'-nodule',c||{},{range}))
    }

  // climb to the whole line
    $parent = i_(s,C_('parent'))
    $left = i_(s,C_('left'))
    $inside = i_(s,C_('inside'))
    $right = i_(s,C_('right'))
    
    # inside, right
    $found_nl = 0
    $where = inside
    inlezz(cursor,{
        next: cu => cu.next(),
        # break: cu => cu.from > about.to,
        each: &cu,d{
            $str = getstr(cu)
            str.includes("\n") and found_nl = 1
            else
            found_nl and return d.not = true

            cu.from > about.to and where = right

            nod(where,cu,{s:str})
        }
    })

    # before
    cursor = tree.cursorAt(about.from, 1)
    inlezz(cursor,{
        next: cu => cu.prev(),
        break: cu => getstr(cu).includes("\n"),
        each: cu => {
            cu.to < about.from and nod(left,cu)
        }
    })
    lefts&z.reverse()
    
    # parent
    cursor = tree.cursorAt(about.from, 1)
    $line = {}
    inlezz(cursor,{
        next: cu => cu.parent(),
        each: cu => {
            if (cu.name == 'Line') {
                sex(line,cu,'from,to')
            }
            nod(parent,cu)
        }
    })

  // etc
    i_(s,save_selection_state(state))

    return s
}




$inlezz = &cu,d{
    d.next ||= cu => cu.next()
    d.energy ||= 30
    
    $first = 1
    while (d.energy-- > 6) {
        first and first = 0
        else
        !d.next(cu,d) and return
        # cursor changes to what (in the lezer grammar?) we are looking at...

        d.break && d.break(cu,d) and return
        
        d.each(cu,d)
    }
}

$introplant = &s{

}
# < state-updatable pull-apart-task object? an Inc-Pro-Run, with The-This etc
#   with a .brack for %node,name,from,to?

# TODO
$Lines_test = &{
    $s = C_('lezing',1,{pi:'lezing'},{length:369,from:4,til:7})
    sc&extrava = {gratis:'vav',lob:&{ 1 },be:'eel'}
    sc&da = 3
    ss&zem = "levitat"
    $i = 0
    s.c["zeep"] = []
    while (i++ < 14) { s.c["zeep"][i] = 1 }
    $Lines = me.enL({},{},{},{},s)
    Lines += "\n  Thing\t-zip\t\"lots\""
    $z = me.deL({},{},{},{},Lines)
    console.log({s,Lines,z})
    i_(s,C_(Lines,1))
    i_(s,z)
}

export {whatsthis}
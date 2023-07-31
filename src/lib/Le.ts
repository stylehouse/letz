import { syntaxTree } from "@codemirror/language"
import type { EditorState } from "@codemirror/state"

/*
codemirror integration layer

and system for letters getting around doing science

library of objects to support nested Components of:
 git-like remote,
  commits coming,
 codemirror that can incorporate and rebase or not
  
  this is the Inc+Pro+Run hierarchy again
   aka ghost+travel+wormhole

 such that one big git remote at the tree level
  can along the editor's sprouts unfurl git remotes focused to that file/chunk
diff-match-patch

peers:
 https://lezer-playground.vercel.app/
  in the classic x+y+z+3d formation
  cursor in one cm mapped onto other cm (parsetree <-> input)
  he recommends looking at:
   https://codesandbox.io/s/github/danilowoz/sandpack-tsserver?file=/public/workers/tsserver.js
  bit beyond me to pick apart
   a phylograph would be nice!
   studying code tool, the editor must also be...

docs:
 https://codemirror.net/docs/ref/
 https://codemirror.net/docs/guide/
 [@codemirror/state Github](https://github.com/codemirror/state/blob/main/src/state.ts)
random cm notes:
  Decoration.line requires setting the RangeSet to be line.from, line.from
   rather than line.from, line.to
  https://discuss.codemirror.net/t/merge-view-implementation/5072/8
   kind of buggy:
   someone https://github.com/codemirror/dev/issues/1174
    regarding the (==  one)(++\n  phi)(==\n  two) ugly, see Diff / Ploy / %stretch
     might also be (==  one\n  )(++phi\n  )(==two)
     but ideally: (==  one\n)(++phi  \n)(==  two)
 
cm howtobe:
  show all headings all the time, without whatever between when folded

so:
  Code will <-> -Con/-Things to interact with
   eg a -Colour picker, might use nearby stylesense
    the code target presents options
     qua to be inferred|enumerated at presentation time: unique bold cool, enervating...
     green good red bad? fizzle? sizzle? film grain?
   for rigging the io machinery for features
    such as panning around reviewing a bunch of patches
  is the plan
   we have now instruction-following:
    PlayDramatics gives N to Con
    Diring gives N to Con
    Coning gives N to Con
     Coning is 

   it seems:
    Code is fast becoming -Con/-Code
    
    routes/PlayDramatics.svelte
     is ~~Travel: it restarts|continues a situation
     feeds ~~This (dat) to:
     D = Construct(C)
      -> -Con**
    
    lib/Diring is for filesystems
     posits a '/'-Dir to start with
      -> -Con** /-Dir do <img> pile
      async unfurl can dispatch('reCon') to ^^-Con
       
      lib/Coning is data graphing
       noC for not iterating C/* but the .t,.y, etc substructure
        kind of like -hat|Fez|Bow
       
       < to be drag-scale|aroundable
      
      we want only a few things on the screen
       constantly pulling everything away, ~~ WebGL-Fluid-Simulation
    

*/

import { pit,C_,i_ } from "$lib/St"

// return an object about whatever is going on
export function Le_Attention(state) {
    let about = state.selection.main
    let str = state.sliceDoc(
        about.from,
        about.to
    )
    let tree = syntaxTree(state)
    let s = C_('lezing',1,{pi:'lezing'})
    
    let cursor = tree.cursorAt(about.from, 1)
    while (!s.sc.z || cursor.next()) {
        cursor.from > about.to and break
        i_(s,C_(cursor.name,1,{pi:'nodule'},{range:{from:cursor.from,to:cursor.to}}))
        !cursor.next() > about.to and break
    }
    return s
}
// < state-updatable pull-apart-task object? an Inc-Pro-Run, with The-This etc
//   with a .brack for %node,name,from,to?
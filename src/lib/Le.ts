import {syntaxTree} from "@codemirror/language"
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
  
*/


export class Le {
    state: EditorState
    lems: string[]
    constructor (state: EditorState) {
        this.state = state
        let about = state.selection.main
        let str = state.sliceDoc(
            about.from,
            about.to
        )
        let tree = syntaxTree(state)
        let cursor = tree.cursorAt(about.from,1)
        let lems = []
        while (!lems.length || cursor.next()) {
            if (cursor.from > about.to)
                break
            lems.push(`Node ${cursor.name} from ${cursor.from} to ${cursor.to}`)
        }
        console.log("Treewalk:"+about.from+'-'+about.to+":"+str,lems)
        this.lems = lems
    }
}
export function tz () {
    return
}

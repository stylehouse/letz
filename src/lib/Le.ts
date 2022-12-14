import {syntaxTree} from "@codemirror/language"
import type { EditorState } from "@codemirror/state"
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
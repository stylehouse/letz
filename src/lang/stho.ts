import grammar from './stho.grammar?raw'
import { buildParser } from '@lezer/generator'
import {LanguageSupport,LRLanguage} from "@codemirror/language"

# put this in extensions[] on EditorState.create()
# < can this be outside a function, exporting langsup?
export function stho() {
    let parser = buildParser(grammar)
    let language = LRLanguage.define({ parser: parser })
    let langsup = new LanguageSupport(language)
    return langsup
}
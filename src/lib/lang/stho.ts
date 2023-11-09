import grammar from './stho.grammar?raw'
import { buildParser } from '@lezer/generator'
import { LanguageSupport, LRLanguage, indentNodeProp, foldNodeProp, foldInside,
    delimitedIndent, continuedIndent
} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"
import { ispi,fatal,pex,ex,sex,tax, ahk,ahsk,map,grep,grop,grap,uniq,hak } from "$lib/Y/Pic"

let parser
let warnings = capture_warnings(
    () => parser = buildParser(grammar)
)

// < try more of https://github.com/codemirror/lang-example/blob/main/src/index.ts
export const sthoLanguage = LRLanguage.define({
    parser: parser.configure({
        props: [
            indentNodeProp.add({
                Sunpit: continuedIndent({except:/^\s*S $/}),
                Sunpitness: continuedIndent({except:/^\s*S $/}),
            }),
            foldNodeProp.add({
                Sunpit: foldInside
            }),
            styleTags({
                Name: t.variableName,
                IOness: t.bool,
                Sunpit: t.heading1,
                Title: t.heading3,
                Sunpitness: t.deleted,
                Sigil: t.string,
                Comment: t.lineComment,
                "( )": t.paren
            })
        ]
    }),
    languageData: {
        commentTokens: { line: "#", block: {open: "/*", close: "*/"} },
        closeBrackets: {brackets: ["(", "[", "{", "'", '"', "`"]},
        indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    },
})

// for EditorState.create extensions[]
export function stho() {
    let lang = new LanguageSupport(sthoLanguage)
    warnings and lang.warnings = warnings
    return lang
}


// ta https://github.com/CodeWitchBella/codewitchbella.com/blob/main/app/routes/_nav.blog._post.2023-lezer-playground.tsx
function capture_warnings(y) {
    const warnings: any[] = [];
    const stash = console.warn;
    console.warn = (w) => warnings.push(w);
    y()
    console.warn = stash;
    return warnings.length && warnings
}




// ta https://discuss.codemirror.net/t/show-syntax-error-from-lezer-parse/5346/3
import {syntaxTree} from "@codemirror/language"
import {linter} from '@codemirror/lint'
export function simpleLezerLinter() {
  return linter(view => {
    const {state} = view
    const tree = syntaxTree(state)
    if (tree.length === state.doc.length) {
      let pos = null
      tree.iterate({enter: n => {
        if (pos == null && n.type.isError) {
          pos = n.from
          return false
        }
      }})

      if (pos != null)
        return [{from: pos, to: pos+1, severity: 'error', message: 'syntax error'}]
    } 

    return []
  })
}
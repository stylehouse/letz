import grammar from './stho.grammar?raw'
import { buildParser } from '@lezer/generator'
import { LanguageSupport, LRLanguage, indentNodeProp, foldNodeProp, foldInside,
    delimitedIndent, continuedIndent
} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

const parser = buildParser(grammar)
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
    return new LanguageSupport(sthoLanguage)
}
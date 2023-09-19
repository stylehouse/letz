import grammar from './stho.grammar?raw'
import { buildParser } from '@lezer/generator'
import { LanguageSupport, LRLanguage, indentNodeProp, foldNodeProp, foldInside, delimitedIndent } from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

const parser = buildParser(grammar)
// < try more of https://github.com/codemirror/lang-example/blob/main/src/index.ts
export const sthoLanguage = LRLanguage.define({
    parser: parser.configure({
        props: [
            indentNodeProp.add({
                IOpath: delimitedIndent({ closing: ")", align: false })
            }),
            foldNodeProp.add({
                IOpath: foldInside
            }),
            styleTags({
                Name: t.variableName,
                IOness: t.bool,
                Sigil: t.string,
                LineComment: t.lineComment,
                "( )": t.paren
            })

        ]
    }),
    languageData: {
        commentTokens: { line: "#" }
    },
})

// for EditorState.create extensions[]
export function stho() {
    return new LanguageSupport(sthoLanguage)
}
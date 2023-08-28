import ist from "ist"
import {EditorState} from "@codemirror/state"
import {getIndentation} from "@codemirror/language"
import {javascript} from "@codemirror/lang-javascript"

function check(code: string, options: any = {}) {
  return () => {
    code = /^\n*([^]*)/.exec(code)![1]
    let state = EditorState.create({doc: code, extensions: [javascript(options).language]})
    for (let pos = 0, lines = code.split("\n"), i = 0; i < lines.length; i++) {
      let line = lines[i], indent = /^\s*/.exec(line)![0].length
      ist(`${getIndentation(state, pos)} (${i + 1})`, `${indent} (${i + 1})`)
      pos += line.length + 1
    }
  }
}

describe("javascript indentation", () => {
  it("indents argument blocks", check(`
foo({
  bar,
  baz
})
`))

  it("indents function args", check(`
foo(
  bar
)`))

  it("indents nested calls", check(`
one(
  two(
    three(
      four()
    )
  )
)`))

  it("aligns lists", check(`
one(two,
    three({four: five,
           six: seven
          }))`))

  it("indents unfinished nodes", check(`
if (foo &&
    `))

  it("deindents else", check(`
if (1)
  a
else
  b
`))

  it("support multiple opening calls on a line", check(`
foo(bar(baz(
  ugh(quux(
    blah)))))
`))

  it("supports opening brackets on their own line", check(`
const something =
  [
    a,
    b
  ]
`))

  it("handles hanging braces", check(`
function foo()
{
  body()
}
`))

  it("indents case bodies", check(`
switch (1) {
  case 22:
    console.log(2)
    break
  default:
    return 2
}`))

  it("indents method chains", check(`
return blah
  .something()
  .anotherOne(
    withArguments
  )
  .catch(x)
`))

  it("indents JSON-style", check(`
let j = {
  foo: [
    {
      1: true,
      2: false
    },
    {},
  ],
  quux: null
}
`))

  it("indents continued properties", check(`
let o = {
  foo: 1 + 3 +
    4,
  bar: 11
}
`))

  it("doesn't get confused by continued param lists", check(`
function foo(a, b,
             c, d) {
  return
}
`))

  it("doesn't indent below labels", check(`
abc:
foo()
`))

  it("properly indents function expression arguments", check(`
foo(100, function() {
  return 2
})
`))

  it("indents arrow functions", check(`
let x = a => {
  return 4
}
let y = a =>
  6
let x = (a,
         b) =>
  6
`))

  it("indents braceless structure", check(`
for (;;)
  if (0)
    if (1)
      foo()
    else
      bar()
  else
    baz()
`))

  it("indents JSX constructs", check(`
let y = <body>
  <div class="a"
    lang="it">
    What?
  </div>
  <img src={
    foo
  }/>
</body>`, {jsx: true}))
})

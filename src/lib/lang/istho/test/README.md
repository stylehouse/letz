I try to run these from the directory above (istho/) in a podman, with: `npx cm-runtests`

Every test fails with this error:
```
     Error: Unrecognized extension value in extension set ([object Object]). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.
      at inner (file:///app/node_modules/@codemirror/state/dist/index.js:2018:23)
      at inner (file:///app/node_modules/@codemirror/state/dist/index.js:1993:17)
      at inner (file:///app/node_modules/@codemirror/state/dist/index.js:2019:13)
      at inner (file:///app/node_modules/@codemirror/state/dist/index.js:1993:17)
      at flatten (file:///app/node_modules/@codemirror/state/dist/index.js:2022:5)
      at Configuration.resolve (file:///app/node_modules/@codemirror/state/dist/index.js:1930:25)
      at EditorState.create (file:///app/node_modules/@codemirror/state/dist/index.js:2760:43)
      at Context.<anonymous> (file:///app/src/lib/lang/istho/test/test-indent.js:8:33)

```


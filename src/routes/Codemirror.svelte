<!-- allows you to <Codemirror bind:this={cm} .../> and then cm.view -->
<svelte:options accessors/>
<script lang="ts">
    import But from "$lib/ui/But.svelte"
    import Coning from '$lib/Coning.svelte'
    import { recur } from "$lib/Sv.svelte";
    import { onMount, onDestroy, createEventDispatcher } from "svelte";
    import { EditorState, Compartment, StateField } from "@codemirror/state";
    import { EditorView, keymap, ViewUpdate } from "@codemirror/view";
    import { indentUnit } from "@codemirror/language";
    import { defaultKeymap, indentWithTab } from "@codemirror/commands";

    let usualSetup = [EditorView.lineWrapping, indentUnit.of("    ")];
    const dispatch = createEventDispatcher();
    
    import { basicSetup } from "codemirror";
    import { javascriptLanguage, istho } from "$lib/lang/istho"
    import { stho,simpleLezerLinter } from "$lib/lang/stho"
    //import { sthovascript } from "$lib/lang/lang-javascript/src/index"
    // < change this properly, requires cm-buildhelper
    //({jsx:true,typescript:true}
    //sthovascript.name = 'sthovascript'
    //import { javascript } from "@codemirror/lang-javascript";

    // < https://github.com/replit/codemirror-minimap

    // < "Esc" should escalate committal of the editor contents

    
    export let code:string|store
    // see bind:this={cm}
    export let view: EditorView = undefined;
    export let ele = undefined

    let cha = function (etc) {
        view.dispatch({ changes: [...arguments] });
    };
    // subscribe for init and more
    let garb = []
    let value;
    garb.push(code.subscribe((v) => {
        value = v;
        if (view) {
            // view and "load into codemirror"
            let was = view.state.doc.toString();
            cha({ from: 0, to: was.length, insert: value });
            console.log("value sub!!!");
        }
    }))
    onDestroy(() => garb.map(y => y()))

    let b = {}
    b.over = () => {
        cha({ from: 0, insert: "warp\n" });
    };

    // lang
    // the language is changeable
    // < nest grammars and everything instead?
    //    they would like some tractorgramming where to merge their definitions
    //     eg an expression on a line
    let langs = [
        stho,
        //sthovascript,
        //javascript,
        istho,
    ]
    export let lang = langs[0];
    let language = new Compartment();
    // the lang are functions that return a LanguageSupport, maybe with .warnings
    let lang_itself = lang()
    let setlang = (lang) => {
        lang_itself = lang()
        view.dispatch({ effects: language.reconfigure(lang_itself) });
    };
    b.lang = [langs,setlang]

    let startState = EditorState.create({
        doc: value,
        extensions: [
            language.of(lang_itself),

            ...usualSetup,
            
            keymap.of([
                // makes this element inescapable by Tab to keyboard navigators
                //  the Esc,Tab is supposed to work around that, but
                indentWithTab,
                //   we bind Escape preventing the above from working
                {
                    key: "Escape",
                    run: () => {
                        dispatch("kommit", { view });
                        return true;
                    },
                },
            ]),
            EditorView.updateListener.of((v: ViewUpdate) => {
                if (v.docChanged) {
                    // Document changed
                }
            }),
            simpleLezerLinter(),
            keymap.of(defaultKeymap),
            basicSetup,
        ],
    });

    onMount(async () => {
        // now that ele has a value
        view = new EditorView({
            state: startState,
            parent: ele,
        });
    });
    let focus;
    recur(() => {
        focus = view.hasFocus;
    });
</script>

<div class="Codemirror" bind:this={ele} />
<But {b}/>

<span>
    {#if lang_itself.warnings}
    <Coning t="Warnings from buildParser()" C={lang_itself.warnings} noC=1 style="background-color:#3e1e0e"/>
    {/if}
</span>

{#if focus}FOCUS{/if}

<style type="css">
    .Codemirror {
        border: 3px solid black;
        min-height: 4em;
        min-width: 16em;
        max-height: 84em;
        max-width: 49em;
    }

    /* from a bot on fedi:
        Inch Worm #B2FF6C
        Persian Blue #382FB4
        */
    .moodyblue {
        color: #7d84ee;
    }
    .woodrush {
        color: #262906;
    }
</style>

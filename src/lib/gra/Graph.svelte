<script lang="ts">
    // lifted from git@github.com:gomezcabo/svelte-cytoscape-demo.git
    import { onMount, setContext } from "svelte";
import { hak } from "$lib/Y/Pic"
    import cytoscape from "cytoscape";
    import dagre from "cytoscape-dagre";
    import GraphStyles from "./GraphStyles.js";

    export let graph = null;

    let ele = null;
    let cy = null;

    onMount(() => {
         cytoscape.use(dagre)
        cy = cytoscape({
            container: ele,
            style: GraphStyles,
        });
        cy.on("add", () => {
            cy
                .makeLayout({
                    name: "dagre",
                    rankDir: "TB",
                    nodeSep: 22,
                    
                })
                .run();
        });

        if (graph) load_graph(graph)
        fauxgraphy()
    });
    function fauxgraphy() {
        let data = cy.data()
        if (hak(data)) console.log("have cy.data()",data)
        cy.fit()
    }

    function reload_graph(graph) {
        console.log("reload_graph")
        cy.remove('*')
        load_graph(graph)
        fauxgraphy()
    }
    $: ele && reload_graph(graph)
    function load_graph(graph) {
        console.log("load_graph")
        cy.add(graph.nodes.map(function(node) { return {
            group: "nodes",
            id: node.id,
            data: { ...node },
        } } ))
        cy.add(graph.edges.map(function(edge) { return {
            group: "edges",
            id: edge.id,
            data: { ...edge },
        } } ))
    }
</script>

<div class="graph" bind:this={ele}></div>


<p on:click={fauxgraphy}>cy.data()</p>

<style>
    .graph {
        width: 100%;
        height: 100%;
        min-height:20em;
        min-width:20em;

    }
</style>
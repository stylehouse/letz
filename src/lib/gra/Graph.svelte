<script lang="ts">
    // lifted from git@github.com:gomezcabo/svelte-cytoscape-demo.git
    import { onMount, setContext } from "svelte";
import { hak } from "$lib/Y/Pic"
    import cytoscape from "cytoscape";
    // these are apparently the best at either hierarchical
    import dagre from "cytoscape-dagre";
    //   or force-directed, compound graphs
    //    and "fairly rich set of constraint types" https://github.com/iVis-at-Bilkent/cytoscape.js-fcose
    import fcose from 'cytoscape-fcose';
    import GraphStyles from "./GraphStyles.js";

    export let graph = null;

    let ele = null;
    let cy = null;

    onMount(() => {
        //cytoscape.use(dagre)
        cytoscape.use(fcose)
        cy = cytoscape({
            container: ele,
            style: GraphStyles,
        });
        // cy.on("add", () => {
        //     cy
        //         .makeLayout({
        //             name: "dagre",
        //             rankDir: "TB",
        //             nodeSep: 22,
                    
        //         })
        //         .run();
        // });

        if (graph) load_graph(graph)
        fauxgraphy()
        cy.on("touchend", layout)
    });
    function fauxgraphy() {
        let data = cy.data()
        if (hak(data)) console.log("have cy.data()",data)
        layout()
        cy.fit()
    }

    function layout() {
        let concon = graph.constraints_config
        // name = dagre|fcose|circle|grid
        let lay = cy.layout({

            // name: 'dagre',
            // rankDir: "LR",
            // nodeSep: 4,

            name: 'fcose',
            ...concon,
            animate: 1,
        })



        // < different subsets of the graph
        lay.run();
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
<span on:click={() => cy.fit()}>fit()</span>
<span on:click={layout}>layout()</span>
<div class="graph" bind:this={ele}></div>




<style>
    .graph {
        width: 100%;
        height: 100%;
        min-height:30em;
        min-width:20em;

    }
</style>
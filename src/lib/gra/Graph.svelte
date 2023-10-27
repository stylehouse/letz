<script lang="ts">
    // lifted from git@github.com:gomezcabo/svelte-cytoscape-demo.git
    import { onMount, setContext } from "svelte";
    import { hak,map,havs } from "$lib/Y/Pic"
    import DropDown from "$lib/ui/DropDown.svelte"
    import cytoscape from "cytoscape";
    // these are apparently the best at either hierarchical
    import dagre from "cytoscape-dagre";
    //   or force-directed, compound graphs
    //    and "fairly rich set of constraint types" https://github.com/iVis-at-Bilkent/cytoscape.js-fcose
    import fcose from 'cytoscape-fcose';
    // and everything, interactively
    import cola from 'cytoscape-cola'
    // and another
    import klay from 'cytoscape-klay'

    import GraphStyles from "./GraphStyles.js";

    export let graph = null;

    let ele = null;
    let cy = null;
    let layengs = {fcose,dagre,cola,klay}
    let layeng = havs(layengs)[0]

    onMount(() => {
        if (!graph) return console.log("!Graph")
        
        cy = cytoscape({
            container: ele,
            style: GraphStyles,
        });

        load_graph(graph)
        layout()
    });

    function set_layeng(v) {
        layeng = v
    }
    let lay
    function layout() {
        let concon = graph.constraints_config
        // name = dagre|fcose|circle|grid
        cytoscape.use(layeng)
        let name
        // look up its name, which is not in the object we are passed as the one to use
        map((s,k) => {if (s == layeng) { name = k }}, layengs)
        if (!name) debugger

        lay = cy.layout({

            name,
            ...concon,
                rankDir:'TB',
            avoidOverlap: 1,
            animate: 1,
            animationDuration: 400,
        })
        run_layout()
    }
    function run_layout(them) {
        // different subsets of the graph
        them ||= lay
        them.run()
        cy.fit()
    }

    function layout_rightchildren() {
        let them = cy.collection()
        let right = cy.$('node[data.name = "right"]')
        // < want to not move right itself...
        them
        // .merge(right)
        .merge(right.neighbourhood())
        them.select()
        //return
        cytoscape.use(dagre)
        run_layout(
            them.layout({
                name:'dagre',
                rankDir:'TB',
                animate: 1,
                animationDuration: 400,
            })
        )
    }

    function reload_graph(graph) {
        console.log("reload_graph")
        cy.remove('*')
        load_graph(graph)
        layout()
        
    }
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
    // will not run yet
    $: lay && layeng && layout()
    $: ele && reload_graph(graph)
</script>
<span on:click={() => cy.fit()}>fit()</span>
<span on:click={layout_rightchildren}>(right.)</span>
<span on:click={run_layout}>(re-.)</span>
<span on:click={layout}>layout()</span>
<span>layeng: <DropDown N={layengs} set={set_layeng} /></span>
<div class="graph" bind:this={ele}></div>




<style>
    .graph {
        width: 100%;
        height: 100%;
        min-height:50em;
        min-width:40em;

    }
</style>
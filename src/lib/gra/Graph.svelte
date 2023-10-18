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
    import GraphStyles from "./GraphStyles.js";

    export let graph = null;

    let ele = null;
    let cy = null;
    let layengs = {fcose,dagre}
    let layeng = havs(layengs)[0]

    onMount(() => {
        if (!graph) return console.log("!Graph")
        
        cy = cytoscape({
            container: ele,
            style: GraphStyles,
        });

        load_graph(graph)
        fauxgraphy()
    });
    function fauxgraphy() {
        let data = cy.data()
        if (hak(data)) console.log("have cy.data()",data)
        layout()
    }

    function set_layeng(v) {
        layeng = v
        layout()
    }
    let lay
    function layout() {
        let concon = graph.constraints_config
        // name = dagre|fcose|circle|grid
        cytoscape.use(layeng)
        let name
        map((s,k) => {if (s == layeng) { name = k }}, layengs)
        if (!name) debugger

        lay = cy.layout({

            name,
            ...concon,
            animate: 1,
            animationDuration: 400,
        })
        run_layout()
    }
    function run_layout(them) {
        // different subsets of the graph
        them ||= lay
        them.run();
        cy.fit({animate: 1,
            animationDuration: 400,})
    }

    function layout_rightchildren() {
        let them = cy.collection()
        let right = cy.$('node[data.name = "right"]')
        them.merge(right).merge(right.neighbourhood())
        them.select()
        //return
        cytoscape.use(dagre)
        them.layout({
            name:'dagre',
            animate: 1,
            animationDuration: 400,
        }).run();
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
<span on:click={layout_rightchildren}>(right.)</span>
<span on:click={run_layout}>(re-.)</span>
<span on:click={layout}>layout()</span>
<span>layeng: <DropDown N={layengs} set={set_layeng} /></span>
<div class="graph" bind:this={ele}></div>




<style>
    .graph {
        width: 100%;
        height: 100%;
        min-height:30em;
        min-width:20em;

    }
</style>
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
    let la_layeng = null

    onMount(() => {
        if (!graph) return console.log("!Graph")
        
        cy = cytoscape({
            container: ele,
            style: GraphStyles,
        });
        map((t) => cy.on(t, () => cy.fit()), ['layoutready','layoutstop'])

        load_graph(graph)
        layout()
    });

    function get_layout_options() {
        // name = dagre|fcose|circle|grid etc
        let name
        // look up its name, which is not in the object we are passed as the one to use
        map((s,k) => {if (s == layeng) { name = k }}, layengs)
        if (!name) debugger
        // ensure it has been given to .use()
        if (la_layeng != layeng) {
            cytoscape.use(layeng)
            la_layeng = layeng
        }

        // all the constraints merged into a tree as per fcose doc / API
        let concon = graph.constraints_config

        return {
            name,
             ...concon,
            animate: 1,
            animationDuration: 344,
            // other options, may affect things
            //  eg cytoscape.js-klay / README / API
            // dagre
            rankDir:'TB',
            // klay
            aspectRatio: 1.3,
            avoidOverlap: 1,


            
        }
    }

    function set_layeng(v) {
        layeng = v
    }
    let lay
    function layout() {

        lay = cy.layout({
            ...get_layout_options()
        })
        run_layout()
    }
    function run_layout(them) {
        // different subsets of the graph
        them ||= lay
        them.run()
        // it may be too soon to do this, as per layout.run() doc:
        //  "Synchronous (i.e. discrete) layouts finish before layout.run() returns."
        //cy.fit()
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
                ...get_layout_options(),
                // always dagre
                name:'dagre',
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
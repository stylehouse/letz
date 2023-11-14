<script lang="ts">
    import { onMount, setContext, tick } from "svelte";
    import { hak,map,havs,isst } from "$lib/Y/Pic"
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
    let layengs = {fcose,dagre,cola,klay,   grid:'grid', circle:'circle'}
    let layeng = havs(layengs)[0]
    let la_layeng = layeng
    // look up its name, which is not in the object we are passed as the one to use
    function get_layout_name(layeng) {
        let name
        map((s,k) => {if (s == layeng) { name = k }}, layengs)
        if (!name) throw "nonesuch"
        la_layeng = layeng
        // ensure it has been given to .use()
        !isst(layeng) && cytoscape.use(layeng)
        // stop layouting, or last layout may race-condition its way back after another is engaged
        cy.stop()
        return name
    }

    onMount(() => {
        if (!graph) return console.log("!Graph")
        
        cy = cytoscape({
            container: ele,
            style: GraphStyles,
        });
        cy.on('select', 'node', () => selection_changed())

        // about to do this via reactivity of ele, which seems more reliable at replacing things
        load_graph(graph)
        layout()
    });

    function selection_changed() {
        window.eles = cy.$('node:selected')
    }


    function get_layout_options() {
        // name = dagre|fcose|circle|grid etc
        let name = get_layout_name(layeng)

        // all the constraints merged into a tree as per fcose doc / API
        let concon = graph.constraints_config

        return {
            name,
             ...concon,
            animate: 1,
            animationDuration: 2,
            nodeSeparation: 375,
            nodeDimensionsIncludeLabels: true,


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
    }

    function righteo() {
        let them = cy.collection()
        let right = cy.$('node[data.name = "Line"]')
        // < want to not move right itself...
        them.map(function(ele) {
            let inside = ele.neighbourhood('node[data.texty]')
            inside.map(function(ini) {
                if (!ele.id) debugger
                ini.data('parent',ele.id)
            })
        })
        them.select()
        //return
        cytoscape.use(dagre)
        run_layout(
            them.layout({
                ...get_layout_options(),
                // always dagre
                name:'dagre',
                // keep look at everything
                fit: false,
            })
        )
    }

    function reload_graph(graph) {
        console.log("reload_graph")
        cy.remove('*')
        load_graph(graph)
        layout()
        
    }
    function test_graph() {
        return {
            nodes: [
                { id: 'n4', name: "inner", parent: 'n37' },
                { id: 'n35', name: "rere", parent: 'n38' },
                { id: 'n37', name: "med", parent: 'n38' },
                { id: 'n38', name: "out" },
            ],
            edges: [
                { id: 'e0', source: 'n35', target: 'n37', label: 'yad' },
            ],
        }
    }
    
    function load_graph(graph) {
        // < causes a loop somewhere that freezes devtools
        // graph = test_graph()
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
<span on:click={righteo}>righteo())</span>
<span on:click={() => run_layout()}>(re-.)</span>
<span on:click={layout}>layout()</span>
{#if graph?.nodetree}
<details>
    <summary>nodetree</summary>
    <pre>{graph.nodetree}</pre>
</details>
{/if}
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
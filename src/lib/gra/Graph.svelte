<script lang="ts">
    // lifted from git@github.com:gomezcabo/svelte-cytoscape-demo.git
    import { onMount, setContext } from "svelte";
    import cytoscape from "cytoscape";
    import dagre from "cytoscape-dagre";
    import GraphStyles from "./GraphStyles.js";

    export let graph = null;

    let ele = null;
    let cy = null;

    onMount(() => {
        cytoscape.use(dagre);

        cy = cytoscape({
            container: ele,
            style: GraphStyles,
        });

        cy.on("add", () => {
            cy
                .makeLayout({
                    name: "dagre",
                    rankDir: "TB",
                    nodeSep: 150,
                })
                .run();
        });

        setTimeout(function () {
            if (graph) load_graph(graph)
        }, 500)
    });

    function load_graph(graph) {
        console.log("load_graph")
        for (let node in graph.nodes) {
            cy.add({
                group: "nodes",
                id: node.id,
                data: { ...node },
            });
        }
        for (let edge in graph.edges) {
            cy.add({
                group: "edges",
                id: edge.id,
                data: { ...edge },
            });
        }
    }
</script>

<div class="graph" bind:this={ele}>
</div>

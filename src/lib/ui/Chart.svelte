<script>
    import { beforeUpdate, onMount } from 'svelte';
    import {sex,nex,haks,fatal,hak,map} from "$lib/Y/Pic"
    import Chart from 'chart.js/auto'; // Auto import for all chart types

    export let spam = {}
    export let vers

    let chartContainer;
    let myChart;
    // what it's along
    let x = null
    // several ups
    let ys = []

    let init = () => {
        // done already
        if (myChart) return
        const ctx = chartContainer.getContext('2d');
        fatal.isob(ctx)

        if (!hak(spam.N)) return

        // elect an x axis label
        let label_looking = 'now,time,x'
        let labelly = {}
        spam.N.map(q => sex(labelly,q,label_looking))
        let label = haks(labelly)[0]
        fatal.isst(label)
        x = label
        // put others on the y axis
        let datatic = {}
        spam.N.map(q => nex(datatic,q,label_looking))
        ys = haks(datatic)
        
        let colours = [
            'green','blue','red','beige','orange','brown','pink'
        ]
        let datasets = map((k) => { return {
            label: k,
            // data: geometryHistory.map(entry => entry.width),
            borderColor: colours.shift()
        } }, ys)
        myChart = new Chart(ctx, {
            type: 'line', // Start with a line chart
            data: {datasets},
            options: {
                // You can add customization options here if you like
            }
        });
        console.log("Init'd Chart", datasets)
    }
    onMount(() => {
        init()
    });

    // Update chart when data changes!!!!!!!
    let spams = 0
    $: if (vers, spam && myChart && hak(spam.N)) {
        init()
        spams = hak(spam.N)

        // x labels? jaink?
        myChart.data.labels = spam.N.map(q => q[x])

        let i = 0
        map((k) => {
            myChart.data.datasets[i] ||= {}
            myChart.data.datasets[i].data = spam.N.map(q => q[k])
        }, ys)

        myChart.update();
        console.log("Upd'd Chart")
    }
    spam.update = (a) => {
        spam = spam
        console.log("spamn update")
    }
    console.log("charted")
</script>
 <div>
<p>{spams} spams</p>
<canvas bind:this={chartContainer} style="position:relative;"></canvas> 
</div>
<style>
    div {
        border: 2em solid purple;
    }
</style>
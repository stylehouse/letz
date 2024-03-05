<script>
    import { beforeUpdate, onMount } from 'svelte';
    import {sex,nex,haks,fatal,hak,map,grep,uniq,dec} from "$lib/Y/Pic"
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
        if (!chartContainer) return
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
            borderColor: colours.shift(),
            // not required until later (upding)?
            // data: spam.N.map(q => q[k]),
            // parsing: {
            //     yAxisKey: k
            // }
        } }, ys)
        myChart = new Chart(ctx, {
            type: 'line', // Start with a line chart
            data: {
                labels: uniq(grep(spam.N.map(q => q[x]))),
                datasets
            },
            options: {
                animation: false,
            }
        });
        console.log("Init'd Chart", datasets)
    }
    onMount(() => {
        init()
    });

    // Update chart when data changes!!!!!!!!!
    let spams = 0
    let upding = () => {
        init()
        // bail if not ready - hopefully more reactivity will init us
        if (!myChart) return console.log("not yet Upd'n Chart")
        if (spams == hak(spam.N)) return console.log("None extra: "+spams)
        spams = hak(spam.N)
        if (hak(spams) == 3) debugger

        // x labels? jaink?
        myChart.data.labels = spam.N.map(q => q[x])

        console.log("Upd'n Chart")
        map((k,i) => {
            myChart.data.datasets[i] ||= {}
            myChart.data.datasets[i].data = spam.N.map(q => dec(q[k],0))
        }, ys)
        // reactivity hack?
        // myChart.data.datasets = [...myChart.data.datasets]

        myChart.update();
        console.log("Upd'd Chart", myChart.data)
    }
    // listens to vers etc to upding()
    $: upding(vers, spam)

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
        background: rgb(16, 34, 11);
    }
    div canvas {
        width: 42em;
        height: 15em;
    }
</style>
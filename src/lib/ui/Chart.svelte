<script>
    import { beforeUpdate, onMount } from 'svelte';
    import {sex,nex,haks,fatal,hak,armap,map,grep,uniq,dec} from "$lib/Y/Pic"
    import Chart from 'chart.js/auto'; // Auto import for all chart types

    export let spam = {}
    export let vers

    let chartContainer;
    let myChart;
    // what it's along
    let x = null
    // several ups
    let ys = []
    //  assigned colours
    let ys_colours = {}
    //  labels, positioned
    let ys_labels = []
    

    let init = () => {
        // done already!
        if (myChart) return
        if (!chartContainer) return
        const ctx = chartContainer.getContext('2d');
        fatal.isob(ctx)

        if (!hak(spam.N)) return

        // elect an x axis label
        // < also guess by whichever is most sequential (after a few frames)
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

        // assigned colours
        let colours = [
            'green','blue','red','beige','orange','brown','pink'
        ]
        map((k) => {
            ys_colours[k] = colours.shift()
        }, ys)

        // fills in data later
        let datasets = map((k) => { return {
            label: k,
            borderColor: ys_colours[k],
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
                normalized: true,
                plugins: {
                    legend: {
                        display: false // Disable the legend
                    }
                }
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

        // console.log("Upd'n Chart")
        map((k,i) => {
            myChart.data.datasets[i] ||= {}
            myChart.data.datasets[i].data = spam.N.map(q => dec(q[k],0))
        }, ys)

        myChart.update()
        make_ys_labels()
        console.log("Upd'd Chart", myChart.data)
    }
    // listens to vers etc to upding()
    $: upding(vers, spam)

    spam.update = (a) => {
        spam = spam
        console.log("spamn update")
    }

    // also, those labels:
    function make_ys_labels() {
        const canvasRect = chartContainer.getBoundingClientRect();
        const chartData = myChart.data;

        ys_labels = armap((k) => {
            const datasetIndex = chartData.datasets.findIndex(d => d.label === k);
            const lastDataPoint = chartData.datasets[datasetIndex].data.slice(-1)[0]; 
            const yAxis = myChart.scales['y'];
            const yPixel = yAxis.getPixelForValue(lastDataPoint);

            // Calculate a reasonable x-position within the chart for the key
            const xPixel = canvasRect.width - 100

            return {
                x: xPixel, y: yPixel,
                colour: ys_colours[k],
                label: k
            }
        }, ys);
        
        ys_labels = ys_labels
        
        console.log("ys_labels: ",ys_labels)
    }



    console.log("charted")
</script>
 <div class='wrapness'>
    <p>{spams} spams</p>
    <canvas bind:this={chartContainer} ></canvas>
    <div class="key-container">b2lab</div>
    <div class="key-container">
        {#each ys_labels as lab} 
            <div class="color-key" style="position: absolute; top: {lab.y}px; left: {lab.x}px; background-color: {lab.colour}">
                {lab.label}
            </div>
        {/each}
    </div> 
</div>
<style>
    div.wrapness {
        background: rgb(16, 34, 11);
        position: relative; /* Make the div the relative parent
                                       for absolute positioning */
        mix-blend-mode: screen;
    }
    div p {
        position:absolute;
    }
    div canvas {
        width: 42em;
        height: 9em;
    }
    .key-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%; 
    }

    .color-key {
        display: inline-block;
        /* width: 15px;
        height: 15px; */
        margin-right: 15%;
        /* border: 1px solid #fff; */
    }
</style>
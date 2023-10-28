export default [
    {
      selector: 'node',
      style: {
        'width': '50',
        'height': '50',
        'font-size': '18',
        'font-weight': 'bold',
        'label': `data(data.name)`,
        'text-valign': 'center',
        'text-wrap': 'wrap',
        'text-max-width': '140',
        'background-color': 'gold',
        'border-color': 'orange',
        'border-width': '3',
        'color': 'darkred'
      }
    },
    {
      selector: 'node[data.dir]',
      style: {
        'shape': 'ellipse',
        'width': '8em',
        'background-color': 'pink',
      }
    },
    {
      selector: 'node:selected',
      style: {
        'background-color': 'darkred',
        color: 'white',
        'border-color': 'darkred',
        'line-color': '#0e76ba',
        'target-arrow-color': '#0e76ba'
      }
    },
    {
    selector: ':parent',
      style: {
  //      'background-opacity': 0.333,
        'background-color': '#e8e8e8',
        'border-color': '#DADADA',
  //      'border-width': 3,
        'text-valign': 'bottom'
      }
    },
  
    {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'control-point-step-size': 40,
        'color': 'darkred',
        'text-background-color': '#003355',
        'text-background-opacity': '1',
        'text-background-padding': '1',
        'width': '3',
        'target-arrow-shape': 'triangle',
        'line-color': 'darkred',
        'target-arrow-color': 'darkred',
        //'font-weight': 'bold'
      }
    },
    {
      selector: 'edge[class="along"]',
      style: {
        'color': 'lightblue',
        'line-color': 'lightblue',
        'target-arrow-color': 'lightblue',
      }
    },
    {
      selector: ':parent',
      style: {
        // 'color': 'black',
        'font-weight': 'bold',
        'background-opacity': 0.2,
        'content': 'data(label)',
        'text-valign': 'top',

      }
    },
    {
      selector: 'edge[label]',
      style: {
        'content': `data(label)`,
      }
    },
    {
      selector: 'edge.label',
      style: {
        'line-color': 'white',
        'target-arrow-color': 'orange'
      }
    }
  ]
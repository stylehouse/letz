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
      selector: 'edge[label]',
      style: {
        'content': `data(label)`,
      }
    },
    {
      selector: 'edge.label',
      style: {
        'line-color': 'orange',
        'target-arrow-color': 'orange'
      }
    }
  ]
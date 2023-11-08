# Chart-Js-linechart-plugin

When hovering over a data point, view point-to-point comparisons from the current point to the end.

The comparison value will be shown below each point's labels on the x axis.

The tooltip shows the point's value and provides a summary of total, min, max, and AVG values from the current point to the end.

A vertical line indicator is included at the selected point for visual reference.


**Important note** 

You need to add an unique id and add the original labels value inside the dataset,

labels: nrcus_labels,
datasets: [
        {
          **id:1**,
          **labels: totcus_labels**,
          label: 'New-Customer',
          borderColor: "rgba(106, 90, 205, 1)",
          fill: true,
          pointRadius: 6,
          borderWidth: 1,
          data: new_data,
          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient( 0, 0, 0, ctx.chart.height);
            gradient.addColorStop(0, 'rgba(106, 90, 205, 0.8)'); // Solid color near the line
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            return gradient;
          },
        },
        {
          **id:2**,
          **labels: totcus_labels**,
          label: 'Repeat-Customer',
          borderColor: 'rgb(255, 88, 0)',
          fill: true,
          pointRadius: 6,
          borderWidth: 1,
          data: repeat_data,
          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient( 0, 0, 0, ctx.chart.height);
            gradient.addColorStop(0, 'rgba(255, 88, 0, 0.8)'); // Solid color near the line
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent color at the bottom
            return gradient;
          },
        },
        
      ]

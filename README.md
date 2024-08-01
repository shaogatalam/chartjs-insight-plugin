# ChartJs-insight-plugin

When hovering over a data point, view point-to-point comparisons from the current point to the end.

The comparison value will be shown bellow each point's label on the x axis.

The tooltip shows the point's value and a summary of total, min, max, and AVG values from the current point to the end.

A vertical line indicator is included at the selected point for visual reference.


**Important note** 

You need to add an unique id for each dataset and add the original labels value inside the dataset,
```
labels: labels,
datasets: [
        {
          id:1***,
          labels: labels***,
          label: 'New-Customer',
          data: new_data,
        },

]
```
<img width="688" alt="Screenshot 2023-11-09 at 12 28 15 PM" src="https://github.com/shaogatalam/Chart-Js-linechart-plugin/assets/24977879/10f6f201-24d7-4bd7-a983-4f198dd8602e">



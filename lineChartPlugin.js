  var Y_axis_line_plugin = {
    id: 'tooltipLine',
    beforeDraw: (chart) => {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        var ctx = chart.ctx;
        ctx.save();
        var activePoint = chart.tooltip._active[0];
        ctx.beginPath();
        ctx.setLineDash([5, 15]);
        ctx.moveTo(activePoint.element.x, chart.chartArea.top);
        ctx.lineTo(activePoint.element.x, activePoint.element.y); // Use activePoint.element.y
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'grey';
        ctx.stroke();
        ctx.restore();
  
        ctx.beginPath();
        ctx.moveTo(activePoint.element.x, activePoint.element.y);
        ctx.lineTo(activePoint.element.x, chart.chartArea.bottom);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 99, 132, 1)'; // Remove spaces within rgba()
        ctx.stroke();
        ctx.restore();
      }
    },
    
  };

  var CustomLabelShow = {
    
    id: 'CustomLevelShow',
   
    afterDraw: (chart, easing) => {
      
      chart.data.labels = chart.data.labels.map((label, index) => {
        return chart.data.datasets[0].labels[index];
      });

      if(chart.tooltip._active.length){
        var activePoint = chart.tooltip._active;
      }
        
      var Current_datasetIndex=0;
      if (chart.tooltip._active.length) {
        chart.tooltip._active.forEach((activePoint, index) => {
          Current_datasetIndex = activePoint.datasetIndex;
        });
      }
      
      if (activePoint) {

        var dataPoints = chart.tooltip.dataPoints;

        dataPoints.forEach((dataPoint, index) => {
        
          var selected_datapoint_index = dataPoint.dataIndex;
        
          var selected_dataset_id      = dataPoint.dataset.id;

          var original_labels = dataPoint.dataset.ls;
        
          var flag = 0;

          chart.data.datasets.forEach((dataset,index) => {
        
            if (dataset.id === selected_dataset_id && flag === 0) {
 
              var dataset_name = dataset.label;
              
              if (typeof dataset_name === 'string') {
                
                // Split the string into words
                var words = dataset_name.split(' ');
            
                if (words.length === 1) {
                  // Single-word string, take the first 3 characters
                  dataset_name =  dataset_name.slice(0, 3);
                  
                } else {
                  // Multi-word string, take the first character of each word
                  dataset_name =  words.map(word => word[0]).join('');
                }

              }

              var selected_index_data = dataset.data[selected_datapoint_index];

              chart.data.labels.forEach((label,index) => {

                if(index > selected_datapoint_index) {

                  var dataPoint = dataset.data[index];

                  var change_in_percentage = ((dataPoint - selected_index_data) / selected_index_data) * 100;
                  
                  if (change_in_percentage > 0) {
                    if (Array.isArray(label)) {
                      // If the label is already an array, insert the change_in_percentage
                      label.push(dataset_name + ' : +' + change_in_percentage.toFixed(1) + '%');
                    } else {
                      // If the label is a string, create a new array
                      label = [label, dataset_name + ' : +' + change_in_percentage.toFixed(1) + '%'];
                    }
                  } else if (change_in_percentage === 0) {
                    // If the change is 0, keep the label as is
                  } else if (change_in_percentage < 1) {
                    if (Array.isArray(label)) {
                      // If the label is already an array, insert the change_in_percentage
                      label.push(dataset_name + ' :' + change_in_percentage.toFixed(1) + '%');
                    } else {
                      // If the label is a string, create a new array
                      label = [label, dataset_name + ' : ' + change_in_percentage.toFixed(1) + '%'];
                    }
                  }
                  
                  chart.data.labels[index] = label; 
                
                }else{
                  chart.data.labels[index] = label; 
                }

              })

              chart.options.scales.x.ticks.maxRotation = 90;
              chart.options.scales.x.ticks.minRotation = 0;
              chart.update();
            }
          });
        });
        
      
        dataPoints.forEach((dataPoint, index) => {
        
          var sum     = 0;
          var min     = 999999999999999;
          var max     = 0;
          var average = 0;

          var selected_datapoint_index = dataPoint.dataIndex;
          var selected_dataset_id      = dataPoint.dataset.id;

          var flag_A = 0; 

          chart.data.datasets.forEach((dataset,index) => {
        
            if (dataset.id === selected_dataset_id && flag_A === 0) {
              
              flag_A = 1;
              var datasetValues = dataset.data;
              sum     = 0;
              min     = 999999999999999;
              max     = 0;
              average = 0;
              for (let i = selected_datapoint_index; i < datasetValues.length; i++) {
                var value = datasetValues[i];
                sum += value;
                min = Math.min(min, value);
                max = Math.max(max, value);
              }
              //var denominator = datasetValues.length - selected_datapoint_index - 1;
              var denominator = datasetValues.length - selected_datapoint_index;
              if (denominator === 0) {
                average = value; 
              } else {
                average = sum / denominator;
              }

              dataset.tooltipLabel = 'Sum=' + sum.toFixed(1) + ' :: Min=' + min.toFixed(1) + ' :: Max=' + max.toFixed(1) + ' :: Avg=' + average.toFixed(1);

            }
          
          })

          // Modify the tooltip content for the tooltips of each dataset
          chart.tooltip.options.callbacks.label = (tooltipItem, data) => {
            var defaultLabel = tooltipItem.dataset.label + ' : ' + tooltipItem.formattedValue;
            var customLabel  = tooltipItem.dataset.tooltipLabel;
            return defaultLabel + ' :: ' + customLabel;
          };
          chart.update();
        
        });

      }

    }

  }; 

  var plugins = [Y_axis_line_plugin,CustomLabelShow]

  // Render the chart
   <Line data={data_object} plugins={plugins} /> 
  

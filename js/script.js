var hist_data = [[]],
  time_range = null,
  value_range = null;

const transition_duration = 100;
//n_charts = {'n':0,'added':0};
//init_chart('#chart-container');
// Calculate Margins and canvas dimensions
const margin = { top: 40, right: 40, bottom: 40, left: 40 },
  width = 0.9 * window.innerWidth - margin.left - margin.right,
  height = 0.9 * window.innerHeight - margin.top - margin.bottom;
const tick_num = { left: 3, right: null, bottom: 7 },
  d3_time_format = '%H:%M:%S';

//init chart

var init_obj = init_chart('#chart-container', margin, width, height, tick_num);
var svg = init_obj.svg,
  x = init_obj.x,
  y = init_obj.y,
  y1 = init_obj.y1,
  x_axis = init_obj.x_axis,
  y_axis = init_obj.y_axis,
  y_axis1 = init_obj.y_axis1; 
  
  ;
var connection = new WebSocket('ws://signal.mmr.systems:8080');

connection.onmessage = function (event) {
  var new_event = JSON.parse(event.data);
  update_data(new_event);
};

function update_data(new_event) {
  const event_time = new_event.time,
    values = new_event.values;

  let event_value_range = [
    Math.min.apply(Math, values),
    Math.max.apply(Math, values),
  ];
  if (time_range == null) {
    time_range = [event_time, event_time];
    value_range = event_value_range;
  } else {
    time_range = [time_range[0], event_time];
    value_range = [
      Math.min(value_range[0], event_value_range[0]),
      Math.max(value_range[1], event_value_range[1]),
    ];
  }

  for (let i = 0; i < values.length - hist_data.length; i++) {
    hist_data.push([]);
  }
  for (let i = 0; i < values.length; i++) {
    hist_data[i].push({ time: event_time, value: values[i] });
  }
  //При уменьшении количества данных нужно использовать старые данных вместо недостающих значений.
  for (let i = values.length; i < hist_data.length; i++) {
    let _arr = hist_data[i];
    hist_data[i].push(_arr[_arr.length - 1]);
  }
  update_chart(svg,hist_data, x,y,y1,x_axis,y_axis,y_axis1,width,height,time_range,value_range,d3_time_format,1000);
  //let added_charts = hist_data.length - n_charts.n;
  // n_charts = {'n':hist_data.length,'added':added_charts}
}

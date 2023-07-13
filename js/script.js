var connection = new WebSocket('ws://signal.mmr.systems:8080');
var hist_data = [[]];
var time_range=null, value_range=null;
//init_chart('#chart-container');
  // Calculate Margins and canvas dimensions
  const margin = { top: 40, right: 40, bottom: 40, left: 40 },
    width = 0.9 * window.innerWidth - margin.left - margin.right,
  height = 0.9 * window.innerHeight - margin.top - margin.bottom;
const tick_num = { left: null, right: null, bottom: null };
connection.onmessage = function (event) {
  var new_event = JSON.parse(event.data);
  update_data(new_event);
  // var updateObject =[{
  //    "Name": newData.Name,
  //    "Year": newData.Year,
  //    "Spent": newData.Spent,
  //    "payType": newData.payType
  //  }]
  //resetData(ndx, [yearDim, spendDim, nameDim]);
  //  xfilter.add(updateObject);
  // dc.redrawAll();
};
function update_data(new_event) {
  const event_time = new_event.time,
    values = new_event.values;
  
  let event_value_range = [Math.min.apply(Math, values),Math.max.apply(Math, values)];
  if (time_range == null) {
    time_range = [event_time, event_time];
    value_range = event_value_range;
  } else
  {
    time_range = [time_range[0], event_time];
    value_range = [Math.min(value_range[0],event_value_range[0]),Math.max(value_range[1],event_value_range[1])];
    }
    
  for (let i = 0; i < values.length - hist_data.length; i++) {
    hist_data.push([]);
  }
  for (let i = 0; i < values.length; i++) {
    hist_data[i].push({ 'time': event_time,'value':values[i] });
  }
}


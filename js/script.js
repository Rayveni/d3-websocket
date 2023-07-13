var connection = new WebSocket('ws://signal.mmr.systems:8080');
var hist_data = [[]];
init_chart('#chart-container');
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

  for (let i = 0; i < values.length - hist_data.length; i++) {
    hist_data.push([]);
  }
  for (let i = 0; i < values.length; i++) {
    hist_data[i].push({ 'time': event_time,'value':values[i] });
  }
}


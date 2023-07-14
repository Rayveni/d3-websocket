function init_chart(el_selector, margin, width, height, tick_num,chart_title_text) {
//add chart
    var svg = d3
    .select(el_selector)
    .append('svg')
    .attr('class', 'graph-svg-component')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
//add bottom text
  svg
    .append('text')
    .attr('id', 'chart_botton_text')
    .attr('text-anchor', 'middle')
    .attr(
      'transform',
      'translate(' + width / 2 + ',' + (height - (margin.bottom - 74)) + ')'
    )
    .text('Date');
  //  Chart Title
  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', -margin.top/3)
    .attr('text-anchor', 'middle')
    .attr('id', 'chart_top_text')
    .text(chart_title_text);
  // init axes
  var x = d3.scaleLinear().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    y1 = d3.scaleLinear().range([height, 0]);

  var y_axis = d3.axisLeft(y).ticks(tick_num.left),
    y_axis1 = d3.axisRight(y1).ticks(tick_num.right);

    var x_axis = d3.axisBottom(x).ticks(tick_num.bottom);
      // add axes
  svg
    .append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(0,' + height + ')')
    .call(x_axis);

  svg.append('g').attr('class', 'axis axis--y0').call(y_axis);

  svg
    .append('g')
    .attr('class', 'axis axis--y1')
    .attr('transform', 'translate(' + width + ',0)')
    .call(y_axis1);
  // add grid
  const xAxisGrid = d3
    .axisBottom(x)
    .tickSize(-height)
    .tickFormat('')
        .ticks(tick_num.bottom);
    
  const yAxisGrid = d3
    .axisLeft(y)
    .tickSize(-width)
    .tickFormat('')
    .ticks(tick_num.left);
  svg
    .append('g')
    .attr('class', 'x-grid grid-line')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxisGrid);
  svg.append('g').attr('class', 'y-grid grid-line').call(yAxisGrid);

  return {
    svg: svg,
    x: x,
    y: y,
    y1: y1,
    x_axis: x_axis,
    y_axis: y_axis,
    y_axis1: y_axis1,
  };
}

function update_chart(
  svg,
  dataset,
  x,
  y,
  y1,
  x_axis,
  y_axis,
  y_axis1,
  width,
  height,
  time_range,
  value_range,
  d3_time_format,
  transition_duration
) {
  //Parsers and Formaters
  var formatTime = d3.timeFormat(d3_time_format),
    date_format = d3.timeFormat('%d/%m/%Y');
  // Scales (apply real values range and update axes)
  x.domain([time_range[0], time_range[1]]);
  x_axis.tickFormat(function (d) {
    let date = new Date(d * 1000);//convert milliseconds to string
    return formatTime(date);
  });

  svg
    .selectAll('.axis--x')
    .transition()
    .duration(transition_duration)
    .call(x_axis);


  y.domain([value_range[0], value_range[1]]);
  svg
    .selectAll('.axis--y0')
    .transition()
    .duration(transition_duration)
    .call(y_axis);
  y1.domain([value_range[0], value_range[1]]);
  svg
    .selectAll('.axis--y1')
    .transition()
    .duration(transition_duration)
    .call(y_axis1);
  // Line
  var line = d3
    .line()
    .x(function (d) {
      return x(d.time);
    })//.x(function(d) { return x(parseTime(d.date)); })
    .y(function (d) {
      return y(d.value);
    });

  //reDraw a grid
  const xAxisGrid = d3
    .axisBottom(x)
    .tickSize(-height)
    .tickFormat('')
    .ticks(tick_num.bottom);
  const yAxisGrid = d3
    .axisLeft(y)
    .tickSize(-width)
    .tickFormat('')
    .ticks(tick_num.left);

  svg
    .select('.x-grid') // change the x axis
    .transition()
    .duration(transition_duration)
    .call(xAxisGrid);
    
  svg
    .select('.y-grid') // change the y axis
    .transition()
    .duration(transition_duration)
    .call(yAxisGrid);

  // Data Lines:

  for (let i = 0; i < dataset.length; i++) {
    let chart_id = 'chart_line' + i;

    let u = svg.selectAll('#' + chart_id).data([dataset[i]]);

    // Update the line
    u.enter()
      .append('path')
      .attr('class', 'line')
      .merge(u)
      .transition()
      .duration(transition_duration)
      .attr('d', line)
      .attr('id', chart_id);
  }
// Update the bottom text as last tick date
  svg
    .selectAll('#chart_botton_text')
    .transition()
    .duration(transition_duration)
    .text(date_format(new Date(time_range[1] * 1000)));
}

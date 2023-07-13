function init_chart(el_selector, margin, width, height, tick_num) {
  var svg = d3
    .select(el_selector)
    .append('svg')
    .attr('class', 'graph-svg-component')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svg
    .append('text')
    .style('font-size', '14px')
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
    .attr('y', 20 - margin.top / 2)
    .attr('text-anchor', 'middle')
    .style('font-size', '16px')
    .text('Pizza consumption');
  // init axes
  var x = d3.scaleLinear().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    y1 = d3.scaleLinear().range([height, 0]);

  var y_axis = d3.axisLeft(y).ticks(tick_num.left),
        y_axis1 = d3.axisRight(y1).ticks(tick_num.right);
    
  var x_axis = d3.axisBottom(x).ticks(tick_num.bottom);
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

  return {'svg':svg,'x':x,'y':y,'y1':y1,'x_axis':x_axis,'y_axis':y_axis,'y_axis1':y_axis1};
}

function update_chart(
  d3_svg,
    dataset, x, y, y1,
    x_axis,y_axis,y1_axis,
  margin,
  width,
  height,
  time_range,
  value_range,
  tick_size,transition_duration
) {
  var svg = d3_svg;
  /*
    var svg = d3_svg.transition();
    var formatTime = d3.timeFormat('%H:%m:%S');


  var x = d3
    .scaleLinear()
    .range([0, width])
    .domain([time_range[0], time_range[1]]);

  var x_axis = d3
    .axisBottom(x)
    .ticks(10)
    .tickFormat(function (d) {
      let date = new Date(d * 1000);
      return formatTime(date);
    });

  svg
    .select('.axis.axis--x') // change the x axis
    .duration(750)
    .call(x_axis);
*/
  ///////////////////////
  //Parsers and Formaters
  //var parseTime = d3.timeParse('%d/%m/%Y');
  var formatTime = d3.timeFormat('%H:%m:%S');

  // Scales

    x.domain([time_range[0], time_range[1]]);
     x_axis
    .tickFormat(function (d) {
      let date = new Date(d * 1000);
      return formatTime(date);
    });

  svg.selectAll(".axis--x").transition()
    .duration(transition_duration)
    .call(x_axis);

  // create the Y axis
  y.domain([value_range[0], value_range[1]]);
  svg.selectAll(".axis--y0")
    .transition()
    .duration(transition_duration)
    .call(y_axis);  
    y.domain([value_range[0], value_range[1]]);
    svg.selectAll(".axis--y1")
      .transition()
      .duration(transition_duration)
      .call(y_axis1);     
  // Line
  var line = d3
    .line()
    .x(function (d) {
      return x(d.time);
    })
    //.x(function(d) { return x(parseTime(d.date)); })
    .y(function (d) {
      return y(d.value);
    });

  //Draw a grid
/*
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
    .attr('class', 'grid-line')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxisGrid);
  svg.append('g').attr('class', 'grid-line').call(yAxisGrid);

  // Labels

  svg
    .append('text')
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .attr(
      'transform',
      'translate(' + (margin.left - 94) + ',' + height / 2 + ')rotate(-90)'
    )
    .text('left text ');

  svg
    .append('text')
    .style('font-size', '14px')
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
    .attr('y', 20 - margin.top / 2)
    .attr('text-anchor', 'middle')
    .style('font-size', '16px')
    .text('Pizza consumption');
*/
  // Data Lines:

  for (let i = 0; i < dataset.length; i++) {
    let chart_id = 'chart_line' + i;
  
        let u = svg.selectAll('#'+chart_id)
        .data([dataset[i]]);
    
      // Updata the line
      u
        .enter()
        .append("path")
        .attr("class","line")
        .merge(u)
        .transition()
        .duration(transition_duration)
        .attr('d', line)
        .attr('id', chart_id);

        /*
      svg
        .append('path')
        .datum(dataset[i])
        .attr('class', 'line')
        .attr('d', line)
        .attr('id', chart_id);
        */
    
  }

  //svg.select('#chart_line1').remove()
}

function init_chart(el_selector) {
    var dataset = [
        {date: "01/01/2016", pizzas: 10000},
        {date: "01/02/2016", pizzas: 20000},
        {date: "01/03/2016", pizzas: 40000},
        {date: "01/04/2016", pizzas: 30000},
        {date: "01/05/2016", pizzas: 30000},
        {date: "01/06/2016", pizzas: 50000},
        {date: "01/07/2016", pizzas: 30000},
        {date: "01/08/2016", pizzas: 50000},
        {date: "01/09/2016", pizzas: 60000},
        {date: "01/10/2016", pizzas: 20000},
        {date: "01/11/2016", pizzas: 10000},
        {date: "01/12/2016", pizzas: 50000},
    ];
    var dataset2 = [
        {date: "01/01/2016", pizzas: 20000},
        {date: "01/02/2016", pizzas: 30000},
        {date: "01/03/2016", pizzas: 40000},
        {date: "01/04/2016", pizzas: 50000},
        {date: "01/05/2016", pizzas: 60000},
        {date: "01/06/2016", pizzas: 70000},
        {date: "01/07/2016", pizzas: 80000},
        {date: "01/08/2016", pizzas: 80000},
        {date: "01/09/2016", pizzas: 80000},
        {date: "01/10/2016", pizzas: 80000},
        {date: "01/11/2016", pizzas: 80000},
        {date: "01/12/2016", pizzas: 50000},
    ];
    
    // Calculate Margins and canvas dimensions
    const margin = { top: 40, right: 40, bottom: 40, left: 60 },
        width = 0.9*window.innerWidth - margin.left - margin.right,
        height = 0.9*window.innerHeight - margin.top - margin.bottom;
    //Parsers and Formaters
    var parseTime = d3.timeParse("%d/%m/%Y");
    var formatTime = d3.timeFormat("%a/%b/%Y");
    
    // Scales
    const x = d3.scaleLinear().range([0, width]),//x = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]).domain([20,80]);
    
        var y1 = d3.scaleLinear().range([height, 0]);
    // Line
    var line = d3.line()
        .x(function(d) { return x(parseTime(d.date)); })
        .y(function(d) { return y(d.pizzas/1000); })
    
    
    var svg = d3.select(el_selector).append("svg")
        .attr("class", "graph-svg-component")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
     
    
    
        
     //Arguments for axes : Ranges for X, y  
     x.domain(d3.extent(dataset, function(d) { return parseTime(d.date); }));
     //y.domain(d3.extent(dataset, function(d) { return d.pizzas/1000; }));
    
     
     //y.domain(d3.extent(dataset, function(d) { return d.pizzas/1000; }));
     //y1.domain(d3.extent(dataset, function(d) { return d.pizzas/10000; })); 
    // Axes
      svg.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
    
      svg.append("g")
          .attr("class", "axis axis--y0")
        .call(d3.axisLeft(y));
    
        svg.append("g")
            .attr("class", "axis axis--y1")
            .attr("transform", "translate("+ width +",0)")
      .call(d3.axisRight(y1));
    
    
      // Labels
      svg.append("text")
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .attr("transform", "translate("+ (margin.left - 94 ) +","+(height/2)+")rotate(-90)")  
                .text("Pizzas ( Thousands ) ");
    
      svg.append("text")
                .style("font-size", "14px")
                .attr("text-anchor", "middle") 
                .attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom -74))+")")
                .text("Date");
    
      //  Chart Title
      svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 20 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .text("Pizza consumption");
    
    // Data Lines:
    
       svg.append("path")
           .datum(dataset)
          .attr("class", "line")
        .attr("d", line);
          
          svg.append("path")
          .datum(dataset2)
         .attr("class", "line line2")
         .attr("d", line);
     
}


function update_chart(id_container) {
    var dataset = [
        {date: "01/01/2016", pizzas: 10000},
        {date: "01/02/2016", pizzas: 20000},
        {date: "01/03/2016", pizzas: 40000},
        {date: "01/04/2016", pizzas: 30000},
        {date: "01/05/2016", pizzas: 30000},
        {date: "01/06/2016", pizzas: 50000},
        {date: "01/07/2016", pizzas: 30000},
        {date: "01/08/2016", pizzas: 50000},
        {date: "01/09/2016", pizzas: 60000},
        {date: "01/10/2016", pizzas: 20000},
        {date: "01/11/2016", pizzas: 10000},
        {date: "01/12/2016", pizzas: 50000},
    ];
    var dataset2 = [
        {date: "01/01/2016", pizzas: 20000},
        {date: "01/02/2016", pizzas: 30000},
        {date: "01/03/2016", pizzas: 40000},
        {date: "01/04/2016", pizzas: 50000},
        {date: "01/05/2016", pizzas: 60000},
        {date: "01/06/2016", pizzas: 70000},
        {date: "01/07/2016", pizzas: 80000},
        {date: "01/08/2016", pizzas: 80000},
        {date: "01/09/2016", pizzas: 80000},
        {date: "01/10/2016", pizzas: 80000},
        {date: "01/11/2016", pizzas: 80000},
        {date: "01/12/2016", pizzas: 50000},
    ];
    
    // Calculate Margins and canvas dimensions
    const margin = { top: 40, right: 40, bottom: 40, left: 60 },
        width = 0.9*window.innerWidth - margin.left - margin.right,
        height = 0.9*window.innerHeight - margin.top - margin.bottom;
    //Parsers and Formaters
    var parseTime = d3.timeParse("%d/%m/%Y");
    var formatTime = d3.timeFormat("%a/%b/%Y");
    
    // Scales
    const x = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]).domain([20,80]);
    
        var y0 = d3.scaleLinear()
        .range([height, 0]);
        var y1 = d3.scaleLinear()
        .range([height, 0]);
    // Line
    var line = d3.line()
        .x(function(d) { return x(parseTime(d.date)); })
        .y(function(d) { return y(d.pizzas/1000); })
    
    
    var svg = d3.select("#chart-container").append("svg")
        .attr("class", "graph-svg-component")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
     
    
    
        
     //Arguments for axes : Ranges for X, y  
     x.domain(d3.extent(dataset, function(d) { return parseTime(d.date); }));
     //y.domain(d3.extent(dataset, function(d) { return d.pizzas/1000; }));
    
     
     y0.domain(d3.extent(dataset, function(d) { return d.pizzas/1000; }));
     y1.domain(d3.extent(dataset, function(d) { return d.pizzas/10000; })); 
    // Axes
      svg.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
    
      svg.append("g")
          .attr("class", "axis axis--y0")
        .call(d3.axisLeft(y0));
    
        svg.append("g")
            .attr("class", "axis axis--y1")
            .attr("transform", "translate("+ width +",0)")
      .call(d3.axisRight(y1));
    
    
      // Labels
      svg.append("text")
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .attr("transform", "translate("+ (margin.left - 94 ) +","+(height/2)+")rotate(-90)")  
                .text("Pizzas ( Thousands ) ");
    
      svg.append("text")
                .style("font-size", "14px")
                .attr("text-anchor", "middle") 
                .attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom -74))+")")
                .text("Date");
    
      //  Chart Title
      svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 20 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .text("Pizza consumption");
    
    // Data Lines:
    
       svg.append("path")
           .datum(dataset)
          .attr("class", "line")
        .attr("d", line);
          
          svg.append("path")
          .datum(dataset2)
         .attr("class", "line line2")
         .attr("d", line);
     
}

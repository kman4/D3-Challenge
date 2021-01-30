// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right + 20;
var height = svgHeight - margin.top - margin.bottom - 20;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Parameters
// Initialize variable

var chosenXAxis = "property";
var chosenYAxis = "healthcare";


// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
      d3.max(data, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating y-scale var upon click on axis label
function yScale(data, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenYAxis]) * 0.8,
    d3.max(data, d => d[chosenYAxis]) * 1.2
    ])
    .range([height, 0]);
  return yLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderXaxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

  // function used for updating xAxis var upon click on axis label
function renderYaxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderXCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}
  

function renderYCircles(circlesGroup, newYScale, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]));

  return circlesGroup;
}

// function used for updating Circle Text group with a transition to
// new circles
function renderXCircleText(textCircles, newXScale, chosenXAxis) {

  textCircles.transition()
    .duration(1000)
    .attr("x", d => newXScale(d[chosenXAxis]));

  return textCircles;
}

function renderYCircleText(textCircles, newYScale, chosenYAxis) {

  textCircles.transition()
    .duration(1000)
    .attr("y", d => newYScale(d[chosenYAxis])+4);

  return textCircles;
}


// Import Data
 d3.csv("assets/data/data.csv").then(function(data) {
  
  // Parse data. Convert CSV data to integers
  var poverty = data.map( d => d.poverty);
  var healthcare = data.map( d => d.healthcare);
  var abbr = data.map(d => d.abbr);
  var age = data.map( d => d.age);
  var income = data.map( d => d.income);
  var obesity = data.map(d => d.obseity);
  var smokes = data.map( d => d.smokes);
  var income = data.map( d => d.income);
 
  
   // xLinearScale function above csv import
   var xLinearScale = xScale(data, chosenXAxis);

   // Create y scale function
   var yLinearScale = yScale(data, chosenYAxis);

   // Create initial axis functions
   var bottomAxis = d3.axisBottom(xLinearScale);
   var leftAxis = d3.axisLeft(yLinearScale);

       // append x axis
       var xAxis = chartGroup.append("g")
       .classed("x-axis", true)
       .attr("transform", `translate(0, ${height})`)
       .call(bottomAxis);
 
     // append y axis
     var yAxis = chartGroup.append("g")
       .classed("y-axis", true)
       // .attr("transform")
       .call(leftAxis);
 
     // append initial circles
     var circlesGroup = chartGroup.append("g")
       .selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
       .attr("cx", d => xLinearScale(d[chosenXAxis]))
       .attr("cy", d => yLinearScale(d[chosenYAxis]))
       .attr("r", 15)
       .attr("fill", "blue")
       .attr("opacity", ".6")
       .attr("stroke", "black")
       .attr("stroke-width", "3")
       .attr("opacity", "0.25");

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

  var xlabel;
  var ylabel;

  if (chosenXAxis === "poverty") {
    xlabel = "Poverty:"
  }
  else if (chosenXAxis === "age") {
    xlabel = "Age:"
  }
  else {
    xlabel = "Income:";
  }


  if (chosenYAxis === "healthcare") {
    ylabel = "Healthcare:"
  }
  else if (chosenYAxis === "smokes") {
    ylabel = "Smokers:"
  }
  else {
    ylabel = "Obese:"
  }

 //  Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Poverty: ${d.poverty}%<br>Healthcare ${d.healthcare}%`);
      });

    //  Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

    // append text (state abbreviation) to inside of circles 
    var textCircles = chartGroup.append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.abbr)
      .attr("x", d => xLinearScale(d[chosenXAxis]))
      .attr("y", d => yLinearScale(d[chosenYAxis])+4)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .style("fill", "white")
      .attr("font-weight", "bold");

   // Create group for three x-axis labels
        var xLabelsGroup = chartGroup.append("g")
        .attr("transform", "rotate(-90)");
  
      var ageLabel = xLabelsGroup.append("text")
        .attr("y", 0 - margin.left + 15)
        .attr("x", 0 - (height / 2))      
        .attr("value", "age") // value to grab for event listener
        .classed("active", true)
        .text("Age (Median)");
  
      var incomeLabel = xLabelsGroup.append("text")
        .attr("y", 0 - margin.left + 35)
        .attr("x", 0 - (height / 2))
        .attr("value", "income")
        .classed("inactive", true)
        .text("Houshold Income (Median)");
  
      var povertyLabel = xLabelsGroup.append("text")
        .attr("y", 0 - margin.left + 55)
        .attr("x", 0 - (height / 2))
        .attr("value", "poverty")
        .classed("inactive", true)
        .text("Poverty (%)");

    // Create group for three y-axis labels
    var yLabelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${width / 2}, ${height + 30})`);

    
      var healthcareLabel = yLabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("value", "healthcare") // value to grab for event listener
      .classed("inactive", true)
      .text("Lacks Healthcare (%)");   
    
    
      var smokesLabel = yLabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "smokes")
      .classed("active", true)
      .text("Smokers (%)");

     

    var obesityLabel = yLabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 60)
      .attr("value", "obesity") // value to grab for event listener
      .classed("inactive", true)
      .text("Obesity (%)");

    // Create group for three x-axis labels
    var xLabelsGroup = chartGroup.append("g")
      .attr("transform", "rotate(-90)");

      var povertyLabel = xLabelsGroup.append("text")
      .attr("y", 0 - margin.left + 55)
      .attr("x", 0 - (height / 2))
      .attr("value", "poverty")
      .classed("inactive", true)
      .text("Poverty (%)");  
    
    
      var ageLabel = xLabelsGroup.append("text")
      .attr("y", 0 - margin.left + 15)
      .attr("x", 0 - (height / 2))      
      .attr("value", "age") // value to grab for event listener
      .classed("active", true)
      .text("Age (Median)");

      var incomeLabel = xLabelsGroup.append("text")
      .attr("y", 0 - margin.left + 35)
      .attr("x", 0 - (height / 2))
      .attr("value", "income")
      .classed("inactive", true)
      .text("Houshold Income (Median)");

   

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

    // x axis labels event listener
    xLabelsGroup.selectAll("text")
      .on("click", function() {
        // get value of selection
        var xValue = d3.select(this).attr("value");
        if (xValue !== chosenXAxis) {

          // replaces chosenXAxis with value
          chosenXAxis = xValue;

          // functions here found above csv import
          // updates x scale for new data
          xLinearScale = xScale(data, chosenXAxis);

          // updates x axis with transition
          xAxis = renderXAxes(xLinearScale, xAxis);

          // updates circles and circle text with new x values
          circlesGroup = renderXCircles(circlesGroup, xLinearScale, chosenXAxis);
          textCircles = renderXCircleText(textCircles, xLinearScale, chosenXAxis);

          // updates tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, chosenYaxis, circlesGroup);

          // changes classes to change bold text
          if (chosenXAxis === "poverty") {
            povertyLabel
              .classed("active", true)
              .classed("inactive", false);
              ageLabel
              .classed("active", false)
              .classed("inactive", true);
              incomeLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenXAxis === "age") {
            povertyLabel
              .classed("active", false)
              .classed("inactive", true);
              ageLabel
              .classed("active", false)
              .classed("inactive", true);
              incomeLabel
              .classed("active", true)
              .classed("inactive", false);
          }
          else {
            povertyLabel
              .classed("active", false)
              .classed("inactive", true);
              ageLabel
              .classed("active", true)
              .classed("inactive", false);
              incomeLabel
              .classed("active", false)
              .classed("inactive", true);
          }
        }
      });

    // y axis labels event listener
    yLabelsGroup.selectAll("text")
      .on("click", function() {
        // get value of selection
        var yValue = d3.select(this).attr("value");
        if (yValue !== chosenYAxis) {

          // replaces chosenYAxis with value
          chosenYAxis = yValue;

          // functions here found above csv import
          // updates y scale for new data
          yLinearScale = yScale(data, chosenYaxis);

          // updates y axis with transition
          yAxis = renderYaxes(yLinearScale, yAxis);

          // updates circles and circle text with new y values
          circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);
          textCircles = renderYCircleText(textCircles, yLinearScale, chosenYAxis);

          // updates tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

          // changes classes to change bold text
          if (chosenYAxis === "healthcare") {
            healthcareLabel
              .classed("active", true)
              .classed("inactive", false);
            smokesLabel
              .classed("active", false)
              .classed("inactive", true);
            obesityLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenYAxis === "smokes") {
            healthcareLabel
              .classed("active", false)
              .classed("inactive", true);
            smokesLabel
              .classed("active", false)
              .classed("inactive", true);
            obesityLabel
              .classed("active", true)
              .classed("inactive", false);
          }
          else {
            healthcareLabel
              .classed("active", false)
              .classed("inactive", true);
            smokesLabel
              .classed("active", true)
              .classed("inactive", false);
            obesityLabel
              .classed("active", false)
              .classed("inactive", true);
          }
        }
      });
})
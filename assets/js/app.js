var svgWidth = 960;
var svgHeight = 500;


var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
  };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(data) {

    //  Parse Data/Cast as numbers
    // ==============================

      var poverty = data.map( d => d.poverty);
      var healthcare = data.map( d => d.healthcare);
      var abbr = data.map(d => d.abbr);
      console.log(poverty);
      console.log(healthcare);
    
 
    //  Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(data, d => d.poverty)])
      .range([width,0]);

    var yLinearScale = d3.scaleLinear()
      .domain([20, d3.max(data, d => d.healthcare)])
      .range([ 0 , height]);
    
    //  Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //  Append Axes to the chart
    // ==============================
    chartGroup.append("g")
    .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    //  Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "12")
    .attr("stroke", "black")
    .attr("fill", "Blue")
    .attr("stroke-width", "3")
    .attr("opacity", "0.25");
    

    // State abbreviations
    var text = chartGroup .selectAll(".labels")
    .data(data)
    .enter()
    .append("text")
    .classed("labels", true);
   //text;

    var textLabels = text  .attr("x",  d => xLinearScale(d.poverty))
   .attr("y", d => yLinearScale(d.healthcare))
   .attr("font-family", "sans-serif")
   .attr("font-size", "10px")
   .attr("fill", "black") 
   .attr("font-weight", "bold")
   .attr("text-anchor", "middle")
   .text((d,i) => { console.log(i); return d.abbr;});
   

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

    //  Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height /2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .attr("font-weight", "bold")
      .text("Lacks Healthcare(%)");

       chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .attr("font-weight", "bold")
        .text("In poverty (%)");

        
    });
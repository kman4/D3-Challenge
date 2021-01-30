// @TODO: YOUR CODE HERE!
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

const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(Jdata) {

    
        console.log(Jdata);
   
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    Jdata.forEach(function(data) {
        data.age = +data.age;
        data.smokes = +data.smokes;   
      });

      let copyJdata = JSON.parse(JSON.stringify(Jdata));;
  
      // Step 2: Create scale functions  
      // ==============================
      var xLinearScale = d3.scaleLinear()
      .domain([5, d3.max(Jdata, d => d.smokes)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([28, d3.max(Jdata, d => d.age)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

     // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

     
         // Step 5: Create Circles
    // ==============================
    let circle= chartGroup.selectAll("circle")
    .data(Jdata)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.smokes))
    .attr("cy", (d, i) => { console.log(i); return yLinearScale(d.age)})
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("stroke", "black")
    .attr("stroke-width", "3")
    .attr("opacity", ".25");



    //    // Step 7: Initialize tool tip
    // // ==============================
    var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-8, 10])
    .html((d)=> { return  d.state; });
    svg.call(tool_tip);

     // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circle.on("mouseover", function(data) {
      tool_tip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        tool_tip.hide(data);
      });


        // Step 6: Create Text Labels
    // ==============================

    let text = chartGroup .selectAll(".silly-me")
                           .data(Jdata)
                           .enter()
                            .append("text")
                            .classed("silly-me", true);
    //text;

    let textLabels = text  .attr("x",  d => xLinearScale(d.smokes))
                          .attr("y", d => yLinearScale(d.age))
                          .attr("font-family", "sans-serif")
                          .attr("font-size", "10px")
                          .attr("fill", "black") 
                          .attr("font-weight", "bold")
                          .attr("text-anchor", "middle")
                          .text((d,i) => { console.log(i); return d.abbr;});   
    //textLabels;             
 

  
      // Step 8: Create axes labels
    // ==============================

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .attr("font-weight", "bold")
      .text("Smokers");


      chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .attr("font-weight", "bold")
      .text("Age");
  }).catch(function(error) {
    console.log(error);
  

 });
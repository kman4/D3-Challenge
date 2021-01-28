var svgHeight = 800;
var svgWidth = 600;
// Defining the Chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    Left:30
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


// Create an SVG wrapper, append an SVG group that will hold our chart and shift the latter by left and top margins


var svg = d3.select("#scatter")
    .append("svg")
    .attr("height",svgHeight)
    .attr("width",svgWidth);

// Append an SVG group

var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left},${chartMargin.top})`)

d3.csv('./data.csv').then(function(data){
    var poverty = data.map( d => d.poverty);
    var healthcare = data.map( d=> d.healthcare);
    
    var xScale = d3.scaleBand()
                    .domain(poverty)
                    .range([0,chartWidth]
                    .padding(0.1)

    var yScale = d3.scaleBand()
                   .domain([0, d3.max(healthcare)])
                   .range([chartHeight,0])
    var yAxis = d3.axisLeft(yScale)
    var xAxis = d3.axisBottom(xScale)

// set the x axis to the bottom of the chart
chartGroup.append("g")
     .attr("transform", 'translate(0)${chartHeight})')
     .call(xAxis)

//  set the Y axis
   chartGroup.append("g")
    .attr("transform", 'translate(0)${chartHeight})')
    .call(yAxis)               
})
  
var svgHeight = 460;
var svgWidth = 400;
// Defining the Chart's margins as an object
var chartMargin = {
    top: 10,
    right: 30,
    bottom: 30,
    Left:60
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


// Create an SVG wrapper, append an SVG group that will hold our chart and shift the latter by left and top margins


var svg = d3.select("#scatter")
    .append("svg")
    .attr("height",svgHeight + chartMargin.top + chartMargin.bottom)
    .attr("width",svgWidth + chartMargin.top + chartMargin.right)
    .append("g")
    .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top +")");

// reading data

    d3.csv("./data.csv").then(function(data){
    var poverty = data.map( d => d.poverty);
    var healthcare = data.map( d=> d.healthcare);
// Add X Scale
    var xScale = d3.scaleLinear()
                    .domain(5,poverty)
                    .range([0,chartWidth]);
    svg.append("g").attr("transform", "translate(0," + svgHeight + ")")
                  .call(d3.axisBottom(xScale));
                        
// Add Y Scale
        

    var yScale = d3.scaleLinear()
                   .domain([28, d3.max(healthcare)])
                   .range([chartHeight,0])
    svg.append("g").call(d3.axisLeft(yScale));

 // Add dots
    svg.append('g')
       .selectAll("dot")
       .data(data)
       .enter()
       .append("circle")
       .attr("cx", function (d) { return x(poverty); } )
       .attr("cy", function (d) { return y(healthcare); } )
       .attr("r", 5)
       .style("fill", "#69b3a2")







});
  
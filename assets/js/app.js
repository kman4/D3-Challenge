var svgheight = 800;
var svgWidth = 600;

var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    Left:30
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom

// Create an SVG wrapper, append an SVG group that will hold our chart and shift the latter by left and top margins


var canvas = d3
    .select("#scatter")
    .append("svg")
    .attr("height",svgheight)
    .attr("width",svgwidth);

// Append an SVG group

var chartGroup = canvas.append("g")
    .attr("transform", `translate(${chartMargin.left},${chartMargin.top})`)

d3.csv('./data.csv').then(function(data){
    var poverty = data.map( d=> data.poverty);
    var healthcare = data.map(d=> data.healthcare);
    return data;
    
                            })
    console.log(poverty);  
    console.log(healthcare); 




/*-----------------calories---------------*/
//calculate calories
var standardCalories = 1800;
var calories = 0;
for (var i=0; i<data.length; i++) {
    calories += protein[i]*4 + carb[i]*4 + fat[i]*9 + alcohol[i]*7; 
}
var caloriesSet = [calories, standardCalories-calories];
console.log("caloriesSet", caloriesSet);

//set the color scale
var colorIndex = [0, 1];
var colorName = ["yellow", "orange"];
var caloriesColor = d3.scaleOrdinal()
    .domain(colorIndex)
    .range(colorName);
//console.log("color", color);

//svg size
var width = 200;
var height = 200;
var radius = Math.min(width, height)/2;

//append the svg object
var svg = d3.select("#calories")
    .append("svg")
        .attr("width", width)
        .attr("height", height)
    .append("g")
        .attr("transform", "translate("+width/2+", "+height/2+")");

//Compute the position of each group on the pie
var pie = d3.pie()
    .value(function(d) {return d.value;});
var data_ready = pie(d3.entries(caloriesSet));
console.log("data_ready", data_ready);

//shape helper to build arcs
var arcGenerator = d3.arc()
    .innerRadius(radius-40)
    .outerRadius(radius)

//build the pie chart
svg.selectAll("g")
    .data(data_ready)
    .enter()
    .append("path")
        .attr("d", arcGenerator)
        .attr("fill", function(d) {return caloriesColor(d.data.key);})

//add text
svg.selectAll("g")
    .data(data_ready)
    .enter()
    .append("text")
    .text(function(d) {return d.data.value;})
    .attr("transform", function(d) {return "translate("+arcGenerator.centroid(d)+")";})
    .style("text-anchor", "middle")
    .style("font-size", 13)


/*-----------------Energy---------------*/
//calculate energy
carbValue = 0;
fatValue = 0;
proteinValue = 0;
for (var i=0; i<data.length; i++) {
    carbValue += carb[i];
    fatValue += fat[i];
    proteinValue += protein[i];
}
//console.log("Value", carbValue, fatValue, proteinValue);
var energySet = [
    {
        name: "Carb",
        value: carbValue
    },
    {
        name: "Fat",
        value: fatValue
    }, 
    {
        name: "Protein",
        value: proteinValue
    }
];
console.log("energySet", energySet);

//set the color scale
var colorIndex = [0, 1, 2];
var colorName = ["purple", "blue", "green"];
var energyColor = d3.scaleOrdinal()
    .domain(colorIndex)
    .range(colorName);
//console.log("color", color);

//svg size
var width = 200;
var height = 200;
var radius = Math.min(width, height)/2;

//append the svg object
var svg = d3.select("#energy")
    .append("svg")
        .attr("width", width)
        .attr("height", height)
    .append("g")
        .attr("transform", "translate("+width/2+", "+height/2+")");

//Compute the position of each group on the pie
var pie = d3.pie()
    .value(function(d) {return d.value.value;});
var data_ready = pie(d3.entries(energySet));
console.log("data_ready", data_ready);

//shape helper to build arcs
var arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

//build the pie chart
svg.selectAll("g")
    .data(data_ready)
    .enter()
    .append("path")
        .attr("d", arcGenerator)
        .attr("fill", function(d) {return energyColor(d.data.key);})

//add text
svg.selectAll("g")
    .data(data_ready)
    .enter()
    .append("text")
    .text(function(d) {return d.data.value.name;})
    .attr("transform", function(d) {return "translate("+arcGenerator.centroid(d)+")";})
    .style("text-anchor", "middle")
    .style("font-size", 18)



/*-----------------Nutrient---------------*/
var width = 300;
var height = 50;
var margin = {top: 50, right: 20, bottom: 10, left: 65};

//set the color scale
var colorIndex = [0, 1, 2];
var colorName = ["purple", "blue", "green"];
var nutrientColor = d3.scaleOrdinal()
    .domain(colorIndex)
    .range(colorName);
//console.log("color", nutrientColor);

//append the svg object
var svg = d3.select("#protein")
    .append("svg")
        .attr("width", width)
        .attr("height", height)
//    .append("rect")
//        .attr("width", width)
//        .attr("height", height)
//        .attr("fill", "red")

var proteinData = [
    {
        proteinWidth: 0,
        x0: 0,
        x1: 0
    }
];
for (var i=0; i<protein.length; i++) {
    proteinData.proteinWidth.push(protein[i]/65*300);
}
console.log("proteinData", proteinWidth, x0, x1);
svg.selectAll("rect")
    .data(proteinWidth)
    .enter()
    .append("rect")
    .attr("x", function(d) {
        return d;
    })
    .attr("y", 0)
    .attr("width", function(d) {return d;})
    .attr("height", height)
    .attr("fill", function(d, i) {return colorName[i];})



        












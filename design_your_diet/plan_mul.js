//data *serving size???
var data = [
    {
        name:"MOCHI ICE CREAM BONBONS",
        Alcohol:0,
        Carbohydrate:35,
        Fatty_acidS_trans:0,
        Fatty_acids_saturated:3.75,
        Fiber_total_dietary:0,
        Lipid:6.25,
        Protein:2.5,
        VA: 0,
        VB6: 0,
        VB12: 0,
        VC: 3,
        VD: 0,
        VE: 0,
        Ca: 50,
        Fe: 0,
        Zn: 0,
        P: 0,
        Mg:0 ,
        K: 0,
        Na:75 
    },
    {
        name:"MOCHI ICE CREAM BONBONS",
        Alcohol:0,
        Carbohydrate:42.24,
        Fatty_acidS_trans:0,
        Fatty_acids_saturated:0,
        Fiber_total_dietary:0,
        Lipid:0,
        Protein:0,
        VA: 270,
        VB6: 0,
        VB12: 0,
        VC: 9.7,
        VD: 0,
        VE: 0,
        Ca: 0,
        Fe: 0,
        Zn: 0,
        P: 0,
        Mg:0 ,
        K: 0,
        Na:703 
    },
    {
        name:"MOCHI ICE CREAM BONBONS",
        Alcohol:0,
        Carbohydrate:7.14,
        Fatty_acidS_trans:0,
        Fatty_acids_saturated:17.86,
        Fiber_total_dietary:0,
        Lipid:32.14,
        Protein:25,
        VA: 1071,
        VB6: 0,
        VB12: 0,
        VC: 0,
        VD: 0,
        VE: 0,
        Ca: 714,
        Fe: 0,
        Zn: 0,
        P: 0,
        Mg:0 ,
        K: 0,
        Na:607 
    }
]  
console.log("data", data);

//calculate calories

var protein = [];
var fat = [];
var carb = [];
var alcohol = [];
var fiber = [];
var va = [];
var vb6 = [];
var vb12 = [];
var vc = [];
var vd = [];
var ve = [];
var ca = [];
var fe = [];
var zn = [];
var p = [];
var mg = [];
var k = [];
var na = [];
for (var i=0; i<data.length; i++) {
    protein.push(data[i].Protein);
    fat.push(data[i].Fatty_acidS_trans + data[i].Fatty_acids_saturated + data[i].Lipid);
    carb.push(data[i].Carbohydrate);
    alcohol.push(data[i].Alcohol);
    fiber.push(data[i].Fiber_total_dietary);
    va.push(data[i].VA);
    vb6.push(data[i].VB6);
    vb12.push(data[i].VB12);
    vc.push(data[i].VC);
    vd.push(data[i].VD);
    ve.push(data[i].VE);
    ca.push(data[i].Ca);
    fe.push(data[i].Fe);
    zn.push(data[i].Zn);
    mg.push(data[i].Mg);
    p.push(data[i].P);
    k.push(data[i].K);
    na.push(data[i].Na);
}
console.log("test", protein, fat, carb, fiber, va, vb6, vb12, vc, vd, ve, ca, fe, zn, mg, p, k, na);





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



        












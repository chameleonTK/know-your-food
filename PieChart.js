var PieChart = function(domSelection, data, options) {
    var vm = this;
    var height = 200;
    var width = 200;
    var marginTop = 0;
    var _innerRadius = options.innerRadius || 0;
    
    this.svg = d3.select(domSelection)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate("+(width/2)+", "+(height/2)+")");


    var _calcories = [100, 250];
    var _radius = 80;
    var _colors = ["yellow", "orange"];

    var _pie = d3.pie()
        .value(function(d) {return d.value;});

    var _pieData = _pie(d3.entries(_calcories));
    
    //shape helper to build arcs
    var _arc = d3.arc()
        .innerRadius(_innerRadius)
        .outerRadius(_radius)
    
    //build the pie chart
    this.svg.selectAll("g")
        .data(_pieData)
        .enter()
        .append("path")
            .attr("d", _arc)
            .attr("fill", (d, i) => _colors[i])
    
    console.log(options)
    if (options.innerText) {
        console.log(options.innerText())
        this.svg.selectAll("g")
        .attr("transform", function(d) {
            var _d = _arc.centroid(d);
            _d[0] *= 1.5;
            _d[1] *= 1.5;
            return "translate(" + _d + ")";
        })
        .attr("dy", ".50em")
        .style("text-anchor", "middle")
        .text(options.innerText());
    }
    
    
}
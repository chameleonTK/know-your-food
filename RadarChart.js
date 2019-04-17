var RadarChart = function(domSelection, data, options) {
    var vm = this;
    var height = 221.25;
    var width = 295;

    var nAxis = 6;
    this.svg = d3.select(domSelection)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")

    _ele = this.svg
        .append("g")
        .attr("transform", "translate("+(width/2)+","+(height/2)+")")

    
    _ele.selectAll("circle")
    .data(_.range(10, 100, 20))
    .enter()
    .append("circle")
    .attr('r', (d) => d)

    _ele.selectAll("line")
    .data(_.range(0, nAxis))
    .enter()
    .append("line")
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', (d) => 100*Math.cos(Math.PI*2*d/nAxis))
    .attr('y2', (d) => 100*Math.sin(Math.PI*2*d/nAxis))
    .attr("stroke", "gray")
    .attr("stroke-width", "1px");

    _x = d3.scaleLinear()
    .domain([0, 100]).nice()
    .range([0, 100])

    _values = _.range(0, nAxis).map(()=> _.random(0, 100, false))

    console.log(_values)
    _ele.selectAll("polygon")
    .data([_values])
    .enter().append("polygon")
        .attr("points",function(d) { 
            return d.map(function(d, i) {
                rx = d*Math.cos(Math.PI*2*i/nAxis)
                ry = d*Math.sin(Math.PI*2*i/nAxis)

                return [rx, ry].join(",");
            }).join(" ");
        })
        .attr("stroke","rgb(105, 179, 162)")
        .attr("stroke-width",2)
        .attr("fill", "rgba(255, 255, 255, 0.6)");
}
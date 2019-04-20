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
    

    function draw(newdata, fn) {
        var _radius = 80;

        var _pie = d3.pie()
            .value(function(d) {
                return d.value.value;
            });

        var _pieData = _pie(d3.entries(newdata));
        var _arc = d3.arc()
            .innerRadius(_innerRadius)
            .outerRadius(_radius)
        
        this.svg.selectAll(".pie-path").remove();
        this.svg.selectAll(".arc-text-text").remove();
        // console.log(this.svg.selectAll("g").selectAll("path"), this.svg.selectAll("g"))
        this.svg.selectAll("g")
            .data(_pieData)
            .enter()
            .append("path")
            .attr("class", "pie-path")
            .attr("d", _arc)
            .attr("fill", (d, i) => {
                return d.data.value.color
            }).style("opacity", options.opacity)
        
        
        if (options.innerText) {

            this.svg.selectAll("text").remove();

            this.svg.append("text")
            .style("text-anchor", "middle")
            .attr("class", "pie-text")
            .text(fn(newdata.map(d=>d.value)).toFixed(2))
            .style("font-size", "28px");

            this.svg.append("text")
            .style("text-anchor", "middle")
            .attr("dy", "1em")
            .text("kcal")
            .style("font-size", "18px");
        } else {

            this.svg
            .selectAll(".arc-text-text")
            .data(_pieData)
            .enter()
            .append("text")
            .attr("class", "arc-text-text")
            .attr("transform", function(n) { 
                var _a = _arc.centroid(n) ;
                return "translate(" + _a + ")"; 
            })
            .style("text-anchor", "middle")
            .text((n, i) => {
                // console.log(n, Math.abs(n.endAngle - n.startAngle))
                if (Math.abs(n.endAngle - n.startAngle) < 0.5) {
                    return "";
                }
                return _.capitalize(n.data.value.name);
            })
            .style("fill", "#000");
        }
    }

    vm.draw = draw;
    
    
}
var AreaChart = function(domSelection, data, key) {

    var vm = this;
    var height = 96;
    var width = 295;

    this.svg = d3.select(domSelection)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(d3.drag()
            .on("start", _dragstarted)
            .on("drag", _dragged)
            .on("end", _dragended))
        .append("g")
    
    _nutrient = data.map((d)=>d[key]);
    _min = _.min(_nutrient) 
    _max = _.max(_nutrient)

    _groupBy = _.groupBy(_nutrient, Math.round);

    //TODO: I ignores 0'
    _dist = _.range(1, _max).map((i) => {
        if (_.has(_groupBy, i)) {
            return _groupBy[i].length;
        }
        return 0;
    });

    
    _y = d3.scaleLinear()
    .domain([0, _.max(_dist)]).nice()
    .range([height, 0])

    _x = d3.scaleLinear()
    .domain([0, _max]).nice()
    .range([0, width])

    this.svg.append("path")
    .datum(_dist)
    .attr("fill", "#cce5df")
    .attr("stroke", "#69b3a2")
    .attr("stroke-width", 1.5)
    .attr("d", d3.area()
        .x((d, i) => _x(i))
        .y1(_y(0))
        .y0((d, i) => _y(d))
    )


    this.filter = this.svg.append("rect")
    .attr("class", "filter")
    .attr("id", "filter-"+key)

    function _dragstarted(d) {
        var mouse = d3.mouse(this);
        var x = _x.invert(mouse[0]);
        
        vm.filter
        .attr("mousestart", mouse[0])
        .attr("x", mouse[0])
        .attr("y", 0)
        .attr("width", 0)
        .attr("height", height)

        d3.select(this).raise().classed("active", true);
    }
    
    function _dragged(d) {
        var mouse = d3.mouse(this);
        var x = _x.invert(mouse[0]);

        var mousestart = +vm.filter.attr("mousestart");
        if (mouse[0]-mousestart > 0) {
            vm.filter
            .attr("width", mouse[0]-mousestart)
            .style("opacity", 1)
        } else {
            vm.filter
            .attr("x", mouse[0])
            .attr("width", mousestart-mouse[0])
            .style("opacity", 1)
        }
        
    }
    
    function _dragended(d) {
        d3.select(this).raise().classed("active", false);
    }
}


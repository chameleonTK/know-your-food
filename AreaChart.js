var tooltip = d3.select("body")
    .append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

var AreaChart = function(domSelection, data, key) {
    var vm = this;
    var height = 106.875;
    var width = 295;

    this.svg = d3.select(domSelection)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(d3.drag()
            .on("start", _dragstarted)
            .on("drag", _dragged)
            .on("end", _dragended))
        .on("mouseover", _mouseover)					
        .on("mouseout", _mouseout)
        .on('mousemove', _mousemove)
        .append("g")
    
    var _nutrient = data.map((d)=>d[key]/1000.0);
    var _min = _.min(_nutrient)
    var _max = _.max(_nutrient)

    var _groupBy = _.groupBy(_nutrient, Math.round);

    //TODO: I ignores 0'
    var _dist = _.range(1, _max).map((i) => {
        if (_.has(_groupBy, i)) {
            return _groupBy[i].length;
        }
        return 0;
    });

    var _filter_interval = null;

    
    var _y = d3.scaleLinear()
    .domain([0, _.max(_dist)]).nice()
    .range([height, 0])

    var _x = d3.scaleLinear()
    .domain([0, _max]).nice()
    .range([0, width])

    this.svg.append("path")
    .datum(_dist)
    .attr("fill", "#ffffff")
    // .attr("fill", conf.color[key])
    // .attr("fill-opacity", "0.5")
    .attr("stroke", conf.color[key])
    .attr("stroke-opacity", "1")
    .attr("stroke-width", 2)
    .attr("d", d3.area()
        .x((d, i) => _x(i))
        .y1(_y(0))
        .y0((d, i) => _y(d))
    )


    this.filter = this.svg.append("rect")
    .attr("class", "filter")
    .attr("id", "filter-"+key)

    this.line = this.svg.append('line')
        .attr('id', "line-"+key)
        .attr('class', 'focus-line')
        .attr('stroke', "#fff")
        .attr('stroke-width', 1);

    function _dragstarted(d) {
        var mouse = d3.mouse(this);
        var x = _x.invert(mouse[0]);
        
        vm.filter
        .attr("mousestart", mouse[0])
        .attr("x", mouse[0])
        .attr("y", 0)
        .attr("width", 0)
        .attr("height", height)

        _filter_interval = null;
        d3.select(this).raise().classed("active", true);
    }
    
    function _dragged(d) {
        var mouse = d3.mouse(this);
        var xend = _x.invert(mouse[0]);

        var mousestart = +vm.filter.attr("mousestart");
        var xstart = _x.invert(+mousestart);
        _filter_interval = {start:xstart, end:xend};

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
        
        var o = {}
        o[key] = _filter_interval;
        PubSub.publish('filter-data', o);
        d3.select(this).raise().classed("active", false);
    }

    function _mouseover(d) {
        vm.line.style('display', null); 
    }

    function _mouseout(d) {
        vm.line.style('display', 'none'); 
    }

    function _mousemove(d) {
        var mouse = d3.mouse(this);
        var x = _x.invert(mouse[0]);

        vm.line
        .attr('x1', mouse[0]).attr('y1', 0)
        .attr('x2', mouse[0]).attr('y2', height);
    }
}

//TODO: show (value) when hover
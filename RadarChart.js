var RadarChart = function(domSelection, data, rni, keys, chartkey) {
    var vm = this;
    var height = 221.25;
    var width = 295;

    this.nAxis = _.keys(keys).length;
    this.svg = d3.select(domSelection)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("class", "radar-padding")

    var _ele = this.svg
        .append("g")
        .attr("class", "radar-group")
        .attr("transform", "translate("+(width/2)+","+(height/2)+")")

    
    _ele.selectAll("circle")
    .data(_.range(10, 100, 20))
    .enter()
    .append("circle")
    .attr("class", "supplementary")
    .attr('r', (d) => d)

    var _axis = _ele.append("g")

    _axis.selectAll("line")
    .data(_.range(0, vm.nAxis))
    .enter()
    .append("line")
    .attr("class", "radar-axis")
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', (d) => 95*Math.cos(Math.PI*2*d/vm.nAxis))
    .attr('y2', (d) => 95*Math.sin(Math.PI*2*d/vm.nAxis))
    .attr("stroke", "gray")
    .attr("stroke-width", "1px");

    _axis.selectAll("text")
    .data(_.keys(keys))
    .enter()
    .append("text")
    .attr("class", "radar-text")
    .style("text-anchor", "middle") 
    .style("font-size", "12px")
    .text((d,i) => keys[d])
    .attr('dx', (d, i) => 100*Math.cos(Math.PI*2*i/vm.nAxis))
    .attr('dy', (d, i) => 100*Math.sin(Math.PI*2*i/vm.nAxis))

    var _stat = _.map(keys, (label, k) => {
        return {
            "name": k,
            "mean": _.mean(data.map((d)=> d[k]).filter((d) => d>0)),
            "max": _.max(data.map((d)=> d[k])),
            "min": _.min(data.map((d)=> d[k])),
        }
    })

    var _scales = _.map(_stat, (s, i) => {
        // var max = _.max([s["max"], intake_data[rni.key][s.name]]);
        var max = s["max"];
        if (max <=0) {
            max = 100;
        }

        return d3.scaleLinear()
        .domain([0, max*1.2]).nice()
        .range([0, 100])
    })
    
    var _ploygon = _ele.selectAll("polygon")
    .data([{}])
    .enter()
    .append("polygon")
    .attr("stroke","rgb(105, 179, 162)")
    .attr("stroke-width",2)
    .attr("fill", "rgba(255, 255, 255, 0.6)");


    var _cir = _ele.selectAll(".radar-group")
    .data(_.range(0, vm.nAxis))
    .enter()
    .append("circle")
    .attr("class", "radar-pt")
    .attr('r', 0)
    .attr("stroke", "#5c811a")
    .attr("stroke-width", "0.5px")
    .call(d3.drag()
        .on("start", _dragstarted)
        .on("drag", _dragged)
        .on("end", _dragended))

    var _values = _.map(_stat, (s, i) => {
        var label = keys[s.name];
        var k = s.name;
        // console.log(k, _.min([intake_data[rni.key][k], s.max]))
        return {
            // value: intake_data[rni.key][k],
            value: _.min([intake_data[rni.key][k], s.max]),
            key:k,
            label
        }
    })

    draw(_values);
    var o = {}
    o[chartkey] = _values;
    PubSub.publish('filter-data', o);

    function draw(points) {
        _ploygon.attr("points",function(d) { 
            return points.map(function(d, i) {
                rx = _scales[i](d.value)*Math.cos(Math.PI*2*i/vm.nAxis)
                ry = _scales[i](d.value)*Math.sin(Math.PI*2*i/vm.nAxis)
                return [rx, ry].join(",");
            }).join(" ");
        })
        .attr("stroke","#5c811a")
        .attr("stroke-width",2)
        .attr("stroke-opacity", "0.5")
        .attr("fill", "rgba(255, 255, 255, 0.8)");

        _cir.attr('cx', (d, i) => {
            return (_scales[i](points[i].value)*Math.cos(Math.PI*2*d/vm.nAxis))
        })
        .attr('cy', (d, i) => {
            return (_scales[i](points[i].value)*Math.sin(Math.PI*2*d/vm.nAxis))
        })
        .attr("r", 4)
    }

    PubSub.subscribe('change-rni', function(msg, new_rni) {
        rni = new_rni;
        var newval = _.map(_stat, (s, i) => {
            var label = keys[s.name];
            var k = s.name;
    
            return {
                // value: intake_data[rni.key][k],
                value: _.min([intake_data[rni.key][k], s.max]),
                key:k,
                label
            }
        })
        
        _values = newval
        draw(newval)
        var o = {}
        o[chartkey] = newval;
        PubSub.publish('filter-data', o);
    });

    var _selectedPoint = null;
    function _dragstarted(d) {
        var mouse = d3.mouse(this);
        var dist = _values.map((v, i) => {
            var x = (_scales[i](v.value)*Math.cos(Math.PI*2*i/vm.nAxis))
            var y = (_scales[i](v.value)*Math.sin(Math.PI*2*i/vm.nAxis))

            var d = (x-mouse[0])*(x-mouse[0]) + (y-mouse[1])*(y-mouse[1])
            return {index: i, dist:d};
        })

        _min = _.minBy(dist, function(o) { return o.dist; });
        _selectedPoint = _min.index;
    }

    function _dragged(d) {
        var mouse = d3.mouse(this);
        var r = Math.sqrt((mouse[0])*(mouse[0]) + (mouse[1])*(mouse[1]));
        var newval = _scales[_selectedPoint].invert(r);

        var maxlim = _scales[_selectedPoint].domain()[1];
        if (newval < 0) {
            newval = 0;
        }

        if (newval > maxlim) {
            newval = maxlim;
        }

        _values[_selectedPoint].value = newval;
        draw(_values)
    }
    
    function _dragended(d) {
        
        
        var o = {}
        o[chartkey] = _values;
        PubSub.publish('filter-data', o);
    }
}
var BubbleChart = function(domSelection, data, options) {
    var vm = this;
    var height = options.height;
    var width = 295;
    var marginTop = 30;

    var keys = options.keys;
    var _pos = options.pos
    var _offset = options.offset;

    this.svg = d3.select(domSelection)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")

    _allergy = _.map(keys, (label, name) => {
        var count = _.countBy(data, (d) => d._raw[name]=="True")

        //TODO: resampling data
        if (count["true"] === undefined || count["true"]===0) {
            count["true"] = _.random(10, 100, false);
            count["false"] -= count["true"]
        }

        return {
            name,
            count,
            label,
        }
    })

    _x = d3.scaleLinear()
    .domain([0, data.length]).nice()
    .range([20, 45])

    

    _ele = this.svg.selectAll("circle")
    .data(_allergy)
    .enter()
    .append("g")
    .attr("transform", (d, i) => "translate("+(_pos[i].x*width)+","+(_pos[i].y*height - marginTop)+")")
    .on("mouseover", _mouseover)					
    .on("mouseout", _mouseout)
    
    _ele.append("circle")
    .attr('r', (d) => _x(d.count["true"]))

    _hover = _ele.append("circle")
    .attr('r', (d) => _x(d.count["true"])+5)
    .attr("class", "hover-cir")
    .style('display', "none")


    _ele
    .append("text")
    .attr("dy", (d) => 55)
    .attr("dx", (d, i) => _offset[i])
    .text(d => d.label)


    this.svg
    .append("text")
    .attr("dx", width-70)
    .attr("dy", height-20)
    .text("30%")
    .style("font-size", "28px")
    .style("fill", "rgb(137, 223, 196)")

    function _mouseover(d) {
        d3.select(this).select(".hover-cir").style('display', null)
    }

    function _mouseout(d) {
        d3.select(this).select(".hover-cir").style('display', "none")
    }
}
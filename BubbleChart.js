var BubbleChart = function(domSelection, data, key, options) {
    var vm = this;
    var height = options.height;
    var width = 295;
    var marginTop = options.margin_top || 30;

    var keys = options.keys;
    var _pos = options.pos

    this.svg = d3.select(domSelection)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")

    this.svg.append('filter')
    .attr('id','desaturate')
    .append('feColorMatrix')
    .attr('type','matrix')
    .attr('values',"0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0");
      

    var _data = _.map(keys, (label, name) => {
        var count = _.countBy(data, (d) => d[name]=="True")
        if (count["true"] === undefined) {
            count["true"] = 0;
        }

        // console.log(name, count["true"])
        return {
            name,
            count,
            label,
            selected: options.default_status,
        }
    })

    var _x = d3.scaleLinear()
    .domain([0, data.length]).nice()
    .range([2, 45])

    var _image = d3.scaleLinear()
    .domain([0, data.length]).nice()
    .range([20, 100])

    

    var _ele = this.svg.selectAll("circle")
    .data(_data)
    .enter()
    .append("g")
    .attr("transform", (d, i) => "translate("+(_pos[i].x*width)+","+(_pos[i].y*height - marginTop)+")")
    .on("mouseover", _mouseover)					
    .on("mouseout", _mouseout)
    .on("click", _click)
    
    _ele.append("circle")
    .attr('r', (d) => _x(d.count["true"]))
    .attr("class", "bubbles")

    var _hover = _ele.append("circle")
    .attr('r', (d) => _x(d.count["true"])+5)
    .attr("class", "hover-cir")
    .style('display', (d) => d.selected?null:"none")
    .style("pointer-events", "visibleStroke") //credit: https://stackoverflow.com/questions/30951242/d3-mousout-event-precedes-click


    _ele.append("image")
    .attr("xlink:href", function(d){
        return "icons/"+key+"/"+d.name+".png";
    })
    .attr("class", "bubbles-image")
    .attr("width", (d) => _image(d.count["true"])+"px")
    .attr("height", (d) => _image(d.count["true"])+"px")
    .attr("x", (d) => ((_image(d.count["true"])*-0.5)))
    .attr("y", (d) => ((_image(d.count["true"])*-0.5)))
    .style("filter", function(d, i) {
        if (options.default_status) {
            return "";
        } else {
            return ("filter", "url(#desaturate)");
        }
    });

    _ele
    .append("text")
    .attr("dy", (d) => 50)
    .attr("dx", (d, i) => 0)
    .style("text-anchor", "middle")
    .text(d => d.label)


    var _textPerc = this.svg
    .append("text")
    .attr("dx", width-25)
    .attr("dy", height-20)
    .text(getPercentage()+"%")
    .style("font-size", "28px")
    .style("fill", "rgb(137, 223, 196)")
    .style("text-anchor", "end")

    function getPercentage() {
        _filteredData = data;
        // console.log("init", _filteredData.length)
        _.forEach(_data, (ft) => {
            if (ft.selected != options.default_status) {
                // console.log("filter", _filteredData.length)
                _filteredData = _filteredData.filter((d) => {
                    return (d[ft.name]=="True") == false;
                })
                
            }
            
        })

        return Math.round(_filteredData.length*100.0 / data.length);
    }

    var isclicking = false;
    function _mouseover(d) {
        if (!d.selected && !isclicking) {
            d3.select(this).select(".hover-cir").style('display', null)
        }
    }

    function _mouseout(d) {
        isclicking = false;
        if (!d.selected) {
            d3.select(this).select(".hover-cir").style('display', "none")
        }
    }

    function _click(d) {
        d.selected = !d.selected;
        d3.select(this).select(".hover-cir").style('display', d.selected?null:"none")

        d3.select(this).select(".bubbles-image")
        .style("filter", function(d, i) {
            if (d.selected) {
                return "";
            } else {
                return ("filter", "url(#desaturate)");
            }
        })


        isclicking = true;

        var o = {}
        o[key] = _data;
        PubSub.publish('filter-data', o);
        _textPerc.text(getPercentage()+"%")
    }
}
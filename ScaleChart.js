function getRandomColor() {
    var rgb = []
    for(var i = 0; i < 3; i++)
        rgb.push(Math.floor(Math.random() * 255));

    return 'rgb('+ rgb.join(',') +')';
}

var ScaleChart = function(domSelection, data, options) {
    var vm = this;
    var height = 550;
    var width = 900;
    var marginTop = 50;
    
    this.svg = d3.select(domSelection)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");

    
    // var pattern = this.svg.append("defs").append("pattern")
    // pattern
    // .attr("id", "hash4_4")
    // .attr("width", "8")
    // .attr("height", "8") 
    // .attr("patternUnits", "userSpaceOnUse") 
    // .attr("patternTransform", "rotate(60)")
    // var rect = pattern.append("rect")
    // rect
    // .attr("width", "4")
    // .attr("height", "8") 
    // .attr("transform", "translate(0,0)") 
    // .attr("fill", "#88AAEE")

    //TODO update this later
    var limits = [
        [{value: 150, name:"Protein"}, {value: 170, name:"Fat"}, {value: 500, name:"Carbohydrate"}, {value: 500, name:"Fiber"}],
        [{value: 10, name:"Vitamin A"}, {value: 3, name:"Vitamin B6"}, {value: 3, name:"Vitamin B12"}, {value: 100, name:"Vitamin C"}, {value: 10, name:"Vitamin D"}, {value: 500, name:"Vitamin E"},],
        [{value: 600, name:"Calcium"}, {value: 15, name:"Iron"}, {value: 25, name:"Zinc"}, {value: 700, name:"Phosphorus"}, {value: 310, name:"Manganese"}, {value: 500, name:"Potassium"}, {value: 500, name:"Sodium"}]
    ]

    //TODO: bind actual values
    function _format(d) {
        r = _.map(limits, (lst) => {
            return lst.map((d)=> _.random(0, d.value, true))
        })

        return r;
    }

    _nutrients = _.map(data, _format)
    _color = _.map(data, getRandomColor);

    _offsets = [0, 300, 600];
    _w = 200;
    _h = 50;

    _.forEach(limits, (lst, li) => {
        var _ele = this.svg
            .append("g")
            .attr("transform", "translate("+(_offsets[li])+","+0+")")

        _.forEach(lst, (d, i)=> {
            _subele = _ele.append("g").attr("transform", "translate("+(0)+","+(_h*i+marginTop)+")")
            
            _subele
                .append("text")
                .attr("dy", -5)
                .attr("dx", 0)
                .text(d.name)

            _subele.append("line")
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', _w)
                .attr('y2', 0)
                .attr("stroke", "gray")
                .attr("stroke-width", "1px")

            _x = d3.scaleLinear()
                .domain([0, d.value]).nice()
                .range([0, _w])

            var acc = 0;
            _.forEach(_nutrients, (n, ni) => {
                var val = n[li][i];
                

                if (acc > d.value) {
                    _subele.attr("class", "over")
                    return
                }

                if (acc+val > d.value) {
                    val = d.value - acc;
                    _subele.attr("class", "over")
                }
                _subele.append("rect")
                .attr('x', _x(acc))
                .attr('y', 0)
                .attr('width', _x(val))
                .attr('height', 10)
                .style("fill", _color[ni])

                acc += val;
            })
            
            
        })
    })
}
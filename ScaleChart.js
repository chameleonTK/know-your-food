function getRandomColor() {
    var rgb = []
    for(var i = 0; i < 3; i++)
        rgb.push(Math.floor(Math.random() * 255));

    return 'rgb('+ rgb.join(',') +')';
}

var ScaleChart = function(domSelection, data, options) {
    var vm = this;
    var height = 550;
    var width = 700;
    var marginTop = 50;
    var _offsets = [0, 300, 600];
    var _w = 200;
    var _h = 50;

    var _rni = options.rni;
    var _intake_data = intake_data[_rni.key];

    this.svg = d3.select(domSelection)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");

    //TODO update this later
    var columns = [
        ["protein", "carbohydrate", "fat", "fiber"],
        ["vitamin_A", "vitamin_B6", "vitamin_B12", "vitamin_C", "vitamin_D"],
        ["calcium", "iron", "zinc", "phosphorus", "magnesium", "potassium", "sodium", "iodine"]
    ]

    var names = [
        ["Protein", "Fat", "Carbohydrate", "Fiber"],
        ["Vitamin A", "Vitamin B6", "Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin E"],
        ["Calcium", "Iron", "Zinc", "Phosphorus", "Manganese", "Potassium", "Sodium", "Iodine"]
    ]

    var _scales = getScales(_intake_data);

    PubSub.subscribe('change-rni', function (msg, new_rni) {
        _rni = new_rni;
        _intake_data = intake_data[_rni.key];
        _scales = getScales(_intake_data);
    });

    _.forEach(columns, (lst, li) => {
        var _col = this.svg
            .append("g")
            .attr("transform", "translate("+(_offsets[li])+","+0+")")

        _.forEach(lst, (k, i)=> {
            var _subele = _col
            .append("g")
            .attr("class", "subnutri-"+k)
            .attr("transform", "translate("+(0)+","+(_h*i+marginTop)+")")
            
            _subele
                .append("text")
                .attr("dy", -5)
                .attr("dx", 0)
                .text(names[li][i])

            _subele.append("line")
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', _w)
                .attr('y2', 0)
                .attr("stroke", "gray")
                .attr("stroke-width", "1px")

            
            var s = _scales[k].domain()[1];
            if (s > 1000) {
                s = parseInt(s/1000)+"g";
            } else {
                s = parseInt(s)+"mg";
            }

             _subele
                .append("text")
                .attr("dy", -5)
                .attr("dx", _w)
                .style("text-anchor", "end")
                .text(s)
        })
    })


    function getScales(itd) {
        var o = {};
        _.forEach(itd, (v, k) => {
            o[k] = d3.scaleLinear()
            .domain([0, v]).nice()
            .range([0, _w])
        })
        
        return o;
    }

    function draw(data) {
        // console.log(data)
        _.forEach(columns, (lst, li) => {
            _.forEach(lst, (k, i)=> {
                var acc = 0;
                var _subele = vm.svg.selectAll(".subnutri-"+k)
                _subele.selectAll("rect").remove();
                _subele.attr("class", "subnutri-"+k)
                _.forEach(data, (n, ni) => {
                    var val = n[k];

                    if (acc > _intake_data[k]) {
                        _subele.attr("class", "over subnutri-"+k)
                        return
                    }

                    if (acc+val > _intake_data[k]) {
                        val = _intake_data[k] - acc;
                        _subele.attr("class", "over subnutri-"+k)
                    }

                    _subele.append("rect")
                    .attr('x', _scales[k](acc))
                    .attr('y', 0)
                    .attr('width', _scales[k](val))
                    .attr('height', 10)
                    .style("fill", n.color)

                    acc += val;
                })      
            })
        })
    }

    vm.draw = draw;
}
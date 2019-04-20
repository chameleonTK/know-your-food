var TernaryPlot = function (domSelection, data, options) {
    var vm = this;
    var height = 600;
    var width = 800;
    var _ready = true;
    var offsetX = 100;
    var marginLeft = 80;
    var marginTop = 80;

    var _rni = options.rni;
    var _intake_data = intake_data[_rni.key];

    vm._scale = null;
    vm._largest = null;
    
    vm.data = data;

    var corners = {}

    //ref coordinate calculation: https://www.mathopenref.com/coordpolycalc.html
    var calCorners = {
        "protein": {
            coord: [offsetX + 0 + marginLeft, 0 + marginTop],
            color: hexToRgb(conf.color.protein),
            name: "protein",
            text_anchor: "end",
        },
        "carbohydrate": {
            coord:  [offsetX + _.min([height, width]) - marginLeft, 0 + marginTop],
            color: hexToRgb(conf.color.carbohydrate),
            name: "carbohydrate",
            text_anchor: "start",
        },
        "fat": {
            coord:  [offsetX + (_.min([height, width]) * 0.5), _.min([height, width]) - marginTop], 
            color: hexToRgb(conf.color.fat),
            name: "fat",
            text_anchor: "middle",
        },
    }

    var vitCorners = {
        "vitamin_A": {
            coord:  [offsetX + 300, 50],
            color: hexToRgb(conf.color.vitamin_A),
            name: "vitamin_A",
            text_anchor: "start",
        },
        "vitamin_B6": {
            coord:  [offsetX + 62, 223],
            color: hexToRgb(conf.color.vitamin_B6),
            name: "vitamin_B6",
            text_anchor: "start",
        },
        "vitamin_B12": {
            coord:  [offsetX + 153, 502],
            color: hexToRgb(conf.color.vitamin_B12),
            name: "vitamin_B12",
            text_anchor: "start",
        },
        "vitamin_C": {
            coord:  [offsetX + 447, 502],
            color: hexToRgb(conf.color.vitamin_C),
            name: "vitamin_C",
            text_anchor: "start",
        },
        "vitamin_D": {
            coord:  [offsetX + 538, 223],
            color: hexToRgb(conf.color.vitamin_D),
            name: "vitamin_D",
            text_anchor: "start",
        }
    }

    var minCorners = {
        "calcium": {
            coord:  [offsetX + 396, 69],
            color: hexToRgb(conf.color.calcium),
            name: "calcium",
            text_anchor: "start",
        },
        "iron": {
            coord:  [offsetX + 204, 69],
            color: hexToRgb(conf.color.iron),
            name: "iron",
            text_anchor: "start",
        },
        "zinc": {
            coord:  [offsetX + 69, 204],
            color: hexToRgb(conf.color.zinc),
            name: "zinc",
            text_anchor: "start",
        },
        "phosphorus": {
            coord:  [offsetX + 69, 396],
            color: hexToRgb(conf.color.phosphorus),
            name: "phosphorus",
            text_anchor: "start",
        },
        "magnesium": {
            coord:  [offsetX + 204, 531],
            color: hexToRgb(conf.color.magnesium),
            name: "magnesium",
            text_anchor: "start",
        },
        "potassium": {
            coord:  [offsetX + 369, 531],
            color: hexToRgb(conf.color.potassium),
            name: "potassium",
            text_anchor: "start",
        },
        "sodium": {
            coord:  [offsetX + 531, 396],
            color: hexToRgb(conf.color.sodium),
            name: "sodium",
            text_anchor: "start",
        },
        "iodine": {
            coord:  [offsetX + 531, 204],
            color: hexToRgb(conf.color.iodine),
            name: "iodine",
            text_anchor: "start",
        },
    }

    corners = calCorners;

    var nutritients = [
        // "protein",
        // "carbohydrate",
        // "fat",
        "vitamin_A",
        "vitamin_B6",
        "vitamin_B12",
        "vitamin_C",
        "vitamin_D",
        "calcium",
        "iron",
        "zinc",
        "phosphorus",
        "magnesium",
        "potassium",
        "sodium",
        "iodine",
    ]

    var nutr_names = {
        protein: "Protein",
        carbohydrate: "Carbohydrate",
        fat: "Fat",
        vitamin_A: "Vit A",
        vitamin_B6: "Vit B6",
        vitamin_B12: "Vit B12",
        vitamin_C: "Vit C",
        vitamin_D: "Vit D",
        calcium: "Ca",
        iron: "Fe",
        zinc: "Zn",
        phosphorus: "P",
        magnesium: "Mg",
        potassium: "K",
        sodium: "Na",
        // chloride: "Cl",
        iodine: "I",
    };

    this.svg = d3.select(domSelection)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")


    //credit: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function coord(d) {
        var pos = [0, 0];
        var sum = _.sum(_.map(corners, (c, k)=> {
            return d[k];
        }))

        if (sum !== 0) {
            // a /= sum;
            // b /= sum;
            // c /= sum;
            pos[0] = _.sum(_.map(corners, (c, k)=> {
                return c.coord[0]*d[k]/sum;
            }))

            pos[1] = _.sum(_.map(corners, (c, k)=> {
                return c.coord[1]*d[k]/sum;
            }))

            return pos;
        } else {
            return null;
        }
    }

    var cc = clickcancel(vm);

    function formatData(data) {
        return data.map((d) => {
            var sum = _.sum(_.map(corners, (c, k)=> {
                return d[k];
            }));

            if (sum == 0) {
                var colorR = parseInt(_.sum(_.map(corners, (c, k)=> {
                    return c.color.r*1.0/3;
                })));
                var colorG = parseInt(_.sum(_.map(corners, (c, k)=> {
                    return c.color.g*1.0/3;
                })));
                var colorB = parseInt(_.sum(_.map(corners, (c, k)=> {
                    return c.color.b*1.0/3;
                })));

                d.color = "rgb("+colorR+","+colorG+","+colorB+")";
                return {
                    coord: [width/2, height/2],
                    serving_size: d.serving_size,
                    name: d.name,
                    color: d.color,
                    raw: d,
                };
            }

            // corners
            var colorR = parseInt(_.sum(_.map(corners, (c, k)=> {
                return c.color.r*d[k]/sum;
            })));
            var colorG = parseInt(_.sum(_.map(corners, (c, k)=> {
                return c.color.g*d[k]/sum;
            })));
            var colorB = parseInt(_.sum(_.map(corners, (c, k)=> {
                return c.color.b*d[k]/sum;
            })));

            if (colorR > 225) colorR = 225;
            if (colorG > 225) colorG = 225;
            if (colorB > 225) colorB = 225;
            d.color = "rgb("+colorR+","+colorG+","+colorB+")";

            var o = {
                coord: coord(d),
                serving_size: d.serving_size,
                name: d.name,
                color: d.color,
                raw: d,
            };

            _.forEach(nutritients, (n) => {
                o[n] = d[n];
            })

            
            return o;

        }).filter((d) => d.coord != null)
    }

    _init(data);
    function _init(data) {
        vm._data = formatData(data);
    
        var polygon = vm.svg
            .append("g")
            .attr("class", "ter-polygon")
            
        polygon.selectAll("polygon")
            .data([corners])
            .enter()
            .append("polygon")
            .attr("points",function(d) { 
                return _.map(corners, function(d, i) {
                    return [d.coord[0], d.coord[1]].join(",");
                }).join(" ");
            })
            .attr("stroke","#eee")
            .attr("stroke-width",1)
            .attr("fill", "rgba(255, 255, 255, 0.8)");

        polygon.selectAll("text")
            .data(_.map(corners, v => v))
            .enter()
            .append("text")
            .style("text-anchor", n=>n.text_anchor)
            .attr("x", n=>n.coord[0])
            .attr("y", n=>n.coord[1])
            .text((n, i) => {
                return nutr_names[n.name];
            })
            .style("fill", "#000")


        vm._largest = options.largest;
        vm._scale = d3.scaleLinear()
            .domain([0, vm._largest.serving_size]).nice()
            .range([5, 50])

        vm._ele = vm.svg.selectAll("circle")
            .data(vm._data)
            .enter()
            .append("g")
            .attr("class", "ter-circle")
            .style("opacity", "1")
            .attr("transform", (d, i) => "translate(" + (d.coord[0]) + "," + (d.coord[1]) + ")")
            .on("mouseover", _mouseover)
            .on("mouseout", _mouseout)
            .call(cc);


        cc.on("click", _click)
        cc.on("dblclick", _dblclick)

        vm._ele.append("g")
            .attr("class", "ter-detail-circle")
    
        vm._ele.append("circle")
            .attr("class", "ternaryplot_circles")
            .style("fill", (d) => d.color)
            .style("stroke", (d) => d.color)
            .attr('r', (d) => vm._scale(d.serving_size))

        vm._ele.append("text")
            .attr("dx", 0)
            .attr("dy", 0)
            .text((d) => _.capitalize(d.name))
            .style("font-size", "10px")
            .attr("class", "tootip")
            .style("fill", "#343838")
            .style('display', "none")
            .style("pointer-events", "visibleStroke")
    }

    function _mouseover(d) {
        d3.select(this).select(".tootip").style('display', null)
        d3.select(this).moveToFront();
    }

    function _mouseout(d) {
        d3.select(this).select(".tootip").style('display', "none")
        // d3.select(this).moveToBack();
    }

    function _click(d) {
        if (!_ready && !d.selected) {
            return;
        }

        d.selected = !d.selected;
    
        if (d.selected) {
            _ready = false;
            vm._ele.style("opacity", "0.1")

            d3.select(this)
                .style("opacity", "1")
                .attr("class", "ter-circle selected")


            var _nutri = nutritients.filter((n) => d[n] > 0);
            var r = 30 + vm._scale(d.serving_size);
            var _sum = _.sum(_nutri.map(n => d[n]));

            var _x = {};
            
            _nutri.forEach((n) => {
                _x[n] = d3.scaleLinear()
                    .domain([0, _intake_data[n]]).nice()
                    .range([r, r + 20])
            })


            var _g = d3.select(this)
                .selectAll(".ter-detail-circle")

            var arc = d3.arc()
                .outerRadius(function(n, i) { 
                    return _x[n.data](d[n.data])
                })
                .innerRadius(vm._scale(d.serving_size));
            
            var pie = d3.pie()
                .sort(null)
                .value(function(n) { 
                    return d[n]*100.0/_sum;
                });
            
            var _detailg = _g.selectAll(".arc")
                .data(pie(_nutri))
                .enter().append("g")
                .attr("class", "arc");
          
            _detailg.append("path")
                  .attr("d", arc)
                  .style("fill", (n, i) => {
                    //   console.log(n, i);
                      return conf.color[n.data];
                  })

            _g
            .append("g")
            .attr("class", "arc-text")

            .selectAll(".arc-text-text")
            .data(pie(_nutri))
            .enter()
            .append("text")
            .attr("class", "arc-text-text")
            .attr("transform", function(n) { 
                // console.log(n)
                var _a = arc.centroid(n) ;
                return "translate(" + _a + ")"; 
            })
            .style("text-anchor", "middle")
            .text((n, i) => {
                // console.log(n, nutr_names[n.data])
                if (n.value < 5) {
                    return "";
                }
                return nutr_names[n.data];
            })
            .style("fill", "#fff");
                  

            // var _phi = _.random(0, 100);
            // _g.selectAll("line")
            //     .data(_nutri)
            //     .enter()
            //     .append("line")
            //     .attr('x1', (n, i) => 0)
            //     .attr('y1', (n, i) => 0)
            //     .attr('x2', (n, i) => _x[i](d[n]) * Math.cos(_phi + Math.PI * 2 * i / _nutri.length))
            //     .attr('y2', (n, i) => _x[i](d[n]) * Math.sin(_phi + Math.PI * 2 * i / _nutri.length))
            //     .attr('stroke', "#474747")
            //     .attr('stroke-width', 2);

            // _g.selectAll("circle")
            //     .data(_nutri)
            //     .enter()
            //     .append("circle")
            //     .attr('r', (n, i) => 10)
            //     .attr('cx', (n, i) => _x[i](d[n]) * Math.cos(_phi + Math.PI * 2 * i / _nutri.length))
            //     .attr('cy', (n, i) => _x[i](d[n]) * Math.sin(_phi + Math.PI * 2 * i / _nutri.length))
            //     .style("fill", (n, i) => conf.color[n])

            // _g.selectAll("text")
            //     .data(_nutri)
            //     .enter()
            //     .append("text")
            
            //     .text((n, i) => nutr_names[n])
            //     .style("fill", "#343838")

        } else {
            _ready = true;
            vm._ele.style("opacity", "1")

            d3.select(this).attr("class", "ter-circle")
            d3.select(this).selectAll(".ter-detail-circle > *").remove();
            // console.log(d3.select(this).selectAll(".ter-detail-circle"))
        }
    }

    function _dblclick(d) {
        d.detail = !d.detail;
        PubSub.publish('open-detail', d.raw);

        var hash = "#design-area";
        $("#design-area").show()
        $('html').animate({
            scrollTop: $(hash).offset().top
        }, 800, function(){
            window.location.hash = hash;
        })
    }

    function draw(newdata) {
        vm.svg.selectAll(".ter-circle").remove();
        vm.data = newdata;
        _init(newdata)
    }

    vm.draw = draw;


    PubSub.subscribe('change-rni', function (msg, new_rni) {
        _rni = new_rni;
        _intake_data = intake_data[_rni.key];
    });

    PubSub.subscribe('change-axis', function (msg, newaxis) {
        vm.svg.selectAll(".ter-polygon").remove();
        vm.svg.selectAll(".ter-circle").remove();
        if (newaxis=="minerals") {
            corners = minCorners
            _init(vm.data)
        } else if (newaxis=="vitamins") {
            corners = vitCorners;
            _init(vm.data)
        } else if (newaxis=="calories") {
            corners = calCorners;
            _init(vm.data)
        } else {
            console.error("Dont know axis: "+newaxis);
            _init(vm.data)
        } 
    });
}


function clickcancel() {
    // we want to a distinguish single/double click
    // details http://bl.ocks.org/couchand/6394506
    var dispatcher = d3.dispatch('click', 'dblclick');
    function cc(selection) {
        var down, tolerance = 5, last, wait = null, args;
        // euclidean distance
        function dist(a, b) {
            return Math.sqrt(Math.pow(a[0] - b[0], 2), Math.pow(a[1] - b[1], 2));
        }
        selection.on('mousedown', function () {
            down = d3.mouse(document.body);
            last = +new Date();
            args = arguments;
        });
        selection.on('mouseup', function () {
            var vm = this;
            if (dist(down, d3.mouse(document.body)) > tolerance) {
                return;
            } else {
                if (wait) {
                    window.clearTimeout(wait);
                    wait = null;
                    dispatcher.apply("dblclick", vm, args);
                } else {
                    wait = window.setTimeout((function () {
                        return function () {
                            dispatcher.apply("click", vm, args);
                            wait = null;
                        };
                    })(), 300);
                }
            }
        });
    };
    // Copies a variable number of methods from source to target.
    var d3rebind = function (target, source) {
        var i = 1, n = arguments.length, method;
        while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
        return target;
    };

    // Method is assumed to be a standard D3 getter-setter:
    // If passed with no arguments, gets the value.
    // If passed with arguments, sets the value and returns the target.
    function d3_rebind(target, source, method) {
        return function () {
            var value = method.apply(source, arguments);
            return value === source ? target : value;
        };
    }
    return d3rebind(cc, dispatcher, 'on');
}
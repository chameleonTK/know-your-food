var ExplorerApp = function() {
    var vm = this;
    vm.dataset = [];
}

ExplorerApp.prototype = Object.create(App.prototype)
ExplorerApp.prototype.init = function(data, options) {
    var vm = this;
    var largest =  _.maxBy(data, (d)=> d.serving_size);

    this._chart = new TernaryPlot("#chart-food-cluster", data, {largest, rni: options.rni})
    this._itemDOMs = {};
    
    _.forEach(data, (d, i) => {
        vm._itemDOMs[d.name] = {
            obj: $('<li>').html(_.capitalize(d.name)),
            index: i
        };
    });

    _.forEach(vm._itemDOMs, (d) => {
        $("#food-list").append(d.obj);
    })

    function addFoodItims(data) {

        _.forEach(vm._itemDOMs, (d) => {
            d.obj.css("display", 'none');
        })

        _.forEach(data, (d) => {
            var dom = vm._itemDOMs[d.name];
            if (dom) {
                $(dom.obj).show()
                // dom.css("display", null);
            }
        })
    
    }

    
    

    PubSub.subscribe('filtered-data-ready', function(msg, newdata) {
        addFoodItims(newdata);
        vm._chart.draw(newdata)
    });


    $("#search-bar-input").on('keyup', _.debounce(function(inp) {
        $("#food-list li").removeClass("selected");
        PubSub.publish('filter-data', {
            name: $("#search-bar-input").val()
        });
    }, 150));

    $("#food-list li").on('click', function() {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
            $("#search-bar-input").val(""); 
            PubSub.publish('filter-data', {
                name: ""
            });
        } else {
            var name = decode($(this).html());
            $(this).addClass("selected");
            $("#search-bar-input").val(name); 
            PubSub.publish('filter-data', {
                name: name
            });
        }
    });


    function decode(s) {
        return s.replace("&amp;", "&");
    }

    scale();
    function scale() {
        var _g = d3.select("#chart-scale-food-cluster")
        .append("svg")
        .attr("width", 208)
        .attr("height", 15)
        .append("g")

        _g.append("line")
        .attr('x1', (n, i) => 8)
        .attr('y1', (n, i) => 5)
        .attr('x2', (n, i) => 200)
        .attr('y2', (n, i) => 5)
        .attr('stroke', "#474747")
        .attr('stroke-width', 2);

        var _p = _g.append("circle")
        .attr('cx', (n, i) => 200)
        .attr('cy', (n, i) => 5)
        .attr('r', 5)
        .style('fill-opacity', "1")
        .style('stroke', "#000")
        .style('fill', "#000")
        .call(d3.drag()
            .on("start", _dragstarted)
            .on("drag", _dragged)
            .on("end", _dragended))

        
        function _dragstarted(d) {}
    
        function _dragged(d) {
            var mouse = d3.mouse(this);
            if (mouse[0] >= 200 || mouse[0] <= 8) {
                return ;
            }
            
            _p.attr("cx", mouse[0]);
        }
        
        function _dragended(d) {
            var mouse = d3.mouse(this);

            var val = mouse[0];
            if (mouse[0] >= 200) {
                val = 200;
            } else if (mouse[0] <= 8){
                val = 8;
            }
            
    
            PubSub.publish('filter-data', {
                "serving-size": ((val-8)/192)*largest.serving_size
            });
        }
    }
    

    
}

ExplorerApp.prototype.visualize = function(data) {
};
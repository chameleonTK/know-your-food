var ExplorerApp = function() {
    var vm = this;
    vm.dataset = [];
}

ExplorerApp.prototype = Object.create(App.prototype)
ExplorerApp.prototype.init = function(data) {
    var vm = this;
    var largest =  _.maxBy(data, (d)=> d.serving_size);
    this._chart = new TernaryPlot("#chart-food-cluster", data, {largest})
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
    
}

ExplorerApp.prototype.visualize = function(data) {
};
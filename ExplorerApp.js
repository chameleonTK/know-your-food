var ExplorerApp = function() {
    var vm = this;
    vm.dataset = [];
}

ExplorerApp.prototype = Object.create(App.prototype)
ExplorerApp.prototype.visualize = function(data) {
    var data = this.preprocessing(data)
    var chart = new TernaryPlot("#chart-food-cluster", data, {})

    var itemDOMs = _.slice(data, 0, 200).map((d) => {
        return  $('<li>').html(_.capitalize(d.name));
    })

    _.forEach(itemDOMs, (d) => {
        $("#food-list").append(d);
    })
    
}
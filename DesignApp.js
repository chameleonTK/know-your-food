var DesignApp = function() {
    var vm = this;
    vm.dataset = [];

    var standardCalories = 1800;
    vm.getCalories = function(d) {
        return d.protein[i]*4 + d.carbohydrate[i]*4 + d.fat[i]*9; // + d.alcohol[i]*7
    }
}

DesignApp.prototype = Object.create(App.prototype)
DesignApp.prototype.visualize = function(data) {
    var data = this.preprocessing(data)

    _data = _.slice(data, 0, 3)

    var caloriesChart = new PieChart("#chart-calories", _data, {innerRadius: 40, innerText: innerText})
    var proportionChart = new PieChart("#chart-proportion", _data, {})

    function innerText() {
        return "450";
    }
    // var itemDOMs = _.slice(data, 0, 200).map((d) => {
    //     return  $('<li>').html(_.capitalize(d.name));
    // })

    // _.forEach(itemDOMs, (d) => {
    //     $("#food-tag-list").append(d);
    // })
}

var designApp = new DesignApp();
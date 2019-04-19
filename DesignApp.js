var DesignApp = function() {
    var vm = this;
    vm.dataset = [];

    var standardCalories = 1800;
    vm.getCalories = function(d) {
        return d.protein[i]*4 + d.carbohydrate[i]*4 + d.fat[i]*9; // + d.alcohol[i]*7
    }
}

DesignApp.prototype = Object.create(App.prototype)
DesignApp.prototype.visualize = function(data, options) {
    var _data = [];
    $("#design-area").hide();

    function getCalcories(data) {
        return data.map((d) => {
            return {
                value: (d.protein*4 + d.carbohydrate*4 + d.fat*9)/1000.0,
                name: data.name,
                color: d.color
            }
        });
    }

    function getProportion(data) {
        return ["protein", "carbohydrate", "fat"].map((k) => {
            return {
                value: _.sum(data.map(d=>d[k])),
                name: k,
                color: conf.color[k]
            }
        });
    }

    var caloriesChart = new PieChart("#chart-calories", _data, {innerRadius: 40, innerText:true})
    var proportionChart = new PieChart("#chart-proportion", _data, {})
    var nutrientsChart = new ScaleChart("#chart-nutrients-detail", _data, options)

    PubSub.subscribe('open-detail', function(msg, newdata) {
        $("#design-area").show();

        var date = new Date();
        var timestamp = date.getTime();
        
        var id = "food-obj-"+(_.random(0, 10000, false))+"-"+timestamp;

        var _dom = $('<li>').attr("id", id).append($('<span>').html(_.capitalize(newdata.name)));
        var del = $('<i class="tiny material-icons dp48">close</i>').click(() => {
            PubSub.publish('del-detail', id);
        });

        _dom.append(del)
        $("#food-tag-list > ul").append(_dom);

        newdata.color = getRandomColor()
        newdata.id = id;

        console.log(id)
        _data.push(_.cloneDeep(newdata));
        caloriesChart.draw(getCalcories(_data), _.sum)
        proportionChart.draw(getProportion(_data))
        nutrientsChart.draw(_data)
    });

    PubSub.subscribe('del-detail', function(msg, delIndex) {
        console.log(_data)
        if (_data.length <=1) {
            return;
        }

        $("#"+delIndex).remove();

        var newdata = _data.map((d)=>{
            if (d.id === delIndex) {
                return null;
            }

            return d;
        }).filter(d => d!=null);

        _data = newdata;
        caloriesChart.draw(getCalcories(_data), _.sum)
        proportionChart.draw(getProportion(_data))
        nutrientsChart.draw(_data)

    });
}
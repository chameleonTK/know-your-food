function FilterApp() {
    var vm = this;
    vm.dataset = [];
    vm.filterCharts = {};

    App.call(this)
    
    vm.getAllergicChart = function(data) {
        keys = {
            allergy_eggs_milk: "Milk",
            allergy_treenuts: "Treenuts",
            allergy_fish_shellfish: "Fish & Shellfish",
            allergy_wheat: "Wheat",
            allergy_soy_peanuts: "Peanuts & Soy",
        };

        pos = [
            {x: 1.25*0.25, y: 0.25},
            {x: 2.75*0.25, y: 0.25},
            {x: 1.25*0.25, y: 2.125*0.25},
            {x: 2.75*0.25, y: 2.125*0.25},
            {x: 1.25*0.25, y: 3.25*0.25},
        ]

        return (new BubbleChart("#chart-allergic", data, "allergic", {
            keys,
            pos,
            height: 450,
            default_status: false,
            margin_top: 45,
        }))
    }

    vm.getPreferenceChart = function(data) {
        keys = {
            has_vegetable: "Vegetable",
            has_beef: "Beef",
            has_egg: "Eggs",
            has_chicken: "Chicken",
            has_lamp: "Lamp",
            has_pork: "Pork",
            has_seafood: "Seafood",
            has_nuts: "Nuts",
            
        };

        pos = [
            {x: 1.25*0.25, y: 0.2},
            {x: 2.75*0.25, y: 0.2},
            {x: 1.25*0.25, y: 2.125*0.2},
            {x: 2.75*0.25, y: 2.125*0.2},
            {x: 1.25*0.25, y: 3.25*0.2},
            {x: 2.75*0.25, y: 3.25*0.2},
            {x: 1.25*0.25, y: 4.375*0.2},
            {x: 2.75*0.25, y: 4.375*0.2},
        ]

        return (new BubbleChart("#chart-preference", data, "preference", {
            keys,
            pos,
            height: 450,
            default_status: true,
            margin_top: 45,
        }))
    }
}

var _vitamins = {};
var _vitamins = {};
FilterApp.prototype = Object.create(App.prototype)
FilterApp.prototype.visualize = function(data) {
    var data = this.preprocessing(data)
    this.filterCharts = {
        protein: new AreaChart("#chart-protein", data, "protein"),
        carbohydrate: new AreaChart("#chart-carbohydrate", data, "carbohydrate"),
        fat: new AreaChart("#chart-fat", data, "fat"),
        fiber: new AreaChart("#chart-fiber", data, "fiber"),
        allergic: this.getAllergicChart(data),
        prefernce: this.getPreferenceChart(data),
        mineralas: new RadarChart("#chart-mineralas", data),
        vitamins: new RadarChart("#chart-vitamins", data),
    };
}
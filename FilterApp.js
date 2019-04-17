function FilterApp() {
    var vm = this;
    vm.dataset = [];
    vm.filterCharts = {};

    App.call(this)
    
    vm.getAllergicChart = function(data) {
        keys = {
            allergy_eggs_milk: "Eggs & Milk",
            allergy_treenuts: "Treenuts",
            allergy_fish_shellfish: "Fish & Shellfish",
            allergy_wheat: "Wheat",
            allergy_soy_peanuts: "Peanuts & Soy",
        };
    
        labelOffsets = [
            -86*0.5,
            -63*0.5,
            -112*0.5,
            -46*0.5,
            -105*0.5,
        ]

        pos = [
            {x: 1.25*0.25, y: 0.25},
            {x: 2.75*0.25, y: 0.25},
            {x: 1.25*0.25, y: 2.125*0.25},
            {x: 2.75*0.25, y: 2.125*0.25},
            {x: 1.25*0.25, y: 3.25*0.25},
        ]

        return (new BubbleChart("#chart-allergic", data, {
            keys,
            pos,
            offset: labelOffsets,
            height: 450,
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

       
    
        labelOffsets = [
            -70*0.5,
            -34*0.5,
            -38*0.5,
            -59*0.5,
            -41*0.5,
            -35*0.5,
            -60*0.5,
            -35*0.5,
        ]

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

        return (new BubbleChart("#chart-preference", data, {
            keys,
            pos,
            offset: labelOffsets,
            height: 450,
        }))
    }
}

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


var filterApp = new FilterApp();
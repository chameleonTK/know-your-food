function FilterApp() {
    var vm = this;
    vm.dataset = [];
    vm.filterCharts = {};

    vm.vitamins = {
        vitamin_A: "Vit A",
        vitamin_B6: "Vit B6",
        vitamin_B12: "Vit B12",
        vitamin_C: "Vit C",
        vitamin_D: "Vit D",
    };
    
    vm.mineralas = {
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

FilterApp.prototype = Object.create(App.prototype)
FilterApp.prototype.visualize = function(data, options) {
    var vm = this;
    var data = this.preprocessing(data)
    this.filterCharts = {
        protein: new AreaChart("#chart-protein", data, "protein"),
        carbohydrate: new AreaChart("#chart-carbohydrate", data, "carbohydrate"),
        fat: new AreaChart("#chart-fat", data, "fat"),
        fiber: new AreaChart("#chart-fiber", data, "fiber"),
        allergic: this.getAllergicChart(data),
        prefernce: this.getPreferenceChart(data),
        mineralas: new RadarChart("#chart-mineralas", data, options.rni, vm.mineralas, "minerals"),
        vitamins: new RadarChart("#chart-vitamins", data, options.rni, vm.vitamins, "vitamins"),
    };
}
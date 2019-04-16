var VisualiseApp = function() {
    var vm = this;
    vm.dataset = [];
    vm.filterCharts = {};

    vm.preprocessing = function(data) {
        return data.map(vm.format);
    }

    vm.format = function(item) {
        return {
            name: item.name,
            protein: vm.val(item, "Protein[Output_Value]", "Protein[Output_UOM]", "Protein[Derivation_Code]"),
            carbohydrate: vm.val(item, "Carbohydrate, by difference[Output_Value]", "Carbohydrate, by difference[Output_UOM]", "Carbohydrate, by difference[Derivation_Code]"),
            fat: vm.val(item, "Fatty acids, total trans[Output_Value]", "Fatty acids, total trans[Output_UOM]", "Fatty acids, total trans[Derivation_Code]") + vm.val(item, "Fatty acids, total saturated[Output_Value]", "Fatty acids, total saturated[Output_UOM]", "Fatty acids, total saturated[Derivation_Code]"),
            fiber: vm.val(item, "Fiber, total dietary[Output_Value]", "Fiber, total dietary[Output_UOM]", "Fiber, total dietary[Derivation_Code]"),
            _raw: item,
        }
    }

    vm.val = function(item, valueKey, uomKey, dervKey) {
        if (item[uomKey] == "g") {
            return isNaN(+item[valueKey])? 0: +item[valueKey];
        } else if (item[uomKey] == "") {
            return 0;
        }

        console.error("Unkonw unit", item[uomKey]);
        return 0;
    }

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
            height: 385,
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
            -55.3*0.5,
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

    vm.visualize = function(data) {
        var data = vm.preprocessing(data)
        vm.filterCharts = {
            protein: new AreaChart("#chart-protein", data, "protein"),
            carbohydrate: new AreaChart("#chart-carbohydrate", data, "carbohydrate"),
            fat: new AreaChart("#chart-fat", data, "fat"),
            fiber: new AreaChart("#chart-fiber", data, "fiber"),
            allergic: vm.getAllergicChart(data),
            prefernce: vm.getPreferenceChart(data),
        };
    }
}


var app = new VisualiseApp();
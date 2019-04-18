function App(data) {
    this.data = data;
}

App.prototype.preprocessing = function(data) {
    var vm = this;
    return _.map(data, (d) => {
        return vm.format(d);
    });
}


App.prototype.val = function(item, valueKey, uomKey, dervKey) {
    if (item[uomKey] == "g") {
        return isNaN(+item[valueKey])? 0: +item[valueKey];
    } else if (item[uomKey] == "ml") {
        return isNaN(+item[valueKey])? 0: +item[valueKey];
    } else if (item[uomKey] == "") {
        return 0;
    }

    console.error("Unkonw unit", item[uomKey]);
    return 0;
}


App.prototype.format = function(item) {
    var vm = this;
    return {
        name: item.name,
        protein: vm.val(item, "Protein[Output_Value]", "Protein[Output_UOM]", "Protein[Derivation_Code]"),
        carbohydrate: vm.val(item, "Carbohydrate, by difference[Output_Value]", "Carbohydrate, by difference[Output_UOM]", "Carbohydrate, by difference[Derivation_Code]"),
        fat: vm.val(item, "Fatty acids, total trans[Output_Value]", "Fatty acids, total trans[Output_UOM]", "Fatty acids, total trans[Derivation_Code]") + vm.val(item, "Fatty acids, total saturated[Output_Value]", "Fatty acids, total saturated[Output_UOM]", "Fatty acids, total saturated[Derivation_Code]"),
        fiber: vm.val(item, "Fiber, total dietary[Output_Value]", "Fiber, total dietary[Output_UOM]", "Fiber, total dietary[Derivation_Code]"),
        serving_size: vm.val(item, "Serving_Size", "Serving_Size_UOM"),
        allergy_eggs_milk: item["allergy_eggs_milk"],
        allergy_treenuts: item["allergy_treenuts"],
        allergy_fish_shellfish: item["allergy_fish_shellfish"],
        allergy_wheat: item["allergy_wheat"],
        allergy_soy_peanuts: item["allergy_soy_peanuts"],
        has_vegetable: item["has_vegetable"],
        has_beef: item["has_beef"],
        has_egg: item["has_egg"],
        has_chicken: item["has_chicken"],
        has_lamp: item["has_lamp"],
        has_pork: item["has_pork"],
        has_seafood: item["has_seafood"],
        has_nuts: item["has_nuts"],
        _raw: item,
    }
}


App.prototype.visualize = function(data) {
    console.error("Not implemented");
}
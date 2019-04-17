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
        _raw: item,
    }
}


App.prototype.visualize = function(data) {
    console.error("Not implemented");
}
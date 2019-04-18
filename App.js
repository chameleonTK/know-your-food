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
        return isNaN(+item[valueKey])? 0: +item[valueKey]*1000.0;
    } else if (item[uomKey] == "ml") {
        return isNaN(+item[valueKey])? 0: (+item[valueKey]*1.0);
    } else if (item[uomKey] == "mg") {
        return isNaN(+item[valueKey])? 0: (+item[valueKey]*1.0);
    } else if (item[uomKey] == "mcg") {
        return isNaN(+item[valueKey])? 0: (+item[valueKey]*0.001);
    } else if (item[uomKey] == "IU") {
        //https://dietarysupplementdatabase.usda.nih.gov/ingredient_calculator/help.php#q9
        if (valueKey=="Vitamin A, IU[Output_Value]") {
            return isNaN(+item[valueKey])? 0: (+item[valueKey]*1.0)*0.3*0.001; 
        } else if(valueKey=="Vitamin D[Output_Value]") {
            return isNaN(+item[valueKey])? 0: (+item[valueKey]*1.0)*0.025*0.001; 
        } else {
            console.error("Unkonw IU unit converter", valueKey);
        }
        return 0;
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
        vitamin_A: vm.val(item, "Vitamin A, IU[Output_Value]", "Vitamin A, IU[Output_UOM]"),
        vitamin_B6: vm.val(item, "Vitamin B-6[Output_Value]", "Vitamin B-6[Output_UOM]"),
        vitamin_B12: vm.val(item, "Vitamin B-12[Output_Value]", "Vitamin B-12[Output_UOM]"),
        vitamin_C: vm.val(item, "Vitamin C, total ascorbic acid[Output_Value]", "Vitamin C, total ascorbic acid[Output_UOM]"),
        vitamin_D: vm.val(item, "Vitamin D (D2 + D3)[Output_Value]", "Vitamin D (D2 + D3)[Output_UOM]") + vm.val(item, "Vitamin D[Output_Value]", "Vitamin D[Output_UOM]"),
        calcium: vm.val(item, "Calcium, Ca[Output_Value]", "Calcium, Ca[Output_UOM]"),
        iron: vm.val(item, "Iron, Fe[Output_Value]", "Iron, Fe[Output_UOM]"),
        zinc: vm.val(item, "Zinc, Zn[Output_Value]", "Zinc, Zn[Output_UOM]"),
        phosphorus: vm.val(item, "Phosphorus, P[Output_Value]", "Phosphorus, P[Output_UOM]"),
        magnesium: vm.val(item, "Magnesium, Mg[Output_Value]", "Magnesium, Mg[Output_UOM]"),
        potassium: vm.val(item, "Potassium, K[Output_Value]", "Potassium, K[Output_UOM]"),
        sodium: vm.val(item, "Sodium, Na[Output_Value]", "Sodium, Na[Output_UOM]"),
        chloride: vm.val(item, "Chlorine, Cl[Output_Value]", "Chlorine, Cl[Output_UOM]"),
        iodine: vm.val(item, "Iodine, I[Output_Value]", "Iodine, I[Output_UOM]"),
        _raw: item,
    }
}


App.prototype.visualize = function(data) {
    console.error("Not implemented");
}
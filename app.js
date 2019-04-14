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

    vm.visualize = function(data) {
        var data = vm.preprocessing(data)
        vm.filterCharts = {
            protein: new AreaChart("#chart-protein", data, "protein"),
            carbohydrate: new AreaChart("#chart-carbohydrate", data, "carbohydrate"),
            fat: new AreaChart("#chart-fat", data, "fat"),
            fiber: new AreaChart("#chart-fiber", data, "fiber"),
        };
    }
}


var app = new VisualiseApp();


// app.views.charts
// .polygonChart()
// .id("bar09")
// .dimension(app.data.calm)
// .verticalParameter("value")
// .width($("#chart09").parent().width())
// .height(96)
// .initialBrushExtent(u.bar09)
// .tooltipScale(["not calm","calm"])
// .brushed(brushed)
// .hoverCallback(hover)
// .unhoverCallback(unhover)
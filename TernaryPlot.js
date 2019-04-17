var TernaryPlot = function(domSelection, data, options) {
    var vm = this;
    var height = 600;
    var width = 800;

    var marginLeft = 80;
    var marginTop = 80;
    // var corners = [
	// 	[0+marginLeft, height-marginTop], // a
	// 	[width-marginLeft, height-marginTop], //b 
    //     [(width*0.5), 0+marginTop] 
    // ];

    var corners = [
        [0+marginLeft, 0+marginTop],
        [width-marginLeft, 0+marginTop],
        [(width*0.5), height-marginTop],
    ];

    this.svg = d3.select(domSelection)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")


    
    function coord(arr){
        var a = arr[0], b=arr[1], c=arr[2]; 
        var sum, pos = [0,0];
        sum = a + b + c;
        if(sum !== 0) {
            a /= sum;
            b /= sum;
            c /= sum;
            pos[0] =  corners[0][0]  * a + corners[1][0]  * b + corners[2][0]  * c;
            pos[1] =  corners[0][1]  * a + corners[1][1]  * b + corners[2][1]  * c;
        } else {
            return null;
        }

        return pos;
    }

    _data = _.slice(data, 0, 200).map((d) => {
        sum = d.protein + d.carbohydrate + d.fat;
        if(sum==0) {
            return {coord: null};
        }
        
        return {
            protein: d.protein*100.0/sum,
            carbohydrate: d.carbohydrate*100.0/sum,
            fat: d.fat*100.0/sum,
            coord: coord([d.protein*100.0/sum, d.carbohydrate*100.0/sum, d.fat*100.0/sum]),
            serving_size: d.serving_size,
            name:d.name
        };

    }).filter((d) => d.coord!=null)

    var _largest =  _.maxBy(_data, (d)=> d.serving_size);
    _x = d3.scaleLinear()
    .domain([0, _largest.serving_size]).nice()
    .range([5, 50])
    
    // _ele = this.svg.selectAll("circle")
    // .data(_data)
    // .enter()
    // .append("circle")
    // .attr('r', (d) => {
    //     console.log(d.serving_size, _x(d.serving_size));
    //     return _x(d.serving_size);
    // })
    // .attr('cx', (d) => d.coord[0])
    // .attr('cy', (d) => d.coord[1])

    _ele = this.svg.selectAll("circle")
    .data(_data)
    .enter()
    .append("g")
    .attr("transform", (d, i) => "translate("+(d.coord[0])+","+(d.coord[1])+")")
    .on("mouseover", _mouseover)					
    .on("mouseout", _mouseout)

    _ele.append("circle")
    .attr('r', (d) => _x(d.serving_size))
    
    _ele.append("text")
    .attr("dx", 0)
    .attr("dy", 0)
    .text((d)=>_.capitalize(d.name))
    .style("font-size", "10px")
    .attr("class", "tootip")
    .style("fill", "red")
    .style('display', "none")

    function _mouseover(d) {
        d3.select(this).select(".tootip").style('display', null)
        // d3.select(this).select(".tootip").moveToFront()
        d3.select(this).moveToFront();
    }

    function _mouseout(d) {
        d3.select(this).select(".tootip").style('display', "none")
        d3.select(this).moveToBack();
    }
}
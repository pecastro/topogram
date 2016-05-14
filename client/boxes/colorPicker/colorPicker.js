Template.colorPicker.rendered = function(t){

  selectedColor = this.data.selectedColor;


  var h = 100,
      w = 400,
  	colorOpened = false,
  	paddingX = 10
  	radius = 10;

  var svg = d3.select("svg.colorpicker")
  .attr({
    width: w,
    height: y
  });

  var y = h/2;
  var x = d3.scale.linear().domain([-1, colorScale.length]).range([0, w]);

  svg.append("g")
  	.attr("class","selector")
  	.selectAll("circle")
        .data(colorScale)
        .enter()
        .append("circle")
  		  .attr("class", "color-selector-item")
        .attr("r", radius )
        .attr("cx", paddingX)
        .attr("cy", y)
        .attr("data-color", function(d){return d })
		    .attr("fill", function(d){return d } )
        .on("click",function(d,i) {
          	d3.select(".trigger").attr("fill",d);
          	closeColors();
          	// callback(d);
        })


  // trigger
  svg.append("circle")
  	.attr("class","trigger")
  	.attr("r", radius )
  	.attr("cy", y)
  	.attr("cx", paddingX)
  	.attr("fill", selectedColor)
      .on("click", function(d){
          colorOpened = !colorOpened;
        	if(colorOpened) openColors();
        	else closeColors();
      })

  var openColors = function () {
  	d3.selectAll(".color-selector-item")
        .transition()
        .duration(1000)
        .attr("fill-opacity", 100)
        .attr("cx", function(d,i){
          return radius + x(i);
         });

    	colorOpened = true;
  }

  var closeColors = function () {
  	d3.selectAll(".color-selector-item")
        .transition()
        .duration(1000)
        .attr("fill-opacity", 0)
        .attr("cx", function(d,i){
          return paddingX
         });
    colorOpened = false;
  }

}

Template.colorPicker.helpers({
  colors : function(){
    return colorbrewer.OrRd[8]
  }
})

Template.colorPicker.events = {

  'click .color-selector-item': function(e, template) {
    var color = $(e.currentTarget).data("color");
    console.log(color);
  }
}

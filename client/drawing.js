Canvas = function () {
  var self = this;
  var svg;
  var shapeChoice;
  var line;
  var createSvg = function() {
    svg = d3.select('#canvas').append('svg')
      .attr('width', 650)
      .attr('height',390);
  };
  createSvg();

   self.clear = function() {
     d3.select('svg').remove();
     createSvg();
   };

  self.draw = function(data_line, data_circle, data_rect, data_square, data_ellipse) {
    console.log(svg);
    if ((data_line.length < 1) && (data_circle.length < 1) && (data_rect.length < 1) && (data_square.length < 1) && (data_ellipse.length < 1)) {
      console.log(data_line.length);
      console.log(data_circle.length);
      console.log(data_rect.length);
      self.clear();
      return;
    }
    //shapeChoice = points.findOne({}, {sort: {date: -1, limit: 1}});
    if (svg) {
      // Remember to format the data properly in markPoints
      svg.selectAll('circle').data(data_circle, function(d) { return d._id; })
        .enter().append('circle')
        .attr('r', 10)
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr("stroke-width", function (d) { return d.w; })
        .attr('stroke', function (d) { return d.c; })
        .attr('fill', function (d) { return d.f; });

      svg.selectAll('line').data(data_line, function(d) { return d._id; })
        .enter().append('line')
        .attr('x1', function (d) { return d.x; })
        .attr('y1', function (d) { return d.y; })
        .attr('x2', function (d) { return d.x1; })
        .attr('y2', function (d) { return d.y1; })
        .attr('stroke-width', function (d) { return d.w; })
        .attr("stroke", function (d) { return d.c; })
        .attr("stroke-linejoin", "round");
  
      svg.selectAll('rect').data(data_rect, function(d) { return d._id; })
        .enter().append('rect')
        .attr('width', 80)
        .attr('height', 40)
        .attr('x', function(d) { return d.x; })
        .attr('y', function(d) { return d.y; })
        .attr('stroke-width', function (d) { return d.w; })
        .attr('stroke', function (d) { return d.c; })
        .attr('fill', function (d) { return d.f; });

      svg.selectAll('rect').data(data_square, function(d) { return d._id; })
        .enter().append('rect')
        .attr('width', 50)
        .attr('height', 50)
        .attr('x', function(d) { return d.x; })
        .attr('y', function(d) { return d.y; })
        .attr('stroke-width', function (d) { return d.w; })
        .attr('stroke', function (d) { return d.c; })
        .attr('fill', function (d) { return d.f; });

      svg.selectAll('ellipse').data(data_ellipse, function(d) { return d._id; })
        .enter().append('ellipse')
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('rx', 80)
        .attr('ry', 40)
        .attr('stroke-width', function (d) { return d.w; })
        .attr('stroke', function (d) { return d.c; })
        .attr('fill', function (d) { return d.f; });

    } // end of the if(svg) statement
  }; // end of the canvas.draw function
} //end of the canvas function

points = new Meteor.Collection('pointsCollection');
var canvas;

// we use these for drawing more interesting shapes
var lastX=0;
var lastY=0;
var strokeWidth = 1;
var thickness=1;
var strokeColor = "black";
var shape = "";
var fillColor = "white";
var data_line, data_circle, data_rect, data_square, data_ellipse;

Meteor.startup(function () {
  canvas = new Canvas();

 Deps.autorun( function() {
    data_line = points.find({s:"line"}).fetch();
    data_circle = points.find({s:"circle"}).fetch();
    data_rect = points.find({s:"rect"}).fetch();
    data_square = points.find({s:"square"}).fetch();
    data_ellipse = points.find({ s:"ellipse"}).fetch();
  if (canvas) {
      canvas.draw(data_line, data_circle, data_rect, data_square, data_ellipse);
    }
  });
});

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render("navbar", {to:"header"});
  this.render("welcome_page", {to:"main"});
});

Router.route('home', function () {
  this.render("navbar", {to:"header"});
  this.render("welcome_page", {to:"main"});
});

Router.route('drawing_page', function () {
  this.render("navbar", {to:"header"});
  this.render("wall", {to:"main"});
});

Template.wall.events({

  "click .js-start": function() {
    canvas.clear();
    lastX=0;
    lastY=0;
    if (Session.get('draw')) {
      markPoint();
    }
  },

  "click .js-clear": function (event) {
    Meteor.call('clear', function() {
      canvas.clear();
    });
  },

  //choose a color. Initialise the last vals, otherwise a stray line will appear.

  "click .js-red": function () {
    lastX=0;
    lastY=0;
    strokeColor = "red";
  },

  "click .js-black": function () {
    lastX=0;
    lastY=0;
    strokeColor = "black";
  },

  "click .js-blue": function () {
    lastX=0;
    lastY=0;
    strokeColor = "blue";
  },

  "click .js-green": function () {
    lastX=0;
    lastY=0;
    strokeColor = "green";
  },

  "click .js-yellow": function () {
    lastX=0;
    lastY=0;
    strokeColor = "yellow";
  },

  "click .js-brown": function () {
    lastX=0;
    lastY=0;
    strokeColor = "brown";
  },

  "click .js-purple": function () {
    lastX=0;
    lastY=0;
    strokeColor = "purple";
  },

  "click .js-aqua": function () {
    lastX=0;
    lastY=0;
    strokeColor = "aqua";
  },

  "click .js-grey": function () {
    lastX=0;
    lastY=0;
    strokeColor = "gray";
  },

  "click .js-pink": function () {
    lastX=0;
    lastY=0;
    strokeColor = "deeppink";
  },

  "click .js-lgreen": function () {
    lastX=0;
    lastY=0;
    strokeColor = "lightgreen";
  },

  "click .js-orange": function () {
    lastX=0;
    lastY=0;
    strokeColor = "orange";
  },

  "click .js-linen": function () {
    lastX=0;
    lastY=0;
    strokeColor = "linen";
  },

  "click .js-tomato": function () {
    lastX=0;
    lastY=0;
    strokeColor = "tomato";
  },

  "click .js-burlywood": function () {
    lastX=0;
    lastY=0;
    strokeColor = "burlywood";
  },

  "click .js-navy": function () {
    lastX=0;
    lastY=0;
    strokeColor = "navy";
  },

  "click .js-redF": function () {
    lastX=0;
    lastY=0;
    fillColor = "red";
  },

  "click .js-blackF": function () {
    lastX=0;
    lastY=0;
    fillColor = "black";
  },

  "click .js-whiteF": function () {
    lastX=0;
    lastY=0;
    fillColor = "white";
  },

  "click .js-blueF": function () {
    lastX=0;
    lastY=0;
    fillColor = "blue";
  },

  "click .js-greenF": function () {
    lastX=0;
    lastY=0;
    fillColor = "green";
  },

  "click .js-yellowF": function () {
    lastX=0;
    lastY=0;
    fillColor = "yellow";
  },

  "click .js-brownF": function () {
    lastX=0;
    lastY=0;
    fillColor = "brown";
  },

  "click .js-purpleF": function () {
    lastX=0;
    lastY=0;
    fillColor = "purple";
  },

  "click .js-aquaF": function () {
    lastX=0;
    lastY=0;
    fillColor = "aqua";
  },

  "click .js-greyF": function () {
    lastX=0;
    lastY=0;
    fillColor = "gray";
  },

  "click .js-pinkF": function () {
    lastX=0;
    lastY=0;
    fillColor = "deeppink";
  },

  "click .js-lgreenF": function () {
    lastX=0;
    lastY=0;
    fillColor = "lightgreen";
  },

  "click .js-orangeF": function () {
    lastX=0;
    lastY=0;
    fillColor = "orange";
  },

  "click .js-linenF": function () {
    lastX=0;
    lastY=0;
    fillColor = "linen";
  },

  "click .js-tomatoF": function () {
    lastX=0;
    lastY=0;
    fillColor = "tomato";
  },

  "click .js-burlywoodF": function () {
    lastX=0;
    lastY=0;
    fillColor = "burlywood";
  },

  "click .js-navyF": function () {
    lastX=0;
    lastY=0;
    fillColor = "navy";
  },

  "click .js-thicker": function () {
    thickness+=1;
  },

  "click .js-thinner": function () {
    if (thickness > 0) {
      thickness-=1;
    }
  },

  "click .js-circle": function () {
    shape = "circle";
  },

  "click .js-line": function () {
    lastX=0;
    lastY=0;
    shape = "line";
  },

  "click .js-rectangle": function() {
    shape = "rect";
  },

  "click .js-square": function() {
    shape = "square";
  },

  "click .js-ellipse": function() {
    shape = "ellipse";
  }

})

var markPoint = function() {

  var offset = $('#canvas').offset();

// In the first frame, lastX and lastY are 0.
// This means the line gets drawn to the top left of the screen
// Which is annoying, so we test for this and stop it happening.

      if (lastX==0) {// check that x was something not top-left. should probably set this to -1
        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);
      }
      points.insert({
        //this draws a point exactly where you click the mouse
      // x: (event.pageX - offset.left),
      // y: (event.pageY - offset.top)});


        //We can do more interesting stuff
        //We need to input data in the right format
        //Then we can send this to d3 for drawing


        //1) Algorithmic mouse follower
      // x: (event.pageX - offset.left)+(Math.cos((event.pageX/10  ))*30),
      // y: (event.pageY - offset.top)+(Math.sin((event.pageY)/10)*30)});
        date: new Date(),
        //2) draw a line - requires you to change the code in drawing.js
        x: (event.pageX - offset.left),
        y: (event.pageY - offset.top),
        x1: lastX,
        y1: lastY,
        // We could calculate the line thickness from the distance
        // between current position and last position
        //w: 0.05*(Math.sqrt(((event.pageX - offset.left)-lastX) * (event.pageX - offset.left)
        //  + ((event.pageY - offset.top)-lastY) * (event.pageY - offset.top))),
        // Or we could just set the line thickness using buttons and variable
        w: thickness,
        // We can also use strokeColor, defined by a selection
        c: strokeColor,
        s: shape,
        f: fillColor
      }); // end of points.insert()

        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);

}

Template.canvas.events({
  'click': function (event) {
    markPoint();
  },
  'mousedown': function (event) {
    Session.set('draw', true);
  },
  'mouseup': function (event) {
    Session.set('draw', false);
    lastX=0;
    lasyY=0;
  },
  'mousemove': function (event) {
    if (Session.get('draw')) {
      markPoint();
    }
  }
});

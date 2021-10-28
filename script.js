(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
    || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
     var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    }
  }
  
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
  
}());

// Properties
var ball = $('#ball');
var xMin = 0;
var xMax = $(window).height() - ball.height();
var pos = 0;
var dir = 1;
var speed = 8;
var fps = 60;
var interval = 1000 / fps;

// Animation
function draw() {
  setTimeout(function() {
    window.requestAnimationFrame(draw);
    
    pos = ball.position().top;
    if (pos > xMax || pos < xMin) {
      dir *= -1;
    }
    
    pos += (dir * speed);
    ball.css('top', pos + 'px');
  }, interval);
}

draw();
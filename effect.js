$.fn.lightSource = function(options) {
    var settings = $.extend({
      blur: 5,
      distanceBlur: true,
      distanceBlurAmount: 20,
      viewport: $('.viewport'),
      target: this,
      intensity: 5,
      opacity: 0.8,
      offsetX: 0,
      offsetY: 0
    }, options);

    var shadowValue = 'drop-shadow('+ settings.offsetX + 'px ' + settings.offsetY + 'px ' + settings.blur + 'px rgba(0,0,0,'+ settings.opacity +'))';

    settings.target.css({
      filter: shadowValue,
      webkitFilter: shadowValue
    });

    settings.viewport.mousemove(function(event) {
      var x = event.pageX - settings.viewport.offset().left;
      var y = event.pageY - settings.viewport.offset().top;
      var xCenter = settings.viewport.width() / 2;
      var yCenter = (settings.viewport.outerHeight() / 2);
      var distanceFromCenterX = ((x - xCenter) / settings.intensity) + settings.offsetX;
      var distanceFromCenterY = ((y - yCenter) / settings.intensity) + settings.offsetY;
      var xDistance = distanceFromCenterX > 0 ? distanceFromCenterX : -distanceFromCenterX;
      var yDistance = distanceFromCenterY > 0 ? distanceFromCenterY : -distanceFromCenterY;
      var xyAvg = (xDistance + yDistance) / 4;
      var distanceBlur = settings.distanceBlur == true ? settings.blur + (xyAvg/settings.distanceBlurAmount) : settings.blur;
      var shadowValue = 'drop-shadow('+ (-distanceFromCenterX) + 'px ' + (-distanceFromCenterY) + 'px ' + distanceBlur + 'px rgba(0,0,0,'+ settings.opacity +'))';

      settings.target.css({
        filter: shadowValue,
        webkitFilter: shadowValue
      });
    });

    return this;
  }

$(document).ready(function() {
  $('.text').lightSource({distanceBlur: true, blur: 2, intensity: 5, distanceBlurAmount: 10, opacity: 0.3});
});

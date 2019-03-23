/* -----------------------------------------------------
  Material Design Buttons
  https://codepen.io/rkchauhan/pen/NNKgJY
  By: Ravikumar Chauhan
  Find me on -
  Twitter: https://twitter.com/rkchauhan01
  Facebook: https://www.facebook.com/ravi032chauhan
  GitHub: https://github.com/rkchauhan
  CodePen: https://codepen.io/rkchauhan
-------------------------------------------------------- */
$(document).ready(function() {
  $('.ripple-effect').rkmd_rippleEffect();
});

(function($) {
  $.fn.rkmd_rippleEffect = function() {
    var btn, self, ripple, size, rippleX, rippleY, eWidth, eHeight;

    btn = $(this).not('[disabled], .disabled');

    btn.on('mousedown', function(e) {
      self = $(this);

      // Disable right click
      if(e.button === 2) {
        return false;
      }

      if(self.find('.ripple').length === 0) {
        self.prepend('<span class="ripple"></span>');
      }
      ripple = self.find('.ripple');
      ripple.removeClass('animated');

      eWidth = self.outerWidth();
      eHeight = self.outerHeight();
      size = Math.max(eWidth, eHeight);
      ripple.css({'width': size, 'height': size});

      rippleX = parseInt(e.pageX - self.offset().left) - (size / 2);
      rippleY = parseInt(e.pageY - self.offset().top) - (size / 2);

      ripple.css({ 'top': rippleY +'px', 'left': rippleX +'px' }).addClass('animated');

      setTimeout(function() {
        ripple.remove();
      }, 800);

    });
  };
}(jQuery));
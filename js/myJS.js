$(document).ready(function(){
  $('.owl-brands').owlCarousel({
      loop:true,
      margin:10,
      responsiveClass:true,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      responsive:{
          0:{
              items:2,
              nav:false
          },
          600:{
              items:3,
              nav:false
          },
          1000:{
              items:6,
              nav:true,
              loop:false
          }
      }
  })
});

$(document).ready(function(){
  $('.owl-banner-slider').owlCarousel({
      loop:true,
      responsiveClass:true,
      responsive:{
          0:{
              items:1,
              nav:true
          },
          600:{
              items:1,
              nav:false
          },
          1000:{
              items:1,
              nav:true,
              loop:false
          }
      }
  })
});

$(document).ready(function(){
  $('.owl_field_work').owlCarousel({
      loop:true,
      margin:30,
       navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
      responsiveClass:true,
      responsive:{
          0:{
              items:1,
              nav:true
          },
          600:{
              items:2,
              nav:false
          },
          1000:{
              items:4,
              nav:true,
              loop:false
          }
      }
  })
});

// Slide nav field worrk //
(function ($){

    $.fn.extend({
        slider: function (options) {
            return this.each(function () {

                var sliderContainer = $(this);
                var slider = $('ul', sliderContainer);
                var sliderElements = $('li', slider);
                var slideCount = sliderElements.length;
                var slideAnimating = false;
                var slideIndex = 0;

                options = $.extend({}, options);

                var backEl = $('#' + options.slideBackId);
                var nextEl = $('#' + options.slideNextId);
                var moveToIndex = options.moveToIndex || 0;
                if (moveToIndex < 0) moveToIndex = 0;
                if (moveToIndex > slideCount - 1) moveToIndex = slideCount - 1;

                backEl.click(function () {
                    slideBack();
                });

                nextEl.click(function () {
                    slideNext();
                });

                if (slideIndex < moveToIndex) {
                    moveTo(moveToIndex);
                }

                function moveTo(index) {
                    if (slideIndex >= index) return;

                    var sliderLeft = parseInt(slider.css("left"));
                    var containerWidth = sliderContainer.width();

                    var lastEl = sliderElements.last();
                    var lastPos = lastEl.position();
                    var lastWidth = getElementWidth(lastEl);

                    for (var i = 0; i < index; i++) {
                        var el = sliderElements.eq(i);
                        var width = getElementWidth(el);

                        sliderLeft -= width;

                        if (sliderLeft + lastPos.left + lastWidth <= containerWidth) {

                            slideIndex = i;

                            sliderLeft = (containerWidth - (lastPos.left + lastWidth));

                            break;
                        }
                    }

                    if (slideIndex > 0) {
                        slider.css("left", sliderLeft + "px");
                    }
                }

                function slideBack() {
                    if (slideIndex < 0 || slideAnimating) return;
                    slideAnimating = true;

                    var sliderLeft = parseInt(slider.css("left"));

                    var el = sliderElements.eq(slideIndex);
                    var width = getElementWidth(el);

                    if (sliderLeft + width >= 0) {
                        width = -sliderLeft;
                    }

                    if (width <= 0) {
                        slideAnimating = false;
                        return;
                    }

                    slider.animate({ left: '+=' + width }, 350, function () {
                        slideIndex--;
                        slideAnimating = false;
                    });
                }

                function getElementWidth(el) {
                    var width = el.outerWidth() + parseInt(el.css("marginLeft")) + parseInt(el.css("marginRight"));
                    return width;
                }

                function getTotalChildWidth(children) {
                    var width = 0;
                    children.each(function () {
                        width += getElementWidth($(this));
                    });

                    return width;
                }

                function slideNext() {
                    if (slideIndex >= slideCount || slideAnimating) return;
                    slideAnimating = true;

                    var sliderLeft = parseInt(slider.css("left"));
                    var containerWidth = sliderContainer.width();

                    var lastEl = sliderElements.last();
                    var lastPos = lastEl.position();
                    var lastWidth = getElementWidth(lastEl);

                    var el = sliderElements.eq(slideIndex);
                    var width = getElementWidth(el);

                    if (sliderLeft + lastPos.left + lastWidth - width <= containerWidth) {
                        width = (sliderLeft + lastPos.left + lastWidth - containerWidth);
                    }

                    if (width <= 0) {
                        slideAnimating = false;
                        return;
                    }

                    slider.animate({ left: '-=' + width }, 350, function () {
                        slideIndex++;
                        slideAnimating = false;
                    });
                }

         });
        }
    });
})(jQuery);

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function() {

  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  var slidesPerPage = 3; //globaly define number of elements per page
  var syncedSecondary = true;

  sync1.owlCarousel({
    items : 1,
    slideSpeed : 2000,
    nav: false,
    autoplay: true,
    dots: false,
    loop: true,
    // responsiveRefreshRate : 200,
  }).on('changed.owl.carousel', syncPosition);

  sync2
    .on('initialized.owl.carousel', function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
    items : slidesPerPage,
    dots: false,
    nav: false,
    smartSpeed: 200,
    slideSpeed : 500,
    slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
    responsiveRefreshRate : 100,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:false
        },
        600:{
            items:1,
            nav:false
        },
        1000:{
            items:3,
            nav:false,
            dots:false,
            loop:false
        }
    }
  }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;

    //if you disable loop you have to comment this block
    var count = el.item.count-1;
    var current = Math.round(el.item.index - (el.item.count/2) - .5);

    if(current < 0) {
      current = count;
    }
    if(current > count) {
      current = 0;
    }

    //end block

    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();

    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if(syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }

  sync2.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });
});

// Menu mobile
$(document).ready(function() {
  $('.menu_mobile_button').click(function(){
    $('.menu_mobile_list').slideToggle('1000');
  });
  $('.menu_mobile_list_inner').find('.menu_mobile_list_submenu').hide();
  $('.menu_mobile_list_inner').find('.fa-icon-action').click(function(){
      var next = $(this).next();
      next.slideToggle('300');
    $('.menu_mobile_list_submenu').not(next).slideUp('fast');
  return false;
  });
  $('.menu_mobile_list_inner').click(function(){
    $('.fa-icon-action').removeClass('.active');
    $(this).toggleClass('active');
  });
});

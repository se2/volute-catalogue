jQuery(document).ready(function($) {
	// Global variables
	var speed = 1200,
			autoplaySpeed = 4000,
			viewportWidth = $(window).width(),
			viewportHeight = $(window).height();;

	// DOM elements
	var $homeSlider = $('.home-slider'),
			$toolSlider = $('.tool--infobox-slider'),
			$toolsList = $('ul.tools'),
			$toolSingle = $('li.tool'),
			$toolInfoBox = $('.tool--infobox'),
			$scrollDown = $('.scroll-down');

	// Home Slider
	$homeSlider.slick({
		autoplay: true,
		infinite: true,
		slidesToShow: 1,
		dots: true,
		arrows: true,
		speed: speed,
		autoplaySpeed: autoplaySpeed,
		fade: true,
		pauseOnHover: true,
	});

	// Tool slider
	$toolSlider.slick({
		autoplay: true,
		infinite: true,
		slidesToShow: 1,
		dots: false,
		arrows: false,
		speed: speed,
		autoplaySpeed: autoplaySpeed,
		fade: true,
	});

	// Tool effect on hover
	$toolsList.hover(
		function() {
			$(this).addClass('tools__hover');
		},
		function() {
			$(this).removeClass('tools__hover');
		}
	);

	// Tool item on click
	$toolSingle.bind('click', function() {
		$(this).parents().eq(2).find('.tool--infobox').addClass('tool--infobox__active');
		$(this).removeClass('tool__not-selected').addClass('tool__selected');
		$(this).siblings().removeClass('tool__selected').addClass('tool__not-selected');
		if (viewportWidth >= 1024) {
			$('html, body').animate({ scrollTop: $($(this).data('url')).offset().top }, 'slow');
		}
	});

	// Close info box
	$('.js-tool--infobox-close').bind('click', function(e) {
		e.preventDefault();
		$(this).parent().removeClass('tool--infobox__active');
		$(this).parents().find('ul.tools').find('li.tool__selected').removeClass('tool__selected');
		$(this).parents().find('ul.tools').find('li.tool__not-selected').removeClass('tool__not-selected');
	});

	// scroll down
	$scrollDown.bind('click', function(e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 'slow');
	});
});

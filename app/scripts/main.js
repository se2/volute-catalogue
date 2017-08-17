jQuery(document).ready(function($) {
	// Global variables
	var speed = 1200,
			autoplaySpeed = 4000;

	// DOM elements
	var $homeSlider = $('.home-slider'),
			$toolSlider = $('.tool--infobox-slider'),
			$toolsList = $('ul.tools'),
			$toolSingle = $('li.tool'),
			$toolInfoBox = $('.tool--infobox');

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
			if (!$(this).parents('.tools-wrapper').find('.tool--infobox').hasClass('tool--infobox__active')) {
				$(this).addClass('tools__hover');
			}
		},
		function() {
			$(this).removeClass('tools__hover');
		}
	);

	// Tool item on click
	$toolSingle.bind('click', function() {
		$(this).parents().eq(2).find('.tool--infobox').addClass('tool--infobox__active');
		$(this).parents().find('ul.tools').removeClass('tools__hover');
	});

	$('.js-tool--infobox-close').bind('click', function(e) {
		e.preventDefault();
		$(this).parent().removeClass('tool--infobox__active');
	});

});

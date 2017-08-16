jQuery(document).ready(function($) {
	// DOM elements
	var $homeSlider = $('.home-slider'),
			$tools = $('.grid');

	// Home Slider
	$homeSlider.slick({
		autoplay: true,
		infinite: true,
		slidesToShow: 1,
		dots: true,
		arrows: true,
		speed: 1200,
		autoplaySpeed: 4000,
		fade: true,
		pauseOnHover: true,
	});

	// $tools.isotope({
	//   itemSelector: '.grid-item',
	//   layoutMode: 'fitRows'
	// });
});
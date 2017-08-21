jQuery(document).ready(function($) {
	// Global variables
	var speed = 1200,
			autoplaySpeed = 4000,
			viewportWidth = $(window).width(),
			viewportHeight = $(window).height();;

	// DOM elements
	var $homeSlider = $('.home-slider'),
			$toolSlider = $('.tool--infobox-slider'),
			$toolSliderMobile = $('.tool--infobox-slider__mobile'),
			$toolsList = $('ul.tools'),
			$toolSingle = $('li.tool'),
			$toolInfoBox = $('.tool--infobox'),
			$scrollDown = $('.scroll-down');

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
		mobileFirst: true
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

	var trimByWord = function(sentence, words) {
	  var result = sentence;
	  var resultArray = result.split(' ');
	  if (resultArray.length > words) {
	    resultArray = resultArray.slice(0, words);
	    result = resultArray.join(' ') + '... <a href="#" class="tool--readmore"><strong>read more</strong></a>';
	  }
	  return result;
	}

	// Tool item on click
	$toolSingle.bind('click', function() {
		var url = $(this).data('url'),
				id = $(this).data('id'),
				offsetHeight = 0,
				$currentRow = $('#row-' + url);

		if (viewportWidth > 768) {
			$('li.tool').removeClass('tool__selected').removeClass('tool__not-selected');
			$('.tool--infobox').removeClass('tool--infobox__active');
			$(this).parents().eq(2).find('.tool--infobox').addClass('tool--infobox__active');
			$(this).removeClass('tool__not-selected').addClass('tool__selected');
			$(this).siblings().removeClass('tool__selected').addClass('tool__not-selected');
		} else {
			$('.tool--infobox__mobile').addClass('tool--infobox__mobile__active');

			// Tool mobile slider
			$toolSliderMobile.not('.slick-initialized').slick({
				autoplay: true,
				infinite: true,
				slidesToShow: 1,
				dots: false,
				arrows: false,
				speed: speed,
				autoplaySpeed: autoplaySpeed,
				fade: true,
				mobileFirst: true
			});
		}

		// recalcualte offset change
		for (var i = 0; i < parseInt(url); i++) {
			if (typeof $('#row-' + i + ' .tool--infobox-slider-wrapper').height() != 'undefined') {
				offsetHeight += $('#row-' + i + ' .tool--infobox-slider-wrapper').height() - 1; // account for min-height: 1px;
			}
		}

		// scroll to view
		if (viewportWidth > 1024) {
			$('html, body').animate({ scrollTop: $('#row-' + url + ' .tool--infobox-slider-wrapper').offset().top - 90 - 60 - offsetHeight }, 1200);
		} else if (viewportWidth > 768 && viewportWidth == 1024) {
			$('html, body').animate({ scrollTop: $('#row-' + url + ' .tool--infobox-slider-wrapper').offset().top - 120 - 60 - offsetHeight }, 1200);
		}

		// get data
		$.getJSON('tools.json', function(data) {
			var toolData = data[id - 1],
					metadata =  '<strong>Author:</strong> ' + toolData.author + ' <br>' +
											'<strong>Developers:</strong> ' + toolData.developers.join(', ') + ' <br>' +
											'<strong>Category:</strong> ' + toolData.category.join(', ') + ' <br>' +
											'<strong>Release:</strong> ' + toolData.release + ' <br>' +
											'<strong>Version:</strong> ' + toolData.version + ' <br>';

			if (typeof toolData.related != 'undefined' && toolData.related.length > 0) {
				metadata += '<strong><i class="fa fa-puzzle-piece" aria-hidden="true"></i>:</strong> ' + toolData.related.join(', ') + ' <br>';
			}

			metadata += '<i class="fa fa-mobile" aria-hidden="true"></i>&nbsp;&nbsp;' +
						  		'<i class="fa fa-tablet" aria-hidden="true"></i>&nbsp;&nbsp;' +
						  		'<i class="fa fa-desktop" aria-hidden="true"></i> <br>';

			if (viewportWidth > 768) {
				$currentRow.find('.tool--infobox-metadata h1 strong').html(toolData.name);
				$currentRow.find('.tool--infobox-metadata p.tool--description').html(toolData.description);
				$currentRow.find('.tool--infobox-metadata p.tool--metadata').html(metadata);
			} else {
				var $popupMobile = $('.tool--infobox__mobile');
				$popupMobile.find('.tool--infobox-metadata h1 strong').html(toolData.name);
				$popupMobile.find('.tool--infobox-metadata p.tool--description').html(toolData.description);
				$popupMobile.find('.tool--infobox-metadata p.tool--metadata').html(metadata);
			}
		});
	});

	// Close info box
	$('.js-tool--infobox-close').bind('click', function(e) {
		var currentRow = '#' + $(this).data('row');

		e.preventDefault();
		$(this).parent().removeClass('tool--infobox__active');
		$(currentRow).find('ul.tools').find('li.tool__selected').removeClass('tool__selected');
		$(currentRow).find('ul.tools').find('li.tool__not-selected').removeClass('tool__not-selected');

		// mobile
		$('.tool--infobox__mobile').removeClass('tool--infobox__mobile__active');
	});

	// scroll down
	$scrollDown.bind('click', function(e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 'slow');
	});
});

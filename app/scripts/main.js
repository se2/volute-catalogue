jQuery(document).ready(function($) {
	// Global variables
	var speed = 1200,
			autoplaySpeed = 4000,
			viewportWidth = $(window).width(),
			viewportHeight = $(window).height();

	// DOM elements
	var $homeSlider = $('.home-slider'),
			$toolSlider = $('.tool--infobox-slider'),
			$toolSliderMobile = $('.tool--infobox-slider__mobile'),
			$toolsList = $('ul.tools'),
			$toolSingle = $('li.tool'),
			$toolInfoBox = $('.tool--infobox');

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

		// recalcualte offset change
		for (var i = 0; i < parseInt(url); i++) {
			if (typeof $('#row-' + i + ' .tool--infobox').outerHeight() != 'undefined') {
				offsetHeight += $('#row-' + i + ' .tool--infobox').outerHeight() - 1; // account for min-height: 1px;
			}
		}

		// scroll to view
		if (viewportWidth > 1024) {
			$('html, body').animate({ scrollTop: $('#row-' + url + ' .tool--infobox').offset().top - 90 - 60 - offsetHeight }, 1200);
		} else if (viewportWidth > 768 && viewportWidth == 1024) {
			$('html, body').animate({ scrollTop: $('#row-' + url + ' .tool--infobox').offset().top - 120 - 60 - offsetHeight }, 1200);
		}

		if (viewportWidth > 768) {

			$('li.tool').removeClass('tool__selected').removeClass('tool__not-selected');
			$('.tool--infobox').removeClass('tool--infobox__active');
			$currentRow.find('.tool--infobox').addClass('tool--infobox__active');
			$(this).removeClass('tool__not-selected').addClass('tool__selected');
			$(this).siblings().removeClass('tool__selected').addClass('tool__not-selected');

		} else {
			$('.tool--infobox__mobile').addClass('tool--infobox__mobile__active');
		}

		// get data
		var toolData = _.filter(toolsData, function(o) { return (o.id == parseInt(id)); })[0],
				images = '',
				metadata =  '<strong>Author:</strong> ' + toolData.author + ' <br>' +
										'<strong>Developer(s):</strong> ' + toolData.developers.join(', ') + ' <br>' +
										'<strong>Tags:</strong> ' + toolData.category.join(', ') + ' <br>' +
										'<strong>Release:</strong> ' + toolData.release + ' <br>' +
										'<strong>Version:</strong> ' + toolData.version + ' <br>';

		if (typeof toolData.related != 'undefined' && toolData.related.length > 0) {
			metadata += '<strong><i class="fa fa-puzzle-piece" aria-hidden="true"></i></strong> ' + toolData.related.join(', ') + ' <br>';
		}

		metadata += '<i class="fa fa-mobile" aria-hidden="true"></i>&nbsp;&nbsp;' +
					  		'<i class="fa fa-tablet" aria-hidden="true"></i>&nbsp;&nbsp;' +
					  		'<i class="fa fa-desktop" aria-hidden="true"></i> <br>';

		if (typeof toolData.screenshots != 'undefined' && toolData.screenshots.length > 0) {
			for (var i = 0; i < toolData.screenshots.length; i++) {
				var current = (i == 0) ? 'tool--infobox-slider--item__current' : '';
				images += '<div class="tool--infobox-slider--item ' + current + '" style="background-image:url(\'' + '../images/tools/screenshots/' + toolData.screenshots[i] + '\')"></div>';
			}
		}

		if (viewportWidth > 768) {
			$currentRow.find('.tool--infobox-metadata h1 strong').html(toolData.name);
			$currentRow.find('.tool--infobox-metadata p.tool--description').html(toolData.description);
			$currentRow.find('.tool--infobox-metadata p.tool--metadata').html(metadata);
      $currentRow.find('.tool--infobox-slider').html(images);
      var height = $currentRow.find('.tool--infobox-metadata').outerHeight();

      $currentRow.find('.tool--infobox-slider-wrapper').height(height);
    } else {
      var $popupMobile = $('.tool--infobox__mobile');
      $popupMobile.find('.tool--infobox-metadata h1 strong').html(toolData.name);
      $popupMobile.find('.tool--infobox-metadata p.tool--description').html(toolData.description);
      $popupMobile.find('.tool--infobox-metadata p.tool--metadata').html(metadata);
			$popupMobile.find('.tool--infobox-slider').html(images);
		}

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

	// quick search regex
	// var qsRegex;

	// init Isotope
	// var $grid = $('#row-1 .grid').isotope({
	//   itemSelector: '.grid-item',
	//   layoutMode: 'fitRows',
	//   filter: function() {
	//     return qsRegex ? $(this).text().match(qsRegex) : true;
	//   }
	// });

	// use value of search field to filter
	// var $quicksearch = $('.search-field').keyup(debounce(function() {
	//   qsRegex = new RegExp($quicksearch.val(), 'gi');
	//   $grid.isotope();
	// }, 200));

	// debounce so filtering doesn't happen every millisecond
	function debounce(fn, threshold) {
	  var timeout;
	  return function debounced() {
	    if (timeout) {
	      clearTimeout(timeout);
	    }

	    function delayed() {
	      fn();
	      timeout = null;
	    }
	    timeout = setTimeout(delayed, threshold || 100);
	  }
	}

});

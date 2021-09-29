$(document).ready(function () {
	$('.slider-container').slick({
		dots: false,
		arrows: true,
		centerMode: false,
		infinite: true,
		speed: 300,
		fade: true,
		centerPadding: '60px',
		slidesToShow: 1,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					arrows: false,
					// centerMode: true,
					// centerPadding: '40px',
					// slidesToShow: 3,
				},
			},
		],
	});
});

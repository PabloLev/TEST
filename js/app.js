$(document).ready(function () {
	$('.slider-container').slick({
		dots: false,
		arrows: false,
		centerMode: true,
		infinite: true,
		speed: 300,
		fade: true,
		centerPadding: '60px',
		slidesToShow: 1,
		mobileFirst: true,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					arrows: true,
					// centerMode: true,
					// centerPadding: '40px',
					// slidesToShow: 3,
				},
			},
		],
	});
});

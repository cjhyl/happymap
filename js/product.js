$(function(){
	leftNav.init();
	var productSwiper = new Swiper('.swiper-container', {
	  autoplay: {
	    delay: 3000,
	    stopOnLastSlide: false,
	    disableOnInteraction: false,
	  },
	  pagination: {
	    el: '.swiper-pagination',
	    clickable: true,
	  },
	});
});
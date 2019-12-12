$(function(){
	var hideTimer;
	$(window).on('resize',function(){
		clearTimeout(hideTimer);
		hideTimer=setTimeout(function(){
			if($('body').width()>767){
				$('.navList').hide();
			}
		},200);
	});
	$('.navBtn').on('click',function(){
		var list=$('.navList');
		if(list.css('display')=='none'){
			list.show();
		}else{
			list.hide();
		}
	});
});

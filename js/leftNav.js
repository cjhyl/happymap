var leftNav={
	init:function(){
		if($('.leftNav').length<0){
			return;
		}
		var that=this;
		this.$el=$('.leftNav');
		this.$list=this.$el.children('li');
		this.targets=[];
		this.$list.each(function(){
			that.targets.push($('#'+$(this).attr('data-target')));
		});
		this.scrollTimer=null;
		this.posChange();
		$(window).on('scroll',function(e){
			clearTimeout(that.scrollTimer);
			that.scrollTimer=setTimeout(function(){
				that.posChange();
			},100);
		});
		this.$list.on('click',function(){
			that.changePosTo($(this).attr('data-target'));
		});
	},
	posChange:function(){
		var sTop=$(window).scrollTop();
		var index=0;
		for(var i=0;i<this.targets.length;i++){
			if(this.targets[i].offset().top-120<sTop){
				index=i;
			}
		}
		this.selectNav(index);
	},
	changePosTo:function(targetId){
		var targetTop=$('#'+targetId).offset().top;
		$('html, body').animate({'scrollTop':(targetTop-100)+'px'})
	},
	selectNav:function(index){
		this.$list.each(function(idx,ele){
			if(idx==index){
				$(ele).addClass('sel');
			}else{
				$(ele).removeClass('sel');
			}
		});
	}
}
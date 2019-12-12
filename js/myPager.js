/**
 * Fun:分页设置
 * @$ele:分页控件父元素的jq对象
 * @obj:配置属性 maxPage:num总页数 first:bool首页 last:bool尾页 showTotal:bool页数统计 go:bool跳转 callback:func回调函数返回页数
 */
function MyPager($ele,obj){
	this.pagerTimer=null;
	this.config=obj;
	this.$el=$ele;
	var that=this;
	var tempPage=3;
    if(obj.maxPage<3){
        tempPage=obj.maxPage;
    }
    //页面加载
    var thisPageHtml = '';
    var align='';
    if(obj.align=='center'){align='style="text-align:center;"'}
    if(obj.align=='right'){align='style="text-align:right;"'}
    thisPageHtml +='<div class="common_pageBK" '+align+'>';
    if(obj.first){
    	thisPageHtml +='<div class="common_page_first disabled">首页</div>';
    }
    thisPageHtml +='<div class="common_page_up disabled">上一页</div>';
	thisPageHtml +='<div class="common_page_LPoint" style="display:none">…</div>';
    for(var i = 1;i<=tempPage;i++){
        if(i == 1){
            thisPageHtml +='<div class="common_page_number common_page_number_sel">'+i+'</div>';
        }else{
            thisPageHtml +='<div class="common_page_number">'+i+'</div>';
        }
    }
	thisPageHtml +='<div class="common_page_RPoint" style="display:none">…</div>';
    thisPageHtml +='<div class="common_page_down">下一页</div>';
    if(obj.last){
    	thisPageHtml +='<div class="common_page_last">尾页</div>';
    }
    if(obj.showTotal){
    	thisPageHtml +='<div class="common_page_sum">共<span>'+obj.maxPage+'</span>页</div>';
    }
    if(obj.go){
    	thisPageHtml +='<input type="text" class="common_page_input_number" value="1"/>';
		thisPageHtml +='<div class="common_page_go">go</div>';
    }
    this.$el.html(thisPageHtml);
	
    if(obj.maxPage == 1){
        this.$el.find('.common_page_down').addClass('disabled');
		this.$el.find('.common_page_last').addClass('disabled');
    }
	if(obj.maxPage >3){
		this.$el.find('.common_page_RPoint').show();
	}
	if(obj.maxPage <= 0){
        this.$el.find('.common_pageBK').hide();
    }
    //页面加载 end

    //点击事件
    this.$el.find('.common_page_number').on('click',function(){
        if($(this).hasClass('common_page_number_sel')){
        	return;
        }
		var changePage = parseInt($(this).html());
		if(typeof obj.callback == 'function'){
			obj.callback(changePage);
		}
        that.pageChange(changePage);
    });
    if(obj.first){
    	this.$el.find('.common_page_first').on('click',function(){
	        if($(this).hasClass('disabled')){
	        	return;
	        }
			var changePage = 1;
			if(typeof obj.callback == 'function'){
				obj.callback(changePage);
			}
            that.pageChange(changePage);
	    });
    }
    this.$el.find('.common_page_up').on('click',function(){
        if($(this).hasClass('disabled')){
        	return;
        }
    	clearTimeout(that.pagerTimer);
    	that.pagerTimer=setTimeout(function(){
    		var changePage = parseInt(that.$el.find('.common_page_number_sel').html())-1;
			if(typeof obj.callback == 'function'){
				obj.callback(changePage);
			}
            that.pageChange(changePage);
    	},200)
    });
    this.$el.find('.common_page_down').on('click',function(){
        if($(this).hasClass('disabled')){
        	return;
        }
    	clearTimeout(that.pagerTimer);
    	that.pagerTimer=setTimeout(function(){
    		var changePage = parseInt(that.$el.find('.common_page_number_sel').html())+1;
			if(typeof obj.callback == 'function'){
				obj.callback(changePage);
			}
            that.pageChange(changePage);
    	},200);
    });
    if(obj.last){
    	this.$el.find('.common_page_last').on('click',function(){
	        if($(this).hasClass('disabled')){
	        	return;
	        }
			var changePage = obj.maxPage;
			if(typeof obj.callback == 'function'){
				obj.callback(changePage);
			}
            that.pageChange(changePage);
	    });
    }
    if(obj.go){
    	this.$el.find('.common_page_go').on('click',function(){
	        var changePage = parseInt(that.$el.find('.common_page_input_number').val());
			if(changePage&&changePage>0&&changePage<=obj.maxPage){
				obj.callback(changePage);
	        	that.pageChange(changePage);
			}
	    });
    }
    
    this.pageChange=function(pageNo){
		if(obj.maxPage ==1||pageNo<1||pageNo>obj.maxPage){
	        return;
	    }
		var pageLPoint=that.$el.find('.common_page_LPoint');
	    var pageRPoint=that.$el.find('.common_page_RPoint');
		pageLPoint.hide();
		pageRPoint.hide();
		if(pageNo-1>1){
			pageLPoint.show();
		}
		if(pageNo+1<obj.maxPage){
			pageRPoint.show();
		}
		
		
		var pageFirst=obj.first?that.$el.find('.common_page_first'):null;
	    var pageUp=that.$el.find('.common_page_up');
	    var pageDown=that.$el.find('.common_page_down');
		var pageLast=obj.last?that.$el.find('.common_page_last'):null;
	    var pageNum=that.$el.find('.common_page_number');
			
	    if(pageNo==1){
	        pageFirst&&pageFirst.addClass('disabled');
			pageUp.addClass('disabled');
	        pageDown.removeClass('disabled');
			pageLast&&pageLast.removeClass('disabled');
	        pageNum.removeClass('common_page_number_sel');
	        pageNum.eq(0).addClass('common_page_number_sel');
	        if(obj.maxPage==2){
	            pageNum.eq(0).html(1);
	            pageNum.eq(1).html(2);
	        }else{
	            pageNum.eq(0).html(1);
	            pageNum.eq(1).html(2);
	            pageNum.eq(2).html(3);
	        }
	    }else if(pageNo==obj.maxPage){
			pageFirst&&pageFirst.removeClass('disabled');
	        pageUp.removeClass('disabled');
	        pageDown.addClass('disabled');
			pageLast&&pageLast.addClass('disabled');
	        pageNum.removeClass('common_page_number_sel');
	        pageNum.eq(pageNum.length-1).addClass('common_page_number_sel');
	        if(obj.maxPage==2){
	            pageNum.eq(0).html(1);
	            pageNum.eq(1).html(2);
	        }else{
	            pageNum.eq(0).html(obj.maxPage-2);
	            pageNum.eq(1).html(obj.maxPage-1);
	            pageNum.eq(2).html(obj.maxPage);
	        }
	    }else{
			pageFirst&&pageFirst.removeClass('disabled');
	        pageUp.removeClass('disabled');
	        pageDown.removeClass('disabled');
			pageLast&&pageLast.removeClass('disabled');
	        pageNum.removeClass('common_page_number_sel');
	        pageNum.eq(1).addClass('common_page_number_sel');
	        pageNum.eq(0).html(pageNo-1);
	        pageNum.eq(1).html(pageNo);
	        pageNum.eq(2).html(parseInt(pageNo)+1);
	    }
	}
}
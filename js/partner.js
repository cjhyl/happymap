$(function(){
	leftNav.init();
	
	//购物中心
	var mallSwiper = new Swiper('#mall-container', {});
	new MyPager($('.pager.mall'),{
		maxPage:2,
		align:'center',
		callback:function(page){
			mallSwiper.slideTo(page-1, 300, false);
		}
	});
	
	//医院
	var hospitalSwiper = new Swiper('#hospital-container', {});
	new MyPager($('.pager.hospital'),{
		maxPage:1,
		align:'center',
		callback:function(page){
			hospitalSwiper.slideTo(page-1, 300, false);
		}
	});
	
	//写字楼
	var officeBuildingSwiper = new Swiper('#officeBuilding-container', {});
	new MyPager($('.pager.officeBuilding'),{
		maxPage:1,
		align:'center',
		callback:function(page){
			officeBuildingSwiper.slideTo(page-1, 300, false);
		}
	});
	
	//机场
	var airportSwiper = new Swiper('#airport-container', {});
	new MyPager($('.pager.airport'),{
		maxPage:1,
		align:'center',
		callback:function(page){
			airportSwiper.slideTo(page-1, 300, false);
		}
	});
	
	//企业
	var companySwiper = new Swiper('#company-container', {});
	new MyPager($('.pager.company'),{
		maxPage:1,
		align:'center',
		callback:function(page){
			companySwiper.slideTo(page-1, 300, false);
		}
	});
});

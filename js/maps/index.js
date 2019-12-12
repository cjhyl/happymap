var self = this;
var mySwiper;
var debug = GetQueryString('debug');
var isShowLocateTip = true;
var shopShowLocation = true;
var oldFloorid;
var historyList = []
var floorKey; //定位楼层号
var floorid; //定位楼层id
var isPathFinding = false;
var initFloorId = "F497DC73-8040-4CC4-A3F6-4B2CD01A3754"
var allShopData = ''
var shareFId = ''  //分享楼层
var object = {
	startP: '',
	endP: '',
	xlId: {},
	searchList: '',
	shopList: [],
	isBlock: true,
	flagAudio: true,
	floorid: GetQueryString('floorid') ? GetQueryString('floorid') : "F497DC73-8040-4CC4-A3F6-4B2CD01A3754",
	mark: GetQueryString('mark'),
	mac: GetQueryString('mac'),
	ip: GetQueryString('ip'),
	flag: true,
	floorData: '',
	orderFloors: {},
	flooridFloors: {}, //方便楼层处理
	flooridOrder: {},
	order: 8,
	flags: true,
	ispoint: true,
	isInitOrder: true,
	location: false,
	timer: '',
	timers: '',
	flagClearInterval: true,
	pathfinding: JSON.parse(GetQueryString('pathfinding')),
	// pathfinding: {
	//     "sId": "POINT-20180117-15:16:39:496-9862",
	//     "eFid": "EB72B381-B3BC-40A4-B8DF-3D932302B9D8",
	//     "sFid": "BCD5A746-CFE0-448F-A7C8-08646A5B96F6",
	//     "eId": "POINT-20170918-14:31:32:534-4917",
	//     //     // "eId": "AREA-2018015-15:51:59:252-8450",
	//     //     // "eFid": "8AD368B1-A9B7-4E54-A37E-A3EA8424A1ED",
	//     "X": 49,
	//     "Z": 27,
	// },
	shopID: GetQueryString('shopID'),
	isSwiper: false,
	navigationInterval: '',
	moFloorid: {
		start: '',
		end: '',
		startArea: '',
		endArea: ''
	},
	isOperation: true,
	isShop: true,
	isPause: false,
	flagSearch: false,
	flagShare: true,
	getServeData: function (data, fn) { //获取数据
		$.ajax({
			type: "GET",
			url: object.url,
			data: data,
			dataType: "JSONP",
			success: function (s) {
				fn(s);
			}
		});
	},
	// url: "https://map.ckiosk.cn/WebAPI/ClientService.asmx/Command?callback",
	url: "https://cqcjh.cloudindoormap.com/WEB_API/ClientService.asmx/Command?callback",
	audioEnd: true,
	isAudio: true,
	oldFloorid: '',
	deBug: false,
	locationCenter: true,
	distance: "",
	ispathGoer: true
	// floorH: '',
	// orders: '',

};
var config = {
	flagMark: true,
	floorNumber: 17,
	Project: 'F7721421-AE5C-4A53-AB9D-48010BAC94F8', //统计访问次数
	ReacordValue: 'https://cqcjh.cloudindoormap.com', //统计访问网站次数参数
	deBug: false
}
var L = [{
	floorID: "F497DC73-8040-4CC4-A3F6-4B2CD01A3754",
	name: "L1A",
	order: "1"
}, {
	floorID: "8C0A2FD4-B311-4640-A6C2-AE19ECB1F4C3",
	name: "LM1A",
	order: "2",
}, {
	floorID: "4635B377-0042-4FD8-A00D-EE86E7C75E85",
	name: "L2A",
	order: "3",
}, {
	floorID: "0EB180C7-CE59-4BF7-9668-857A896097CA",
	name: "L3A",
	order: "4",
}, {
	floorID: "14B510F1-25A6-4CE4-96A4-55A7A97AFDB1",
	name: "LM3A",
	order: "5",
}, {
	floorID: "977C2FC3-057C-4A1A-A366-39F1B60AB782",
	name: "L4A+L1B",
	order: "6",
}, {
	floorID: "A2E03A0E-A9EA-4F7D-9BBB-2F6A69C10B2F",
	name: "L5A+L2B",
	order: "7",
}, {
	floorID: "682C49F0-7B02-4EF8-B18E-25E9D9BE8FB1",
	name: "L6A+L3B",
	order: "8",
}, {
	floorID: "23F552A1-7F76-4533-BBFD-55C726D6F705",
	name: "L4B",
	order: "9",
}, {
	floorID: "F73D3009-5E98-4BDD-91B7-D63A8106F0BB",
	name: "L5B",
	order: "10",
}, {
	floorID: "A5D821D8-2D3A-4056-9877-F2805F711B9B",
	name: "L6B",
	order: "11",
}, {
	floorID: "EF87A474-6111-4FEE-890A-C8C7461B9C42",
	name: "L7B",
	order: "12",
}, {
	floorID: "5716E6F1-EF37-4FE3-99ED-437054CFA2B0",
	name: "L8B",
	order: "13",
}, {
	floorID: "B2FE5708-961A-42CE-981E-604053852442",
	name: "L9B",
	order: "14",
}, {
	floorID: "C107655C-8783-4FCE-9085-3AE764B41681",
	name: "L10B",
	order: "15",
}];

$(document).ready(function () {
	$.ajax({
		type: 'GET',
		url: 'https://service.chaunve.com/RecordWebService.asmx/Record?Project=' + config.Project + '&Type=CLOUDMAP&ReacordValue=' + config.ReacordValue + '&AccessFrom=',
		success: function (s) { }
	})
	if (object.pathfinding) {
		object.floorid = object.pathfinding.sFid;
	}
	if (object.mark) {

	} else if (object.shopID) {
		object.flagClearInterval = false
		for (var i = 0; i < L.length; i++) {
			if (object.shopID.indexOf(L[i].name) != -1) {
				object.order = L.length - Number(L[i].order)
				object.floorid = L[i].floorID;
				// object.oldFloorid = L[i].floorID;
				break;
			}
		}
	}
	init(object.floorid)
	spanBtn()
	historyBtn()
	var mySwipers = new Swiper('.swiper-container4', {
		direction: 'vertical',
		slidesPerView: 'auto',
		initialSlide: 0,
		// slideToClickedSlide: true,
		observer: true, //修改swiper自己或子元素时，自动初始化swiper
		observeParents: true,
		init: true

	})
	// alert(1)
});
// 去掉手机端的alert弹出网站
window.alert = function (name) {
	var iframe = document.createElement("IFRAME");
	iframe.style.display = "none";
	iframe.setAttribute("src", 'data:text/plain,');
	document.documentElement.appendChild(iframe);
	window.frames[0].window.alert(name);
	iframe.parentNode.removeChild(iframe);
};
//起始点和终点交换
function reverse() {
	var middleID, middleVal, middlePathID;
	self.map.reset();
	reverseInside()
	if (isPathFinding) {
		middleID = object.moFloorid.start;
		object.moFloorid.start = object.moFloorid.end;
		object.moFloorid.end = middleID;
		// console.log(object.xlId.startId)
		middlePathID = object.pathfinding.sId;
		object.pathfinding.sId = object.pathfinding.eId;
		object.pathfinding.eId = middlePathID;
		middleVal = $('#startPoint').val();
		$('#startPoint').val($('#endPoint').val());
		$('#endPoint').val(middleVal);
		object.startP = self.map.startNode.pointID = object.pathfinding.sId;
		object.endP = self.map.endNode.pointID = object.pathfinding.eId;
		self.map.addMarkToPoint(object.pathfinding.sId, 'start')
		self.map.addMarkToPoint(object.pathfinding.eId, 'end')
	} else {
		middleID = object.xlId.startId;
		object.xlId.startId = object.xlId.endId;
		object.xlId.endId = middleID;
		console.log(object.xlId.startId)
		middleVal = $('#startPoint').val();
		$('#startPoint').val($('#endPoint').val());
		$('#endPoint').val(middleVal);
		object.startP = self.map.setStartArea(object.xlId.startId, true);
		object.endP = self.map.setEndArea(object.xlId.endId, true);
		$('.setPoint1').css('display', 'block');
		if (object.startP && object.endP) {
			$('.floorToggleMinUl,.scale,.floorToggleBox').css('bottom', '2rem');
			$('.tishi').html('点击开始导航');
			$('.go').removeAttr("disabled").css('backgroundColor', '#a6937c');
		}
	}
	pathGo();
}
//地图初始化参数配置
function init($floorid) {
	$floorid ? object.floorid = $floorid : 'EB72B381-B3BC-40A4-B8DF-3D932302B9D8';
	GIM.REMOTE_SERVER = "https://cqcjh.cloudindoormap.com/WEB_API/ClientService.asmx/Command"
	GIM.DEBUG_MODE = false; //是否开启调试，true为开启，false为u开启，默认不开启
	GIM.far = 8000;
	var container = document.getElementById('mapContainer')
	container.style.cssText = "width:" + (container.clientWidth / 1) + "px;height:" + (container.clientHeight / 1) + "px;text-align:right";
	var params = {
		initCompleted: initCompelte,
		onSelected: onSelected,
		container: container,
		themeID: "1003",
		// accessToken: "86E81446-7C98-432F-B991-889FB1FA3F11",
		accessToken: "86E81446-7C98-432F",
		backgroundColor: '#f2f2f2',
		projectID: 'F7721421-AE5C-4A53-AB9D-48010BAC94F8',
		initFloorID: object.floorid,
		//  preCreation: false, //是否后台静默渲染 默认为true
		cloudID: '83BB183B-2196-4511-8912-29B5D61E86AA',
		showLabelType: "Name" //Name
	};
	self.map = new GIM.Map3D(params);
	self.map.selectedColor = 0x981c29;
	self.map.pathThickness = 20;
	self.map.zoomLevel(20);
	self.map.move2Point({
		x: 1400,
		y: -2500
	});
	self.map.setPolarAngle(0);
	self.map.setAzimuthalAngle(60);
	self.map.pathGap = 3;
	self.map.showCompass(false);
	self.map.regCompassChange(function (angel) {
		$('.compass').css({
			'transform': 'rotate(' + angel + 'deg)'
		})
	})
	FloorDetection()
}

function doNextThing() {
	if (object.mac || object.ip) {
		object.isShop = false;
		if (!GetQueryString('shopID') || object.pathfinding) {
			setTimeout(function () {
				console.log("doNextThing");
				$('.waiting').html('正在定位中，请稍等...').css({
					"display": 'block'
				});
			}, 2000);
			getWifi();
		} else {
			if (object.pathfinding) {
				return
			} else {
				$('.waiting').html('地图加载完成').css({
					"display": 'block'
				})
				setTimeout(function () {
					$('.waiting').css({
						"display": 'block'
					}).fadeOut(2000)
				}, 2000);
			}
		}
	} else {
		if (object.pathfinding) {
			return
		} else {
			$('.waiting').css({
				"display": 'block'
			}).html('地图加载完成')
			setTimeout(function () {
				$('.waiting').fadeOut(2000)
			}, 2000);
		}
	}
}

//地图初始化后进行操作
function initCompelte($floorData, areaData, list) {
	allShopData = areaData
	console.log(areaData)
	// $(".floorToggle").html("L1A")
	
	config.floorNumber = $floorData.length;
	object.floorData = $floorData;
	object.floorData = object.floorData.sort(function (a, b) {
		return a.order - b.order;
	});
	object.floorData.forEach(function (t) {
		object.flooridFloors[t.floorID] = t.name;
		object.orderFloors[t.name] = t.floorID;
		object.flooridOrder[t.floorID] = t.order;
	});
	areaData.forEach(function (t) {
		object.shopList = object.shopList.concat(t.Area)
	});
	object.searchList = list;
	// console.log(list)
	$('.waiting').css({
		"display": 'block'
	}).stop(false, true).html('地图加载完成');
	setTimeout(function () {
		$('.waiting').fadeOut();
	}, 3000);
	bindFloor(object.floorData);
	if (object.mark) {
		setTimeout(function () {
			self.map.selectByAreaID(object.mark, true);
			// self.map.showFloors([GetQueryString('floorid')])
		}, 0);
		object.order = config.floorNumber - Number(object.flooridOrder[GetQueryString('floorid')])
		object.shopID = null;
		object.isSwiper = true;
		mySwiper.destroy(true);
		mySwiper = myswiper();
		mySwiper.init();
		$('#loadings').css('display', 'none');
		FloorDetection()
	} else if (object.shopID) {
		self.map.focusToShopByNo(object.shopID, 5, 15);
		$('.waiting').css({
			"display": 'block'
		}).stop(false, true).html('地图加载完成');
		setTimeout(function () {
			$('.waiting').fadeOut(4000);
		}, 3000);
		object.shopID = null;
		object.isSwiper = true;
		$('#loadings').css('display', 'none');
	} else if (object.pathfinding) { //扫码进来的操作
		// console.log("asd")
		isPathFinding = true;
		$(".spinner div").css("width", ".2rem")
		// if (isPathFinding) {
		// 	$('.mark').hide()
		// 	$(".smaller").css("margin-bottom", "0")
		// }
		$('.waiting').css({
			"display": 'block'
		}).html('路径规划中,请稍后...');
		if (self.map.pathDownloaded == true) {
			// console.log("pathDownloaded==true")
			// object.startP = self.map.startNode.pointID = object.pathfinding.sId;
			// object.endP = self.map.endNode.pointID = object.pathfinding.eId;
			object.startP = self.map.startPID = object.pathfinding.sId;
			object.endP = self.map.endPID = object.pathfinding.eId;
			object.order = object.floorData.length - object.flooridOrder[object.pathfinding.sFid]
			object.moFloorid.start = object.pathfinding.sFid
			nowFloorId = object.pathfinding.sFid
			setTimeout(() => {
				self.map.addMarkToPoint(object.pathfinding.sId, "start")
				self.map.addMarkToPoint(object.pathfinding.eId, "end")
			}, 500);
			mySwiper.destroy(true);
			mySwiper = myswiper();
			mySwiper.init();
			$('.looking').stop(false, true).css({
				'display': 'none'
			})
			self.map.regNavigationPause(function () { //暂停模拟导航的时候触发
				$(".floorToggleMinUl li button").removeAttr("disabled");
				// console.log("asd")
				$(".mo_center").html("继续导航")
				// $('.floorToggle').show()
				object.isPause = true;
				isFloorToggleCounter = true;
			})
			$('.setPoint1').stop(false, true).show()
			$('.floorToggleBox,.floorToggleMinUl,.scale').css('bottom', '2rem');
			$('#loadings').css('display', 'none');
			$('.waiting').stop(false, true).css({
				"display": 'block'
			}).html('路径规划成功');
			object.ispoint = true;
			$(".operation").show()
			$('.gSearch').hide()
			$('.compass').css({
				'top': '1.68rem'
			})
			setTimeout(function () {
				$('.waiting').fadeOut(4000);
			}, 3000);
			$('#startPoint').val('我的位置');
			object.shopList.forEach((t) => {
				if (t.PointID == object.pathfinding.eId) {
					$('#endPoint').val(object.flooridFloors[object.pathfinding.eFid] + '  ' + (t.ShopName ? t.ShopName : t.Name))
				}
			})
			object.moFloorid.end = object.pathfinding.eFid
			if (object.startP == '' || object.startP == null) {
				$('.tishi').html('请设置起点');
				$('.go,.mogo').attr("disabled", 'disabled').css('backgroundColor', '#999');
			} else {
				$('.tishi').html('点击开始导航');
				$('.mogo').attr("disabled", false).css('backgroundColor', '#a6937c');
			}
			pathGo()
			// setTimeout(() => {
			// 	reverse()
			// 	reverse()
			// }, 500);
		} else {
			// console.log("pathDownloaded==false")
			self.map.regPathDownloaded(function () {
				// object.startP = self.map.startNode.pointID = object.pathfinding.sId;
				// object.endP = self.map.endNode.pointID = object.pathfinding.eId;
				object.startP = self.map.startPID = object.pathfinding.sId;
				object.endP = self.map.endPID = object.pathfinding.eId;
				object.order = object.floorData.length - object.flooridOrder[object.pathfinding.sFid]
				object.moFloorid.start = object.pathfinding.sFid
				setTimeout(() => {
					self.map.addMarkToPoint(object.pathfinding.sId, "start")
					self.map.addMarkToPoint(object.pathfinding.eId, "end")
				}, 500);
				mySwiper.destroy(true);
				mySwiper = myswiper();
				mySwiper.init();
				$('.looking').stop(false, true).css({
					'display': 'none'
				})
				self.map.regNavigationPause(function () { //暂停模拟导航的时候触发
					$(".floorToggleMinUl li button").removeAttr("disabled");
					// console.log("asd")
					$(".mo_center").html("继续导航")
					// $('.floorToggle').show()
					object.isPause = true;
					isFloorToggleCounter = true;
				})
				$('.setPoint1').stop(false, true).show()
				$('.floorToggleBox,.floorToggleMinUl,.scale').css('bottom', '2rem');
				$('#loadings').css('display', 'none');
				$('.waiting').stop(false, true).css({
					"display": 'block'
				}).html('路径规划成功');
				object.ispoint = true;
				$(".operation").show()
				$('.gSearch').hide()
				$('.compass').css({
					'top': '1.68rem'
				})
				setTimeout(function () {
					$('.waiting').fadeOut(4000);
				}, 3000);
				$('#startPoint').val('我的位置');
				object.shopList.forEach((t) => {
					if (t.PointID == object.pathfinding.eId) {
						$('#endPoint').val(object.flooridFloors[object.pathfinding.eFid] + '  ' + (t.shopName ? t.shopName : t.Name))
					}
				})
				object.moFloorid.end = object.pathfinding.eFid
				if (object.startP == '' || object.startP == null) {
					$('.tishi').html('请设置起点');
					$('.go,.mogo').attr("disabled", 'disabled').css('backgroundColor', '#999');
				} else {
					$('.tishi').html('点击开始导航');
					$('.mogo').attr("disabled", false).css('backgroundColor', '#a6937c');
				}
				pathGo()
			});
		}
		object.isSwiper = true;
	} else {    //正常进入
		setTimeout(function () {
			$('#loadings').css('display', 'none');
			object.isSwiper = true;
		}, 10);
		nowFloorToggleNo = "L1A"
		$(".floorToggleContent2 .floorToggle").hide();
		$(".floorToggleContent2 .floorToggleUl").show();
	}
	createWXConfig(postData);
	if (object.mac) {
		document.addEventListener("visibilitychange", handleVisibilityChange, false);
	}
	FloorDetection()
}
//创建楼层
function bindFloor($floorData) {
	var ul = $(".swiper-wrapper1"),
		liHtml = '';
	ul.find("li").remove();
	for (var i = $floorData.length - 1, len = $floorData.length; i >= 0; i--) {
		liHtml = liHtml + `<li name=${$floorData[i].floorID} class="swiper-slide swiper-slide1"><button type="button" class="btn btn-default">${$floorData[i].name}</button></li>`;
		if (GetQueryString('pathfinding') && JSON.parse(GetQueryString('pathfinding')).startFloorid == $floorData[i].floorID && object.isInitOrder) {
			object.order = $floorData.length - $floorData[i].order;
		}
	};
	object.floorid = $floorData[$floorData.length - object.order - 1].floorID;
	ul.append(liHtml);
	mySwiper = myswiper()
	mySwiper.init()
};
//点击地图设置起始点和终点
function onSelected(data) {
	console.log(data)
	shareFId = data.floorID
	object.flag = true;
	object.mark = data.areaID;
	self.map.setPolarAngle(15);
	object.flagClearInterval = false;
	object.locationCenter = false
	$('#text').val(data.shopName ? data.shopName : data.name)
	$('#searchSpan').addClass('go_back')
	self.map.regNavigationPause(function () { //暂停模拟导航的时候触发
		$(".floorToggleMinUl li button").removeAttr("disabled");
		// console.log("asd")
		$(".mo_center").html("继续导航")
		// $('.floorToggle').show()
		object.isPause = true;
		isFloorToggleCounter = true;
	})
	$('.setPoint1,.shares').hide();
	$('.setPoint').show();
	$('.mo_daohang,.mo_tishi').slideUp('slow')
	$('.looking').css('display', 'block').find('span').html('正在查看 ' + object.flooridFloors[data.floorID] + '');
	// $('.floorToggle').html('' + object.flooridFloors[data.floorID] + '')
	$('.pointName').html(data.shopName ? data.shopName : data.name);
	// $('.pointFloor').html(object.flooridFloors[data.floorID]);
	$('.pointFloor').html(data.name);
	$('.floorToggleBox,.floorToggleMinUl,.scale').css('bottom', '2rem');
	nowFloorToggleNo = object.flooridFloors[data.floorID]
	FloorDetection()
	nowFloorToggleNo = nowFloorToggleNooo
	object.ispoint = false;
	setStart = function () {
		shopShowLocation = false;
		$('.operation,.setPoint1').css('display', 'block');
		$('.compass').css({
			'top': '1.68rem'
		})
		$('#startPoint').val(object.flooridFloors[data.floorID] + '  ' + (data.shopName ? data.shopName : data.name));
		object.xlId.startId = data.areaID;
		object.moFloorid.start = data.floorID;
		object.moFloorid.startArea = data.shopName ? data.shopName : data.name;
		object.startP = self.map.setStartArea(data.areaID, true);
		object.startPP = object.flooridFloors[data.floorID]
		// console.log(object.moFloorid.start)
		// console.log(object.startP)
		// object.ispoint = false;
		$('.setPoint').css('display', 'none');
		if (object.endP == '' || object.endP == null) {
			$('.tishi').html('请设置终点');
			$('.go,.mogo').attr("disabled", 'disabled').css('backgroundColor', '#999');
		} else {
			if (object.startP == object.endP) {
				// alert('起始点和终点相同')
				$(".searchPathFailMsg").html("起始点相同,请重新设置")
				$(".searchPathFailBox").fadeIn()
				$('.go,.mogo').attr("disabled", 'disabled').css('backgroundColor', '#999');
			} else {
				$('.tishi').html('点击开始导航');
				$('.go,.mogo').removeAttr("disabled").css('backgroundColor', '#a6937c');
				pathGo()
				// ();
			}
		}
		$('.operation').css('display') == 'block' ? $('.gSearch').hide() : $('.gSearch').show()
	}
	setEnd = function () {
		object.xlId.endId = data.areaID;
		object.moFloorid.end = data.floorID;
		object.moFloorid.endArea = data.shopName ? data.shopName : data.name;
		$('.compass').css({
			'top': '1.68rem'
		})
		$('#endPoint').val(object.flooridFloors[data.floorID] + '  ' + (data.shopName ? data.shopName : data.name));
		$('.setPoint').hide();
		$('.tishi').html('点击开始导航');
		$('.go').attr("disabled", false).css('backgroundColor', '#69d5c5');
		$(".operation,.setPoint1").show()
		object.endP = self.map.setEndArea(data.areaID, true);
		object.endPP = object.flooridFloors[data.floorID]
		// console.log(object.moFloorid.end)
		// console.log(object.endP)
		if (object.startP == '' || object.startP == null) {
			$('.tishi').html('请设置起点');
			$('.go,.mogo').attr("disabled", 'disabled').css('backgroundColor', '#999');
		} else {
			if (object.startP == object.endP) {
				// alert('起始点和终点相同')
				$(".searchPathFailMsg").html("起始点相同,请重新设置")
				$(".searchPathFailBox").fadeIn()
				$('.go,.mogo').attr("disabled", 'disabled').css('backgroundColor', '#999');
			} else {
				$('.tishi').html('点击开始导航');
				$('.go,.mogo').attr("disabled", false).css('backgroundColor', '#a6937c');
				pathGo()
			}
		}
		$('.operation').css('display') == 'block' ? $('.gSearch').hide() : $('.gSearch').show();
	}
};
document.addEventListener('touchmove', function () {
	object.flagClearInterval = false;
}, false)

//寻路
function go() {
	self.map.reset();
	object.locationCenter = true;
	object.ispathGoer = true;
	if ($('.go').attr("disabled") != 'disabled' && (object.startP || '') && (object.endP || '')) {
		if (object.startP == object.endP) {
			// alert('起始点相同,请重新设置');
			$(".searchPathFailMsg").html("起始点相同,请重新设置")
			$(".searchPathFailBox").fadeIn()
			return;
		}
		$('#loadings').show().children('.load_xun').show()
			.siblings().hide()
		$(".mo_tishi").slideDown()
		$('.setPoint,.setPoint1').hide();
		self.map.searchPath(function (msg) {
			console.log(msg)
			if (msg.type == 'done') {
				// $('.swiper-container1,.scale,.floorToggle floorEnd,.floorToggle floorStart ').css('bottom', '.4rem');
				self.map.zoomLevel(3);
				if (object.moFloorid.start == object.moFloorid.end) {
					self.map.setPolarAngle(0);
				} else {
					self.map.setPolarAngle(0);
					self.map.setAzimuthalAngle(50);
					$('.looking').hide()
				}
				if (object.locationCenter) {
					self.map.showLocation()
				}
				$('#loadings').hide()
				object.ispoint = true;
			} else {
				$('#loadings').hide()
				// alert('寻路失败');
				// $(".searchPathFailMsg").html("起始点相同,请重新设置")
				$(".searchPathFailBox").fadeIn()
				return;
			}
			// $('.waiting').hide()
		})
	} else {
		return;
	}
}
//返回 
function goback() {
	$('.operation, .setPoint1, .setPoint, #loadings, .mo_tishi').hide();
	object.startP = object.endP = null;
	$('#endPoint,#startPoint').val('');
	$('.gSearch').css('display', 'block');
	$('.compass').css({
		'top': '1.1rem'
	})
	$('.floorToggleBox,.floorToggleMinUl,.scale').css('bottom', '.6rem');
	object.order = object.floorData.length - object.flooridOrder[object.moFloorid.start]
	// mySwiper.destroy(true);
	// mySwiper = myswiper();
	// mySwiper.init();
	isPathFinding = false;
	isMogo = false;
	object.flagClearInterval = false;
	self.map.areaClickEmbed = true;
	// self.map.reset();
	self.map.clearPath(true);
	self.map.cleanSelectUnit3D();
	$('#searchSpan').removeClass('go_back')
	goBackInside()
	FloorDetection()
}

function share(number) {
	if (number == 1) {
		object.floorid = shareFId
		$('.setPoint').slideUp('slow');
		$('.shares').slideDown('slow')
	} else {
		$('.setPoint').slideDown('slow');
		$('.shares').slideUp('slow')
	}
}

function noShow() {
	$('.share_shade').hide()
	$('.setPoint').show();
}
// 放大地图

function biger() {
	console.log(self.map.cameraRadius)
	if (self.map.cameraRadius - 1000 < self.map.minCameraRadius) {
		self.map.cameraRadius = 1000
	} else {
		self.map.cameraRadius = self.map.cameraRadius - 1000
	}
}

// 缩小地图
function smaller() {
	console.log(self.map.cameraRadius)
	if (self.map.cameraRadius < self.map.maxCameraRadius) {
		if ((self.map.cameraRadius + 1000) > self.map.maxCameraRadius) {
			self.map.cameraRadius = 8000
		} else {
			self.map.cameraRadius = self.map.cameraRadius + 1000
		}
	}
}

// 定位功能
function showMark() {
	object.locationCenter = true;
	object.ispathGoer = true;
	$('.waiting').stop(false, true).css({
		'display': 'block'
	}).html('正在定位中，请稍等...')
	object.flags = true;
	object.isInitOrder = false;
	object.ispoint = true;
	object.flagClearInterval = true;
	isShowLocateTip = true;
	shopShowLocation = true;
	// getLocations()
	if (isPathFinding) {
		if (object.mac || object.ip || debug) {
			getWifi(); // 如果多次点击出现叠加问题 
		} else {
			setTimeout(function () {
				$('.waiting').stop(false, true).css({
					"display": 'block'
				}).html('WIFI未打开、当前信号弱或不在信号覆盖的区域无法定位，请重连商场WIFI').fadeOut(6000)
				// $('.waiting img').attr('src', './images/5.wifi2.png')
			}, 3000)
		}
	} else {
		if (object.mac || object.ip || debug) {
			getWifi(); // 如果多次点击出现叠加问题 
		} else {
			setTimeout(function () {
				$('.waiting').stop(false, true).css({
					"display": 'block'
				}).html('WIFI未打开、当前信号弱或不在信号覆盖区域无法定位，请重新连接商场WIFI').fadeOut(4000)
				// $('.waiting img').attr('src', './images/5.wifi2.png')
			}, 3000)
		}
	}

}
// 3d切换
function mapToggle() {
	var value = $('.map_three').text()
	if (value == '3D') {
		self.map.setPolarAngle(60)
		$('.map_three').text('2D')
	} else {
		self.map.setPolarAngle(0)
		$('.map_three').text('3D')
	}

}


// 语音处理
function audioAutoPlay(id, otext, ospd) {
	var audio = document.getElementById(id)
	if (object.audioEnd) {
		object.audioEnd = false
		$.get("https://map.ckiosk.cn/ShaneService/TTSWebService.asmx/BaiduTTS?", {
			"text": otext,
			"spd": ospd,
		},
			function (data) {
				$(".mo_yuyin").attr("src", data);
			})
		play = function () {
			audio.play();
			document.removeEventListener("touchstart", play, false);
		};
		audio.play();
		document.addEventListener("WeixinJSBridgeReady", function () {
			play();
		}, false);
		document.addEventListener('YixinJSBridgeReady', function () {
			play();
		}, false);
		$(".mo_yuyin").attr("src", "");
	}
	if (audio.ended) {
		object.audioEnd = true;
	}
}
/* 模拟导航 */
function mogo() {
	// console.log(fFloorid)
	// self.map.showFloors([fFloorid])
	nowFloorToggleNoo = object.flooridFloors[fFloorid]
	FloorDetection()
	self.map.zoomLevel(3);
	var i = 1;
	object.timers = setInterval(function () {
		i = i + 1;
	}, 1000)
	self.map.simulate();
	audioAutoPlay("mo_yuyin", "开始导航", "5")
	$('.operation,.setPoint1').slideUp('fast');
	$('.mo_daohang,.mo_tishi').slideDown('fast');
	$('.looking,.changeF,.gSearch').hide();
	$(".compass").css("top", "2.03rem")
	$('.mo_text').html('请沿当前路线行走');
	// $('#endPoint').val()
	$('.mo_footerS').html('起点位置 : ' + $('#startPoint').val() + '')
	$('.mo_footerE').html('目标位置 : ' + $('#endPoint').val() + '')
	$('.mo_end_q').html('起点 : ' + $('#startPoint').val() + '')
	$('.mo_end_z').html('目标 : ' + $('#endPoint').val() + '')
	self.map.regNavigationWalk(function (walkDetail) {
		isMogo = true
		nowFloorId = walkDetail.floorID;
		// self.map.areaClickEmbed = false;
		// console.log(nowFloorId)
		$(".floorToggleMinUl li button").attr("disabled", true)
		self.map.setPolarAngle(0);
		if (!walkDetail.nextFloorName) {
			if (walkDetail.turn == 'Right') {
				$('.mo_text').html(+Math.ceil(walkDetail.dis / 50) + '米后 右转')
				if (Math.ceil(walkDetail.dis / 50) > 0) {
					$('.mo_pic').css({
						'background': 'url(./images/youzhuan.png) center center no-repeat',
						'backgroundSize': 'contain'
					})
				}
				if (walkDetail.dis < 200) {
					$('.mo_text').html('右转')
					if (object.flagAudio) {
						audioAutoPlay("mo_yuyin", "前方右转", "5")
					}

				}
			} else if (walkDetail.turn == 'Left') {
				$('.mo_text').html(+Math.ceil(walkDetail.dis / 50) + '米后 左转')
				if (Math.ceil(walkDetail.dis / 50) > 0) {
					$('.mo_pic').css({
						'background': 'url("./images/zuozhuan.png") center center no-repeat',
						'backgroundSize': 'contain'
					})
				}
				if (walkDetail.dis < 200) {
					$('.mo_text').html('左转')
					if (object.flagAudio) {
						audioAutoPlay("mo_yuyin", "前方左转", "5")
					}

				}
			} else if (walkDetail.turn == 'LeftFront') {
				$('.mo_text').html(+Math.ceil(walkDetail.dis / 50) + '米后 左前方前进')
				if (Math.ceil(walkDetail.dis / 50) > 0) {
					$('.mo_pic').css({
						'background': 'url("./images/zuoqian.png") center center no-repeat',
						'backgroundSize': 'contain'
					})

				}
				if (walkDetail.dis < 200) {
					$('.mo_text').html('左前方前进')
					if (object.flagAudio) {
						audioAutoPlay("mo_yuyin", "左前方前进", "5")
					}
				}
			} else if (walkDetail.turn == 'RightFront') {
				$('.mo_text').html(+Math.ceil(walkDetail.dis / 50) + '米后 右前方前进')
				if (Math.ceil(walkDetail.dis / 50) > 0) {
					$('.mo_pic').css({
						'background': 'url("./images/youqian.png") center center no-repeat',
						'backgroundSize': 'contain'
					})

				}
				if (walkDetail.dis < 200) {
					$('.mo_text').html('右前方前进')
					if (object.flagAudio) {
						audioAutoPlay("mo_yuyin", "右前方前进", "5")
					}

				}
			} else if ((walkDetail.turn == 'Lifts' && walkDetail.dis == 0) || (walkDetail.turn == 'Escalator' && walkDetail.dis == 0)) {
				$(".floorToggleUl_List-active").prev().removeClass().addClass("floorToggleUl_List-active").siblings().removeClass().addClass("floorToggleUl_List")
				$(".floorToggleUl_List-active").find("i").removeClass().addClass("floorToggleMinUl_iR").parent().siblings().find("i").removeClass().addClass("floorToggleMinUl_i")
			} else {
				$('.mo_text').html(+Math.ceil(walkDetail.dis / 50) + '米后 到达终点')
				object.audioEnd = true;
				$('.mo_pic').css({
					'background': 'url("./images/zhixing.png") center center no-repeat',
					'backgroundSize': 'contain'
				})
				if (walkDetail.dis == 0 && (walkDetail.turn == 'end' || walkDetail.turn == 'carport')) {
					if (object.flagAudio) {
						audioAutoPlay("mo_yuyin", "已到达目的地附近，感谢使用重庆长嘉汇购物公园地图寻店系统", "5")
					}
					clearInterval(object.timers)
					isMogo = false;
					isFloorToggleCounter = false;
					floorCounter = 0;
					$(".mo_end_time").html(i)
					$('.mo_distance').html(Math.ceil(object.distance / 50))
					setTimeout(() => {
						$('.mo_daohang,.mo_tishi').slideUp('fast');
						$('.operation,.setPoint1').css('display', 'none')
						$(".mo_end").fadeIn(500);
						$(".compass").css("top", "1.18rem")
					}, 1000);

				}
			}
		} else {
			let value
			if (walkDetail.pass == 'Lifts') {
				value = '乘电梯到达' + walkDetail.nextFloorName + '楼'
			} else {
				value = '乘手扶梯到达' + walkDetail.nextFloorName + '楼'
			}
			$('.mo_text').html(value)
			if (object.flagAudio) {
				audioAutoPlay("mo_yuyin", value, "5")
			}
		}
	});

}
/* 继续导航 */
function mo_goOn() {
	if (object.isPause == true) {
		// $('.floorToggle').hide()
		self.map.toggleSimulate(true)
		object.isPause = false;
		goOnInside()
	}
	// $('.floorToggle').hide()
	$(".mo_center").html("正在导航")
	isFloorToggleCounter = false;
	floorCounter = 0;
	$(".floorToggleMinUl li button").attr("disabled", true)
	// console.log(nowFloorId)
}

/* 结束页传入反馈标签 */
$(function () {
	$(".taptap").on("click", function () {
		var index = $(this).index();
		$(this).addClass("taptaptap");
		$(this).siblings().removeClass("taptaptap");
		if (index == 0) {
			$(".mo_end_textaabb").val("体验流畅")
		} else if (index == 1) {
			$(".mo_end_textaabb").val("")
			$(".mo_end_textaabb").val("贴心提示")
		} else if (index == 2) {
			$(".mo_end_textaabb").val("")
			$(".mo_end_textaabb").val("定位不准")
		} else if (index == 3) {
			$(".mo_end_textaabb").val("")
			$(".mo_end_textaabb").val("信息有误")
		}
	})
})

/* 结束页关闭 */
function moEndClose() {
	$(".compass").css("top", "0.625rem")
	$(".mo_end").css("display", "none")
	// $(".changeF").css({
	// 	"display": "block",
	// 	"bottom": "0.9375rem"
	// })
	// self.map.areaClickEmbed = true;
	object.startP = object.endP = null;
	self.map.showFloors([object.moFloorid.start]);
	object.order = object.floorData.length - object.flooridOrder[object.moFloorid.start]
	mySwiper.destroy(true);
	mySwiper = myswiper();
	mySwiper.init();
	$('#endPoint,#startPoint').val('');
	// $(".message").show();
	$(".gSearch").show();
	$('.floorToggleBox,.floorToggleMinUl,.scale').css('bottom', '.6rem');
	$(".compass").css("top", "1.1rem")
	$(".scale").show();
	self.map.cleanSelectUnit3D()
	self.map.clearPath(true)
	$('.taptaptap').removeClass('taptaptap')
	$('.starability-basic input').prop('checked', false)
	document.querySelector('.mo_end_textaabb').placeholder = ' 还有想说的'
	self.map.zoomLevel(15);
	self.map.setAzimuthalAngle(60);
	$('#searchSpan').removeClass('go_back');
	self.map.hideLocationMark();
	document.querySelector('#text').placeholder = '输入商户关键字搜索';
	$('#text').val('');
	config.flagMark ? $('.mark').show() : $('mark').hide()
	moEndClear()
	FloorDetection()
	self.map.areaClickEmbed = true;
}

/* 结束页发送并关闭 */
function moEndSend() {
	self.map.areaClickEmbed = true;
	$(".mo_end").hide()
	$(".thanks_tips").fadeIn()
	setTimeout(() => {
		$(".thanks_tips").fadeOut()
	}, 1200);
	$(".compass").css("top", "0.625rem")
	// $(".changeF").css({
	// 	"display": "block",
	// 	"bottom": "0.9375rem"
	// })
	object.startP = object.endP = null;
	self.map.showFloors([object.moFloorid.start]);
	object.order = object.floorData.length - object.flooridOrder[object.moFloorid.start]
	mySwiper.destroy(true)
	mySwiper = myswiper()
	mySwiper.init()
	$('#endPoint,#startPoint').val('');
	// $(".message").show();
	$(".gSearch").show();
	$('.floorToggleBox,.floorToggleMinUl,.scale').css('bottom', '.6rem');
	$(".compass").css("top", "1.1rem")
	$(".scale").show();
	self.map.cleanSelectUnit3D()
	self.map.clearPath(true)
	$('.taptaptap').removeClass('taptaptap')
	$('.starability-basic input').prop('checked', false)
	document.querySelector('.mo_end_textaabb').placeholder = '还有想说的'
	self.map.zoomLevel(15);
	self.map.setAzimuthalAngle(60);
	$('#searchSpan').removeClass('go_back');
	document.querySelector('#text').placeholder = '输入商户关键字搜索';
	$('#text').val('');
	config.flagMark ? $('.mark').show() : $('mark').hide()
	self.map.hideLocationMark();
	moEndClear()
	FloorDetection()
	// self.map.areaClickEmbed = true;
}

function moClose() {
	// $('.looking').css('display', 'block').find('span').html('正在查看 ' + object.flooridFloors[nowFloorId] + '');
	self.map.areaClickEmbed = true;
	$('.mo_daohang,.mo_tishi').slideUp('fast');
	$('.looking,.changeF').css({
		'display': 'block'
	});
	// $('#speed').html(' ');
	$(".compass").css("top", "2.03rem")
	$('.setPoint, #loadings').hide();
	$('.changeF,.looking').show();
	$('#searchSpan').removeClass('go_back')
	// self.map.showFloors([object.moFloorid.start])
	object.order = object.floorData.length - object.flooridOrder[object.moFloorid.start]
	mySwiper.destroy(true)
	mySwiper = myswiper()
	mySwiper.init()
	self.map.clearPath(false);
	// self.map.cleanSelectUnit3D();
	self.map.hideLocationMark();
	$('.floorToggleBox,.floorToggleMinUl,.scale').css('bottom', '.6rem');
	$(".compass").css("top", "1.70rem")
	$('.setPoint1,.operation,.mark').show();
	if ($('.operation').css('display') == 'block') {
		$('.gSearch').hide();
	} else {
		$('.gSearch').show();
	}
	goback()
	moEndClear()
	// pathGo();
}

function volumeOnOff(span) {
	var autoplay_audio = $("#mo_yuyin")[0];
	if (object.isTrue) {
		$(span).css({
			'background': "url('./images/声音x.png') center center no-repeat",
			'backgroundSize': 'contain'
		});
		autoplay_audio.volume = 0
		object.isTrue = !object.isTrue;
	} else {
		$('#speed').html($('.mo_text').text())
		$(span).css({
			'background': "url('./images/声音.png') center center no-repeat",
			'backgroundSize': 'contain'
		});
		autoplay_audio.volume = 1;
		object.isTrue = !object.isTrue;
	}
}

function yuyin(span) {
	if (object.flagAudio) {
		$(span).css({
			'background': "url('./images/声音x.png') center center no-repeat",
			'backgroundSize': 'contain'
		});
		object.flagAudio = !object.flagAudio;
	} else {
		$(span).css({
			'background': "url('./images/声音.png') center center no-repeat",
			'backgroundSize': 'contain'

		});
		object.flagAudio = !object.flagAudio;
	}
}
//分享
$(".sharedbtn").click(function () {
	$(".sharemask").show();
});
$(".sharemask").click(function () {
	$(".sharemask").hide();
})

// 定位超时处理函数
function aaa(server, args, callBackFunc) {
	var xhr = $.ajax({
		type: "GET",
		url: server,
		data: args,
		dataType: "JSONP",
		timeout: 1000,
		success: function (data) {
			callBackFunc(data);
		},
		error: function (e) {
			// console.log("- [GimMap]loadURL Error:", e);
		},
		complete: function (XMLHttpRequest, status) {
			if (status == 'timeout') {
				xhr.abort();
				$('.waiting').stop(false, true).html('定位超时，请检查网络连接');
				$('.waiting img').attr('src', './images/5.wifi2.png')
				setTimeout(function () {
					$('.waiting').fadeOut(4000).css({
						"display": 'block'
					})
				}, 3000)
			}
		}

	});

}
var px = 50;

function getLocation() {
	var cmd = {};
	cmd.command = "mallcoo_getlocationpoint";
	cmd.pid = GIM.PID;
	cmd.lan = "sc";

	// mac = "8C:EB:C6:9A:C2:D3";
	// mac = "fc:db:b3:d4:d8:8c";
	// mac = "d4:50:3f:a9:1f:d9";
	// mac = "74:04:2b:d9:d4:f7";
	// mac = "A8:66:7F:73:E4:2D";
	//console.log(mac)
	cmd.parameter = {
		"mac": object.mac ? object.mac : '',
		"ip": object.ip ? object.ip : '',
		"FROM": "IMCIntranet"
	};
	object.mac ? $('.mac').html('mac地址:' + object.mac) : $('.mac').html('mac地址:未获取成功')
	var agrs = "code=" + JSON.stringify(cmd);

	aaa(GIM.REMOTE_SERVER, agrs, function (data) {
		var code = data.c;
		var area, order;
		if (code == 200) {
			floorKey = String(data.v.Floor);
			console.log(floorKey)
			console.log("data:", data.v.X, data.v.Y);
			if (object.deBug) {
				// bindBug(data.v.X, data.v.Y, data.v.Floor)
			}
			// $('.pxi').html('X坐标:' + data.v.X)
			// $('.pyi').html('Y坐标:' + data.v.Y)
			// $('.pfloor').html('楼层id:' + data.v.Floor)
			switch (floorKey) {
				case "P3M": //-7
					area = P3M;
					order = 10;
					floorid = "8348B11F-4422-4761-BFFF-8B2FC747A5A5";
					break;
				case "LG2M": //-6
					area = LG2M;
					order = 9;
					floorid = "E7444493-872C-4638-A48D-4280258005EC";
					break;
				case "P5": //-5
					area = P5;
					order = 12;
					floorid = "553EA236-384F-44F0-A24F-150CC1B8BA03";
					break;
				case "P4": //-4
					area = P4;
					order = 11;
					floorid = "DFC1BEE4-2205-4DA7-A9FC-881C96F393BC";
					break;
				case "P3": //-3
					area = P3;
					order = 9;
					floorid = "9C8AAF2E-6497-4705-B88C-68AE7AE56EB8";
					break;
				case "LG2": //-2
					area = LG2;
					order = 8;
					floorid = "A49C0718-E8FA-457C-9E29-0332F86BE1AB";
					break;
				case "LG1": //-1
					area = LG1;
					order = 7;
					floorid = "B1BDB851-6D90-477D-8E0F-FF598154BAAB";
					break;
				case "L1": //0
					area = L1;
					order = 6;
					floorid = "BCD5A746-CFE0-448F-A7C8-08646A5B96F6";
					break;
				case "L2": //1
					area = L2;
					floorid = "8AD368B1-A9B7-4E54-A37E-A3EA8424A1ED";
					order = 5;
					break;
				case "L3": //2
					area = L3;
					floorid = "EB72B381-B3BC-40A4-B8DF-3D932302B9D8";
					order = 4;
					break;
				case "L4": //3
					area = L4;
					floorid = "E84F185A-EE32-4AA5-9690-3A74278B040E";
					order = 3;
					break;
				case "L5": //4
					area = L5;
					floorid = "540C24AA-191F-4962-A8C4-CAE230100957";
					order = 2;
					break;
				case "L6": //5
					area = L6;
					floorid = "D7380838-4439-4164-911B-D2861F8F16FF";
					order = 1;
					break;
				case "L7": //6
					area = L7;
					floorid = "23F3C686-27C8-4E49-A19E-550649C0F36D";
					order = 0;
					break;
			}
			var p = new THREE.Vector2(data.v.X, data.v.Y);
			p = convertCoords(p, area);
			map.setLocationMark(p, floorid);
			if (shopShowLocation) {
				object.startP = map.getNearPoint();
			}
			if (oldFloorid != floorid) {
				oldFloorid = floorid
				// setTimeout(function() {
				object.flagClearInterval = true;
				// }, 2000)
			}
			$('.waiting').html('定位成功').fadeOut(2000)
			// $('.waiting img').attr('src', './images/5.wifi.png')
			if (object.flagClearInterval) {
				$('.looking').show().find('span').html('正在查看 ' + object.flooridFloors[floorid] + '');
				// $(".floorToggle").html('' + object.flooridFloors[floorid] + '')
				FloorDetection()
				$('#startPoint').val('我的位置')
				object.moFloorid.start = floorid
				self.map.clearStartArea()
				$('.shares').css('display', 'none');
				$('.operation,.setPoint1').css('display', 'block');
				$('.compass').css({
					'top': '1.68rem'
				});
				$('.floorToggleBox,.floorToggleMinUl,.scale').css('bottom', '2rem');
				if (object.endP == '' || object.endP == null) {
					$('.tishi').html('请设置终点');
					$('.go,.mogo').attr("disabled", 'disabled').css('backgroundColor', '#999');
				} else {
					$('.tishi').html('点击开始导航');
					$('.go,.mogo').attr("disabled", false).css('backgroundColor', '#a6937c');
					object.startP = map.getNearPoint();
					if (object.ispathGoer) {
						pathGo();
					}
				}
				if ($('.operation').css('display') == 'block') {
					$('.gSearch').hide();
				} else {
					$('.gSearch').show();
				}
				if (object.floorid != floorid) {
					object.floorid = floorid;
					object.order = order;
					self.map.showLocation()
					mySwiper.destroy(true)
					mySwiper = myswiper()
					mySwiper.init()
					object.flagClearInterval = false
					object.locationCenter = true;
				} else {
					if (object.locationCenter) {
						self.map.showLocation()
					}
				}

			} else {
				if (object.locationCenter) {
					self.map.showLocation()
				}
			}
			// }
			// setTimeout(function() {
			//     $('.waiting').stop().fadeOut(2000)
			// }, 3000)
		} else {
			if (debug) {
				px += 300;
				var p = new THREE.Vector2(px, 2000);
				p = convertCoords(p, L3);
				map.setLocationMark(p, "EB72B381-B3BC-40A4-B8DF-3D932302B9D8");
				if (shopShowLocation) {
					object.startP = map.getNearPoint();
				}
				floorid = "EB72B381-B3BC-40A4-B8DF-3D932302B9D8";
				order = 4
				$('.waiting').html('定位成功').fadeOut(4000);
				if (object.flagClearInterval) {
					$('.looking').show().find('span').html('正在查看 ' + object.flooridFloors[floorid] + '');
					// $(".floorToggle").html('' + object.flooridFloors[floorid] + '')
					FloorDetection()
					$('#startPoint').val('我的位置')
					object.moFloorid.start = object.floorid
					self.map.clearStartArea()
					$('.shares').css('display', 'none');
					$('.operation,.setPoint1').css('display', 'block');
					$('.compass').css({
						'top': '1.68rem'
					});
					$('.floorToggleBox,.floorToggleMinUl,.scale').css('bottom', '2rem');
					if (object.endP == '' || object.endP == null) {
						$('.tishi').html('请设置终点');
						$('.go,.mogo').attr("disabled", 'disabled').css('backgroundColor', '#999');
					} else {
						$('.tishi').html('点击开始导航');
						$('.go,.mogo').attr("disabled", false).css('backgroundColor', '#a6937c');
						object.startP = map.getNearPoint();
						pathGo();
					}
					if ($('.operation').css('display') == 'block') {
						$('.gSearch').hide();
					} else {
						$('.gSearch').show();
					}
					if (object.floorid != floorid) {
						object.floorid = floorid;
						object.order = order;
						self.map.showLocation()
						mySwiper.destroy(true)
						mySwiper = myswiper()
						mySwiper.init()
						object.flagClearInterval = false;
						object.locationCenter = true;
					} else {
						if (object.locationCenter) {
							self.map.showLocation()
						}
					}
				} else {
					if (object.locationCenter) {
						self.map.showLocation()
					}
				}
			} else {
				if (isShowLocateTip) {
					getLocations();
					isShowLocateTip = false;
					// setTimeout(function() {
					//     $('.waiting').stop(false, true).fadeOut(2000)
					// }, 3000)

				}
				map.hideLocationMark();
			}

		}

	});
}


function handleVisibilityChange() {
	if (document.hidden) {

		console.log("hidden");
	} else {
		getWifi();
		console.log("visible");

	}
}


function convertCoords(params, wifiArea) {
	var p = {};
	p.x = wifiArea.width / wifiArea.tx * params.x + wifiArea.left - GIM.OFFSET;
	p.y = -(wifiArea.height / wifiArea.ty * params.y + wifiArea.top) + GIM.OFFSET;
	return p;

}
var P3 = {
	left: 806, //华三设计图在创互设计图离坐标原点的像素左距离
	top: 1668, //华三设计图在创互设计图离坐标原点的像素上距离
	width: 3859, //华三设计图在创互设计图所在大小的像素宽度
	height: 1931, //华三设计图在创互设计图所在大小的像素高度
	tx: 9049, //华三原始像素宽度
	ty: 4529 //华三原始像素高度
}
var P3M = {
	left: 811,
	top: 1673,
	width: 3820,
	height: 1909,
	tx: 9193,
	ty: 4593
}
var LG1 = {
	left: 766,
	top: 1729,
	width: 3877,
	height: 1852,
	tx: 9297,
	ty: 4441
}
var LG2 = {
	left: 734,
	top: 1254,
	width: 3961,
	height: 2802,
	tx: 9362,
	ty: 6623
}
var P5 = {
	left: 769,
	top: 1674,
	width: 3894,
	height: 1939,
	tx: 9033,
	ty: 4479
}

var P4 = {
	left: 724,
	top: 1657,
	width: 3959,
	height: 1954,
	// tx: 404.0,
	// ty: 206.0
	tx: 9225,
	ty: 4553
}
var L1 = {
	left: 752,
	top: 1320,
	width: 3729,
	height: 2639,
	// tx: 381.2,
	// ty: 224.2
	tx: 9362,
	ty: 6623
}
var L2 = {
	left: 847,
	top: 1679,
	width: 3587,
	height: 1774,
	// tx: 372.1,
	// ty: 182.5
	tx: 9073,
	ty: 4489
}
var L3 = {
	left: 721,
	top: 1555,
	width: 3987,
	height: 2009,
	// tx: 390.1,
	// ty: 198.5
	tx: 9144,
	ty: 4608
}
var L4 = {
	left: 852,
	top: 1622,
	width: 3646,
	height: 1855,
	// tx: 381.2,
	// ty: 193.6
	tx: 8144,
	ty: 4144
}

var L5 = {
	left: 821,
	top: 1921,
	width: 3655,
	height: 1558,
	// tx: 373.8,
	// ty: 157.4
	tx: 8841,
	ty: 3769
}
var L6 = {
	left: 827,
	top: 1938,
	width: 2475,
	height: 1539,
	// tx: 241.8,
	// ty: 144.6
	tx: 8689,
	ty: 5401
}
var L7 = {
	left: 824,
	top: 1929,
	width: 3651,
	height: 1531,
	// tx: 377.9,
	// ty: 158.3
	tx: 8817,
	ty: 3697
};
// 创建楼层功能函数
function myswiper($floorid) {
	return new Swiper('.swiper-container1', {
		on: {
			slideChangeTransitionEnd: function () {
				// object.floorid = object.orderFloors[this.slides[this.activeIndex].innerText]
				if (!object.shopID) {
					self.map.showFloors([initFloorId])
					// console.log("asd")
				}
				if (object.isSwiper) {
					$('.looking').show().find('span').html('正在查看 ' + object.flooridFloors[object.floorid] + '');
				}
				self.map.setAzimuthalAngle(60);
				// self.map.zoomLevel(15);
				self.map.setPolarAngle(0);
				$('.operation, .setPoint1, .setPoint').hide();
				$('.floorToggleBox,.floorToggleMinUl,.scale').css('bottom', '.6rem');
				$('.gSearch').show()
				object.locationCenter = false

			}
		},
		init: false,
		direction: 'vertical',
		slidesPerView: 'auto',
		initialSlide: object.order,
		// initialSlide: 9,
		slideToClickedSlide: true,
		centeredSlides: true,
		freeMode: true,
		observer: true, //修改swiper自己或子元素时，自动初始化swiper
		observeParents: true,
	});
}



// 搜索页面功能开始
function goSearch() {
	$('.main').css({
		'display': 'block'
	});
	$(".looking").hide()
	document.querySelector('#text').placeholder = ' '
	document.querySelector('#text').value = ''
	$('#searchSpan').addClass('go_back')

}

function searchBack() {
	if ($('#text').val() != '') {
		$('#text').val('')
		$('.main').show();
		$('.inputName').hide()
		document.querySelector('#text').focus()
	} else {
		$('.main,.searchBtn,.inputName,.setPoint').hide();
		$('#searchSpan').removeClass('go_back')
		$('.operation').css('display') == 'block' ? $('.gSearch').hide() : $('.gSearch').show()
		$('.floorToggleBox,.floorToggleMinUl,.scale').css('bottom', '.6rem');
		self.map.cleanSelectUnit3D()
	}
	$(".looking").show()
	// self.map.areaClickEmbed = true;
}

function searchHtml() {
	$('.gSearch,.main').show()
	document.querySelector('#text').focus()
}

function spanBtn() {
	$('.spanSearch').on('click', function () {
		var name = $(this).html().toLowerCase()
		document.querySelector('#text').value = name;
		$('#searchSpan').addClass('go_back');
		bindSearch(name)
	})

}

function hisLiBtn(li) {
	var name = $(li).html().toLowerCase()
	document.querySelector('#text').value = name;
	$('#searchSpan').addClass('go_back');
	$(li).insertBefore($(li).siblings().eq(0))
	bindSearch(name, true)
}

function historyBtn() {
	$('.his_list ul li ').on('click', function () {
		var name = $(this).html().toLowerCase()
		bindSearch(name, true)
	})
}

function clearHistory() {
	$('.his_list ul li').remove()
}

$('#text').on('input', function () {
	var searchName = $(this).val().toLowerCase()
	bindSearch(searchName, false)
})

function bindSearch(searchName, ls, areaData) {
	// console.log(allShopData)
	$('.inputName').show()
	var arrName = []
	var ul = $(".swiper-container3"),
		htmlS = '<ul class="swiper-wrapper swiper-wrapper3">',
		htmlE = '</ul>',
		liHtml = []
	liHtmm = []
	ul.find(".swiper-wrapper3").remove();
	if (object.shopList) {
		object.shopList.forEach((e) => {
			if (e.ShopName && e.ShopName.toLowerCase().indexOf(searchName) != -1) {
				arrName.push(e)
			}
		})
		// console.log(arrName)
		if (arrName.length > 0) {
			arrName.forEach(function (element) {
				liHtml.push('<li class="searchPoint clearfix swiper-slide swiper-slide3" onclick=setPoint("' + encodeURI(element.ShopName) + '","' + searchFloorId(element.AreaID) + '","' + element.AreaID + '","' + encodeURI(element.Name) + '",' + ls + ',"' + element.PointID + '")>' +
					'<div class="left">' +
					'<p class="pointName">' + (element.ShopName) + '</p>' +
					'<p class="pointFloor">楼层：' + searchFloorNo(element.AreaID) + '</p>' +
					'</div>' +
					'</li>')
			})
			if (liHtml.length > 0) {
				ul.html(htmlS + liHtml.join('') + htmlE)
				var mySwipers = new Swiper('.swiper-container3', {
					direction: 'vertical',
					slidesPerView: 'auto',
					initialSlide: 0,
					slideToClickedSlide: true,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					observeParents: true,

				})
			}

		} else {
			var h = "<div class='noList'>无搜索结果</div>"
			ul.html(htmlS + h + htmlE)
		}

	}
}

function searchFloorNo($AreaID) {
	for (var i = 0; i < allShopData.length; i++) {
		// console.log(parkingFloorsData[i].Area)
		var shopData = allShopData[i].Area
		for (let j = 0; j < shopData.length; j++) {
			// console.log(j)
			if ($AreaID == shopData[j].AreaID) {
				// console.log(allShopData[i].FloorID)
				return object.flooridFloors[allShopData[i].FloorID]
			}
		}
	}
}

function searchFloorId($AreaID) {
	for (var i = 0; i < allShopData.length; i++) {
		// console.log(parkingFloorsData[i].Area)
		var shopData = allShopData[i].Area
		for (let j = 0; j < shopData.length; j++) {
			// console.log(j)
			if ($AreaID == shopData[j].AreaID) {
				// console.log(allShopData[i].FloorID)
				return allShopData[i].FloorID
			}
		}
	}
}

function setPoint(shopName, floorID, areaID, $name, ls, PointID) {
	var $name = decodeURI($name)
	var shopName = decodeURI(shopName)
	$('.main,.inputName').hide()
	$('#text').val(shopName)
	object.mark = areaID;
	$('.pointName').html(shopName);
	$('.pointFloor').html(object.flooridFloors[floorID]);
	$('.floorToggleBox,.floorToggleMinUl,.scale').css('bottom', '2rem');
	object.floorid = floorID
	object.order = object.floorData.length - object.flooridOrder[object.floorid]
	mySwiper.destroy(true);
	mySwiper = myswiper(config.floorNumber);
	mySwiper.init();
	// self.map.showFloors([floorID])
	// self.map.addMarkToPoint(PointID, "mark");
	self.map.selectByAreaID(areaID, true);
	self.map.zoomLevel(5);
	if (!ls) {
		var h = '<li onclick="hisLiBtn(this)">' + shopName + '</li>'
		$('.his_list ul li').length > 0 ? $('.his_list ul').children('li').eq(0).before(h) : $('.his_list ul').append(h)
	} else {
		return
	}
	nowFloorToggleNo = object.flooridFloors[floorID]
	FloorDetection()
}
// 总体功能函数

// 截取url参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}


function getArgs() {
	var args = new Object();
	var query = location.search.substring(1); // Get query string
	var pairs = query.split("&"); // Break at ampersand
	for (var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('='); // Look for "name=value"
		if (pos == -1) continue; // If not found, skip
		var argname = pairs[i].substring(0, pos); // Extract the name
		var value = pairs[i].substring(pos + 1); // Extract the value
		value = decodeURIComponent(value); // Decode it, if needed
		args[argname] = value; // Store as a property
	}
	return args; // Return the object
}
// 替换url参数值

function replaceArg(url, arg, arg_val) {
	var pattern = arg + '=([^&]*)';
	var replaceText = arg + '=' + arg_val;
	if (url.match(pattern)) {
		var tmp = '/(' + arg + '=)([^&]*)/gi';
		tmp = url.replace(eval(tmp), replaceText);
		return tmp;
	} else {
		if (url.match('[\?]')) {
			return url + '&' + replaceText;
		} else {
			return url + '?' + replaceText;
		}
	}
	return url + '\n' + arg + '\n' + arg_val;
}

function replaceUrl($url) {
	console.log(object.floorid)
	var url = $url
	if (url.indexOf('?') == -1) {
		if (object.floorid) {
			url = url + '?floorid=' + object.floorid;
		}
		if (object.mark) {
			url = url + '&mark=' + object.mark
		}
		if (object.pointmove != {}) {
			url = url + '&pointmove=' + JSON.stringify(object.pointmove)
		}

	} else {
		if (url.indexOf('mark') == -1) {
			url = url + '&mark=' + object.mark
		} else {
			if (object.mark) {
				url = replaceArg(url, 'mark', object.mark);
			}
		}
		if (url.indexOf('floorid') == -1) {
			url = url + '&floorid=' + object.floorid
		} else {
			if (object.floorid) {
				url = replaceArg(url, 'floorid', object.floorid);
			}
		}

		if (url.indexOf('pathfinding') == -1) {
			return url;
		}

		if (object.pointmove != {}) {
			url = replaceArg(url, 'pointmove', JSON.stringify(object.pointmove))
		}




	}
	return url
}

function testClose() {
	if ($('.deBug').html() == '开启') {
		$('.deBug').html('关闭')
		$('.ceshi').show()
		object.deBug = true
	} else {
		$('.deBug').html('开启')
		$('.ceshi').hide()
		object.deBug = false
	}
}

// var cccc = 1

function bindBug(x, y, f) {
	var html = '<li><span class="pxi">X：' + x + ';</span><span class="pyi">Y：' + y + ';</span><span class="pfloor">floorid:' + f + '</span></li> '
	$('.swiper-wrapper4').prepend(html)

}
var mySwiper4 = new Swiper('.swiper-container4', {
	direction: 'vertical',
	slidesPerView: 'auto',
	// initialSlide: 0,
	slideToClickedSlide: true,
	observer: true, //修改swiper自己或子元素时，自动初始化swiper
	observeParents: true,
	init: true

})
$('.scale,.biger,.smaller').on('touchstart', function (e) {
	e.target.classList.add('backColor')
})
$('.scale,.biger,.smaller').on('touchend', function (e) {
	e.target.classList.remove('backColor')
})

document.addEventListener('touchmove', function () {
	object.locationCenter = false;
}, false)



function floorStart() {
	self.map.showFloors([object.moFloorid.start])
	// $(span).addClass('floor_active')
	$('.floorEnd').removeClass('floor_active')
	$('.floorStart').addClass('floor_active')
}

function floorEnd() {
	self.map.showFloors([object.moFloorid.end])
	$('.floorStart').removeClass('floor_active')
	$('.floorEnd').addClass('floor_active')
}



// if ($('.looking').css('display') == 'block' && $('.wait_text').css('display' == 'none')) {
//     
// } else {
//     $('.waiting').css({ 'width': "auto" })
// }



// var jianting = setInterval(function() {
//     //局部变量反复获取
//     // 要监听元素
//     var org = $(".looking").css("display"); //设置全局变量进行比较
//     var txt = $(".wait_text").css("display");
//     console.log(txt)
//     if (org == 'block' && txt == 'none') { //检测变化
//         // window.location.href = txt; //跳转src地址
//         //alert("changed");
//         // clearInterval(jianting); //只监听一下次变化就用这个,不用就去掉
//         $('.waiting').css({ 'width': ".4rem", 'float': 'right' })
//     } else {
//         $('.waiting').css({ 'width': "auto" })
//     }
// }, 10);
var baseHtmlCode={
	"writingHtml":`
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
		</head>
		<body>
			<h1 style="text-align:center;">页面建设中,敬请期待!</h1>
		</body>
	</html>
	`,
	"101":`
	<!--
	基础地图展示:
	了解一下基础加载流程
	-->
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>happymap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="map/css/reset.css">
			<link rel="stylesheet" type="text/css" href="map/css/index1.css">
			<script type="text/javascript" src="map/js/jquery-3.2.1.min.js"></script>
			<script src="map/js/map.min.js"></script>
		</head>
		<body>
			<div id="mapContainer"></div>
			<script>
				var self = this;
				init();
				//地图初始化参数配置
				function init() {
					GIM.REMOTE_SERVER = "https://map.ckiosk.cn/webAPI/ClientService.asmx/Command";//项目服务地址
					GIM.SHOW_Facility_LENGTH = 5000;//公共设施图标开始显示的距离
					var container = document.getElementById("mapContainer")
					var params = {
		                initCompleted: function(){},//初始化完成之后的调用函数
		                onSelected: function(){},//当区块被选中时触发
		                enabledControl: true,//是否启用手势操作
		                container: container,//包装的div
		                themeID: "1003",//主题文件夹编号
		                logoFiled:"Logo",//图标字段
		                initFloorID: "1919DBAE-1655-4102-87A5-1709E1C9DBC2",//初始化显示的楼层 可选
		                projectID: "6C14DBE3-C79F-4A03-845C-9DD6ACE7A374",//项目ID
		                cloudID: "20F476EB-8411-470D-AE82-05C465DE5582",//云ID
		                preCreation:false,//是否后台静默渲染 默认为true
		                accessToken: "86E81446-7C98-432F"//授权
		            };
					self.map = new GIM.Map3D(params);
				}
			</script>
		</body>
	</html>
	`,
	'102':`
	<!--
	地图初始化设置:
	你可以尝试修改init函数中的这些变量:
	GIM.far:镜头距离0点的最大距离，GIM.near是最小距离
	GIM.SHOW_Facility_LENGTH:公共设施图标开始显示的距离
	params.backgroundColor:除去地图实体外的虚空背景色
	params.labelScale:文字标签缩放倍数
	self.map.selectedColor:地图的房间被选中时的颜色
	self.map.move2Point:初始位置的x,y坐标偏移
	self.map.cameraRadius:初始镜头距离
	self.map.setPolarAngle:仰角角度
	self.map.setAzimuthalAngle:水平旋转角度
	self.map.showCompass:是否显示指南针
	
	这里展示了部分常用设置,更多API请查看https://map.ckiosk.cn/APIDOC
	-->
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>happymap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="map/css/reset.css">
			<link rel="stylesheet" type="text/css" href="map/css/index1.css">
			<script type="text/javascript" src="map/js/jquery-3.2.1.min.js"></script>
			<script src="map/js/map.min.js"></script>
		</head>
		<body>
			<div id="mapContainer"></div>
			<script>
				var self = this;
				init();
				//地图初始化参数配置
				function init() {
					GIM.REMOTE_SERVER = "https://map.ckiosk.cn/webAPI/ClientService.asmx/Command";//项目服务地址
					GIM.far = 8000;//镜头最远距离
					GIM.SHOW_Facility_LENGTH = 5000;//公共设施图标开始显示的距离
					var container = document.getElementById("mapContainer")
					var params = {
		                initCompleted: function(){},//初始化完成之后的调用函数
		                onSelected: function(){},//当区块被选中时触发
		                enabledControl: true,//是否启用手势操作
		                container: container,//包装的div
		                themeID: "1003",//主题文件夹编号
		                logoFiled:"Logo",//图标字段
						labelScale:2.0,//文字标签缩放倍数
						backgroundColor: '#f2f2f2',//虚空背景色
		                initFloorID: "1919DBAE-1655-4102-87A5-1709E1C9DBC2",//初始化显示的楼层 可选
		                projectID: "6C14DBE3-C79F-4A03-845C-9DD6ACE7A374",//项目ID
		                cloudID: "20F476EB-8411-470D-AE82-05C465DE5582",//云ID
		                preCreation:false,//是否后台静默渲染 默认为true
		                accessToken: "86E81446-7C98-432F"//授权
		            };
					self.map = new GIM.Map3D(params);
					
					self.map.selectedColor = 0x9933ff//选中房间颜色
					self.map.move2Point({//初始镜头偏移
						x: 2500,
						y: -2500
					});
					self.map.cameraRadius = 5000;//初始镜头距离
					self.map.setPolarAngle(0);//仰角
					self.map.setAzimuthalAngle(20);//水平旋转角度
					self.map.showCompass(true);//指南针
					self.map.regCompassChange(function (angel) {
						$(".compass").css({
							"transform": "rotate(" + angel + "deg)"
						})
					})
				}
			</script>
		</body>
	</html>
	`,
	'103':`
	<!--
	主题切换:
	修改params.themeID变量，可更换包括指南针、标注点、用户位置在内的一套图标，目前有"1003"和"1001"两个主题.
	这里的可切换风格不够多,所以,我们为每个项目设置不同主题的手段是为每个项目都上传不同风格的图标.
	-->
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>happymap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="map/css/reset.css">
			<link rel="stylesheet" type="text/css" href="map/css/index1.css">
			<script type="text/javascript" src="map/js/jquery-3.2.1.min.js"></script>
			<script src="map/js/map.min.js"></script>
		</head>
		<body>
			<div id="mapContainer"></div>
			<script>
				var self = this;
				init();
				//地图初始化参数配置
				function init() {
					GIM.REMOTE_SERVER = "https://map.ckiosk.cn/webAPI/ClientService.asmx/Command";//项目服务地址
					GIM.far = 8000;//镜头最远距离
					GIM.SHOW_Facility_LENGTH = 5000;//公共设施图标开始显示的距离
					var container = document.getElementById("mapContainer")
					var params = {
		                initCompleted: function(){},//初始化完成之后的调用函数
		                onSelected: function(){},//当区块被选中时触发
		                enabledControl: true,//是否启用手势操作
		                container: container,//包装的div
		                themeID: "1003",//主题文件夹编号
		                logoFiled:"Logo",//图标字段
						labelScale:2.0,//文字标签缩放倍数
						backgroundColor: '#f2f2f2',//虚空背景色
		                initFloorID: "1919DBAE-1655-4102-87A5-1709E1C9DBC2",//初始化显示的楼层 可选
		                projectID: "6C14DBE3-C79F-4A03-845C-9DD6ACE7A374",//项目ID
		                cloudID: "20F476EB-8411-470D-AE82-05C465DE5582",//云ID
		                preCreation:false,//是否后台静默渲染 默认为true
		                accessToken: "86E81446-7C98-432F"//授权
		            };
					self.map = new GIM.Map3D(params);
					
					self.map.selectedColor = 0x9933ff;//选中房间颜色
					self.map.move2Point({//初始镜头偏移
						x: 2500,
						y: -2500
					});
					self.map.cameraRadius = 5000;//初始镜头距离
					self.map.setPolarAngle(0);//仰角
					self.map.setAzimuthalAngle(20);//水平旋转角度
					self.map.showCompass(true);//指南针
					self.map.regCompassChange(function (angel) {
						$(".compass").css({
							"transform": "rotate(" + angel + "deg)"
						})
					})
				}
			</script>
		</body>
	</html>
	`,
	'104':`
	<!--
	地图操作:
	鼠标左键拖拽可拖动地图，点击地图实体可选中该实体.
	鼠标右键左右拖拽可旋转地图,上下拖拽可改变仰角.
	鼠标滚轮前滚可放大地图(镜头拉近),后滚可缩小地图(镜头拉远).
	-->
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>happymap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="map/css/reset.css">
			<link rel="stylesheet" type="text/css" href="map/css/index1.css">
			<script type="text/javascript" src="map/js/jquery-3.2.1.min.js"></script>
			<script src="map/js/map.min.js"></script>
		</head>
		<body>
			<div id="mapContainer"></div>
			<script>
				var self = this;
				init();
				//地图初始化参数配置
				function init() {
					GIM.REMOTE_SERVER = "https://map.ckiosk.cn/webAPI/ClientService.asmx/Command";//项目服务地址
					GIM.far = 8000;//镜头最远距离
					GIM.SHOW_Facility_LENGTH = 5000;//公共设施图标开始显示的距离
					var container = document.getElementById("mapContainer")
					var params = {
		                initCompleted: function(){},//初始化完成之后的调用函数
		                onSelected: function(){},//当区块被选中时触发
		                enabledControl: true,//是否启用手势操作
		                container: container,//包装的div
		                themeID: "1003",//主题文件夹编号
		                logoFiled:"Logo",//图标字段
						labelScale:2.0,//文字标签缩放倍数
						backgroundColor: '#f2f2f2',//虚空背景色
		                initFloorID: "1919DBAE-1655-4102-87A5-1709E1C9DBC2",//初始化显示的楼层 可选
		                projectID: "6C14DBE3-C79F-4A03-845C-9DD6ACE7A374",//项目ID
		                cloudID: "20F476EB-8411-470D-AE82-05C465DE5582",//云ID
		                preCreation:false,//是否后台静默渲染 默认为true
		                accessToken: "86E81446-7C98-432F"//授权
		            };
					self.map = new GIM.Map3D(params);
					
					self.map.selectedColor = 0x9933ff;//选中房间颜色
					self.map.move2Point({//初始镜头偏移
						x: 2500,
						y: -2500
					});
					self.map.cameraRadius = 5000;//初始镜头距离
					self.map.setPolarAngle(0);//仰角
					self.map.setAzimuthalAngle(20);//水平旋转角度
					self.map.showCompass(true);//指南针
					self.map.regCompassChange(function (angel) {
						$(".compass").css({
							"transform": "rotate(" + angel + "deg)"
						})
					})
				}
			</script>
		</body>
	</html>
	`,
	'105':`
	<!--
	楼层显示控制:
	可通过Map3D对象的showFloors方法切换楼层
	在Map3D对象初始化完成的initCompleted回调函数中进行数据和事件的处理
	-->
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>happymap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="map/css/reset.css">
			<link rel="stylesheet" type="text/css" href="map/css/index1.css">
			<script type="text/javascript" src="map/js/jquery-3.2.1.min.js"></script>
			<script src="map/js/map.min.js"></script>
			<style>
				.floorsControl{padding:0 5px;height:24px;line-height:24px;outline:none;border-color:#0f76f3;color:#0f76f3;border-radius:3px;position:fixed;top:10px;left:10px;}
			</style>
		</head>
		<body>
			<select id="floorsControl" class="floorsControl">
			<select>
			<div id="mapContainer"></div>
			<script>
				var self = this;
				init();
				//地图初始化参数配置
				function init() {
					GIM.REMOTE_SERVER = "https://map.ckiosk.cn/webAPI/ClientService.asmx/Command";//项目服务地址
					GIM.far = 8000;//镜头最远距离
					GIM.SHOW_Facility_LENGTH = 5000;//公共设施图标开始显示的距离
					var container = document.getElementById("mapContainer")
					var params = {
		                initCompleted: initCompleted,//初始化完成之后的调用函数
		                onSelected: function(){},//当区块被选中时触发
		                enabledControl: true,//是否启用手势操作
		                container: container,//包装的div
		                themeID: "1003",//主题文件夹编号
		                logoFiled:"Logo",//图标字段
						labelScale:2.0,//文字标签缩放倍数
						backgroundColor: '#f2f2f2',//虚空背景色
		                initFloorID: "1919DBAE-1655-4102-87A5-1709E1C9DBC2",//初始化显示的楼层 可选
		                projectID: "6C14DBE3-C79F-4A03-845C-9DD6ACE7A374",//项目ID
		                cloudID: "20F476EB-8411-470D-AE82-05C465DE5582",//云ID
		                preCreation:false,//是否后台静默渲染 默认为true
		                accessToken: "86E81446-7C98-432F"//授权
		            };
					self.map = new GIM.Map3D(params);
					
					self.map.selectedColor = 0x9933ff;//选中房间颜色
					self.map.move2Point({//初始镜头偏移
						x: 2500,
						y: -2500
					});
					self.map.cameraRadius = 5000;//初始镜头距离
					self.map.setPolarAngle(0);//仰角
					self.map.setAzimuthalAngle(20);//水平旋转角度
					self.map.showCompass(true);//指南针
					self.map.regCompassChange(function (angel) {
						$(".compass").css({
							"transform": "rotate(" + angel + "deg)"
						})
					})
				}
				
				//地图初始化后的操作
				function initCompleted($floorData, areaData, list) {
					var selectHtml='';
					for(var i=0;i<$floorData.length;i++){
						var selStr="";
						if($floorData[i].floorID=="1919DBAE-1655-4102-87A5-1709E1C9DBC2"){
							selStr=' selected="selected"';
						}
						selectHtml+='<option value="'+$floorData[i].floorID+'"'+selStr+'>'+$floorData[i].name+'</option>';
					}
					$('#floorsControl').html(selectHtml);
					$('#floorsControl').on('change',function(){
						self.map.showFloors([$(this).val()],true);//根据楼层id切换楼层
					});
				}
			</script>
		</body>
	</html>
	`,
	'106':`
	<!--
	图屏显示控制:
	happymap在各种格式的屏幕下都能有良好的体验
	你可尝试修改宽,高来查看地图在各种宽高下的表现
	-->
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>happymap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="map/css/reset.css">
			<link rel="stylesheet" type="text/css" href="map/css/index1.css">
			<script type="text/javascript" src="map/js/jquery-3.2.1.min.js"></script>
			<script src="map/js/map.min.js"></script>
			<style>
				.controls{width:200px;height:140px;background:#fff;border:1px #ddd solid;border-radius:3px;position:fixed;top:10px;left:10px;}
				.controls .row{margin:10px 0;width:200px;height:30px;float:left;}
				.controls .row .label{width:15%;box-sizing:border-box;padding:0 5px;line-height:30px;text-align:right;float:left;}
				.controls .row .box{width:73.999%;box-sizing:border-box;padding:0 5px;line-height:30px;border:1px #ddd solid;}
				.controls .btn{width:60px;height:25px;margin:5px 0 0 25px;border:1px #ddd solid;border-radius:3px;background:#fff;cursor:pointer;float:left;}
				body{position:relative;}
			</style>
		</head>
		<body>
				<div class="controls">
					<div class="row">
						<div class="label">宽:</div>
						<input id="wBox" type="text" class="box" />
					</div>
					<div class="row">
						<div class="label">高:</div>
						<input id="hBox" type="text" class="box" />
					</div>
					<button id="changeBtn" class="btn">修改</button>
				</div>
				<div id="mapContainer"></div>
				<script>
				var self = this;
				init();
				//地图初始化参数配置
				function init() {
					GIM.REMOTE_SERVER = "https://map.ckiosk.cn/webAPI/ClientService.asmx/Command";//项目服务地址
					GIM.far = 8000;//镜头最远距离
					GIM.SHOW_Facility_LENGTH = 5000;//公共设施图标开始显示的距离
					var container = document.getElementById("mapContainer")
					var params = {
		                initCompleted: initCompleted,//初始化完成之后的调用函数
		                onSelected: function(){},//当区块被选中时触发
		                enabledControl: true,//是否启用手势操作
		                container: container,//包装的div
		                themeID: "1003",//主题文件夹编号
		                logoFiled:"Logo",//图标字段
						labelScale:2.0,//文字标签缩放倍数
						backgroundColor: '#f2f2f2',//虚空背景色
		                initFloorID: "1919DBAE-1655-4102-87A5-1709E1C9DBC2",//初始化显示的楼层 可选
		                projectID: "6C14DBE3-C79F-4A03-845C-9DD6ACE7A374",//项目ID
		                cloudID: "20F476EB-8411-470D-AE82-05C465DE5582",//云ID
		                preCreation:false,//是否后台静默渲染 默认为true
		                accessToken: "86E81446-7C98-432F"//授权
		            };
					self.map = new GIM.Map3D(params);
					
					self.map.selectedColor = 0x9933ff;//选中房间颜色
					self.map.move2Point({//初始镜头偏移
						x: 2500,
						y: -2500
					});
					self.map.cameraRadius = 5000;//初始镜头距离
					self.map.setPolarAngle(0);//仰角
					self.map.setAzimuthalAngle(20);//水平旋转角度
					self.map.showCompass(true);//指南针
					self.map.regCompassChange(function (angel) {
						$(".compass").css({
							"transform": "rotate(" + angel + "deg)"
						})
					})
				}
				function initCompleted(){
					$('#changeBtn').on('click',function(){
						mapChange();
					});
					$('#wBox,#hBox').on('keypress',function(e){
						if(e.keyCode==13){
							mapChange();
						}
					})
				}
				function mapChange(){
					var w=parseInt($('#wBox').val());
					var h=parseInt($('#hBox').val());
					if(w!=w||h!=h){
						alert('宽高需要是数字');
						return;
					};
					self.map.setSize(w,h);
					$('html,body').css({
						width:w+'px',
						height:h+'px'
					})
				}
			</script>
		</body>
	</html>
	`,
	'107':`
	<!--
	2D/3D切换:
	happymap的地图是由3D引擎创建的,当仰角为0时,地图视觉就类似2D平面效果,仰角不为0时,就能看到3D效果了
	使用setPolarAngle可以修改仰角角度,范围为0°-60°
	-->
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>happymap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="map/css/reset.css">
			<link rel="stylesheet" type="text/css" href="map/css/index1.css">
			<script type="text/javascript" src="map/js/jquery-3.2.1.min.js"></script>
			<script src="map/js/map.min.js"></script>
			<style>
				.angleControl{padding:0 5px;height:24px;line-height:24px;outline:none;border-color:#0f76f3;color:#0f76f3;border-radius:3px;position:fixed;top:10px;left:10px;}
			</style>
		</head>
		<body>
			<select id="angleControl" class="angleControl">
				<option value="0">0°</option>
				<option value="10">10°</option>
				<option value="20">20°</option>
				<option value="30" selected="selected">30°</option>
				<option value="40">40°</option>
				<option value="50">50°</option>
				<option value="60">60°</option>
			<select>
			<div id="mapContainer"></div>
			<script>
				var self = this;
				init();
				//地图初始化参数配置
				function init() {
					GIM.REMOTE_SERVER = "https://map.ckiosk.cn/webAPI/ClientService.asmx/Command";//项目服务地址
					GIM.far = 8000;//镜头最远距离
					GIM.SHOW_Facility_LENGTH = 5000;//公共设施图标开始显示的距离
					var container = document.getElementById("mapContainer")
					var params = {
		                initCompleted: initCompleted,//初始化完成之后的调用函数
		                onSelected: function(){},//当区块被选中时触发
		                enabledControl: true,//是否启用手势操作
		                container: container,//包装的div
		                themeID: "1003",//主题文件夹编号
		                logoFiled:"Logo",//图标字段
						labelScale:2.0,//文字标签缩放倍数
						backgroundColor: '#f2f2f2',//虚空背景色
		                initFloorID: "1919DBAE-1655-4102-87A5-1709E1C9DBC2",//初始化显示的楼层 可选
		                projectID: "6C14DBE3-C79F-4A03-845C-9DD6ACE7A374",//项目ID
		                cloudID: "20F476EB-8411-470D-AE82-05C465DE5582",//云ID
		                preCreation:false,//是否后台静默渲染 默认为true
		                accessToken: "86E81446-7C98-432F"//授权
		            };
					self.map = new GIM.Map3D(params);
					
					self.map.selectedColor = 0x9933ff;//选中房间颜色
					self.map.move2Point({//初始镜头偏移
						x: 2500,
						y: -2500
					});
					self.map.cameraRadius = 5000;//初始镜头距离
					self.map.setPolarAngle(30);//仰角
					self.map.setAzimuthalAngle(20);//水平旋转角度
					self.map.showCompass(true);//指南针
					self.map.regCompassChange(function (angel) {
						$(".compass").css({
							"transform": "rotate(" + angel + "deg)"
						})
					});
				}
				function initCompleted(){
					$('#angleControl').on('change',function(){
						console.log($(this).val());
						self.map.setPolarAngle($(this).val());
					});
				}
			</script>
		</body>
	</html>
	`,
	'108':`
	<!--
	坐标切换:
	当点击选中了地图实体后,镜头会自动切换到改实体居中的位置.
	也可以使用move2Point({x:x坐标,y:y坐标})改变镜头位置.
	左上角为0,0点,
	x坐标右加左减,
	y坐标上加下减.
	-->
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>happymap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="map/css/reset.css">
			<link rel="stylesheet" type="text/css" href="map/css/index1.css">
			<script type="text/javascript" src="map/js/jquery-3.2.1.min.js"></script>
			<script src="map/js/map.min.js"></script>
			<style>
				.controls{width:200px;height:140px;background:#fff;border:1px #ddd solid;border-radius:3px;position:fixed;top:10px;left:10px;}
				.controls .row{margin:10px 0;width:200px;height:30px;float:left;}
				.controls .row .label{width:15%;box-sizing:border-box;padding:0 5px;line-height:30px;text-align:right;float:left;}
				.controls .row .box{width:73.999%;box-sizing:border-box;padding:0 5px;line-height:30px;border:1px #ddd solid;}
				.controls .btn{width:60px;height:25px;margin:5px 0 0 25px;border:1px #ddd solid;border-radius:3px;background:#fff;cursor:pointer;float:left;}
			</style>
		</head>
		<body>
			<div class="controls">
				<div class="row">
					<div class="label">X:</div>
					<input id="xBox" type="text" class="box" />
				</div>
				<div class="row">
					<div class="label">Y:</div>
					<input id="yBox" type="text" class="box" />
				</div>
				<button id="goBtn" class="btn">Go</button>
				<button id="centerBtn" class="btn">回中心</button>
			</div>
			<div id="mapContainer"></div>
			<script>
				var self = this;
				init();
				//地图初始化参数配置
				function init() {
					GIM.REMOTE_SERVER = "https://map.ckiosk.cn/webAPI/ClientService.asmx/Command";//项目服务地址
					GIM.far = 8000;//镜头最远距离
					GIM.SHOW_Facility_LENGTH = 5000;//公共设施图标开始显示的距离
					var container = document.getElementById("mapContainer")
					var params = {
		                initCompleted: initCompleted,//初始化完成之后的调用函数
		                onSelected: function(){},//当区块被选中时触发
		                enabledControl: true,//是否启用手势操作
		                container: container,//包装的div
		                themeID: "1003",//主题文件夹编号
		                logoFiled:"Logo",//图标字段
						labelScale:2.0,//文字标签缩放倍数
						backgroundColor: '#f2f2f2',//虚空背景色
		                initFloorID: "1919DBAE-1655-4102-87A5-1709E1C9DBC2",//初始化显示的楼层 可选
		                projectID: "6C14DBE3-C79F-4A03-845C-9DD6ACE7A374",//项目ID
		                cloudID: "20F476EB-8411-470D-AE82-05C465DE5582",//云ID
		                preCreation:false,//是否后台静默渲染 默认为true
		                accessToken: "86E81446-7C98-432F"//授权
		            };
					self.map = new GIM.Map3D(params);
					
					self.map.selectedColor = 0x9933ff;//选中房间颜色
					self.map.move2Point({//初始镜头偏移
						x: 2500,
						y: -2500
					});
					self.map.cameraRadius = 5000;//初始镜头距离
					self.map.setPolarAngle(0);//仰角
					self.map.setAzimuthalAngle(0);//水平旋转角度
					self.map.showCompass(true);//指南针
					self.map.regCompassChange(function (angel) {
						$(".compass").css({
							"transform": "rotate(" + angel + "deg)"
						})
					});
				}
				function initCompleted(){
					$('#goBtn').on('click',function(){
						mapGo();
					});
					$('#xBox,#yBox').on('keypress',function(e){
						if(e.keyCode==13){
							mapGo();
						}
					})
					$('#centerBtn').on('click',function(){
						self.map.move2Point({//初始镜头偏移
							x: 2500,
							y: -2500
						});
					});
				}
				function mapGo(){
					var x=parseInt($('#xBox').val());
					var y=parseInt($('#yBox').val());
					if(x!=x||y!=y){
						alert('x,y坐标需要是数字');
					};
					self.map.move2Point({//初始镜头偏移
						x: x,
						y: y
					});
				}
			</script>
		</body>
	</html>
	`,
	'201':`
	<!--
	指南针:
	右上角的指南针控件,用于在地图旋转后提供指向标准.
	使用方式:
	showCompass隐藏或显示指南针
	regCompassChange地图旋转事件,在此处更新指南针角度
	-->
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>happymap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="map/css/reset.css">
			<link rel="stylesheet" type="text/css" href="map/css/index1.css">
			<script type="text/javascript" src="map/js/jquery-3.2.1.min.js"></script>
			<script src="map/js/map.min.js"></script>
		</head>
		<body>
			<div id="mapContainer"></div>
			<script>
				var self = this;
				init();
				//地图初始化参数配置
				function init() {
					GIM.REMOTE_SERVER = "https://map.ckiosk.cn/webAPI/ClientService.asmx/Command";//项目服务地址
					GIM.far = 8000;//镜头最远距离
					GIM.SHOW_Facility_LENGTH = 5000;//公共设施图标开始显示的距离
					var container = document.getElementById("mapContainer")
					var params = {
		                initCompleted: function(){},//初始化完成之后的调用函数
		                onSelected: function(){},//当区块被选中时触发
		                enabledControl: true,//是否启用手势操作
		                container: container,//包装的div
		                themeID: "1003",//主题文件夹编号
		                logoFiled:"Logo",//图标字段
						labelScale:2.0,//文字标签缩放倍数
						backgroundColor: '#f2f2f2',//虚空背景色
		                initFloorID: "1919DBAE-1655-4102-87A5-1709E1C9DBC2",//初始化显示的楼层 可选
		                projectID: "6C14DBE3-C79F-4A03-845C-9DD6ACE7A374",//项目ID
		                cloudID: "20F476EB-8411-470D-AE82-05C465DE5582",//云ID
		                preCreation:false,//是否后台静默渲染 默认为true
		                accessToken: "86E81446-7C98-432F"//授权
		            };
					self.map = new GIM.Map3D(params);
					
					self.map.selectedColor = 0x9933ff;//选中房间颜色
					self.map.move2Point({//初始镜头偏移
						x: 2500,
						y: -2500
					});
					self.map.cameraRadius = 5000;//初始镜头距离
					self.map.showCompass(true);//指南针
					self.map.regCompassChange(function (angel) {//更新指南针角度
						$(".compass").css({
							"transform": "rotate(" + angel + "deg)"
						})
					});
				}
			</script>
		</body>
	</html>
	`,
	"301":`
	<!--
	覆盖物:
	覆盖物是指除了3D地图以外的,用于控制地图行为、展示地图数据等功能的其他页面元素
	本示例创建了一个在地图创建完之后隐藏的loading元素
	-->
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>happymap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="map/css/reset.css">
			<link rel="stylesheet" type="text/css" href="map/css/index1.css">
			<script type="text/javascript" src="map/js/jquery-3.2.1.min.js"></script>
			<script src="map/js/map.min.js"></script>
			<style>
				.loadingBg{background:url(images/load.gif) #fff center center no-repeat;position:absolute;top:0;left:0;width:100%;height:100%;z-index:9;
				box-sizing:border-box;padding-top:50%;line-height:60px;text-align:center;font-size:24px;color:#333333;}
			</style>
		</head>
		<body>
			<div class="loadingBg">地图加载中</div>
			<div id="mapContainer"></div>
			<script>
				var self = this;
				init();
				//地图初始化参数配置
				function init() {
					GIM.REMOTE_SERVER = "https://ifs.cloudindoormap.com/webAPI/ClientService.asmx/Command";//项目服务地址
					GIM.far = 8000;//镜头最远距离
					//GIM.SHOW_Facility_LENGTH = 5000;//公共设施图标开始显示的距离
					var container = document.getElementById("mapContainer")
					var params = {
		                initCompleted: initCompleted,//初始化完成之后的调用函数
		                onSelected: function(){},//当区块被选中时触发
		                enabledControl: true,//是否启用手势操作
		                container: container,//包装的div
		                themeID: "1003",//主题文件夹编号
						labelScale:1.5,//文字标签缩放倍数
						backgroundColor: '#f2f2f2',//虚空背景色
		                initFloorID: "A49C0718-E8FA-457C-9E29-0332F86BE1AB",//初始化显示的楼层 可选
		                projectID: "261FDAD7-33F9-40A4-BD33-25F1C884F54C",//项目ID
		                cloudID: "EFDBF244-D179-43F6-9522-A430CCFAD9D3",//云ID
		                preCreation:false,//是否后台静默渲染 默认为true
		                accessToken: "86E81446-7C98-432F"//授权
		            };
					self.map = new GIM.Map3D(params);
					self.map.zoomLevel(15);
					self.map.selectedColor = 0x712891;
					self.map.pathThickness = 20;
					self.map.move2Point({
						x: 2500,
						y: -2500
					});
					self.map.setPolarAngle(30);
					self.map.setAzimuthalAngle(60);
					self.map.pathGap = 3;
					self.map.showCompass(false);
					self.map.regCompassChange(function (angel) {
						$('.compass').css({
							'transform': 'rotate(' + angel + 'deg)'
						})
					})
				}
				
				function initCompleted($floorData, areaData, list){
					$('.loadingBg').html('地图加载完成');
					setTimeout(function(){
						$('.loadingBg').hide();
					},1000);
				}
			</script>
		</body>
	</html>
	`,
	"302":`
	<!--
	覆盖物:
	覆盖物是指除了3D地图以外的,用于控制地图行为、展示地图数据等功能的其他页面元素
	本示例创建了一些用于展示额外数据的页面元素
	-->
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>happymap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="map/css/reset.css">
			<link rel="stylesheet" type="text/css" href="map/css/index1.css">
			<script type="text/javascript" src="map/js/jquery-3.2.1.min.js"></script>
			<script src="map/js/map.min.js"></script>
			<style>
				.floorsControl{padding:0 5px;height:24px;line-height:24px;outline:none;border-color:#0f76f3;color:#0f76f3;border-radius:3px;position:fixed;top:10px;left:10px;}
				.devMarker{width:88px;height:66px;box-sizing:border-box;padding:5px;font-size:12px;color:#fff;background:rgba(0,0,0,0.6);position:absolute;z-index:2;display:none;font-size:12px;text-align:center;}
				.devMarker>.num{font-size:18px;}
				.testOutput{width:125px;height:125px;padding:5px;position:absolute;top:40px;left:10px;background:#fff;}
			</style>
		</head>
		<body>
			<select id="floorsControl" class="floorsControl">
			<select>
			<div class="testOutput">
				测试:<br>
				P4：3个设备<br>
				LG2：3个设备<br>
				L2：3个设备<br>
				L6：2个设备<br>
				L7：1个设备
			</div>
			<div id="mapContainer"></div>
			<script>
				var self = this;
				init();
				//地图初始化参数配置
				function init() {
					GIM.REMOTE_SERVER = "https://ifs.cloudindoormap.com/webAPI/ClientService.asmx/Command";//项目服务地址
					GIM.far = 8000;//镜头最远距离
					//GIM.SHOW_Facility_LENGTH = 5000;//公共设施图标开始显示的距离
					var container = document.getElementById("mapContainer")
					var params = {
		                initCompleted: initCompleted,//初始化完成之后的调用函数
		                onSelected: onSelected,//当区块被选中时触发
		                enabledControl: true,//是否启用手势操作
		                container: container,//包装的div
		                themeID: "1003",//主题文件夹编号
						labelScale:1.5,//文字标签缩放倍数
						backgroundColor: '#f2f2f2',//虚空背景色
		                initFloorID: "A49C0718-E8FA-457C-9E29-0332F86BE1AB",//初始化显示的楼层 可选
		                projectID: "261FDAD7-33F9-40A4-BD33-25F1C884F54C",//项目ID
		                cloudID: "EFDBF244-D179-43F6-9522-A430CCFAD9D3",//云ID
		                preCreation:false,//是否后台静默渲染 默认为true
		                accessToken: "86E81446-7C98-432F"//授权
		            };
					self.map = new GIM.Map3D(params);
					self.map.zoomLevel(15);
					self.map.selectedColor = 0x712891;
					self.map.pathThickness = 20;
					self.map.move2Point({
						x: 2500,
						y: -2500
					});
					self.map.setPolarAngle(30);
					self.map.setAzimuthalAngle(60);
					self.map.pathGap = 3;
					self.map.showCompass(false);
					self.map.regCompassChange(function (angel) {
						$('.compass').css({
							'transform': 'rotate(' + angel + 'deg)'
						})
					})
				}
				
				//模拟接收的数据
				var markData=[
					{
						ids:"POINT-20171012-17:53:47:755-8736__AREA-20171012-17:53:47:755-1133__DFC1BEE4-2205-4DA7-A9FC-881C96F393BC",
						num:"999999",
						index:"1"
					},{
						ids:"POINT-20171012-17:53:46:917-5370__AREA-20171012-17:53:46:916-3853__DFC1BEE4-2205-4DA7-A9FC-881C96F393BC",
						num:"85466",
						index:"2"
					},{
						ids:"POINT-20171012-17:53:47:846-7397__AREA-20171012-17:53:47:846-3993__DFC1BEE4-2205-4DA7-A9FC-881C96F393BC",
						num:"50000",
						index:"3"
					},{
						ids:"POINT-20170927-13:8:41:3-8379__AREA-20170927-13:8:41:3-8914__A49C0718-E8FA-457C-9E29-0332F86BE1AB",
						num:"20000",
						index:"4"
					},{
						ids:"POINT-20170927-13:8:41:104-4335__AREA-20170927-13:8:41:104-8076__A49C0718-E8FA-457C-9E29-0332F86BE1AB",
						num:"10000",
						index:"5"
					},{
						ids:"POINT-20171122-9:47:10:543-3324__AREA-20171122-9:47:10:543-1151__A49C0718-E8FA-457C-9E29-0332F86BE1AB",
						num:"9000",
						index:"6"
					},{
						ids:"POINT-20170918-14:30:26:685-5241__AREA-20170918-14:30:26:685-6108__8AD368B1-A9B7-4E54-A37E-A3EA8424A1ED",
						num:"8000",
						index:"7"
					},{
						ids:"POINT-20170918-14:30:26:873-4709__AREA-20170918-14:30:26:873-3298__8AD368B1-A9B7-4E54-A37E-A3EA8424A1ED",
						num:"7000",
						index:"8"
					},{
						ids:"POINT-20170918-14:30:26:596-1781__AREA-20170918-14:30:26:596-6455__8AD368B1-A9B7-4E54-A37E-A3EA8424A1ED",
						num:"6000",
						index:"9"
					},{
						ids:"POINT-20170918-14:33:7:195-9601__AREA-20170918-14:33:7:195-8376__D7380838-4439-4164-911B-D2861F8F16FF",
						num:"5000",
						index:"10"
					},{
						ids:"POINT-2018044-18:4:41:294-3326__AREA-2018044-18:4:41:294-1225__D7380838-4439-4164-911B-D2861F8F16FF",
						num:"2000",
						index:"11"
					}
					,{
						ids:"POINT-20170918-14:51:0:204-8327__AREA-20170918-14:51:0:204-9013__23F3C686-27C8-4E49-A19E-550649C0F36D",
						num:"1000",
						index:"12"
					}
				];
				var curMarkEle=[];//当前页面创建的markLabel
				function initCompleted($floorData, areaData, list){
					
					var selectHtml='';
					for(var i=0;i<$floorData.length;i++){
						var selStr="";
						if($floorData[i].floorID=="A49C0718-E8FA-457C-9E29-0332F86BE1AB"){
							selStr=' selected="selected"';
						}
						selectHtml+='<option value="'+$floorData[i].floorID+'"'+selStr+'>'+$floorData[i].name+'</option>';
					}
					
					
					for(var i=0;i<markData.length;i++){
						var ids=markData[i].ids.split('__');
						for(var j=0;j<areaData.length;j++){
							if(areaData[j].FloorID==ids[2]){
								for(var k=0;k<areaData[j].Area.length;k++){
									if(areaData[j].Area[k].AreaID==ids[1]){
										markData[i].x=areaData[j].Area[k].PointX;
										markData[i].y=areaData[j].Area[k].PointY;
									}
								}
							}
						}
					}
					for(var i=0;i<markData.length;i++){
						var point=self.map.regMarker(markData[i].ids,markData[i].ids.split('__')[2],markData[i].x,markData[i].y,0);
						if(point){
							markData[i].initX=point.x;
							markData[i].initY=point.y;
				        }
					}
					console.log('markData',markData);
					
					//marker更新
					self.map.regMarkerLocate(function (pinLocate) {
						console.log(pinLocate,curMarkEle);
						if(pinLocate&&curMarkEle&&curMarkEle.length>0){
							for(var i=0;i<curMarkEle.length;i++){
								for(var key in pinLocate){
									if(curMarkEle[i].attr('data-ids')==key){
										var x=pinLocate[key].x-curMarkEle[i].width()/2;
										var y=pinLocate[key].y-curMarkEle[i].height()/2;
										curMarkEle[i].css({
											'left':x+'px',
											'top':y+'px'
										});
									}
								}
							}
						}
					});
					//切换楼层时marker的移除与创建
					self.map.regFloorChange(function(floorIds){
						var isDevice=false;
						removeMarker();
						createMarker(floorIds[0]);
					});
					$('#floorsControl').html(selectHtml);
					$('#floorsControl').on('change',function(){
						self.map.showFloors([$(this).val()],true);//根据楼层id切换楼层
					});
				}
				function onSelected(data){
					console.log('select',data);
					console.log(data.areaID+'__'+data.floorID)
				}
				function removeMarker(){
					console.log('remove');
					$('.devMarker').each(function(){
						$(this).remove();
					});
					curMarkEle=[];
				}
				function createMarker(floorId){
					var creates=[];
					for(var i=0;i<markData.length;i++){
						if(markData[i].ids.split('__')[2]==floorId){
							creates.push(markData[i]);
						}
					}
					console.log('creates',creates);
					if(creates.length>0){
						for(var i=0;i<creates.length;i++){
							var markHtml='<div data-ids="'+creates[i].ids+'" class="devMarker">第'+creates[i].index+'名<br><span class="num">'+creates[i].num+'</span><br>点击次数</div>'
							$('#mapContainer').append($(markHtml));
							
							var markEle=$('.devMarker[data-ids="'+creates[i].ids+'"]');
							curMarkEle.push(markEle);
							var x=creates[i].initX-markEle.width()/2;
							var y=creates[i].initY-markEle.height()/2;
							markEle.css({
								'left':x+'px',
								'top':y+'px'
							});
						}
						console.log('curMarkEle',curMarkEle);
						setTimeout(function(){
							for(var i=0;i<curMarkEle.length;i++){
								curMarkEle[i].show();
							}
						},2000);
					}
				}
				function updateMarker(floorId,ids){
					
				}
			</script>
		</body>
	</html>
	`,
	'401':`
	<!--
	初始化完成事件:
	地图类初始化配置中的initCompleted是对应地图初始化完成事件的回调函数
	该函数返回值一为楼层数据,二为区域数据,三为可点击实体数据
	-->
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>happymap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="map/css/reset.css">
			<link rel="stylesheet" type="text/css" href="map/css/index1.css">
			<script type="text/javascript" src="map/js/jquery-3.2.1.min.js"></script>
			<script src="map/js/map.min.js"></script>
			<style>
				.datasBg{position:fixed;top:10px;left:10px;width:200px;min-height:40px;line-height:24px;font-size:12px;background:#fff;}
			</style>
		</head>
		<body>
			<div class="datasBg">
				本地图共有楼层:<span id="floorsNum"></span><br>
				本地图共有区域:<span id="areaNum"></span><br>
			</div>
			<div id="mapContainer"></div>
			<script>
				var self = this;
				init();
				//地图初始化参数配置
				function init() {
					GIM.REMOTE_SERVER = "https://map.ckiosk.cn/webAPI/ClientService.asmx/Command";//项目服务地址
					GIM.far = 8000;//镜头最远距离
					GIM.SHOW_Facility_LENGTH = 5000;//公共设施图标开始显示的距离
					var container = document.getElementById("mapContainer")
					var params = {
		                initCompleted: initCompleted,//初始化完成之后的调用函数
		                onSelected: function(){},//当区块被选中时触发
		                enabledControl: true,//是否启用手势操作
		                container: container,//包装的div
		                themeID: "1003",//主题文件夹编号
		                logoFiled:"Logo",//图标字段
						labelScale:2.0,//文字标签缩放倍数
						backgroundColor: '#f2f2f2',//虚空背景色
		                initFloorID: "1919DBAE-1655-4102-87A5-1709E1C9DBC2",//初始化显示的楼层 可选
		                projectID: "6C14DBE3-C79F-4A03-845C-9DD6ACE7A374",//项目ID
		                cloudID: "20F476EB-8411-470D-AE82-05C465DE5582",//云ID
		                preCreation:false,//是否后台静默渲染 默认为true
		                accessToken: "86E81446-7C98-432F"//授权
		            };
					self.map = new GIM.Map3D(params);
					
					self.map.setPolarAngle(0);//仰角
					self.map.setAzimuthalAngle(20);//水平旋转角度
					self.map.selectedColor = 0x9933ff;//选中房间颜色
					self.map.move2Point({//初始镜头偏移
						x: 2500,
						y: -2500
					});
					self.map.cameraRadius = 5000;//初始镜头距离
					self.map.showCompass(true);//指南针
					self.map.regCompassChange(function (angel) {//更新指南针角度
						$(".compass").css({
							"transform": "rotate(" + angel + "deg)"
						})
					});
				}
				function initCompleted($floorData, areaData, list){
					$('#floorsNum').html($floorData.length);
					var num=0;
					for(var i=0;i<areaData.length;i++){
						num+=areaData[i].Area.length;
					}
					$('#areaNum').html(num);
				}
			</script>
		</body>
	</html>
	`,
	'402':`
	<!--
	初始化完成事件:
	地图类初始化配置中的onSelected是对应地图区域选中事件的回调函数
	该函数返回值改区域的详细数据
	-->
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>happymap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="map/css/reset.css">
			<link rel="stylesheet" type="text/css" href="map/css/index1.css">
			<script type="text/javascript" src="map/js/jquery-3.2.1.min.js"></script>
			<script src="map/js/map.min.js"></script>
			<style>
				.datasBg{position:fixed;top:10px;left:10px;width:200px;min-height:40px;line-height:24px;font-size:12px;background:#fff;}
			</style>
		</head>
		<body>
			<div class="datasBg">
				本地图共有楼层:<span id="floorsNum"></span><br>
				本地图共有区域:<span id="areaNum"></span><br>
				选中的区域ID:<span id="selectArea"></span>
			</div>
			<div id="mapContainer"></div>
			<script>
				var self = this;
				init();
				//地图初始化参数配置
				function init() {
					GIM.REMOTE_SERVER = "https://map.ckiosk.cn/webAPI/ClientService.asmx/Command";//项目服务地址
					GIM.far = 8000;//镜头最远距离
					GIM.SHOW_Facility_LENGTH = 5000;//公共设施图标开始显示的距离
					var container = document.getElementById("mapContainer")
					var params = {
		                initCompleted: initCompleted,//初始化完成之后的调用函数
		                onSelected: onSelected,//当区块被选中时触发
		                enabledControl: true,//是否启用手势操作
		                container: container,//包装的div
		                themeID: "1003",//主题文件夹编号
		                logoFiled:"Logo",//图标字段
						labelScale:2.0,//文字标签缩放倍数
						backgroundColor: '#f2f2f2',//虚空背景色
		                initFloorID: "1919DBAE-1655-4102-87A5-1709E1C9DBC2",//初始化显示的楼层 可选
		                projectID: "6C14DBE3-C79F-4A03-845C-9DD6ACE7A374",//项目ID
		                cloudID: "20F476EB-8411-470D-AE82-05C465DE5582",//云ID
		                preCreation:false,//是否后台静默渲染 默认为true
		                accessToken: "86E81446-7C98-432F"//授权
		            };
					self.map = new GIM.Map3D(params);
					
					self.map.setPolarAngle(0);//仰角
					self.map.setAzimuthalAngle(20);//水平旋转角度
					self.map.selectedColor = 0x9933ff;//选中房间颜色
					self.map.move2Point({//初始镜头偏移
						x: 2500,
						y: -2500
					});
					self.map.cameraRadius = 5000;//初始镜头距离
					self.map.showCompass(true);//指南针
					self.map.regCompassChange(function (angel) {//更新指南针角度
						$(".compass").css({
							"transform": "rotate(" + angel + "deg)"
						})
					});
				}
				function initCompleted($floorData, areaData, list){
					$('#floorsNum').html($floorData.length);
					var num=0;
					console.log('areaData',areaData);
					for(var i=0;i<areaData.length;i++){
						num+=areaData[i].Area.length;
					}
					$('#areaNum').html(num);
				}
				function onSelected(data){
					$('#selectArea').html(data.areaID);
				}
			</script>
		</body>
	</html>
	`,
	'501':`
	<!--
	搜索功能是通过对初始化完成事件的返回数据进行筛选来完成的,
	因为是本地数据,所以响应很灵敏迅速.
	-->
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>happymap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="map/css/reset.css">
			<link rel="stylesheet" type="text/css" href="map/css/index1.css">
			<script type="text/javascript" src="map/js/jquery-3.2.1.min.js"></script>
			<script src="map/js/map.min.js"></script>
			<style>
				.searchBg{position:fixed;top:0;left:0;width:100%;height:40px;background:#fff;border-bottom:1px #ddd solid;z-index:1;display:none;}
				.searchBg .btn{position:absolute;top:0;left:0;width:40px;height:40px;text-align:center;vertical-align:middle;display:table-cell;}
				.searchBg .btn:before{content:'';background-image:url(images/codeIcons.png);background-repeat:no-repeat;margin:10px 10px;width:20px;height:20px;display:inline-block;float:left;}
				.searchBg .btn.search:before{background-position:-280px 0;}
				.searchBg .btn.back{cursor:pointer;}
				.searchBg .btn.back:before{background-position:-300px 0;}
				.searchBg input{width:100%;height:40px;box-sizing:border-box;padding-left:42px;float:left;}
				
				.searchList{box-sizing:border-box;width:100%;height:100%;padding:60px 20px 20px 20px;background:#fff;display:none;}
				.searchList>li{width:100%;height:60px;border-bottom:1px #ddd solid;cursor:pointer;float:left}
				.searchList>li.none{cursor:default;text-align:center;line-height:60px;font-size:24px;color:#333333;}
				.searchList>li>div{width:100%;text-indent:20px;height:30px;line-height:30px;}
				.searchList .name{font-size:16px;color:#333333;}
				.searchList .floor{font-size:18px;color:#666666;}
			</style>
		</head>
		<body>
			<div class="searchBg">
				<div class="btn search"></div>
				<input type="text" placeholder="输入关键字搜索" />
			</div>
			<ul class="searchList">
				<li data-area="12345">
					<div class="name">FLTNESS LAB</div>
					<div class="floor">楼层:B1</div>
				</li>
			</ul>
			<div id="mapContainer"></div>
			<script>
				var self = this;
				var areas=[];
				var searchList={};
				init();
				//地图初始化参数配置
				function init() {
					GIM.REMOTE_SERVER = "https://map.ckiosk.cn/webAPI/ClientService.asmx/Command";//项目服务地址
					GIM.far = 8000;//镜头最远距离
					GIM.SHOW_Facility_LENGTH = 5000;//公共设施图标开始显示的距离
					var container = document.getElementById("mapContainer")
					var params = {
		                initCompleted: initCompleted,//初始化完成之后的调用函数
		                onSelected: function(){},//当区块被选中时触发
		                enabledControl: true,//是否启用手势操作
		                container: container,//包装的div
		                themeID: "1003",//主题文件夹编号
		                logoFiled:"Logo",//图标字段
						labelScale:2.0,//文字标签缩放倍数
						backgroundColor: '#f2f2f2',//虚空背景色
		                initFloorID: "1919DBAE-1655-4102-87A5-1709E1C9DBC2",//初始化显示的楼层 可选
		                projectID: "6C14DBE3-C79F-4A03-845C-9DD6ACE7A374",//项目ID
		                cloudID: "20F476EB-8411-470D-AE82-05C465DE5582",//云ID
		                preCreation:false,//是否后台静默渲染 默认为true
		                accessToken: "86E81446-7C98-432F"//授权
		            };
					self.map = new GIM.Map3D(params);
					
					self.map.selectedColor = 0x9933ff;//选中房间颜色
					self.map.move2Point({//初始镜头偏移
						x: 2500,
						y: -2500
					});
					self.map.cameraRadius = 5000;//初始镜头距离
					self.map.setPolarAngle(0);//仰角
					self.map.setAzimuthalAngle(20);//水平旋转角度
					self.map.showCompass(false);//指南针
				}
				function initCompleted($floorData, areaData, list){
					searchList=list;
					areaData.forEach(function (e) {
						areas = areas.concat(e.Area)
					});
					$('.searchBg').show();
					$('.searchBg input[type="text"]').on('focus',function(){
						if($('.searchList').css('display')=='none'){
							setSearchVisible(true);
						}
					});
					$('.searchBg .btn').on('click',function(){
						if($(this).hasClass('back')){
							setSearchVisible(false);
						}
					});
					$('.searchBg input[type="text"]').on('input',function(){
						searchArea($(this).val());
					});
				}
				function setSearchVisible(bVisible){
					var list=$('.searchList');
					var search=$('.searchBg');
					var box=search.find('input');
					if(bVisible){
						box.val('');
						searchArea(box.val());
						list.show();
						search.find('.btn').removeClass('search').addClass('back');
					}else{
						list.hide();
						search.find('.btn').removeClass('back').addClass('search');
						list.find('li').each(function(){
							$(this).remove();
						});
					}
				}
				function searchArea(sStr){
					sStr=sStr.toLowerCase();
					console.log('sStr',sStr);
					if(sStr==""){
						doSearchHtml("");
						return;
					}
					var temp=[];
					areas.forEach(function(e){
						if(e.ShopName&&e.ShopName.toLowerCase().indexOf(sStr)!=-1){
							temp.push(e);
						}
					});
					doSearchHtml(temp);
				}
				function doSearchHtml(data){
					console.log(data);
					var list=$('.searchList');
					list.html('');
					var doHtml="";
					if(data===""){
						doHtml='<li class="none">请输入关键字</li>'
						$('.searchList').html($(doHtml));
						return;
					}
					if(data.length<1){
						doHtml='<li class="none">无搜索结果</li>'
						$('.searchList').html($(doHtml));
						return;
					}
					data.forEach(function(e){
						doHtml+='<li data-shopname="'+e.ShopName+'" data-shopnum="'+e.Name+'" onclick="setPoint(this)">'
							+'<div class="name">'+e.ShopName+'</div>'
							+'<div class="floor">楼层:'+searchList[e.ShopName].name+'</div>'
						+'</li>';
					});
					$('.searchList').html($(doHtml));
				}
				function setPoint(e){
					self.map.focusToShopByNo($(e).attr('data-shopnum'));
					$('.searchBg input').val($(e).attr('data-shopname'));
					setSearchVisible(false);
				}
			</script>
		</body>
	</html>
	`,
	'601':`
	<!--
	可以通过设置起始点和终点来规划两点之间的路径
	相关属性和方法有:
	pathGap:路线图标间隔
	pathThickness:路线粗细
	setStartArea:设置起始点
	setEndArea:设置终点
	searchPath:搜索路径
	-->
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>happymap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="map/css/reset.css">
			<link rel="stylesheet" type="text/css" href="map/css/index1.css">
			<script type="text/javascript" src="map/js/jquery-3.2.1.min.js"></script>
			<script src="map/js/map.min.js"></script>
			<style>
				.floorsControl{padding:0 5px;height:24px;line-height:24px;outline:none;border-color:#0f76f3;color:#0f76f3;border-radius:3px;position:fixed;top:10px;left:10px;}
				.setPointBg{width:100%;min-height:100px;position:absolute;top:36px;left:0;background:#fff;}
				.setPointBg>.txts{width:100%;height:70px;float:left;}
				.setPointBg>.txts>div{height:30px;line-height:30px;font-size:14px;color:#333;float:left;}
				.setPointBg>.txts .curTxt{margin-top:10px;width:100%;text-align:center;}
				.setPointBg>.txts .startTxt,
				.setPointBg>.txts .endTxt{padding-left:2%;width:48%;text-align:left;}
				.setPointBg>.btns{width:100%;height:30px;float:left;}
				.setPointBg>.btns>button{margin:0 2%;width:46%;height:30px;box-sizing:border-box;font-size:14px;border:1px #ddd solid;border-radius:3px;background:#fff;color:#333;cursor:pointer;outline:none;float:left;}
				.setPointBg>.btns>button:disabled{background:#ddd;color:#666;}
				.setPointBg .close{position:absolute;top:0;right:0;width:30px;height:30px;font-size:24px;color:#333;line-height:30px;text-align:center;cursor:pointer;}
			</style>
		</head>
		<body>
			<select id="floorsControl" class="floorsControl">
			</select>
			<div class="setPointBg" style="display:none;">
				<div class="close" onclick="pointBgClose()">X</div>
				<div class="txts">
					<div class="curTxt"></div>
					<div class="startTxt">起点:</div>
					<div class="endTxt">终点:</div>
				</div>
				<div class="btns">
					<button class="startBtn" onclick="setStart()">设为起点</button>
					<button class="endBtn" onclick="setEnd()">设为终点</button>
				</div>
			</div>
			<div id="mapContainer"></div>
			<script>
				var roadObj={
					cur:null,
					start:null,
					end:null,
					floors:null
				};
				var self = this;
				init();
				//地图初始化参数配置
				function init() {
					GIM.REMOTE_SERVER = "https://map.ckiosk.cn/webAPI/ClientService.asmx/Command";//项目服务地址
					GIM.far = 8000;//镜头最远距离
					GIM.SHOW_Facility_LENGTH = 5000;//公共设施图标开始显示的距离
					var container = document.getElementById("mapContainer")
					var params = {
		                initCompleted: initCompleted,//初始化完成之后的调用函数
		                onSelected: onSelected,//当区块被选中时触发
		                enabledControl: true,//是否启用手势操作
		                container: container,//包装的div
		                themeID: "1003",//主题文件夹编号
		                logoFiled:"Logo",//图标字段
						labelScale:2.0,//文字标签缩放倍数
						showLabelType: "Name",
						backgroundColor: '#f2f2f2',//虚空背景色
		                initFloorID: "1919DBAE-1655-4102-87A5-1709E1C9DBC2",//初始化显示的楼层 可选
		                projectID: "6C14DBE3-C79F-4A03-845C-9DD6ACE7A374",//项目ID
		                cloudID: "20F476EB-8411-470D-AE82-05C465DE5582",//云ID
		                preCreation:false,//是否后台静默渲染 默认为true
		                accessToken: "86E81446-7C98-432F"//授权
		            };
					self.map = new GIM.Map3D(params);
					
					self.map.selectedColor = 0x9933ff;//选中房间颜色
					self.map.move2Point({//初始镜头偏移
						x: 2500,
						y: -2500
					});
					self.map.cameraRadius = 5000;//初始镜头距离
					self.map.setPolarAngle(0);//仰角
					self.map.pathGap = 3;//路线图标间隔
					self.map.pathThickness = 20;//路线粗细
					self.map.setAzimuthalAngle(20);//水平旋转角度
					self.map.showCompass(false);//指南针
				}
				function initCompleted($floorData, areaData, list){
					initFloorChange($floorData);
					roadObj.floors=$floorData;
				}
				function onSelected(data){
					console.log('sel',data);
					setPointBgVisible(true,data);
				}
				function initFloorChange(floorData){
					var selectHtml='';
					for(var i=0;i<floorData.length;i++){
						var selStr="";
						if(floorData[i].floorID=="1919DBAE-1655-4102-87A5-1709E1C9DBC2"){
							selStr=' selected="selected"';
						}
						selectHtml+='<option value="'+floorData[i].floorID+'"'+selStr+'>'+floorData[i].name+'</option>';
					}
					$('#floorsControl').html(selectHtml);
					$('#floorsControl').on('change',function(){
						self.map.showFloors([$(this).val()],true);//根据楼层id切换楼层
					});
				}
				function setStart(){
					if(roadObj.cur===roadObj.end){
						alert('起点和终点不能相同');
						return;
					}
					roadObj.start=roadObj.cur;
					self.map.setStartArea(roadObj.cur.areaID, true);
					updateSetPointBg();
					if(roadObj.end){
						self.map.searchPath(function(){
							$('#floorsControl').val(roadObj.start.floorID);
						});
					}
				}
				function setEnd(){
					if(roadObj.cur===roadObj.start){
						alert('起点和终点不能相同');
						return;
					}
					roadObj.end=roadObj.cur;
					self.map.setEndArea(roadObj.cur.areaID, true);
					updateSetPointBg();
					if(roadObj.start){
						self.map.searchPath(function(){
							$('#floorsControl').val(roadObj.start.floorID);
						});
					}
				}
				function pointBgClose(){
					setPointBgVisible(false);
				}
				function setPointBgVisible(bVisible,curData){
					var sp=$('.setPointBg');
					if(bVisible&&curData){
						roadObj.cur=curData;
						updateSetPointBg()
						sp.show();
					}else if(!bVisible){
						if(roadObj.start){
							self.map.showFloors([roadObj.start.floorID],true);
							$('#floorsControl').val(roadObj.start.floorID);
						}
						self.map.clearPath(true);
						self.map.cleanSelectUnit3D();
						roadObj.cur=null;
						roadObj.start=null;
						roadObj.end=null;
						updateSetPointBg();
						sp.hide();
					}
				}
				function updateSetPointBg(){
					var sp=$('.setPointBg');
					var sBtn=sp.find('.startBtn');
					var eBtn=sp.find('.endBtn');
					var cTxt=sp.find('.curTxt');
					var sTxt=sp.find('.startTxt');
					var eTxt=sp.find('.endTxt');
					
					if(roadObj.cur&&roadObj.cur==roadObj.start){
						sBtn.prop('disabled',true);
					}else{
						sBtn.prop('disabled',false);
					}
					if(roadObj.cur&&roadObj.cur==roadObj.end){
						eBtn.prop('disabled',true);
					}else{
						eBtn.prop('disabled',false);
					}
					var cStr="";
					var sStr="起点:";
					var eStr="终点:";
					for(var i=0;i<roadObj.floors.length;i++){
						if(roadObj.cur&&roadObj.cur.floorID==roadObj.floors[i].floorID){
							cStr+=roadObj.floors[i].name+" ";
						}
						if(roadObj.start&&roadObj.start.floorID==roadObj.floors[i].floorID){
							sStr+=roadObj.floors[i].name+" ";
						}
						if(roadObj.end&&roadObj.end.floorID==roadObj.floors[i].floorID){
							eStr+=roadObj.floors[i].name+" ";
						}
					}
					if(roadObj.cur){
						cStr+=roadObj.cur.shopName?roadObj.cur.shopName:roadObj.cur.name;
					}
					if(roadObj.start){
						sStr+=roadObj.start.shopName?roadObj.start.shopName:roadObj.start.name;
					}
					if(roadObj.end){
						eStr+=roadObj.end.shopName?roadObj.end.shopName:roadObj.end.name;
					}
					cTxt.html(cStr);
					sTxt.html(sStr);
					eTxt.html(eStr);
				}
			</script>
		</body>
	</html>
	`,
	'701':`
	<!--
	可以通过设置起始点和终点来规划两点之间的路径
	相关方法有:
	simulate:开始导航(前提是已有路线)
	regNavigationWalk:监听导航移动
	regNavigationPause:监听导航暂停
	toggleSimulate:暂停/继续导航
	-->
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>happymap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="map/css/reset.css">
			<link rel="stylesheet" type="text/css" href="map/css/index1.css">
			<script type="text/javascript" src="map/js/jquery-3.2.1.min.js"></script>
			<script src="map/js/map.min.js"></script>
			<style>
				.floorsControl{padding:0 5px;height:24px;line-height:24px;outline:none;border-color:#0f76f3;color:#0f76f3;border-radius:3px;position:fixed;top:10px;left:10px;}
				.msgBg{width:100%;min-height:100px;position:absolute;top:36px;left:0;background:#fff;}
				.msgBg>.txts{width:100%;height:70px;float:left;}
				.msgBg>.txts>div{height:30px;line-height:30px;font-size:14px;color:#333;float:left;}
				.msgBg>.txts .curTxt,
				.msgBg>.txts .msgTxt{margin-top:10px;width:100%;text-align:center;}
				.msgBg>.txts .startTxt,
				.msgBg>.txts .endTxt{padding-left:2%;width:48%;text-align:left;}
				.msgBg>.btns{width:100%;height:30px;float:left;}
				.msgBg>.btns>button{margin:0 2%;width:29%;height:30px;box-sizing:border-box;font-size:14px;border:1px #ddd solid;border-radius:3px;background:#fff;color:#333;cursor:pointer;outline:none;float:left;}
				.msgBg>.btns>button:disabled{background:#ddd;color:#666;}
				.msgBg .close,
				.msgBg .goonBtn{position:absolute;top:0;height:30px;color:#333;line-height:30px;text-align:center;cursor:pointer;}
				.msgBg .close{right:0;width:30px;font-size:24px;}
				.msgBg .goonBtn{right:35px;border:1px #ddd solid;width:50px;font-size:14px;}
				.toast{position:fixed;top:50%;left:50%;margin:-50px 0 0 -80px;padding:0 10px;width:140px;height:100px;background:rgba(0,0,0,0.6);border-radius:4px;text-align:center;color:#fff;}
				.toast>div{width:100%;position:absolute;top:50%;transform:translate(0,-50%);-ms-transform:translate(0,-50%);-moz-transform:translate(0,-50%);-webkit-transform:translate(0,-50%);-o-transform:translate(0,-50%);}
			</style>
		</head>
		<body>
			<select id="floorsControl" class="floorsControl">
			</select>
			<div class="msgBg" style="display:none;">
				<div class="close" onclick="msgBgClose()">X</div>
				<div class="goonBtn" onclick="walkGoon()">继续</div>
				<div class="txts">
					<div class="curTxt"></div>
					<div class="msgTxt" style="display:none;"></div>
					<div class="startTxt">起点:</div>
					<div class="endTxt">终点:</div>
				</div>
				<div class="btns">
					<button class="startBtn" onclick="setStart()">设为起点</button>
					<button class="endBtn" onclick="setEnd()">设为终点</button>
					<button class="goBtn" onclick="navGo()">模拟导航</button>
				</div>
			</div>
			<div id="mapContainer"></div>
			<script>
				var roadObj={
					cur:null,
					start:null,
					end:null,
					floors:null,
					isGoing:false,
					isPause:false,
					isGoEnd:false
				};
				var self = this;
				init();
				//地图初始化参数配置
				function init() {
					GIM.REMOTE_SERVER = "https://map.ckiosk.cn/webAPI/ClientService.asmx/Command";//项目服务地址
					GIM.far = 8000;//镜头最远距离
					GIM.SHOW_Facility_LENGTH = 5000;//公共设施图标开始显示的距离
					var container = document.getElementById("mapContainer")
					var params = {
		                initCompleted: initCompleted,//初始化完成之后的调用函数
		                onSelected: onSelected,//当区块被选中时触发
		                enabledControl: true,//是否启用手势操作
		                container: container,//包装的div
		                themeID: "1003",//主题文件夹编号
		                logoFiled:"Logo",//图标字段
						labelScale:2.0,//文字标签缩放倍数
						showLabelType: "Name",
						backgroundColor: '#f2f2f2',//虚空背景色
		                initFloorID: "1919DBAE-1655-4102-87A5-1709E1C9DBC2",//初始化显示的楼层 可选
		                projectID: "6C14DBE3-C79F-4A03-845C-9DD6ACE7A374",//项目ID
		                cloudID: "20F476EB-8411-470D-AE82-05C465DE5582",//云ID
		                preCreation:false,//是否后台静默渲染 默认为true
		                accessToken: "86E81446-7C98-432F",//授权
		            };
					self.map = new GIM.Map3D(params);
					
					self.map.selectedColor = 0x9933ff;//选中房间颜色
					self.map.move2Point({//初始镜头偏移
						x: 2500,
						y: -2500
					});
					self.map.cameraRadius = 5000;//初始镜头距离
					self.map.setPolarAngle(0);//仰角
					self.map.pathGap = 3;//路线图标间隔
					self.map.pathThickness = 20;//路线粗细
					self.map.setAzimuthalAngle(20);//水平旋转角度
					self.map.showCompass(false);//指南针
					self.map.regNavigationWalk(function (walkDetail) {//导航移动
						listenWalk(walkDetail);
					});
					self.map.regNavigationPause(function(){//导航暂停
						roadObj.isPause=true;
						$('.msgBg .msgTxt').html('暂停');
						updateMsgBg();
					});
				}
				function initCompleted($floorData, areaData, list){
					initFloorChange($floorData);
					roadObj.floors=$floorData;
				}
				function onSelected(data){
					setMsgBgVisible(true,data);
				}
				function initFloorChange(floorData){
					var selectHtml='';
					for(var i=0;i<floorData.length;i++){
						var selStr="";
						if(floorData[i].floorID=="1919DBAE-1655-4102-87A5-1709E1C9DBC2"){
							selStr=' selected="selected"';
						}
						selectHtml+='<option value="'+floorData[i].floorID+'"'+selStr+'>'+floorData[i].name+'</option>';
					}
					$('#floorsControl').html(selectHtml);
					$('#floorsControl').on('change',function(){
						self.map.showFloors([$(this).val()],true);//根据楼层id切换楼层
					});
				}
				function setStart(){
					if(roadObj.cur===roadObj.end){
						showToast('起点和终点不能相同');
						return;
					}
					roadObj.start=roadObj.cur;
					self.map.setStartArea(roadObj.cur.areaID, true);
					updateMsgBg();
					if(roadObj.end){
						self.map.searchPath(function(){
							$('#floorsControl').val(roadObj.start.floorID);
						});
					}
				}
				function setEnd(){
					if(roadObj.cur===roadObj.start){
						showToast('起点和终点不能相同');
						return;
					}
					roadObj.end=roadObj.cur;
					self.map.setEndArea(roadObj.cur.areaID, true);
					updateMsgBg();
					if(roadObj.start){
						self.map.searchPath(function(){
							$('#floorsControl').val(roadObj.start.floorID);
						});
					}
				}
				function msgBgClose(){
					$('#floorsControl').prop('disabled',false);
					setMsgBgVisible(false);
				}
				function setMsgBgVisible(bVisible,curData){
					var msg=$('.msgBg');
					if(bVisible&&curData){
						roadObj.cur=curData;
						updateMsgBg()
						msg.show();
					}else if(!bVisible){
						if(roadObj.start){
							self.map.showFloors([roadObj.start.floorID],true);
							$('#floorsControl').val(roadObj.start.floorID);
						}
						
						self.map.cameraRadius = 5000;
						self.map.areaClickEmbed = true;
						self.map.setAzimuthalAngle(20);
						self.map.move2Point({
							x: 2500,
							y: -2500
						});
						self.map.setPolarAngle(0);
						self.map.clearPath(true);
						self.map.cleanSelectUnit3D();
						
						roadObj.cur=null;
						roadObj.start=null;
						roadObj.end=null;
						roadObj.isGoing=false;
						roadObj.isPause=false;
						roadObj.isGoEnd=false;
						updateMsgBg();
						msg.hide();
					}
				}
				function updateMsgBg(){
					var msg=$('.msgBg');
					var sBtn=msg.find('.startBtn');
					var eBtn=msg.find('.endBtn');
					var mBtn=msg.find('.goBtn');
					var gBtn=msg.find('.goonBtn');
					var cTxt=msg.find('.curTxt');
					var sTxt=msg.find('.startTxt');
					var eTxt=msg.find('.endTxt');
					var mTxt=msg.find('.msgTxt');
					
					if(roadObj.cur&&roadObj.cur==roadObj.start){
						sBtn.prop('disabled',true);
					}else{
						sBtn.prop('disabled',false);
					}
					if(roadObj.cur&&roadObj.cur==roadObj.end){
						eBtn.prop('disabled',true);
					}else{
						eBtn.prop('disabled',false);
					}
					var cStr="";
					var sStr="起点:";
					var eStr="终点:";
					for(var i=0;i<roadObj.floors.length;i++){
						if(roadObj.cur&&roadObj.cur.floorID==roadObj.floors[i].floorID){
							cStr+=roadObj.floors[i].name+" ";
						}
						if(roadObj.start&&roadObj.start.floorID==roadObj.floors[i].floorID){
							sStr+=roadObj.floors[i].name+" ";
						}
						if(roadObj.end&&roadObj.end.floorID==roadObj.floors[i].floorID){
							eStr+=roadObj.floors[i].name+" ";
						}
					}
					if(roadObj.cur){
						cStr+=roadObj.cur.shopName?roadObj.cur.shopName:roadObj.cur.name;
					}
					if(roadObj.start){
						sStr+=roadObj.start.shopName?roadObj.start.shopName:roadObj.start.name;
					}
					if(roadObj.end){
						eStr+=roadObj.end.shopName?roadObj.end.shopName:roadObj.end.name;
					}
					cTxt.html(cStr);
					sTxt.html(sStr);
					eTxt.html(eStr);
					
					if(roadObj.isGoing){//导航过程
						sBtn.hide();
						eBtn.hide();
						mBtn.hide();
						cTxt.hide();
						mTxt.show();
					}else{
						sBtn.show();
						eBtn.show();
						mBtn.show();
						cTxt.show();
						mTxt.hide();
					}
					
					if(roadObj.isGoing&&!roadObj.isGoEnd&&roadObj.isPause){//暂停
						gBtn.show();
					}else{
						gBtn.hide();
					}
				}
				function navGo(){
					if(!roadObj.start||!roadObj.end){
						showToast('请先选定路线');
						return;
					}
					$('#floorsControl').prop('disabled',true);
					$('#floorsControl').val(roadObj.start.floorID);
					self.map.showFloors([roadObj.start.floorID]);
					self.map.areaClickEmbed = false;
					roadObj.isGoing=true;
					self.map.cameraRadius = 3000;
					updateMsgBg();
					self.map.simulate();
				}
				function listenWalk(walkDetail){
					self.map.setPolarAngle(0);
					if (!walkDetail.nextFloorName) {
						var str="";
						if (walkDetail.turn == 'Right') {
							str=Math.ceil(walkDetail.dis / 50) + '米后 右转';
							if (walkDetail.dis < 200) {
								str='右转';
							}
						} else if (walkDetail.turn == 'Left') {
							str=Math.ceil(walkDetail.dis / 50) + '米后 左转';
							if (walkDetail.dis < 200) {
								str='左转';
							}
						} else if (walkDetail.turn == 'LeftFront') {
							str=Math.ceil(walkDetail.dis / 50) + '米后 左前方前进';
							if (walkDetail.dis < 200) {
								str='左前方前进';
							}
						} else if (walkDetail.turn == 'RightFront') {
							str=Math.ceil(walkDetail.dis / 50) + '米后 右前方前进';
							if (walkDetail.dis < 200) {
								str='右前方前进';
							}
						} else if ((walkDetail.turn == 'Lifts' && walkDetail.dis == 0) || (walkDetail.turn == 'Escalator' && walkDetail.dis == 0)) {
							
						} else {
							str=Math.ceil(walkDetail.dis / 50) + '米后 到达终点';
							if (walkDetail.dis == 0 && (walkDetail.turn == 'end' || walkDetail.turn == 'carport')) {
								roadObj.isGoEnd = true;
								str="已到达目的地附近";
								updateMsgBg();
							}
						}
						$('.msgBg .msgTxt').html(str);
					} else {
						var str="";
						if (walkDetail.pass == 'Lifts') {
							str = '乘电梯到达' + walkDetail.nextFloorName;
						} else {
							str = '乘手扶梯到达' + walkDetail.nextFloorName;
						}
						$('#floorsControl').val(walkDetail.nextFloorID);
						showToast(str);
					}
				}
				function walkGoon(){
					self.map.toggleSimulate(true)
					roadObj.isPause = false;
					updateMsgBg();
				}
				function showToast(str){
					if($('.toast').length<1){
						$('body').append($('<div class="toast"><div>'+str+'</div></div>'));
					}
					setTimeout(function(){
						$('.toast').fadeOut('normal').remove();
					},2000);
				}
			</script>
		</body>
	</html>
	`,
};

//help
var helpCodes={
	"0":{
		title:"帮助",
		content:"帮助文档建设中..."
	},
	"101":{
		title:"基础地图显示",
		content:"了解一下基础加载流程。"
	},
	"102":{
		title:"地图初始化设置",
		content:"你可以尝试修改init函数中的这些变量:<br>"
		+"GIM.far:镜头距离0点的最大距离，GIM.near是最小距离<br>"
		+"params.backgroundColor:除去地图实体外的虚空背景色<br>"
		+"self.map.selectedColor:地图的房间被选中时的颜色<br>"
		+"params.labelScale:文字标签缩放倍数<br>"
		+"self.map.move2Point:初始位置的x,y坐标偏移<br>"
		+"self.map.setPolarAngle:仰角角度<br>"
		+"self.map.setAzimuthalAngle:水平旋转角度<br>"
		+"self.map.showCompass:是否显示指南针<br><br>"
		+"这里展示了部分常用设置,更多API请查看https://map.ckiosk.cn/APIDOC"
	},
	"103":{
		title:"主题切换",
		content:"修改params.themeID变量，可更换包括指南针、标注点、用户位置在内的一整套图标，目前有\"1003\"和\"1001\"两个主题"
	},
	"104":{
		title:"地图操作",
		content:"鼠标左键拖拽可拖动地图，点击地图实体可选中该实体.<br>鼠标右键左右拖拽可旋转地图,上下拖拽可改变仰角.<br>"
	},
	"105":{
		title:"楼层显示控制",
		content:"可通过Map3D对象的showFloors方法切换楼层<br>在Map3D对象初始化完成的initCompleted回调函数中进行数据和事件的处理"
	},
	"106":{
		title:"图屏显示控制",
		content:"happymap在各种格式的屏幕下都能有良好的体验<br>你可尝试修改宽,高来查看地图在各种宽高下的表现"
	},
	"107":{
		title:"2D/3D切换",
		content:"happymap的地图是由3D引擎创建的,当仰角为0时,地图视觉就类似2D平面效果,仰角不为0时,就能看到3D效果了<br>使用setPolarAngle可以修改仰角角度,范围为0°-60°"
	},
	"108":{
		title:"坐标切换",
		content:"当点击选中了地图实体后,镜头会自动切换到改实体居中的位置.<br>也可以使用move2Point({x:x坐标,y:y坐标})改变镜头位置.<br>左上角为0,0点,<br>x坐标右加左减,<br>y坐标上加下减."
	},
	"201":{
		title:"指南针",
		content:"右上角的指南针控件,用于在地图旋转后提供指向标准.<br>使用方式:<br>showCompass隐藏或显示指南针<br>regCompassChange地图旋转事件,在此处更新指南针角度"
	},
	"401":{
		title:"初始化完成事件",
		content:"地图类初始化配置中的initCompleted是对应地图初始化完成事件的回调函数"	
	}
}

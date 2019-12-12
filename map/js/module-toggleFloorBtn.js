/*
 * @Author: yingjun 
 * @Date: 2018-05-26 17:09:02 
 * @Last Modified by: yingjun
 * @Last Modified time: 2018-06-07 19:13:36
 */
var d = new Date();
var nowtime = d.toLocaleString();
// console.log('Last modified on ' + nowtime);
var getPathFloor = []; //存起点和终点的数组 
var saveFloor = []; // 存后台请求出来的所有楼层 
var saveCompareGet = []; // 存有路线的楼层 
var getToggleFloor = []; // 存切换模块的楼层 \

var fFloor; //起点路径楼层号    1F
var mFloor; //中间路径楼层号
var mSecFloor; //中间路径楼层号
var mThiFloor; //中间路径楼层号
var mFouFloor; //中间路径楼层号
var mFivFloor; //中间路径楼层号
var mSixFloor; //中间路径楼层号
var mSenFloor; //中间路径楼层号
var mEhiFloor; //中间路径楼层号
var lFloor; //终点路径楼层号

var fIndex; //起点路径楼层index
var mIndex; //中间路径楼层index
var mSecIndex; //中间路径楼层index
var mThiIndex; //中间路径楼层index
var mFouIndex; //中间路径楼层index
var mFivIndex; //中间路径楼层index
var mSixIndex; //中间路径楼层index
var mSenIndex; //中间路径楼层index
var mEhiIndex; //中间路径楼层index
var lIndex; //终点路径楼层index

var fFloorid; //起点路径楼层id   模拟导航开头调用一次 self.map.showFloors(fFloorid)
var mFloorid; //中间路径楼层id
var mSecFloorid; //中间路径楼层id
var mThiFloorid; //中间路径楼层id
var mFouFloorid //中间路径楼层id
var mFivFloorid //中间路径楼层id
var mSixFloorid //中间路径楼层id
var mSenFloorid //中间路径楼层id
var mEhiFloorid //中间路径楼层id
var lFloorid; //终点路径楼层id

var isInit = true; //是否是初始化
var msgLength; //msg的字段长度
var floorLength; //楼层长度
var textO; //列表楼层切换拿到的楼层号
var dataO; //列表楼层切换拿到的楼层id
var isMogo = false; //是否在导航状态下
var isPathGo = false; //是否在寻路状态下
var nowFloorToggleNo = '';
var nowFloorToggleNoo = '';
var nowFloorToggleNoo = ''
var nowFloorId; //模拟导航内调用 拿到后台请求的当前所在的楼层   模拟导航方法内的regNavigationWalk方法内 调用一次nowFloorId = walkDetail.floorID;   取消模拟导航方法开头 调用一次$('.floorToggle').html("" + object.flooridFloors[nowFloorId] + "");
var arrT = []; //导航状态下  左侧按钮的楼层遍历出来楼层号
var isFloorToggleCounter = false; //楼层切换计数器开关，暂时用于处理当同层不同区导航时暂停后跳转的bug的属性   onSelected方法内的regNavigationPause方法内 调用一次isFloorToggleCounter = true; 继续模拟导航方法尾部 调用一次isFloorToggleCounter = false;
var floorCounter = 0; //楼层切换计数器   继续模拟导航方法尾部 调用一次floorCounter = 0;
var object = {
  startPP: '', //设置起点时获取的起点楼层号   setStart方法内 调用一次object.startPP = object.flooridFloors[data.floorID] goBack方法开头和startP做相同格式判断
  endPP: '', //设置终点时获取的终点楼层号     setEnd方法内 调用一次object.endPP = object.flooridFloors[data.floorID] goBack方法开头和endP做相同格式判断
}
// 切换楼层模块主按钮点击事件
$(function () {

  $(".swiper-pagination").hide()
  $(".floorToggleBox div").on("click", function () {
    $(this).find(".floorToggle").slideUp();
    $(this).find(".floorToggleUl").slideDown();
    $(this).siblings().find(".floorToggle").slideDown();
    $(this).siblings().find(".floorToggleUl").slideUp();
    if (isInit == true) {
      /* 控制滚动条 */
      var scrollHeight = $('.floorToggleUl').prop("scrollHeight");
      $('.floorToggleUl').scrollTop(scrollHeight, 200);
      // console.log("asd")
      isInit = false;
    }
  })
})

// 切换楼层模块 取外层div值判断内层div该显示哪层楼   在初始化initCompelte、点击地图onSelected、导航结束moEndClose moEndSend、返回goback、搜索后调用searchSetStart searchSetEnd
// if (condition) {
//   var btnL = $(".floorToggleUl li button")
//   for (let i = 0; i < btnL.length; i++) {
//   }
// }

function FloorDetection() {
  // var outDivValue = $(".floorToggle").html()
  // console.log(outDivValue)
  // if (nowFloorId) {
  //   var outDivValue = object.flooridFloors[nowFloorId]
  //   $(".floorToggle").html('' + object.flooridFloors[nowFloorId] + '')
  // }
  var btnL = $(".floorToggleUl li button")
  for (let i = 0; i < btnL.length; i++) {
    floorLength = btnL.length
    if (nowFloorToggleNo == btnL.eq(i).val()) {
      // console.log(i)
      nowFloorToggleNooo = btnL.eq(i).html()
      btnL.eq(i).parent().removeClass().addClass('floorToggleUl_List-active');
      btnL.eq(i).parent().siblings().removeClass().addClass('floorToggleUl_List')
    }
  }
  var btnLL = $(".floorToggleMinUl li button")
  // console.log(btnLL)
  for (let o = 0; o < btnLL.length; o++) {
    // console.log(o)
    // console.log(nowFloorToggleNoo)
    if (nowFloorToggleNoo === btnLL.eq(o).val()) {
      // console.log(btnLL.eq(o).val())
      btnLL.eq(o).parent().removeClass().addClass('floorToggleUl_List-active');
      btnLL.eq(o).parent().siblings().removeClass().addClass('floorToggleUl_List')
      $(".floorToggleMinUl li").eq(o).find('i').removeClass().addClass("floorToggleMinUl_iR")
      $(".floorToggleMinUl li").eq(o).siblings().find('i').removeClass().addClass("floorToggleMinUl_i")
    }
  }
}
// 根据后台返回的数据  获取当前的楼层
function floorJudgment() {
  $("#floorToggleUl_List button").on("click", function () {
    arrT.push($(this).html().toString())
  })
  $(".floorToggleMinUl #floorToggleUl_List button").click()
  // console.log(arrT)
}
//地图位置初始化
function mapPositonReset() {
  self.map.zoomLevel(20);
  self.map.move2Point({
    x: 1400,
    y: -2500
  });
  self.map.setPolarAngle(0);
  self.map.setAzimuthalAngle(60);
}

function mapPositonResett() {
  self.map.zoomLevel(20);
  self.map.move2Point({
    x: 3600,
    y: -1700
  });
  self.map.setPolarAngle(0);
  self.map.setAzimuthalAngle(60);
}
// 切换楼层模块列表按钮点击事件 floorToggle
// 切换楼层模块列表按钮点击事件
$(function () {
  $(".floorToggleContent1 .floorToggleUl li button").on("click", function () {
    textO = $(this).attr('value')
    dataO = $(this).attr('data')
    // console.log(dataO)
    nowFloorToggleNo = $(this).attr("id")
    $(this).parent().removeClass().addClass('floorToggleUl_List-active');
    $(this).parent().siblings().removeClass().addClass('floorToggleUl_List')
    $(this).parent().parent().parent().siblings().find(".floorToggleUl").children().removeClass().addClass('floorToggleUl_List')
    self.map.showFloors([dataO])
    mapPositonResett()

    $('.looking').css('display', 'block').find('span').html('正在查看 ' + textO + '');
    $(".setPoint").hide()
    object.floorid = [dataO]
    if (isFloorToggleCounter == true && fFloor == lFloor) {
      floorCounter = floorCounter + 1
    }
    FloorDetection()
  })
  $(".floorToggleContent2 .floorToggleUl li button").on("click", function () {
    textO = $(this).attr('value')
    dataO = $(this).attr('data')
    // console.log(dataO)
    nowFloorToggleNo = $(this).attr("id")
    $(this).parent().removeClass().addClass('floorToggleUl_List-active');
    $(this).parent().siblings().removeClass().addClass('floorToggleUl_List')
    $(this).parent().parent().parent().siblings().find(".floorToggleUl").children().removeClass().addClass('floorToggleUl_List')
    self.map.showFloors([dataO])
    mapPositonReset()
    $('.looking').css('display', 'block').find('span').html('正在查看 ' + textO + '');
    $(".setPoint").hide()
    object.floorid = [dataO]
    if (isFloorToggleCounter == true && fFloor == lFloor) {
      floorCounter = floorCounter + 1
    }
    FloorDetection()
  })

  $(".floorToggleMinUl").on("click", "button", function () {
    textO = $(this).attr('value')
    dataO = $(this).attr('data')
    // console.log(dataO)
    $(this).parent().removeClass().addClass('floorToggleUl_List-active');
    $(this).parent().siblings().removeClass().addClass('floorToggleUl_List')
    $(this).parent().parent().parent().siblings().find(".floorToggleUl").children().removeClass().addClass('floorToggleUl_List')
    $(this).parent().find("i").removeClass().addClass('floorToggleMinUl_iR');
    $(this).parent().siblings().find("i").removeClass().addClass('floorToggleMinUl_i')
    self.map.showFloors([dataO])
    $(".setPoint").hide()
    object.floorid = [dataO]
    self.map.setPolarAngle(15);
    if (isFloorToggleCounter == true && fFloor == lFloor) {
      floorCounter = floorCounter + 1
    }

  })
})
/* 获取楼层列表index */
function searchKeys(needle, haystack) {
  for (i in haystack) {
    if (haystack[i] == needle) {
      if (i.length = 1) {
        // fIndex = i
        return i
      }
    }
  }
}
// 出路线方法   在设置起点setStart 终点setEnd  起点终点交换reverse等地方调用
function pathGo() {
  console.log("pathGo run")
  $(".floorToggleBox").hide()
  $('.floorToggleMinUl').children().remove()
  if ($('.setPoint1').css('display') == 'none') {
    $('.setPoint1').show()
  }
  if (object.startP !== "" && object.endP !== "") {
    if (object.startP == object.endP) {
      // console.log("asd")
      $(".searchPathFailMsg").html("起始点相同,请重新设置")
      $(".searchPathFailBox").fadeIn()
      return
    } else {
      $('#loadings').css({
        'display': 'block'
      }).children('.load_xun').css({
        display: 'block'
      })
        .siblings().css({
          display: 'none'
        })
      if ($('.setPoint1').css('display') == 'none') {
        $('.setPoint1').show()
      }
      self.map.searchPath(function (msg) {
        console.log(msg)
        isPathGo = true;
        if (msg.type == 'done') {
          object.distance = msg.dis
          self.map.areaClickEmbed = false;
          getPathFloor = [];
          saveFloor = [];
          saveCompareGet = [];
          getToggleFloor = [];
          getPathFloor.push(object.startPP)
          getPathFloor.push(object.endPP)
          // console.log(getPathFloor)
          // console.log("起点终点" + getPathFloor)
          var btnL = $("#floorToggleUl_List button")
          for (let i = 0; i < btnL.length; i++) {
            saveFloor.push(btnL.eq(i).val())
            // console.log(saveFloor.length)
            // console.log(floorLength)
            if (saveFloor.length > floorLength - 1) {
              // console.log("后台总楼层" + saveFloor)
              $(".floorToggleMinUl").show();
              saveCompareGet = saveFloor.filter(function (n) {
                return getPathFloor.indexOf(n) != -1
              });
              // console.log("有路线的楼层" + saveCompareGet);
              // console.log(saveCompareGet.toString())
              var liBtn = []
              msg.floorIDs = msg.floorIDs.reverse()
              for (var k = 0; k < msg.floorIDs.length; k++) {
                msgLength = k
                fFloorid = msg.floorIDs[k]
                fFloor = object.flooridFloors[fFloorid.toString()]
                // console.log(fFloor)
                liBtn.push(`<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${msg.floorIDs[k]}" value="${object.flooridFloors[msg.floorIDs[k]]}" id="${object.flooridFloors[msg.floorIDs[k]]}">${object.flooridFloors[msg.floorIDs[k]]}</button></li>`)
                if (liBtn.length == 1) {
                  fFloorid = lFloorid = msg.floorIDs[0]
                  $(".floorToggleMinUl").html(liBtn)
                } else if (liBtn.length == 2) {
                  lFloorid = msg.floorIDs[1]
                  lFloor = object.flooridFloors[lFloorid.toString()]
                  $(".floorToggleMinUl").html(liBtn)
                  $(".floorToggleMinUl li").eq(k - 1).show().removeClass().addClass('floorToggleUl_List-active')
                  $(".floorToggleMinUl li").eq(k - 1).siblings().show().removeClass().addClass('floorToggleUl_List')
                  for (let j = 1; j < k - 1; j++) {
                    $(".floorToggleMinUl li").eq(j).find('i').show()
                  }
                  $(".floorToggleMinUl li").eq(-1).find('i').show().removeClass().addClass("floorToggleMinUl_iR")
                } else {
                  mFloorid = msg.floorIDs[2]
                  mFloor = object.flooridFloors[mFloorid.toString()]
                  lFloorid = msg.floorIDs[k]
                  lFloor = object.flooridFloors[lFloorid.toString()]
                  $(".floorToggleMinUl").html(liBtn)
                  $(".floorToggleMinUl li").eq(k - 1).show().removeClass().addClass('floorToggleUl_List-active')
                  $(".floorToggleMinUl li").eq(k - 1).siblings().show().removeClass().addClass('floorToggleUl_List')
                  for (let j = 0; j < k; j++) {
                    // console.log(j)
                    $(".floorToggleMinUl li").eq(j + 1).find('i').show()
                  }
                  $(".floorToggleMinUl li").eq(-1).find('i').show().removeClass().addClass("floorToggleMinUl_iR")
                }
                // self.map.showFloors([msg.floorIDs[0]])
              }
              // if (msg.floorIDs.length == 1) {
              //   // console.log("1")
              //   msgLength = 1
              //   fFloorid = lFloorid = msg.floorIDs.slice(0, 1)
              //   fFloor = object.flooridFloors[msg.floorIDs.slice(0, 1).toString()]
              //   var fFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${fFloorid}" value="${fFloor}" id="${fFloor}">${fFloor}</button></li>`
              //   $(".floorToggleMinUl").append(fFloorLi);
              // }
              // else if (msg.floorIDs.length == 2) {
              //    msgLength = 2
              //    fFloorid = msg.floorIDs.slice(0, 1)
              //    lFloorid = msg.floorIDs.slice(1, 2)
              //    fFloor = object.flooridFloors[msg.floorIDs.slice(0, 1).toString()]
              //    lFloor = object.flooridFloors[msg.floorIDs.slice(1, 2).toString()]
              //    // fIndex = searchKeys(fFloor, saveFloor) * 1;
              //    // lIndex = searchKeys(lFloor, saveFloor) * 1;
              //    var fFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${fFloorid}" value="${fFloor}" id="${fFloor}">${fFloor}</button></li>`
              //    var lFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${lFloorid}" value="${lFloor}" id="${lFloor}">${lFloor}</button></li>`
              //    $(".floorToggleMinUl").append(lFloorLi);
              //    $(".floorToggleMinUl").append(fFloorLi);
              //    $(".floorToggleMinUl li").eq(1).show().removeClass().addClass('floorToggleUl_List-active')
              //    $(".floorToggleMinUl li").eq(1).siblings().show().removeClass().addClass('floorToggleUl_List')
              //    $(".floorToggleMinUl li").eq(-1).find('i').show().removeClass().addClass("floorToggleMinUl_iR")
              //  } else if (msg.floorIDs.length == 3) {
              //    msgLength = 3
              //    fFloorid = msg.floorIDs.slice(0, 1)
              //    mFloorid = msg.floorIDs.slice(1, 2)
              //    lFloorid = msg.floorIDs.slice(2, 3)
              //    fFloor = object.flooridFloors[msg.floorIDs.slice(0, 1).toString()]
              //    mFloor = object.flooridFloors[msg.floorIDs.slice(1, 2).toString()]
              //    lFloor = object.flooridFloors[msg.floorIDs.slice(2, 3).toString()]
              //    // fIndex = searchKeys(fFloor, saveFloor) * 1;
              //    // mIndex = searchKeys(mFloor, saveFloor) * 1;
              //    // lIndex = searchKeys(lFloor, saveFloor) * 1;
              //    var fFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${fFloorid}" value="${fFloor}" id="${fFloor}">${fFloor}</button></li>`
              //    var mFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFloorid}" value="${mFloor}" id="${mFloor}">${mFloor}</button></li>`
              //    var lFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${lFloorid}" value="${lFloor}" id="${lFloor}">${lFloor}</button></li>`
              //    $(".floorToggleMinUl").append(lFloorLi);
              //    $(".floorToggleMinUl").append(mFloorLi);
              //    $(".floorToggleMinUl").append(fFloorLi);
              //    $(".floorToggleMinUl li").eq(2).show().removeClass().addClass('floorToggleUl_List-active')
              //    $(".floorToggleMinUl li").eq(2).siblings().show().removeClass().addClass('floorToggleUl_List')
              //    $(".floorToggleMinUl li").eq(1).find('i').show()
              //    $(".floorToggleMinUl li").eq(-1).find('i').show().removeClass().addClass("floorToggleMinUl_iR")
              //  } else if (msg.floorIDs.length == 4) {
              //    msgLength = 4
              //    fFloorid = msg.floorIDs.slice(0, 1)
              //    mFloorid = msg.floorIDs.slice(1, 2)
              //    mSecFloorid = msg.floorIDs.slice(2, 3)
              //    lFloorid = msg.floorIDs.slice(3, 4)
              //    fFloor = object.flooridFloors[msg.floorIDs.slice(0, 1).toString()]
              //    mFloor = object.flooridFloors[msg.floorIDs.slice(1, 2).toString()]
              //    mSecFloor = object.flooridFloors[msg.floorIDs.slice(2, 3).toString()]
              //    lFloor = object.flooridFloors[msg.floorIDs.slice(3, 4).toString()]
              //    var fFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${fFloorid}" value="${fFloor}" id="${fFloor}">${fFloor}</button></li>`
              //    var mFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFloorid}" value="${mFloor}" id="${mFloor}">${mFloor}</button></li>`
              //    var mSecFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mSecFloorid}" value="${mSecFloor}" id="${mSecFloor}">${mSecFloor}</button></li>`
              //    var lFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${lFloorid}" value="${lFloor}" id="${lFloor}">${lFloor}</button></li>`
              //    $(".floorToggleMinUl").append(lFloorLi);
              //    $(".floorToggleMinUl").append(mSecFloorLi);
              //    $(".floorToggleMinUl").append(mFloorLi);
              //    $(".floorToggleMinUl").append(fFloorLi);
              //    $(".floorToggleMinUl li").eq(3).show().removeClass().addClass('floorToggleUl_List-active')
              //    $(".floorToggleMinUl li").eq(3).siblings().show().removeClass().addClass('floorToggleUl_List')
              //    for (let j = 1; j < msgLength - 1; j++) {
              //      $(".floorToggleMinUl li").eq(j).find('i').show()
              //    }
              //    $(".floorToggleMinUl li").eq(-1).find('i').show().removeClass().addClass("floorToggleMinUl_iR")
              //  } else if (msg.floorIDs.length == 5) {
              //    msgLength = 5
              //    fFloorid = msg.floorIDs.slice(0, 1)
              //    mFloorid = msg.floorIDs.slice(1, 2)
              //    mSecFloorid = msg.floorIDs.slice(2, 3)
              //    mThiFloorid = msg.floorIDs.slice(3, 4)
              //    lFloorid = msg.floorIDs.slice(4, 5)
              //    fFloor = object.flooridFloors[msg.floorIDs.slice(0, 1).toString()]
              //    mFloor = object.flooridFloors[msg.floorIDs.slice(1, 2).toString()]
              //    mSecFloor = object.flooridFloors[msg.floorIDs.slice(2, 3).toString()]
              //    mThiFloor = object.flooridFloors[msg.floorIDs.slice(3, 4).toString()]
              //    lFloor = object.flooridFloors[msg.floorIDs.slice(4, 5).toString()]
              //    var fFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${fFloorid}" value="${fFloor}" id="${fFloor}">${fFloor}</button></li>`
              //    var mFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFloorid}" value="${mFloor}" id="${mFloor}">${mFloor}</button></li>`
              //    var mSecFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mSecFloorid}" value="${mSecFloor}" id="${mSecFloor}">${mSecFloor}</button></li>`
              //    var mThiFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mThiFloorid}" value="${mThiFloor}" id="${mThiFloor}">${mThiFloor}</button></li>`
              //    var lFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${lFloorid}" value="${lFloor}" id="${lFloor}">${lFloor}</button></li>`
              //    $(".floorToggleMinUl").append(lFloorLi);
              //    $(".floorToggleMinUl").append(mThiFloorLi);
              //    $(".floorToggleMinUl").append(mSecFloorLi);
              //    $(".floorToggleMinUl").append(mFloorLi);
              //    $(".floorToggleMinUl").append(fFloorLi);
              //    $(".floorToggleMinUl li").eq(4).show().removeClass().addClass('floorToggleUl_List-active')
              //    $(".floorToggleMinUl li").eq(4).siblings().show().removeClass().addClass('floorToggleUl_List')
              //    for (let j = 1; j < msgLength - 1; j++) {
              //      $(".floorToggleMinUl li").eq(j).find('i').show()
              //    }
              //    $(".floorToggleMinUl li").eq(-1).find('i').show().removeClass().addClass("floorToggleMinUl_iR")
              //  } else if (msg.floorIDs.length == 6) {
              //    msgLength = 6
              //    fFloorid = msg.floorIDs.slice(0, 1)
              //    mFloorid = msg.floorIDs.slice(1, 2)
              //    mSecFloorid = msg.floorIDs.slice(2, 3)
              //    mThiFloorid = msg.floorIDs.slice(3, 4)
              //    mFouFloorid = msg.floorIDs.slice(4, 5)
              //    lFloorid = msg.floorIDs.slice(5, 6)
              //    fFloor = object.flooridFloors[msg.floorIDs.slice(0, 1).toString()]
              //    mFloor = object.flooridFloors[msg.floorIDs.slice(1, 2).toString()]
              //    mSecFloor = object.flooridFloors[msg.floorIDs.slice(2, 3).toString()]
              //    mThiFloor = object.flooridFloors[msg.floorIDs.slice(3, 4).toString()]
              //    mFouFloor = object.flooridFloors[msg.floorIDs.slice(4, 5).toString()]
              //    lFloor = object.flooridFloors[msg.floorIDs.slice(5, 6).toString()]
              //    var fFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${fFloorid}" value="${fFloor}" id="${fFloor}">${fFloor}</button></li>`
              //    var mFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFloorid}" value="${mFloor}" id="${mFloor}">${mFloor}</button></li>`
              //    var mSecFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mSecFloorid}" value="${mSecFloor}" id="${mSecFloor}">${mSecFloor}</button></li>`
              //    var mThiFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mThiFloorid}" value="${mThiFloor}" id="${mThiFloor}">${mThiFloor}</button></li>`
              //    var mFouFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFouFloorid}" value="${mFouFloor}" id="${mFouFloor}">${mFouFloor}</button></li>`
              //    var lFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${lFloorid}" value="${lFloor}" id="${lFloor}">${lFloor}</button></li>`
              //    $(".floorToggleMinUl").append(lFloorLi);
              //    $(".floorToggleMinUl").append(mFouFloorLi);
              //    $(".floorToggleMinUl").append(mThiFloorLi);
              //    $(".floorToggleMinUl").append(mSecFloorLi);
              //    $(".floorToggleMinUl").append(mFloorLi);
              //    $(".floorToggleMinUl").append(fFloorLi);
              //    $(".floorToggleMinUl li").eq(5).show().removeClass().addClass('floorToggleUl_List-active')
              //    $(".floorToggleMinUl li").eq(5).siblings().show().removeClass().addClass('floorToggleUl_List')
              //    for (let j = 1; j < msgLength - 1; j++) {
              //      $(".floorToggleMinUl li").eq(j).find('i').show()
              //    }
              //    $(".floorToggleMinUl li").eq(-1).find('i').show().removeClass().addClass("floorToggleMinUl_iR")
              //  } else if (msg.floorIDs.length == 7) {
              //    msgLength = 7
              //    fFloorid = msg.floorIDs.slice(0, 1)
              //    mFloorid = msg.floorIDs.slice(1, 2)
              //    mSecFloorid = msg.floorIDs.slice(2, 3)
              //    mThiFloorid = msg.floorIDs.slice(3, 4)
              //    mFouFloorid = msg.floorIDs.slice(4, 5)
              //    mFivFloorid = msg.floorIDs.slice(5, 6)
              //    lFloorid = msg.floorIDs.slice(6, 7)
              //    fFloor = object.flooridFloors[msg.floorIDs.slice(0, 1).toString()]
              //    mFloor = object.flooridFloors[msg.floorIDs.slice(1, 2).toString()]
              //    mSecFloor = object.flooridFloors[msg.floorIDs.slice(2, 3).toString()]
              //    mThiFloor = object.flooridFloors[msg.floorIDs.slice(3, 4).toString()]
              //    mFouFloor = object.flooridFloors[msg.floorIDs.slice(4, 5).toString()]
              //    mFivFloor = object.flooridFloors[msg.floorIDs.slice(5, 6).toString()]
              //    lFloor = object.flooridFloors[msg.floorIDs.slice(6, 7).toString()]
              //    var fFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${fFloorid}" value="${fFloor}" id="${fFloor}">${fFloor}</button></li>`
              //    var mFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFloorid}" value="${mFloor}" id="${mFloor}">${mFloor}</button></li>`
              //    var mSecFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mSecFloorid}" value="${mSecFloor}" id="${mSecFloor}">${mSecFloor}</button></li>`
              //    var mThiFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mThiFloorid}" value="${mThiFloor}" id="${mThiFloor}">${mThiFloor}</button></li>`
              //    var mFouFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFouFloorid}" value="${mFouFloor}" id="${mFouFloor}">${mFouFloor}</button></li>`
              //    var mFivFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFivFloorid}" value="${mFivFloor}" id="${mFivFloor}">${mFivFloor}</button></li>`
              //    var lFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${lFloorid}" value="${lFloor}" id="${lFloor}">${lFloor}</button></li>`
              //    $(".floorToggleMinUl").append(lFloorLi);
              //    $(".floorToggleMinUl").append(mFivFloorLi);
              //    $(".floorToggleMinUl").append(mFouFloorLi);
              //    $(".floorToggleMinUl").append(mThiFloorLi);
              //    $(".floorToggleMinUl").append(mSecFloorLi);
              //    $(".floorToggleMinUl").append(mFloorLi);
              //    $(".floorToggleMinUl").append(fFloorLi);
              //    $(".floorToggleMinUl li").eq(6).show().removeClass().addClass('floorToggleUl_List-active')
              //    $(".floorToggleMinUl li").eq(6).siblings().show().removeClass().addClass('floorToggleUl_List')
              //    for (let j = 1; j < msgLength - 1; j++) {
              //      $(".floorToggleMinUl li").eq(j).find('i').show()
              //    }
              //    $(".floorToggleMinUl li").eq(-1).find('i').show().removeClass().addClass("floorToggleMinUl_iR")
              //  } else if (msg.floorIDs.length == 8) {
              //    msgLength = 8
              //    fFloorid = msg.floorIDs.slice(0, 1)
              //    mFloorid = msg.floorIDs.slice(1, 2)
              //    mSecFloorid = msg.floorIDs.slice(2, 3)
              //    mThiFloorid = msg.floorIDs.slice(3, 4)
              //    mFouFloorid = msg.floorIDs.slice(4, 5)
              //    mFivFloorid = msg.floorIDs.slice(5, 6)
              //    mSixFloorid = msg.floorIDs.slice(6, 7)
              //    lFloorid = msg.floorIDs.slice(7, 8)
              //    fFloor = object.flooridFloors[msg.floorIDs.slice(0, 1).toString()]
              //    mFloor = object.flooridFloors[msg.floorIDs.slice(1, 2).toString()]
              //    mSecFloor = object.flooridFloors[msg.floorIDs.slice(2, 3).toString()]
              //    mThiFloor = object.flooridFloors[msg.floorIDs.slice(3, 4).toString()]
              //    mFouFloor = object.flooridFloors[msg.floorIDs.slice(4, 5).toString()]
              //    mFivFloor = object.flooridFloors[msg.floorIDs.slice(5, 6).toString()]
              //    mSixFloor = object.flooridFloors[msg.floorIDs.slice(6, 7).toString()]
              //    lFloor = object.flooridFloors[msg.floorIDs.slice(7, 8).toString()]
              //    var fFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${fFloorid}" value="${fFloor}" id="${fFloor}">${fFloor}</button></li>`
              //    var mFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFloorid}" value="${mFloor}" id="${mFloor}">${mFloor}</button></li>`
              //    var mSecFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mSecFloorid}" value="${mSecFloor}" id="${mSecFloor}">${mSecFloor}</button></li>`
              //    var mThiFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mThiFloorid}" value="${mThiFloor}" id="${mThiFloor}">${mThiFloor}</button></li>`
              //    var mFouFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFouFloorid}" value="${mFouFloor}" id="${mFouFloor}">${mFouFloor}</button></li>`
              //    var mFivFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFivFloorid}" value="${mFivFloor}" id="${mFivFloor}">${mFivFloor}</button></li>`
              //    var mSixFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mSixFloorid}" value="${mSixFloor}" id="${mSixFloor}">${mSixFloor}</button></li>`
              //    var lFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${lFloorid}" value="${lFloor}" id="${lFloor}">${lFloor}</button></li>`
              //    $(".floorToggleMinUl").append(lFloorLi);
              //    $(".floorToggleMinUl").append(mSixFloorLi);
              //    $(".floorToggleMinUl").append(mFivFloorLi);
              //    $(".floorToggleMinUl").append(mFouFloorLi);
              //    $(".floorToggleMinUl").append(mThiFloorLi);
              //    $(".floorToggleMinUl").append(mSecFloorLi);
              //    $(".floorToggleMinUl").append(mFloorLi);
              //    $(".floorToggleMinUl").append(fFloorLi);
              //    $(".floorToggleMinUl li").eq(7).show().removeClass().addClass('floorToggleUl_List-active')
              //    $(".floorToggleMinUl li").eq(7).siblings().show().removeClass().addClass('floorToggleUl_List')
              //    for (let j = 1; j < msgLength - 1; j++) {
              //      $(".floorToggleMinUl li").eq(j).find('i').show()
              //    }
              //    $(".floorToggleMinUl li").eq(-1).find('i').show().removeClass().addClass("floorToggleMinUl_iR")
              //  } else if (msg.floorIDs.length == 9) {
              //    msgLength = 9
              //    fFloorid = msg.floorIDs.slice(0, 1)
              //    mFloorid = msg.floorIDs.slice(1, 2)
              //    mSecFloorid = msg.floorIDs.slice(2, 3)
              //    mThiFloorid = msg.floorIDs.slice(3, 4)
              //    mFouFloorid = msg.floorIDs.slice(4, 5)
              //    mFivFloorid = msg.floorIDs.slice(5, 6)
              //    mSixFloorid = msg.floorIDs.slice(6, 7)
              //    mSenFloorid = msg.floorIDs.slice(7, 8)
              //    lFloorid = msg.floorIDs.slice(8, 9)
              //    fFloor = object.flooridFloors[msg.floorIDs.slice(0, 1).toString()]
              //    mFloor = object.flooridFloors[msg.floorIDs.slice(1, 2).toString()]
              //    mSecFloor = object.flooridFloors[msg.floorIDs.slice(2, 3).toString()]
              //    mThiFloor = object.flooridFloors[msg.floorIDs.slice(3, 4).toString()]
              //    mFouFloor = object.flooridFloors[msg.floorIDs.slice(4, 5).toString()]
              //    mFivFloor = object.flooridFloors[msg.floorIDs.slice(5, 6).toString()]
              //    mSixFloor = object.flooridFloors[msg.floorIDs.slice(6, 7).toString()]
              //    mSenFloor = object.flooridFloors[msg.floorIDs.slice(7, 8).toString()]
              //    lFloor = object.flooridFloors[msg.floorIDs.slice(8, 9).toString()]
              //    var fFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${fFloorid}" value="${fFloor}" id="${fFloor}">${fFloor}</button></li>`
              //    var mFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFloorid}" value="${mFloor}" id="${mFloor}">${mFloor}</button></li>`
              //    var mSecFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mSecFloorid}" value="${mSecFloor}" id="${mSecFloor}">${mSecFloor}</button></li>`
              //    var mThiFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mThiFloorid}" value="${mThiFloor}" id="${mThiFloor}">${mThiFloor}</button></li>`
              //    var mFouFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFouFloorid}" value="${mFouFloor}" id="${mFouFloor}">${mFouFloor}</button></li>`
              //    var mFivFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFivFloorid}" value="${mFivFloor}" id="${mFivFloor}">${mFivFloor}</button></li>`
              //    var mSixFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mSixFloorid}" value="${mSixFloor}" id="${mSixFloor}">${mSixFloor}</button></li>`
              //    var mSenFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mSenFloorid}" value="${mSenFloor}" id="${mSenFloor}">${mSenFloor}</button></li>`
              //    var lFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${lFloorid}" value="${lFloor}" id="${lFloor}">${lFloor}</button></li>`
              //    $(".floorToggleMinUl").append(lFloorLi);
              //    $(".floorToggleMinUl").append(mSenFloorLi);
              //    $(".floorToggleMinUl").append(mSixFloorLi);
              //    $(".floorToggleMinUl").append(mFivFloorLi);
              //    $(".floorToggleMinUl").append(mFouFloorLi);
              //    $(".floorToggleMinUl").append(mThiFloorLi);
              //    $(".floorToggleMinUl").append(mSecFloorLi);
              //    $(".floorToggleMinUl").append(mFloorLi);
              //    $(".floorToggleMinUl").append(fFloorLi);
              //    $(".floorToggleMinUl li").eq(8).show().removeClass().addClass('floorToggleUl_List-active')
              //    $(".floorToggleMinUl li").eq(8).siblings().show().removeClass().addClass('floorToggleUl_List')
              //    for (let j = 1; j < msgLength - 1; j++) {
              //      $(".floorToggleMinUl li").eq(j).find('i').show()
              //    }
              //    $(".floorToggleMinUl li").eq(-1).find('i').show().removeClass().addClass("floorToggleMinUl_iR")
              //  } else if (msg.floorIDs.length == 10) {
              //    msgLength = 10
              //    fFloorid = msg.floorIDs.slice(0, 1)
              //    mFloorid = msg.floorIDs.slice(1, 2)
              //    mSecFloorid = msg.floorIDs.slice(2, 3)
              //    mThiFloorid = msg.floorIDs.slice(3, 4)
              //    mFouFloorid = msg.floorIDs.slice(4, 5)
              //    mFivFloorid = msg.floorIDs.slice(5, 6)
              //    mSixFloorid = msg.floorIDs.slice(6, 7)
              //    mSenFloorid = msg.floorIDs.slice(7, 8)
              //    mEhiFloorid = msg.floorIDs.slice(8, 9)
              //    lFloorid = msg.floorIDs.slice(9, 10)
              //    fFloor = object.flooridFloors[msg.floorIDs.slice(0, 1).toString()]
              //    mFloor = object.flooridFloors[msg.floorIDs.slice(1, 2).toString()]
              //    mSecFloor = object.flooridFloors[msg.floorIDs.slice(2, 3).toString()]
              //    mThiFloor = object.flooridFloors[msg.floorIDs.slice(3, 4).toString()]
              //    mFouFloor = object.flooridFloors[msg.floorIDs.slice(4, 5).toString()]
              //    mFivFloor = object.flooridFloors[msg.floorIDs.slice(5, 6).toString()]
              //    mSixFloor = object.flooridFloors[msg.floorIDs.slice(6, 7).toString()]
              //    mSenFloor = object.flooridFloors[msg.floorIDs.slice(7, 8).toString()]
              //    mEhiFloor = object.flooridFloors[msg.floorIDs.slice(8, 9).toString()]
              //    lFloor = object.flooridFloors[msg.floorIDs.slice(9, 10).toString()]
              //    var fFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${fFloorid}" value="${fFloor}" id="${fFloor}">${fFloor}</button></li>`
              //    var mFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFloorid}" value="${mFloor}" id="${mFloor}">${mFloor}</button></li>`
              //    var mSecFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mSecFloorid}" value="${mSecFloor}" id="${mSecFloor}">${mSecFloor}</button></li>`
              //    var mThiFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mThiFloorid}" value="${mThiFloor}" id="${mThiFloor}">${mThiFloor}</button></li>`
              //    var mFouFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFouFloorid}" value="${mFouFloor}" id="${mFouFloor}">${mFouFloor}</button></li>`
              //    var mFivFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mFivFloorid}" value="${mFivFloor}" id="${mFivFloor}">${mFivFloor}</button></li>`
              //    var mSixFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mSixFloorid}" value="${mSixFloor}" id="${mSixFloor}">${mSixFloor}</button></li>`
              //    var mSenFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mSenFloorid}" value="${mSenFloor}" id="${mSenFloor}">${mSenFloor}</button></li>`
              //    var mEhiFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${mEhiFloorid}" value="${mEhiFloor}" id="${mEhiFloor}">${mEhiFloor}</button></li>`
              //    var lFloorLi = `<li class="floorToggleUl_List-active" id="floorToggleUl_List"><i class="floorToggleMinUl_i"></i><button name="btn" data="${lFloorid}" value="${lFloor}" id="${lFloor}">${lFloor}</button></li>`
              //    $(".floorToggleMinUl").append(lFloorLi);
              //    $(".floorToggleMinUl").append(mEhiFloorLi);
              //    $(".floorToggleMinUl").append(mSenFloorLi);
              //    $(".floorToggleMinUl").append(mSixFloorLi);
              //    $(".floorToggleMinUl").append(mFivFloorLi);
              //    $(".floorToggleMinUl").append(mFouFloorLi);
              //    $(".floorToggleMinUl").append(mThiFloorLi);
              //    $(".floorToggleMinUl").append(mSecFloorLi);
              //    $(".floorToggleMinUl").append(mFloorLi);
              //    $(".floorToggleMinUl").append(fFloorLi);
              //    $(".floorToggleMinUl li").eq(9).show().removeClass().addClass('floorToggleUl_List-active')
              //    $(".floorToggleMinUl li").eq(9).siblings().show().removeClass().addClass('floorToggleUl_List')
              //    for (let j = 1; j < msgLength - 1; j++) {
              //      $(".floorToggleMinUl li").eq(j).find('i').show()
              //    }
              //    $(".floorToggleMinUl li").eq(-1).find('i').show().removeClass().addClass("floorToggleMinUl_iR")
              //  }

            }
          }
          floorJudgment()
          msg.floorIDs = msg.floorIDs.reverse()
          if (object.moFloorid.start == object.moFloorid.end) {
            self.map.setPolarAngle(0);
          } else {
            self.map.setPolarAngle(0);
            self.map.setAzimuthalAngle(50);
            $('.looking').hide()
          }

          // self.map.zoomLevel(10);
          self.map.zoomLevel(12);
          object.isFind = true;
          // realdistance = Math.ceil(msg.dis / 50)
          object.distance = msg.dis;
          $('#loadings,.looking').css('display', 'none')
          $('#loadings').hide()
          object.ispoint = true;
        } else {
          $('#loadings').css('display', 'none')
          $(".searchPathFailMsg").html("无法找到路线，请确认后重试")
          $(".searchPathFailBox").fadeIn()
          return;
        }
        $('.waiting').hide()
      })
      object.flagClearInterval = false;
      object.ispathGoer = false;
    }
    // } else {
    //   return;
    // }
  }
  // $(".floorToggle").hide();
  $(".floorToggleUl li").hide();
  $(".floorToggleMinUl").show()
  $(".floorToggleMinUl li").show()
}
//在onSelected内的导航状态下 移动地图暂停导航内贴上以下代码块 [██████code block██████]
// isFloorToggleCounter = true;
// $(".floorToggleMinUl li button").removeAttr("disabled");

function searchPathFailClose() {

  $(".searchPathFailBox").hide()
  goback()
  $(".floorToggleBox").show()
  // $(".floorToggle").html(textO)
}
// 在继续导航内的 isPause == truen内调用
function goOnInside() {
  // console.log(nowFloorId)
  self.map.showFloors([nowFloorId])
  // console.log(floorCounter)
  // console.log(object.flooridFloors[nowFloorId])
  nowFloorToggleNoo = object.flooridFloors[nowFloorId]
  // console.log(ffFloorNo)
  // console.log(fFloor)
  // ffFloorNo = nowFloorToggleNoo
  FloorDetection()
  // if (fFloor == lFloor && floorCounter > 0) {
  //   // console.log("1")
  //   if (ffFloorNo == fFloor && ffFloorNo == lFloor) {
  //     // console.log("2")
  //     $(".floorToggleMinUl li").eq(2).show().removeClass().addClass('floorToggleUl_List-active')
  //     $(".floorToggleMinUl li").eq(2).siblings().show().removeClass().addClass('floorToggleUl_List')
  //     // $(".floorToggleMinUl li").eq(ffIndex).find('i').show()
  //     $(".floorToggleMinUl li").eq(2).find('i').removeClass().addClass("floorToggleMinUl_iR")
  //     $(".floorToggleMinUl li").eq(2).siblings().find('i').removeClass().addClass("floorToggleMinUl_i")
  //   } else if (ffFloorNo !== fFloor && ffFloorNo !== lFloor && ffFloorNo == mFloor) {
  //     var ffIndex = searchKeys(ffFloorNo, arrT)
  //     // console.log("3")
  //     $(".floorToggleMinUl li").eq(ffIndex).show().removeClass().addClass('floorToggleUl_List-active')
  //     $(".floorToggleMinUl li").eq(ffIndex).siblings().show().removeClass().addClass('floorToggleUl_List')
  //     // $(".floorToggleMinUl li").eq(ffIndex).find('i').show()
  //     $(".floorToggleMinUl li").eq(ffIndex).find('i').removeClass().addClass("floorToggleMinUl_iR")
  //     $(".floorToggleMinUl li").eq(ffIndex).siblings().find('i').removeClass().addClass("floorToggleMinUl_i")
  //   }
  // } else if (fFloor !== lFloor) {
  //   var ffIndex = searchKeys(ffFloorNo, arrT)
  //   // console.log("4")
  //   $(".floorToggleMinUl li").eq(ffIndex).show().removeClass().addClass('floorToggleUl_List-active')
  //   $(".floorToggleMinUl li").eq(ffIndex).siblings().show().removeClass().addClass('floorToggleUl_List')
  //   // $(".floorToggleMinUl li").eq(ffIndex).find('i').show()
  //   $(".floorToggleMinUl li").eq(ffIndex).find('i').removeClass().addClass("floorToggleMinUl_iR")
  //   $(".floorToggleMinUl li").eq(ffIndex).siblings().find('i').removeClass().addClass("floorToggleMinUl_i")
  // }
}

// 在继续导航方法结尾贴上以下代码块 [██████code block██████]
// isFloorToggleCounter = false;
// floorCounter = 0;
// $(".floorToggleMinUl li button").attr("disabled", "true")

// 在模拟导航结束方法和取消方法调用
function moEndClear() {
  object.startP = '';
  object.endP = '';
  object.startPP = '';
  object.endPP = '';
  object.isFind = false
  isPathGo = false;
  // $(".floorToggle").show()
  $('.floorToggleBox').show()
  $(".floorToggleUl li").show()
  $(".floorToggleMinUl li button").removeAttr("disabled");
  $('.floorToggleMinUl').children().remove()

  if (object.moFloorid.start) {
    // console.log(object.moFloorid.start)
    self.map.showFloors([object.moFloorid.start])
    // $('.floorToggle').html("" + object.flooridFloors[object.moFloorid.start] + "")
    $('.looking').css('display', 'block').find('span').html('正在查看 ' + object.flooridFloors[object.moFloorid.start] + '');
  }
  // console.log(nowFloorId)
  if (dataO) {
    nowFloorToggleNo = textO
    self.map.showFloors([dataO])
    var tagA = "A"
    var tagB = "B"
    if (textO.indexOf(tagB) != -1) {
      mapPositonResett()
    } else if (textO.indexOf(tagA) != -1) {
      mapPositonReset()
    }
  }
  if (nowFloorId) {
    // console.log(nowFloorId)
    self.map.showFloors([nowFloorId])
    nowFloorToggleNo = object.flooridFloors[nowFloorId]
    $('.looking').css('display', 'block').find('span').html('正在查看 ' + object.flooridFloors[nowFloorId] + '');
  }
  if (floorKey) {
    console.log(floorKey)
    self.map.showFloors([floorid])
    nowFloorToggleNo = floorKey
    // $('.floorToggle').html("" + floorKey + "")
    $('.looking').css('display', 'block').find('span').html('正在查看 ' + floorKey + '');
  }
  $('.scale,.floorToggleBox,.floorToggleMinUl').css('bottom', '.6rem');
  self.map.areaClickEmbed = true;

  FloorDetection()
}

// 在返回方法goback内调用
function goBackInside() {
  $(".floorToggleMinUl li button").removeAttr("disabled");
  $('.floorToggleMinUl').children().remove()
  $(".floorToggleMinUl li").eq(fIndex).find('i').hide()
  $(".floorToggleMinUl li").eq(mIndex).find('i').hide()
  $(".floorToggleMinUl li").eq(lIndex).find('i').hide()
  fFloor = "";
  mFloor = "";
  lFloor = "";
  fFloorid = ""
  mFloorid = ""
  lFloorid = ""
  fIndex = "";
  mIndex = "";
  lIndex = "";
  object.startP = '';
  object.endP = '';
  object.startPP = '';
  object.endPP = '';
  // self.map.areaClickEmbed = true;
  $(".floorToggleMinUl").hide()
  // $(".floorToggle").show()
  $('.floorToggleUlBox').hide()
  $(".floorToggleBox").show()
  $(".floorToggleUl li").show()
  // $(".floorToggle").html(textO)
  $('.floorToggleUlBox,.floorToggleMinUl').css('bottom', '.6rem');
  isPathGo = false;
  if (dataO) {
    console.log(dataO)
    self.map.showFloors([dataO])
    $('.looking').css('display', 'block').find('span').html('正在查看 ' + object.flooridFloors[dataO] + '');
    nowFloorToggleNo = object.flooridFloors[dataO]
    // console.log(nowFloorToggleNo)
    var tagA = "A"
    var tagB = "B"
    if (textO.indexOf(tagB) != -1) {
      // console.log("b")
      mapPositonResett()
      return
    } else if (textO.indexOf(tagA) != -1) {
      // console.log("a")
      mapPositonReset()
      return
    }
  }
  if (nowFloorId) {
    // console.log(nowFloorId)
    self.map.showFloors([nowFloorId])
    nowFloorToggleNo = object.flooridFloors[nowFloorId]
    $('.looking').css('display', 'block').find('span').html('正在查看 ' + object.flooridFloors[nowFloorId] + '');
  }
  FloorDetection()
}

// 起点终点置换方法内调用
function reverseInside() {
  $('.floorToggleMinUl').children().remove()
  if (msgLength > 1) {
    var bbc
    bbc = fIndex;
    fIndex = lIndex;
    lIndex = bbc;
  } else if (msgLength == 1) {
    $(".floorToggleMinUl").show()
    // $(".floorToggle").hide()
  }
  $(".floorToggleMinUl li").css("display", "block")
}

// 在模拟导航方法if判断中贴上以下代码块 [██████code block██████]
// else if (walkDetail.turn == 'Lifts' && walkDetail.dis == 0) {
//   $(".floorToggleUl_List-active").prev().removeClass().addClass("floorToggleUl_List-active").siblings().removeClass().addClass("floorToggleUl_List")
//   $(".floorToggleUl_List-active").find("i").removeClass().addClass("floorToggleMinUl_iR").parent().siblings().find("i").removeClass().addClass("floorToggleMinUl_i")
// }
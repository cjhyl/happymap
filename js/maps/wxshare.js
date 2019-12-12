var $mcShare = {};
var latitude;
var longitude;
var postData = {
    // Image: $mcShare.Image,
    url: location.href.split('#')[0],
    // appId: "wxf738fe0b7feaa06a",
    // appId: "wxcfcb1023544a7fa0",
    // screct: "2316e5b8efec130bc310bc8382983855"
    // screct: "835c8bf9a8e3285cd3041f657da4affb"
};
var R = 6377.830;
var lat1 = 28.1949007404;
var lng1 = 112.9777765274;
$mcShare.Url = location.href;

function createWXConfig(data) {
    $.ajax({
        type: "get",
        dataType: 'json',
        contentType: "application/json",
        data: data,
        url: "WXHandler.ashx",
        success: function (res) {
            // console.log(res)
            wx.config({
                // beta: true,
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.appId, // 必填，公众号的唯一标识
                timestamp: res.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.noncestr, // 必填，生成签名的随机串
                signature: res.signature, // 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'hideMenuItems', 'getLocation', 'startSearchBeacons', 'stopSearchBeacons', 'onSearchBeacons', 'openLocation', 'getNetworkType'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        },
        error: function (res) {
            // console.log(res)
        }
    });
}
wx.ready(function () {
    doNextThing()
    // $mcShare.Url = replaceUrl(location.href);
    $mcShare.Content = shareContent()
    $mcShare.Title = "好友位置";
    $mcShare.Image = 'https://files.ckiosk.cn/wxshare/image/huidi.png';
    // $mcShare.Url = location.href;
    // document.querySelector('.share_icon1').onclick = function() {
    wx.onMenuShareAppMessage({
        title: $mcShare.Title, // 分享标题
        desc: $mcShare.Content, // 分享描述
        link: replaceUrl(location.href),
        imgUrl: $mcShare.Image, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            $('.share_shade').css('display', 'none')
        },
        cancel: function () {
            $('.share_shade').css('display', 'none')
        },
    });
    // }
    // document.querySelector('.share_icon2').onclick = function() {
    wx.onMenuShareQQ({
        title: $mcShare.Title, // 分享标题
        desc: $mcShare.Content, // 分享描述
        // link: $mcShare.Url, // 分享链接
        link: replaceUrl(location.href),
        imgUrl: $mcShare.Image, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            $('.share_shade').css('display', 'none')
        },
        cancel: function () {
            $('.share_shade').css('display', 'none')
        }
    });
    // }
    // document.querySelector('share_icon3').onclick = function() {
    wx.onMenuShareTimeline({
        title: $mcShare.Title, // 分享标题
        desc: $mcShare.Content, // 分享描述
        link: replaceUrl(location.href),
        imgUrl: $mcShare.Image, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            $('.share_shade').css('display', 'none');
        },
        cancel: function () {
            $('.share_shade').css('display', 'none');
        }
    });

    // }
    wx.hideMenuItems({
        menuList: ["menuItem:share:weiboApp", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:exposeArticle", "menuItem:setFont", "menuItem:readMode"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3

    });

});


wx.error(function (res) {
    alert(res.errMsg); //打印错误消息。及把 debug:false,设置为debug:ture就可以直接在网页上看到弹出的错误提示
});


wx.checkJsApi({
    jsApiList: [
        'getNetworkType',
        'previewImage', 'onMenuShareTimeline', 'onMenuShareAppMessage'
    ],
    success: function (res) {}
});
// 获取分享的当前楼层
function shareContent() {
    var a
    a = document.title + ' ' + ' ' + ' ' + nowFloorToggleNo + ' ' + ' ' + ' ' + $(".pointName").html();
    return a
}
//分享给朋友
function shareMessage() {
    $('.share_shade').css('display', 'block')
    $('.share_pic').removeClass().addClass('share_pic share_weixin').html('微信好友')
    $mcShare.Content = shareContent();
    $mcShare.Url = replaceUrl(location.href)
    wx.onMenuShareAppMessage({
        title: $mcShare.Title, // 分享标题
        desc: $mcShare.Content, // 分享描述
        link: $mcShare.Url,
        imgUrl: $mcShare.Image, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            $('.share_shade').css('display', 'none')
            console.log($mcShare.Url)
        },
        cancel: function () {
            $('.share_shade').css('display', 'none')
        },
        trigger: function () {
            // alert(1)
        }
    });
}

//分享朋友圈
function shareTimeline() {
    $('.share_shade').css('display', 'block')
    $('.share_pic').removeClass().addClass('share_pic share_pengyou').html('朋友圈')
    $mcShare.Content = shareContent();
    $mcShare.Url = replaceUrl(location.href)
    wx.onMenuShareTimeline({
        title: $mcShare.Content, // 分享标题
        desc: $mcShare.Content, // 分享描述
        link: replaceUrl($mcShare.Url),
        imgUrl: $mcShare.Image, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            $('.share_shade').css('display', 'none')
            console.log($mcShare.Url)
        },
        cancel: function () {
            $('.share_shade').css('display', 'none')
        }
    });
}
//分享QQ
function shareQQ() {
    $('.share_shade').css('display', 'block')
    $('.share_pic').removeClass().addClass('share_pic share_qq').html('QQ好友')
    $mcShare.Content = shareContent();
    $mcShare.Url = replaceUrl(location.href)
    wx.onMenuShareQQ({
        title: $mcShare.Title, // 分享标题
        desc: $mcShare.Content, // 分享描述
        // link: $mcShare.Url, // 分享链接
        link: replaceUrl($mcShare.Url),
        imgUrl: $mcShare.Image, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            $('.share_shade').css('display', 'none')
            console.log($mcShare.Url)
        },
        cancel: function () {
            $('.share_shade').css('display', 'none')
        }
    });
}


//经纬度
function getLocations() {
    // var a
    wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
            latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var distance = R * Math.acos(Math.cos(latitude * Math.PI / 180) * Math.cos(lat1 * Math.PI / 180) * Math.cos(longitude * Math.PI / 180 - lng1 * Math.PI / 180) + Math.sin(latitude * Math.PI / 180) * Math.sin(lat1 * Math.PI / 180))
            if (distance > 10) {
                $('.waiting .wait_text').css({
                    "display": 'inlineBlock'
                }).html('温馨提示:您当前位置离项目' + Math.floor(distance) + '公里,无法定位');
                setTimeout(function () {
                    $('.waiting .wait_text').stop(false, true).fadeOut(4000)
                }, 3000)
            } else if (distance < 1 && distance > 0) {
                $('.waiting .wait_text').css({
                    "display": 'inlineBlock'
                }).html('WIFI未打开、当前信号弱或不在信号覆盖区域无法定位 ，<span>查看帮助</span>');
                // setTimeout(function() {
                //     $('.waiting').stop(false, true).fadeOut(2000)
                // }, 3000)
            } else {
                $('.waiting .wait_text').css({
                    "display": 'inlineBlock'
                }).html('您当前位置离项目比较远,无法定位');
                setTimeout(function () {
                    $('.waiting .wait_text').stop(false, true).css({
                        "display": 'inlineBlock'
                    }).fadeOut(4000)
                }, 3000)
            }
            // }

            //R*arccos(cos(lat1*pi()/180)*cos(lat2*pi()/180)*cos(lng1*pi()/180-lng2*pi()/180)+sin(lat1*pi()/180)*sin(lat2*pi()/180))
        }
    });
}


//蓝牙
function beacons() {
    wx.startSearchBeacons({
        ticket: "", //摇周边的业务ticket, 系统自动添加在摇出来的页面链接后面
        complete: function (argv) {
            if (argv.errMsg == 'startSearchBeacons:bluetooth power off') {
                $('.waiting').html('蓝牙未打开,无法定位');
                setTimeout(function () {
                    $('.waiting').fadeOut(4000)
                }, 3000)
            } else if (argv.errMsg == 'startSearchBeacons:location service disable') {
                $('.waiting').html('请打开定位服务');
                setTimeout(function () {
                    $('.waiting').fadeOut(4000)
                }, 3000);
            } else {
                if (object.mac || object.mac) {
                    object.timer = setInterval(getLocation, 1000)
                } else {
                    $('.waiting').html('温馨提示:您当前位置离项目比较远,无法定位');
                    setTimeout(function () {
                        $('.waiting').fadeOut(4000)
                    }, 3000)
                }
            }
        }
    });
};


//wifi
// function getWifi() {
//     console.log("getWifi");
//     clearInterval(object.timer);
//     wx.getNetworkType({
//         success: function(res) {
//             if (res.networkType == 'wifi') {
//                 object.timer = setInterval(getLocation, 2000);
//             } else {
//                 $('.waiting').html('WIFI未打开,无法定位');
//                 setTimeout(function() {
//                     $('.waiting').fadeOut(2000);
//                 }, 3000)
//             }
//         }
//     });
// }

function getWifi() {
    var aaa = true;
    console.log("getWifi");
    clearInterval(object.timer);
    object.timer = setInterval(() => {
        wx.getNetworkType({
            success: function (res) {
                if (res.networkType == 'wifi') {
                    getLocation()
                } else {
                    if (aaa) {
                        aaa = false
                        $('.waiting .wait_text').css({
                            "display": 'inline'
                        }).html('WIFI未打开,无法定位');
                        $('.waiting img').attr('src', './images/5.wifiwu.png')
                        setTimeout(function () {
                            $('.waiting .wait_text').fadeOut(2000);
                        }, 3000)
                    }
                    map.hideLocationMark();

                }
            }
        });
    }, 1000)
}
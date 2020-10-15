var tap_first = null;

function unsafe_tap() {
	if (!tap_first) {
		tap_first = new Date().getTime();
		setTimeout(function() {
			tap_first = null;
		}, 1500);
	} else {
		return true;
	}
}
var tap_first2 = null;

function unsafe_tap2() {
	if (!tap_first2) {
		tap_first2 = new Date().getTime();
		setTimeout(function() {
			tap_first2 = null;
		}, 1500);
	} else {
		return true;
	}
}
mui.plusReady(function() {
	/*后加的删除功能*/
	mui("#record_list").on('longtap', 'li', function() {
		var DELETE_NAME = $(this).parent().attr("value");
		var self = this;
		var bts = [{
			title: "撤销",
			name: 'c'
		}];
		plus.nativeUI.actionSheet({
			cancel: "取消",
			buttons: bts
		}, function(e) {
			var i = e.index;
			if (i == 1) {
				var title = bts[i - 1].title;
				var extras = $(self).children().attr('data-extras');
				try {
					extras = JSON.parse(extras);
				} catch (error) {
					extras = {};
				}
				var DELETE_ID = extras[DELETE_NAME]
				if (DELETE_ID && DELETE_NAME) {
					$.ajax(www_v + "/delete_operate/delete_comm", {
						data: {
							'DELETE_ID': DELETE_ID,
							"DELETE_NAME": DELETE_NAME.toUpperCase(),
							"token": getToken(),
							'ENTERPRISE_ID': getState().enterprise_id,
							'EN_USER_ID': getState().en_user_id
						},
						type: 'post', //HTTP请求类型
						timeout: 50000, //超时时间设置为10秒；
						success: function(data) {
							check_ajax(data, function(data) {
								$(self).remove();
								plus.nativeUI.toast("撤销成功");
							})
						},
						error: function(xhr, type, errorThrown, selfs) {
							if (type == "timeout") {
								alert("请求超时");
							} else if (type == "abort") {
								alert("请检查您的网络");
							} else if (type == "error") {
								alert("服务端错误");
							}
						}
					});
				} else {
					plus.nativeUI.toast("非法请求");
				}
			}
		});
	})

	mui('body').on('tap', 'a', function() {
		if (unsafe_tap()) return; // 调用代码
		var is_spec = this.getAttribute("data-spec");
		if (is_spec == null || is_spec == undefined) {
			var hashome = $(this).hasClass("home");
			if (hashome) {
				var user_type = getState().en_user_type;
				if (user_type == 1) {
					var old_id = plus.webview.getWebviewById('index.html');
					if (old_id) {
						old_id.close("none", 0);
					}
					var webview = mui.openWindow({
						url: '/./index.html',
						id: 'index.html',
						createNew: true,
						show: {
							autoShow: false,
							aniShow: "slide-in-left",
							event: 'titleUpdate'
						},
						waiting: {
							autoShow: false
						}
					});
					webview.addEventListener("titleUpdate", function() {
						setTimeout(function() {
							webview.show('slide-in-left', 300);
						}, 100);
					});
				} else if (user_type == 2) {
					var old_id = plus.webview.getWebviewById('index2.html');
					if (old_id) {
						old_id.close("none", 0);
					}
					var webview = mui.openWindow({
						url: 'index.html',
						id: 'index2.html',
						createNew: true,
						show: {
							autoShow: false,
							aniShow: "slide-in-left",
							event: 'titleUpdate'
						},
						waiting: {
							autoShow: false
						}
					});
					webview.addEventListener("titleUpdate", function() {
						setTimeout(function() {
							webview.show('slide-in-left', 300);
						}, 100);
					});
				}
			} else {
				var id = this.getAttribute("data-wid");
				if (!id) {
					id = this.getAttribute('href');
				}
				var old_id = plus.webview.getWebviewById(id);
				if (old_id) {
					old_id.close("none", 0);
				}
				var href = this.getAttribute('href');
				var extras = this.getAttribute("data-extras");
				if (!extras) {
					extras = {};
				} else {
					try {
						extras = JSON.parse(extras);
					} catch (error) {
						extras = {};
					}
				}
				//非plus环境，直接走href跳转
				if (!mui.os.plus) {
					location.href = href;
					return;
				}
				var webview_style = {
					popGesture: "hide"
				}
				if (href && ~href.indexOf('.html')) {
					//侧滑菜单需动态控制一下zindex值；
					if (~id.indexOf('offcanvas-')) {
						webview_style.zindex = 9998;
						webview_style.popGesture = ~id.indexOf('offcanvas-with-right') ? "close" : "none";
					}
					//var extras = {"name":'er'};
					var webview = plus.webview.create(this.href, id, webview_style, extras);
					webview.addEventListener("titleUpdate", function() {
						setTimeout(function() {
							webview.show('pop-in', 300);
						}, 100);
					});
				}
			}
		}

	})
});
//自定义tap
//$(document).on("touchstart", function(e) {
//  var $target = $(e.target);
//  if(!$target.hasClass("disable")) $target.data("isMoved", 0);
//});
//$(document).on("touchmove", function(e) {
//  var $target = $(e.target);
//  if(!$target.hasClass("disable")) $target.data("isMoved", 1);
//});
//$(document).on("touchend", function(e) {
//  var $target = $(e.target);
//  if(!$target.hasClass("disable") && $target.data("isMoved") == 0) $target.trigger("tap");
//});
$(function() {
	//IE也能用textarea
	$("textarea[maxlength]").keyup(function() {
		var area = $(this);
		var max = parseInt(area.attr("maxlength"), 10); //获取maxlength的值
		if (max > 0) {
			if (area.val().length > max) { //textarea的文本长度大于maxlength
				area.val(area.val().substr(0, max)); //截断textarea的文本重新赋值
			}
		}
	});
	//复制的字符处理问题
	$("textarea[maxlength]").blur(function() {
		var area = $(this);
		var max = parseInt(area.attr("maxlength"), 10); //获取maxlength的值
		if (max > 0) {
			if (area.val().length > max) { //textarea的文本长度大于maxlength
				area.val(area.val().substr(0, max)); //截断textarea的文本重新赋值
			}
		}
	});
});
/*处理字符串*/
function add0(m) {
	return m < 10 ? '0' + m : m
}

function format(shijianchuo) {
	if (shijianchuo) {
		var time = new Date(shijianchuo);
	} else {
		var time = new Date();
	}

	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	return y + '-' + add0(m) + '-' + add0(d);
}
/*获取cookie*/
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
/*删除cookie*/
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	document.cookie = name + "=; expires=" + exp.toGMTString() + ";path=/;domain=" + domain + ";";
}
/*获取地址栏参数值*/
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

/*返回顶部*/
$(".return_top").on("tap", function(e) {
	e.preventDefault();
	if ($(document).scrollTop() != 0) {
		$("body").animate({
			scrollTop: 0
		}, 500, function() {});
	}
})

/*提示方法*/
function err(data, callback, time) {
	setTimeout(function() {
		$("body").append('<span class="tip_err tip_">' + data + '</span>');
		$(".tip_err").animate({
			top: "40%"
		}, time || 800, function() {
			$(".tip_err").animate({
				opacity: 0
			}, 400, function() {
				$(".tip_err").eq(0).remove();
				if (callback) {
					callback();
				}
			});
		});
	}, 50)

}

function suc(data, callback, time) {
	setTimeout(function() {
		$("body").append('<span class="tip_suc tip_">' + data + '</span>');
		$(".tip_suc").animate({
			top: "40%"
		}, time || 800, function() {
			$(".tip_suc").animate({
				opacity: 0
			}, 400, function() {
				$(".tip_suc").eq(0).remove();
				if (callback) {
					callback();
				}
			});
		});
	}, 50)
}

function androidInputBugFix() {
	// .container 设置了 overflow 属性, 导致 Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
	// 相关 issue: https://github.com/weui/weui/issues/15
	// 解决方法:
	// 0. .container 去掉 overflow 属性, 但此 demo 下会引发别的问题
	// 1. 参考 http://stackoverflow.com/questions/23757345/android-does-not-correctly-scroll-on-input-focus-if-not-body-element
	//    Android 手机下, input 或 textarea 元素聚焦时, 主动滚一把
	if (/Android/gi.test(navigator.userAgent)) {
		window.addEventListener('resize', function() {
			if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
				window.setTimeout(function() {
					document.activeElement.scrollIntoViewIfNeeded();
				}, 0);
			}
		})
	}
}
androidInputBugFix();
function ajaxerr(arg) {
	if (arg[1] == "timeout") {
		alert("请求超时");
	} else if (arg[1] == "abort") {
		alert("请检查您的网络");
	} else if (arg[1] == "error") {
		alert("服务端错误");
	}
}

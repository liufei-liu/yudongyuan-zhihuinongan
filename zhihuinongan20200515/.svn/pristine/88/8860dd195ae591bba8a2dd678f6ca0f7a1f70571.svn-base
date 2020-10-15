var TITLE = "智慧农安";
var www = "http://m.jnzhna.com"; //正式
//var www ="http://test.jnzhna.gov.cn";//测试
mui.plusReady(function() {
	www_v = www + '/api' + plus.runtime.version.split(".").join("");
	www_v = www + '/api107';
})
var getState = function() {
	var stateText = localStorage.getItem('$state') || "{}";
	return JSON.parse(stateText);
};
var getSettings = function() {
	var settingsText = localStorage.getItem('$settings') || "{}";
	return JSON.parse(settingsText);
}

var setState = function(state) {
	state = state || {};
	localStorage.setItem('$state', JSON.stringify(state));
};
var setSettings = function(settings) {
	settings = settings || {};
	localStorage.setItem('$settings', JSON.stringify(settings));
}
var getToken = function() {
	var state = getState();
	return state.Timestamp + "." + state.Accesstoken;
}

function check_ajax(data, callback) {
	try {
		data = JSON.parse(data);
	} catch(e) {
		data = eval('(' + data + ')');
	}
	if(data.code == "200") {
		return callback(data.data);
	} else if(data.code == "401") {
		plus.nativeUI.toast(data.message);
		setState({});
		mui.openWindow({
			url: '/./login.html',
			id: 'login',
			show: {
				aniShow: 'pop-in'
			}
		});
	} else {
		plus.nativeUI.toast(data.message);
	}
}

function getNowFormatDate(full, exp) {
	var date = new Date();
	var seperator1 = "";
	if(exp) {
		var seperator1 = exp;
	}
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var strHours = date.getHours();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	if(strHours >= 0 && strHours <= 9) {
		strHours = "0" + strHours;
	}
	if(full) {
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
			" " + date.getHours() + seperator2 + date.getMinutes() +
			seperator2 + date.getSeconds();
	} else {
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + "-" + strHours;
	}
	return currentdate;
}

function p_no_zip(url, callback, img_type) {
	var cmr = plus.camera.getCamera();
	tt = setTimeout(function() {
		alert("上传失败");
		return false;
	}, 50000);
	var datetime = new Date();
	cmr.captureImage(function(path) {
		var content = "file://" + plus.io.convertLocalFileSystemURL(path);
		var task = plus.uploader.createUpload(url, {
				method: "POST",
				blocksize: 10000000000000000000000000,
				priority: 100,
				timeout: 51000
			},
			function(t, status) {
				clearInterval(tt);
				var newdatetime = new Date();
				if(newdatetime - datetime >= 50000) {
					return false;
				}
				// 上传完成  
				if(status == 200) {
					return callback(t.responseText);
				} else {
					alert("上传失败: " + status);
				}
			}
		);
		task.addFile(content, {
			key: "a"
		});
		if(img_type != undefined) {
			//task.addData(img_type, "IMG_TYPE");
			task.addData("IMG_TYPE", img_type);
		}

		task.start();

	}, function(err) {
		alert("上传失败");
	});
}

function p(url, callback, img_type) {
	plus.camera.getCamera().captureImage(function(e) {
		tt = setTimeout(function() {
			alert("上传失败");
			return false;
		}, 50000);
		var datetime = new Date();
		//console.log(e);
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			//console.log(e);
			var img_url = entry.toLocalURL();
			var name = img_url.substr(e.lastIndexOf('/') + 1);
			//压缩
			plus.zip.compressImage({
				src: img_url,
				dst: '_doc/' + name,
				overwrite: true,
				quality: 100,
				height: '600px'
				//	                ,
				//	                clip: {
				//	                    top: "0%",
				//	                    left: "0%",
				//	                    width: "600px",
				//	                    height: "600px"
				//	                }
			}, function(zip) {
				var content = zip.target;
				var task = plus.uploader.createUpload(url, {
						method: "POST",
						blocksize: 10000000000000000000000000,
						priority: 100,
						timeout: 51000
					},
					function(t, status) {
						clearInterval(tt);
						var newdatetime = new Date();
						if(newdatetime - datetime >= 50000) {
							return false;
						}
						// 上传完成  
						if(status == 200) {
							return callback(t.responseText);
						} else {
							alert("上传失败: " + status);
						}
					}
				);
				task.addFile(content, {
					key: "a"
				});
				if(img_type != undefined) {
					task.addData("IMG_TYPE", img_type);
				}
				task.start();
			}, function(zip) {
				alert("图片压缩失败: " + status);
			});
		}, function(e) {
			//console.log("读取拍照文件错误：" + e.message);
		});
	}, function(s) {
		//console.log("error" + s);
	}, {});
}

function x(url, callback, img_type, img_max_num) {
	if(!img_max_num) {
		img_max_num = "";
	}
	plus.gallery.pick(function(e) {
		ttt = setTimeout(function() {
			alert("上传失败");
			return false;
		}, 50000);
		var datetime = new Date();
		var task = plus.uploader.createUpload(url, {
				method: "POST",
				blocksize: 10000000000000000000000000,
				priority: 100,
				timeout: 51000
			},
			function(t, status) {
				//console.log(JSON.stringify(t));
				//console.log(status);
				clearInterval(ttt);
				var newdatetime = new Date();
				//console.log(datetime);
				//console.log(newdatetime);
				//console.log(newdatetime-datetime);

				if(newdatetime - datetime >= 50000) {
					return false;
				}
				// 上传完成  
				if(status == 200) {
					//console.log(t.responseText);
					return callback(t.responseText);
				} else {
					alert("上传失败: " + status);
				}
			}
		);
		for(var i in e.files) {
			var s = task.addFile(e.files[i], {
				key: "diploma" + i
			});
		}
		if(img_type != undefined) {
			//task.addData(img_type, "IMG_TYPE");
			task.addData("IMG_TYPE", img_type);
		}
		task.start();
	}, function(e) {
		//console.log('取消选择图片');
	}, {
		filter: 'image',
		multiple: true,
		system: false,
		maximum: img_max_num || "",
		onmaxed: function() {
			plus.nativeUI.alert('最多只能选择' + img_max_num + '张图片');
		}
	});
}

//检查网络
function wainshow() {
	if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		alert("请检查您的网络");
		return false;
	} else {

	}
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null)
		return decodeURI(r[2]);
	return null;
}
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function() {
	return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function() {
	return this.replace(/(\s*$)/g, "");
}
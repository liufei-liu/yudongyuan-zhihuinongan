/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(self,loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.usermobile = loginInfo.usermobile || '';
		loginInfo.password = loginInfo.password || '';
		if (!/^1[3|4|5|7|8][0-9]{9}$/.test(loginInfo.usermobile)) {
			return callback('手机号输入错误');
		}
		if (loginInfo.password.length < 5) {
			return callback('密码最短为 5 个字符');
		}
		loginInfo.password=hex_md5(loginInfo.password);
		
		$.ajax(www_v+"/login/Login/", {
			data: loginInfo,
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				//console.log(data);
				data=JSON.parse(data);
				if(data.code=="200"){ 
					//console.log(data.data.en_user_name);
					return owner.createState(
						data.data.en_user_name,
						data.data.en_user_type,
						data.data.en_user_profile,
						data.data.Timestamp,
						data.data.Accesstoken, 
						data.data.en_user_id, 
						data.data.enterprise_id, 
						callback);
				}else{	
					return callback(data.message);
				}
			},
			error: function(xhr, type, errorThrown, selfs) {
				if(type == "timeout") {
					$.alert("请求超时");
				} else if(type == "abort") {
					$.alert("请检查您的网络");
				} else if(type == "error") {
					$.alert("服务端错误");
				}
			}
		});
		

	};
	owner.createState = function(en_user_name,en_user_type,en_user_profile,Timestamp,Accesstoken,en_user_id,enterprise_id, callback) {
		var state = owner.getState();
		state.en_user_name = en_user_name;
		state.en_user_type = en_user_type;
		state.en_user_profile = en_user_profile;
		state.Timestamp = Timestamp;
		state.Accesstoken = Accesstoken;
		state.en_user_id = en_user_id;
		state.enterprise_id=enterprise_id;
		owner.setState(state);
		var s=owner.getState();
		//console.log(JSON.stringify(s));
		return callback(); 
	};
	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if (regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() { 
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
		}
		/**
		 * 获取本地是否安装客户端
		 **/
	owner.isInstalled = function(id) {
		if (id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));
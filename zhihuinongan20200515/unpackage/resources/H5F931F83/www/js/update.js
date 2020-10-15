var server=www+"/public/ias/json/upload.json";
keyUpdate="updateCheck",//取消升级键名
keyAbort="updateAbort";//忽略版本键名
	
	
	function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}
	//比较两个版本
function compareVersion( ov, nv ){
	if ( !ov || !nv || ov=="" || nv=="" ){
		return false;
	}
	var b=false,
	ova = ov.split(".",4),
	nva = nv.split(".",4);
	for ( var i=0; i<ova.length&&i<nva.length; i++ ) {
		var so=ova[i],no=parseInt(so),sn=nva[i],nn=parseInt(sn);
		if ( nn>no || sn.length>so.length  ) {
			return true;
		} else if ( nn<no ) {
			return false;
		}
	}
	if ( nva.length>ova.length && 0==nv.indexOf(ov) ) {
		return true;
	}
}
//启动更新程序
function initUpdate(){
	$.ajax(server, {
		data: {},
		type: 'post', //HTTP请求类型
		timeout: 50000, //超时时间设置为10秒；
		success: function(data) {
//			console.log(server);
//			console.log(JSON.stringify(data));
			var curVer=plus.runtime.version,
			inf = data[plus.os.name]; 
			if ( inf ){ 
				var srvVer = inf.version;
				// 判断是否存在忽略版本号
				var vabort = plus.storage.getItem( keyAbort );
				if ( vabort && srvVer==vabort ) {
					// 忽略此版本
					return;
				}
				
				// 判断是否需要升级
				if(compareVersion(curVer,srvVer)){
					// 提示用户是否升级 
					plus.nativeUI.confirm( inf.note, function(i){
						if ( 0==i.index ) {
							plus.runtime.openURL( inf.url );
//							 plus.nativeUI.toast("2222正在准备环境，请稍后！"); 
//							var dtask = plus.downloader.createDownload(inf.url, {}, function(d, status) {
//	                            if (status == 200) {                                        
//	                                plus.nativeUI.toast("正在准备环境，请稍后！");
//	                                sleep(1000);
//	                                var path = d.filename;//下载apk
//	                                plus.runtime.install(path); // 自动安装apk文件
//	                            }else {
//	                                alert('版本更新失败:' + status);
//	                            }
//	                        });
//	                        dtask.start();  	
						} else if ( 1==i.index ) {
							plus.storage.setItem( keyAbort, srvVer );
							plus.storage.setItem( keyUpdate, (new Date()).getTime().toString() );
						} else {
							plus.storage.setItem( keyUpdate, (new Date()).getTime().toString() );
						}
					}, inf.title, ["立即更新","跳过此版本","取　　消"] );
				}else{
					if(window['show_version']){
					    plus.nativeUI.toast('您已经是最新版本了');
					}	
				}
			}
		},
		error: function(xhr, type, errorThrown, selfs) {
//			if(type == "timeout") {
//				alert("请求超时");
//			} else if(type == "abort") {
//				alert("请检查您的网络");
//			} else if(type == "error") {
//				alert("服务端错误");
//			} 
		}
	});
}

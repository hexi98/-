//设备环境判断
var u = navigator.userAgent;
var	app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var isWeChat = u.toLowerCase().indexOf("micromessenger") > -1; //微信端

//基地址
var baseUrl = "https://muzi.heletech.cn/";
var baseUrlAPI = baseUrl + "htalk1/api/";
//测试基地址
//var baseUrl = "https://muzi.heletech.cn/port6081";
//图片基地址
var resourceUrl = 'https://muzi.heletech.cn/';
//杭州院内基地址
var fubaoResourceUrl = "https://mzhz.heletech.cn:10089/api/interface.aspx";

//回传主要参数
var args;

//是否从url中拿参数的标志
var paramPick = getQueryString("paramPick")||"";


//常用参数
var heleNum = "";
var idNum = "";
var dueDate = "";
var appName = "";
var mobile = "";
var momName = "";
var bookId = "";

//获取参数，该方法需要兼容APP，小程序，嵌入版，微信，具体
//表现为需要支持从bridge中取参也要支持从url中取参。
drawUI();

function drawUI(){
	if(isWeChat){
		args = {
			"baseUrl": baseUrl,
			"baseUrlAPI": baseUrlAPI,
			"fubaoResourceUrl":fubaoResourceUrl,
			"whereFrom":"Web",
			"paramsPosition":"url"
		};
		drawDocument(args);
	}else if(isAndroid) {
		try {
			var obj = eval('(' + window.ncp.callOnJs() + ')');
			heleNum = obj.heleNum || "";
			idNum = obj.idNum || "";
			dueDate = obj.dueDate || "";
			appName = obj.appName || "";
			mobile = obj.mobile || "";
			momName = obj.momName || "";
			bookId = obj.bookId || "";
			args = {
				"baseUrl": baseUrl,
				"baseUrlAPI": baseUrlAPI,
				"fubaoResourceUrl":fubaoResourceUrl,
				"heleNum": heleNum,
				"idNum": idNum,
				"dueDate": dueDate,
				"appName": appName,
				"mobile": mobile,
				"momName": momName,
				"bookId":bookId,
				"whereFrom":"Android",
				"paramsPosition":"bridge"
			};
		} catch(e) {
			args = {
				"baseUrl": baseUrl,
				"baseUrlAPI": baseUrlAPI,
				"fubaoResourceUrl":fubaoResourceUrl,
				"whereFrom":"Web",
				"paramsPosition":"url"
			};
		} finally {
			drawDocument(args);
		}
	}else{
		paramPick = getQueryString("paramPick")||getDataFromLocalStorage("MODULE_PARAM_PICK")||"false";
		if(paramPick == "true"){
			//paramPick该参数为true的情况下 一定为嵌入版或者小程序；APP不准传该参数；
			//以免引起APP所有界面都无法拿到bridge中的参数；
			args = {
				"baseUrl": baseUrl,
				"baseUrlAPI": baseUrlAPI,
				"fubaoResourceUrl":fubaoResourceUrl,
				"whereFrom":"Web",
				"paramsPosition":"url"
			};
			saveToLocalStorage("MODULE_PARAM_PICK","true");
			drawDocument(args);
		}else {
			setupWebViewJavascriptBridge(function(bridge) {
				bridge.callHandler('getHeleNum', null, function(response) {
					var obj = eval('(' + response + ')');
					heleNum = obj.heleNum || "";
					idNum = obj.idNum || "";
					dueDate = obj.dueDate || "";
					appName = obj.appName || "";
					mobile = obj.mobile || "";
					momName = obj.momName || "";
					bookId = obj.bookId || "";
					args = {
						"baseUrl": baseUrl,
						"baseUrlAPI": baseUrlAPI,
						"fubaoResourceUrl":fubaoResourceUrl,
						"heleNum": heleNum,
						"idNum": idNum,
						"dueDate": dueDate,
						"appName": appName,
						"mobile": mobile,
						"momName": momName,
						"bookId":bookId,
						"paramsPosition":"bridge",
						"whereFrom":"IOS"
					};
					saveToLocalStorage("MODULE_PARAM_PICK","false");
					drawDocument(args);
				});
			});
		}
	}
}



//IOS与原生交互取参
function setupWebViewJavascriptBridge(callback) {
	if(window.WebViewJavascriptBridge) {
		return callback(WebViewJavascriptBridge);
	}
	if(window.WVJBCallbacks) {
		return window.WVJBCallbacks.push(callback);
	}
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() {
		document.documentElement.removeChild(WVJBIframe)
	}, 0)
}

/**
 * localStorage数据存储
 * @param {localStorage的key} key 
 * @param {localStorage的value} value
 */
function saveToLocalStorage(key, value) {
	value = JSON.stringify(value);
	localStorage.setItem(key.toString(), value);
}
/**
 * 从localStorage取数据
 * @param {localStorage的key} key
 */
function getDataFromLocalStorage(key) {
	var value = localStorage.getItem(key.toString());
	return value ? JSON.parse(value) : null;
}

//获取url参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null)
		return decodeURIComponent(r[2]);
	return null;
}

/**
 * 自动获取参数，该参数可能来自url、bridge
 */
function getAutoParam(key,args){
	if(getQueryString(key) != undefined && getQueryString(key) != null && getQueryString(key) != ""){
		return getQueryString(key);
	}else {
		var param = "";
		try{
			param = args[key];
		}catch(e){
			//TODO handle the exception
			param = "";
		}
		return param;
	}
}

//日期格式化
Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}




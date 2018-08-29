'use strict'

/**
 * 日期格式化
 * @param {Object} format
 */
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
	if(/(y+)/.test(format)) format = format.replace(RegExp.$1,
		(this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

/**
 * 根据2个日期字符串比较大小
 * @param {Object} d1 日期1
 * @param {Object} d2 日期2
 */
function CompareDateWithToday(d1) {
	var d2 = new Date().format("yyyy-MM-dd");
	return((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
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
	var value = localStorage.getItem(key.toString()) ? localStorage.getItem(key.toString()) : "";
	return value ? JSON.parse(value) : null;
}

function isValidatePhone(mobile) {
	var pattern = /^1[34578]\d{9}$/;
	if(pattern.test(mobile)) {
		return true;
	}
	return false;
};

/**
 * 根据输入得到字符串
 * @param {Object} $obj
 */
function getString($obj) {
	if($obj == "" || $obj == undefined || $obj.toString().length == 0) {
		return "";
	}
	return $obj;
}

/**
 * 
 * @param {localStorage的key} key
 */
function removeLocalStorageWithKey(key) {
	localStorage.removeItem(key.toString());
}
/** 
 *  清空localStorage
 */
function emptyTheLocalStorage() {
	localStorage.clear();
}

/**
 * sessionStorage数据存储
 * @param {sessionStorage的key} key 
 * @param {sessionStorage的value} value
 */
function saveTosessionStorage(key, value) {
	value = JSON.stringify(value);
	sessionStorage.setItem(key.toString(), value);
}
/**
 * 从sessionStorage取数据
 * @param {sessionStorage的key} key
 */
function getDataFromsessionStorage(key) {
	var value = sessionStorage.getItem(key.toString());
	return value ? JSON.parse(value) : null;
}

/**
 * 
 * @param {sessionStorage的key} key
 */
function removesessionStorageWithKey(key) {
	sessionStorage.removeItem(key.toString());
}
/** 
 *  清空sessionStorage
 */
function emptyThesessionStorage() {
	sessionStorage.clear();
}
/**
 * 
 * @param {Object} name 需要存入cookie的name
 * @param {Object} value 需要存入cookie的value
 * @param {Object} lasttime cookie保存时间
 */
function setCookie(name, value, lasttime) {
	var time = new Date().getTime(); //获取当前的日期时间
	//15分钟过期
	if(lasttime) {
		time += lasttime;
	} else {
		time += 15 * 60 * 1000;
	}
	time = new Date(time);
	document.cookie = name.toString() + "=" + escape(JSON.stringify(value)) + ";expries     =" + time + ';path=/';
}

/**
 * 
 * @param {Object} 需要从cookie里面获取的name
 */
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	var result;
	if(arr = document.cookie.match(reg)) {
		result = unescape(arr[2]);
	} else {
		result = "";
	}
	return result ? JSON.parse(result) : null;
}

/**
 * 清空cookie
 */
function emptyCookie(cookieName) {
	if(cookieName === "" || cookieName === null) {
		return;
	}
	setCookie(cookieName.toString(), "", -1);
}

/**
 * 判断对象是否为非空
 * @param {需要判断的对象} object
 */

function isNotEmptyObject(object) {
	return !jQuery.isEmptyObject(object);
}

function showToast(msg) {
	mui.toast(msg, {
		duration: 'long',
		type: 'div'
	});
}

/*
 * 计算文字的个数
 */
function getStringLen(Str) {
	var i, len, code;
	if(Str == null || Str == "") return 0;
	len = Str.length;
	for(i = 0; i < Str.length; i++) {
		code = Str.charCodeAt(i);
		if(code > 255) {
			len++;
		}
	}
	return len / 2;
}

//防止url中的参数是汉字会造成乱码
function GetRequest() {
	//获取到Url并且解析Url编码  
	var url = decodeURI(location.search);
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {

		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

/**
 *  返回url的参数值
 * @param {Object} name 参数名称
 */
function getQueryString(name) {
	var Request = new Object();
	Request = GetRequest();
	return Request[name];
}

/**
 * 根据身份证号查询出生日期
 * @param {Object} $IdNum 身份证号码
 */
function getBirthdayFromIDNum($IdNum) {
	if($IdNum == null || $IdNum == undefined || $IdNum == "") {
		return "身份证号不能为空";
	}
	if($IdNum.toString().length < 18) {
		return "您输入的身份证号不合法";
	}

	var birth = $IdNum.substr(6, 8);
	return birth.substr(0, 4) + "-" + birth.substr(4, 2) + "-" + birth.substr(6, 2);
}

/**
 * 根据身份证号查询年龄
 * @param {Object} $IdNum 身份证号码
 */
function getAgeFromIDNum($IdNum) {
	if($IdNum == null || $IdNum == undefined || $IdNum == "") {
		return "身份证号不能为空";
	}
	if($IdNum.toString().length < 18) {
		return "您输入的身份证号不合法";
	}

	var myDate = new Date();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	var age = myDate.getFullYear() - $IdNum.substring(6, 10);
	return age;
}

function getGenderFromIDNum($IdNum) {
	if($IdNum == null || $IdNum == undefined || $IdNum == "") {
		return "身份证号不能为空";
	}
	if($IdNum.toString().length < 18) {
		return "您输入的身份证号不合法";
	}
	if($IdNum.toString().length == 16) {
		var gender = $IdNum.toString().substr(14, 1);
		if(parseInt(gender) % 2 == 0) {
			return "女";
		}
		return "男";
	}
	if($IdNum.toString().length == 18) {
		var gender = $IdNum.toString().substr(16, 1);
		if(parseInt(gender) % 2 == 0) {
			return "女";
		}
		return "男";
	}
}

function getRegularTime($times) {
	if($times == "" || $times == undefined || $times == null) {
		console.log("时间不能为空");
		return "时间不能为空";
	}
	var times = $times.split("/");
	var year = times[0];
	var month = times[1];
	var day = times[2];
	if(month < 10) {
		month = "0" + month;
	}
	day = day.split(" ")[0];
	if(day < 10) {
		day = "0" + day;
	}
	return year.toString() + "-" + month.toString() + "-" + day.toString();
}

//根据2个年龄计算年龄差
function getYearsDistance($begin, $end) {
	if($begin.toString().length < 4) {
		return;
	}
	if($end.toString().length < 4) {
		return;
	}
	var startYear = parseInt($begin.toString().substr(0, 4));
	var startM = parseInt($begin.toString().substr(5, 2))
	var endYear = parseInt($end.toString().substr(0, 4));
	var endM = parseInt($end.toString().substr(5, 2));
	return endYear - startYear - (startM > endM ? 1 : 0);
}

/*
 * 判断字符串是否为空
 */
function isNotEmptyStr($str) {
	if($str == "" || $str == undefined || $str == null || $str == "null") {
		return false;
	}
	return true;
}

//监听不让type为text的input输入=和"
function deleteSpecialSymbol(objId) {
	$("#" + objId).find("input[type='text']").each(function() {
		var pattern = new RegExp("[=&'\"]", "g");
		$(this).on("keyup", function() {
			var value = $(this).val();
			$(this).val(value.replace(pattern, ''));
		});

		$(this).on("beforepaste", function() {
			var str = window.clipboardData.getData('text').replace(pattern, '');
			window.clipboardData.setData('text', str);
		});
	});
}

//将form表单序列化的结果转化为json对象stringfy格式
//使用前需要先调用 deleteSpecialSymbol方法将表单中type为text的input不能输入特殊符号
function stringfyFormSerialize(formString) {
	var decondeComponent = formString.replace(/\+/g, " ");
	var formArray = decondeComponent.split("&");
	var keyArray = [];
	var valueArray = [];
	$.each(formArray, function(index, string) {
		var key = string.split("=")[0];
		var value;
		if(string.split("=")[1] != undefined && string.split("=")[1] != "") {
			value = string.split("=")[1];
		} else {
			value = "";
		}
		value = decodeURIComponent(value);
		keyArray.push(key);
		valueArray.push(value);
	});

	var stringJsonObj = "{";

	$.each(keyArray, function(index, string) {
		stringJsonObj = stringJsonObj + '"' + string + '":"' + valueArray[index] + '",';
	});

	stringJsonObj = stringJsonObj.substring(0, stringJsonObj.length - 1) + "}";

	return stringJsonObj;
}

/**
 * 判断身份证账号是否合法
 * @param {身份证号码} string 传入的X需要大写
 */

function isIdCardNo(card) {
	card = card || '';
	card = card.trim().toUpperCase();

	var yuefen = [];
	yuefen['02'] = 29, yuefen['01'] = 31, yuefen['03'] = 31, yuefen['04'] = 30, yuefen['05'] = 31, yuefen['06'] = 30, yuefen['07'] = 31, yuefen['08'] = 31, yuefen['09'] = 30, yuefen['10'] = 31, yuefen['11'] = 30, yuefen['12'] = 31;

	if(!(card.length == 15 || card.length == 18)) {
		return false;
	}

	if(/^\d{17}[\dxX]$/.test(card)) {
		var a = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
		var valide = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
		var s = 0;
		var ee;
		for(var i = 0; i < card.length - 1; i++) {
			s += card.charAt(i) * a[i];
		}
		var mod = s % 11;
		if(valide[mod] != card.charAt(17).toUpperCase()) {
			ee = 1;
		} else {
			ee = 0;
		}
	}
	var y = '',
		m = '',
		d = '',
		s = '',
		sex = '男';
	if(card.length == 15) {
		y = card.substr(6, 2);
		m = card.substr(8, 2);
		d = card.substr(10, 2);
		s = card.substr(14, 1);
	} else if(card.length == 18) {
		y = card.substr(6, 4);
		m = card.substr(10, 2);
		d = card.substr(12, 2);
		s = card.substr(16, 1);
	}
	if(yuefen[m] == undefined || parseInt(d, 10) < 1 || parseInt(d, 10) > yuefen[m]) {
		return false;
	} else if(ee == 0) {
		if(s % 2 == 0) {
			sex = '女';
		}
	} else {
		if(s % 2 == 0) {
			sex = '女';
		}
		return false;
	}
	return true;
}

function isChinese(name) {
	var re = /[^\u4e00-\u9fa5]/;
	if(re.test(name)) {
		showToast("名字不规范");
		return false;
	} else
		return true;
}

function isPhoneNum(number) {
	var reg = /^1[3456789]\d{9}$/;
	if(reg.test(number) === true) {
		return true;
	} else {
		showToast("手机号不正确");
		return false;
	}
}

// 显示idcard的前三位和后四位，中间星号表示
function hideIDCard(idcard) {
	if(!idcard) return;
	var rs = ''
	for(var i = 0; i < idcard.length; i++) {
		if(i > 2 && i < idcard.length - 4) {
			rs += '*';
		} else {
			rs += idcard[i];
		}
	}
	return rs;
}

function hideNotIDCard(idcard) {
	if(!idcard) return;
	var rs = ''
	for(var i = 0; i < idcard.length; i++) {
		if(i > 2 && i < idcard.length - 3) {
			rs += '*';
		} else {
			rs += idcard[i];
		}
	}
	return rs;
}

function getValidateID(idNum) {
	if(!isNotEmptyStr(idNum.toString())) {
		return;
	}
	if(idNum.toString().length != 18) {
		return;
	}
	var validateId = idNum.toString().replace(/\s+/g, "").toUpperCase();
}

function getWeekAndDaysByDueDate(dueDate, isNeedDays) {
	var dateTemp = dueDate.split("-");
	var dDate = new Date(dateTemp[1] + '/' + dateTemp[2] + '/' + dateTemp[0]); //转换为MM/DD/YYYY格式 
	var nDate = new Date();
	var sDateMill = dDate.getTime() - 280 * 24 * 60 * 60 * 1000;
	var sDate = new Date(sDateMill);
	var distance = nDate.getTime() - sDate.getTime();
	var returnStr = "";
	var weeks = Math.floor(distance / 1000 / 60 / 60 / 24 / 7);
	var days = Math.floor(distance / 1000 / 60 / 60 / 24 - weeks * 7);
	if(isNeedDays) {
		if(weeks < 0) {
			returnStr = ""
		} else if(weeks <= 42) {
			if(days == 0) {
				returnStr = "孕" + weeks + "周";
			} else {
				returnStr = "孕" + weeks + "周+" + days + "天";
			}

		} else {
			returnStr = "";
		}

	} else {
		if(weeks < 0) {
			returnStr = ""
		} else if(weeks <= 42) {
			returnStr = "孕" + weeks + "周";
		} else {
			returnStr = "";
		}

	}
	return returnStr;
}
/**
 * 文本框根据输入内容自适应高度
 * @param                {HTMLElement}        输入框元素
 * @param                {Number}                设置光标与输入框保持的距离(默认0)
 * @param                {Number}                设置最大高度(可选)
 */
var autoTextarea = function(elem, extra, maxHeight) {
	extra = extra || 0;
	var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
		isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
		addEvent = function(type, callback) {
			elem.addEventListener ?
				elem.addEventListener(type, callback, false) :
				elem.attachEvent('on' + type, callback);
		},
		getStyle = elem.currentStyle ? function(name) {
			var val = elem.currentStyle[name];
			if(name === 'height' && val.search(/px/i) !== 1) {
				var rect = elem.getBoundingClientRect();
				return rect.bottom - rect.top -
					parseFloat(getStyle('paddingTop')) -
					parseFloat(getStyle('paddingBottom')) + 'px';
			};
			return val;
		} : function(name) {
			return getComputedStyle(elem, null)[name];
		},
		minHeight = parseFloat(getStyle('height'));
	elem.style.resize = 'none';
	var change = function() {
		var scrollTop, height,
			padding = 0,
			style = elem.style;
		if(elem._length === elem.value.length) return;
		elem._length = elem.value.length;
		if(!isFirefox && !isOpera) {
			padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
		};
		scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		elem.style.height = minHeight + 'px';
		if(elem.scrollHeight > minHeight) {
			if(maxHeight && elem.scrollHeight > maxHeight) {
				height = maxHeight - padding;
				style.overflowY = 'auto';
			} else {
				height = elem.scrollHeight - padding;
				style.overflowY = 'hidden';
			};
			style.height = height + extra + 'px';
			scrollTop += parseInt(style.height) - elem.currHeight;
			document.body.scrollTop = scrollTop;
			document.documentElement.scrollTop = scrollTop;
			elem.currHeight = parseInt(style.height);
		};
	};
	addEvent('propertychange', change);
	addEvent('input', change);
	addEvent('focus', change);
	change();
};

/*
 * 将时间戳转换为具体的日期 2017-10-24 
 */
function js_date_time(timeStamp) {
	 if(!isNotEmptyStr(timeStamp)) {
	  	return "";
	 }
	
    var date = new Date();
    date.setTime(timeStamp)/1000;
    var y = date.getFullYear() ;  
    var m = date.getMonth() + 1;    
    m = m < 10 ? ('0' + m) : m;    
    var d = date.getDate();    
    d = d < 10 ? ('0' + d) : d;    
    var h = date.getHours();  
    h = h < 10 ? ('0' + h) : h;  
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    minute = minute < 10 ? ('0' + minute) : minute;    
    second = second < 10 ? ('0' + second) : second;   
    return y + '-' + m + '-' + d; 
}

/**
 * 指定一个排序规则，对数组进行排序，默认是升序
 * @param {Object} arr JSON数组
 * @param {Object} property 数组元素的属性（需要排序的标准）
 * @param {Object} bigger 布尔值，默认为false，则升序
 */
function sortDataArrayByDate(arr, property, bigger) {
	for(var i = 0; i < arr.length; i++) {
		for(var j = 0; j < arr.length - 1 - i; j++) {
			if(new Date(arr[j][property]) > new Date(arr[j + 1][property])) {
				var temp = arr[j + 1];
				arr[j + 1] = arr[j];
				arr[j] = temp;
			}
		}
	}
	if(bigger) {
		arr.reverse();
	}
}

//调用原生返回功能
function backToNative() {
	if(isAndroid) {
		try {
			var goBack = window.ncp.backToNative();
		} catch(e) {
			//TODO handle the exception
		}
	}
	if(isiOS) {
		setupWebViewJavascriptBridge(function(bridge) {
			bridge.callHandler('backToNative', null, function(response) {

			});
		});
	}
}

/**
 * 常表单隐藏没有值的条目
 * @param {Array} $showRows 需要必须显示的条目id数组
 */
function hideEmptyRow($showRows) {
	var $showRows = $showRows || [];
	$('.mui-table-view-cell').each(function() {
		if($showRows.indexOf($(this).data('field')) > -1) {
			return true;
		}
		if(!$(this).children('.mui-media-body').html().trim()) {
			$(this).hide();
		}
	});
}

//收集用户点击信息
function postLog(huanxinId, action, obj) {
	var data = {};
	data.name = huanxinId;
	data.app_name = "ybt_h5";
	data.action = action;
	var postObj = Object.assign(data, obj);
	$.ajax({
		type: "post",
		async: true,
		url: "http://heletech.cn:5003/log_action",
		data: JSON.stringify(postObj),
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		success: function(datas) {
			console.log(datas)
		},
		error: function(collection, response, options) {
			console.log(response)
		}
	});

}

//去除字符串中某些特定字符
String.prototype.trim = function(char, type) {
	if(char) {
		if(type == 'left') {
			return this.replace(new RegExp('^\\' + char + '+', 'g'), '');
		} else if(type == 'right') {
			return this.replace(new RegExp('\\' + char + '+$', 'g'), '');
		}
		return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
	}
	return this.replace(/^\s+|\s+$/g, '');
};

function renderString(value) {
	if(isNotEmptyStr(value)) {
		return value;
	} else if(value == "无") {
		return "未知";
	} else {
		return "未知";
	}
}

/*
 * 比较2个日期的大小。若参数1大于参数2 则返回 true 否则为 false
 * 
 */
function compareDateLate(d1, d2) {
	var arrayD1 = d1.split("-");
	var date1 = new Date(arrayD1[0], arrayD1[1], arrayD1[2]);
	var arrayD2 = d2.split("-");
	var date2 = new Date(arrayD2[0], arrayD2[1], arrayD2[2]);
	if(date1 > date2) return true;
	return false;
}

/**
 * 根据2个日期计算相差的天数
 * @param {Object} date1 开始日期
 * @param {Object} date2 截止日期
 */
function getDaysFromTwoDate(date1, date2) {
	var date1Str = date1.split("-"); //将日期字符串分隔为数组,数组元素分别为年.月.日  
	//根据年 . 月 . 日的值创建Date对象  
	var date1Obj = new Date(date1Str[0], (date1Str[1] - 1), date1Str[2]);
	var date2Str = date2.split("-");
	var date2Obj = new Date(date2Str[0], (date2Str[1] - 1), date2Str[2]);
	var t1 = date1Obj.getTime();
	var t2 = date2Obj.getTime();
	var dateTime = 1000 * 60 * 60 * 24; //每一天的毫秒数  
	var minusDays = Math.floor(((t2 - t1) / dateTime)); //计算出两个日期的天数差  
	var days = minusDays; //取绝对值  
	return days;
}

/*
 * 根据2个日期，计算出相差的天数，一般用于医学领域儿童日龄的计算
 * 参数形式	yyyy-MM-dd
 */
function getYearDistance(startDate, endDate) {
	// 拆分年月日
	startDate = startDate.split('-');
	// 得到月数
	startDate = parseInt(startDate[0]) * 12 + parseInt(startDate[1]);
	// 拆分年月日
	endDate = endDate.split('-');
	// 得到月数
	endDate = parseInt(endDate[0]) * 12 + parseInt(endDate[1]);
	return Math.abs(startDate - endDate) / 12;
}

/*
 * 根据2个日期，计算出相差的月数
 * 参数形式	yyyy-MM-dd
 */
function getMonthDistance(startDate, endDate) {
	// 拆分年月日
	
	startDate = startDate.split('-');
	var startDay =  startDate[2];
	// 得到月数
	startDate = parseInt(startDate[0]) * 12 + parseInt(startDate[1]);
	// 拆分年月日
	
	endDate = endDate.split('-');
	var endDay = endDate[2];
	// 得到月数
	endDate = parseInt(endDate[0]) * 12 + parseInt(endDate[1]);
	
	return (endDay>startDay)? Math.abs(endDate - startDate): Math.abs( endDate - startDate - 1);
}


/**
 *  在移动端项目中要使用 mui 自带的picker 必须引入 util.js 文件，不然会造成键盘和 picker 同时存在的 bug
 *  如果报错，则需要引入 jquery。
 */
$("input,textarea").focus(function() {
	$(".mui-poppicker").hide();
});
$("input,textarea").blur(function() {
	$(".mui-poppicker").show();
});

/**
 *  日期格式化，将1521561600000转换为2018-03-21
 */
function checkDateFormat(dateValue) {
	if(!isNotEmptyStr(dateValue)){
		return "";
	}
    if (!isNaN(dateValue)) {
        return new Date(dateValue).format("yyyy-MM-dd");
    }
    dateValue = dateValue.length>10?dateValue.substr(0,10):dateValue;
    return dateValue;
}


/**
 *  起始天数 根据偏移量算结束天数
 */
function addDays(startDate,indexDays) {
	var start = new Date(startDate);
	start.setDate(start.getDate() + indexDays);
	return start.format("yyyy-MM-dd");
}


 //年份算天数
function getDaysByYear(birthday,years){
	var bdate = new Date(birthday);
	var year = bdate.getFullYear() + years;
	var datestr = year+"-"+((bdate.getMonth()+1)<10?("0"+(bdate.getMonth()+1)):(bdate.getMonth()+1))+"-"+(bdate.getDate()<10?("0"+bdate.getDate()):bdate.getDate());
	var ndate = new Date(datestr);
	return (ndate.getTime()-bdate.getTime())/1000/60/60/24;
}

//将数组中间为0的数据算为折线,数组末尾的0删除
function transformationArray(array){
	for(var i = array.length-1;i>=0;i--){
		if(array[i]!=0){
			array = array.slice(0,i+1);
			break;
		}
	}
	var pointHasValue = [];
	var transedArray =  [].concat(array);

	for(var i = 0;i<array.length;i++){
		if(i==0||array[i]>0){
			var obj ={};
			obj.index = i;
			obj.value = array[i];
			pointHasValue.push(obj);
		}
	}
	if(pointHasValue.length>=2){
		for(var i= 0;i<pointHasValue.length-1;i++){
			var x1 = pointHasValue[i].index;
			var x2 = pointHasValue[i+1].index;
			var y1 = pointHasValue[i].value;
			var y2 = pointHasValue[i+1].value;
			//斜率
			var k = (y2-y1)/(x2-x1);
			var b = (x2*y1-x1*y2)/(x2 - x1);
			for(var j = x1;j<=x2;j++){
				transedArray[j] = k*j+b; 
			}
			
		}
	}else if(pointHasValue.length>0){
		transedArray[0] = pointHasValue[0].value;
	}else{
		transedArray = []; 
	}
	return transedArray;
}

function formatTime2Second(time) {
	var hour = time.split(":")[0];//split() 分割
	var minute = time.split(":")[1];
	var second = time.split(":")[2];
	second = Number(hour * 3600) + Number(minute * 60) + Number(second);
	return second;
}

function formatSecond2Time(duration) {
	var hour = Math.floor(duration / 3600);//Math.floor() 对一个数进行下舍入
	if(hour < 10) hour = '0' + hour;//显示形式为两位数
	var other = duration % 3600;
	var minute = Math.floor(other / 60);
	if(minute < 10) minute = '0' + minute;
	var second = (other % 60).toFixed(0);//.toFixed(num) 把 Number 四舍五入为指定小数位数的数字.num规定小数的位数，0～20之间
	if(second < 10) second = '0' + second;
	return hour + ":" + minute + ":" + second;
}
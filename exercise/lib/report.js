/**
 * edited time: 2017-12-25 10:10:34
 * 前端错误收集，建议先加载（先给window绑定onerror）
 * 目前依赖： $.ajax
 * 暴露对象： Report
 * 方法：
 * 	Report.default(ops)	 // 默认配置 
 * 	Report.send(msgdata) // 发送日志
 */

;(function (window, $) {
// 严格模式不可以使用 arguments.callee.caller
//	"use strict";
	
	var Report = {};
	
	// 日志地址
	var logUrl = 'http://122.227.101.17:5001/MZJKSC/Interface.aspx';
	
	// 页面日志id
	var pageId = (function(){
		// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/8809472#8809472
		var time = (new Date()).getTime();
		if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            // 使用更高精度的时间
            time += performance.now();
        }
		var reqId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(char) {
            var rand = (time + (Math.random() * 16)) % 16 | 0;
            time = Math.floor(time / 16);
            return (char === 'x' ? rand : ((rand & 0x3) | 0x8)).toString(16);
        });
        return reqId;
	}());
	
	console.log(pageId);
	
	// 客户端信息
	var userAgent = navigator.userAgent;
	var appVersion = navigator.appVersion;
	
	window.onerror = function(msg, scripturl, line, col, error) {
		// return true; 可屏蔽 console 报错显示
		//没有URL不上报！上报也不知道错误
		// 跨域脚本，返回的结果是 Script error.  使用 crossorigin 信任
		if(msg == "Script error." || !scripturl  || !msg) {
			return false;
		}
		// 采用异步的方式
		// 遇到过在window.onunload进行ajax的堵塞上报
		// 由于客户端强制关闭webview导致这次堵塞上报有Network Error
		// 猜测这里window.onerror的执行流在关闭前是必然执行的
		setTimeout(function() {
			var data = {};
			data.scripturl = scripturl;
			data.line = line;
			//不一定所有浏览器都支持col参数
			data.col = col || (window.event && window.event.errorCharacter) || 0;
			
			if(!!error && !!error.stack) {
				//如果浏览器有堆栈信息
				//直接使用
				data.msg = error.stack.toString();
			} else {
				data.msg = msg;
			}
			
			// 把data上报到后台！
			if (data.msg) Report.send(data);
		}, 0);
		return false;
	};
	
	// 存储 ajax 记录数组
	var xhrArray = [];
	// 过滤url
	var filterUrl = [logUrl];
	var hasFilterUrl = function (reqUrl) {
		for (var i = 0; i < filterUrl.length; i++) {
			if (reqUrl.indexOf(filterUrl[i]) > -1) {
				return true;
			}
		}
		return false;
	};
	// xhr 日志
	var xhrlog = {
		reqUrl: '',
		reqMethod: '',
		xhrOpen: XMLHttpRequest.prototype.open,
		xhrSend: XMLHttpRequest.prototype.send,
		init: function () {
			var _self = this;
			XMLHttpRequest.prototype.open = function(){
		    	_self.reqUrl = arguments[1];
		    	_self.reqMethod = arguments[0];
		    	_self.xhrOpen.apply(this, arguments);
		    }
		    
		    XMLHttpRequest.prototype.send = function () {
		    	// 记录xhr
		    	if (!hasFilterUrl(_self.reqUrl)) {
		    		var xhrmsg = {
			    		'url': _self.reqUrl,
			    		'type': _self.reqMethod,
			    		'data': arguments[0] || {}
			    	}
			    	xhrmsg['data'] = JSON.stringify(xhrmsg['data']).substr(0, 200);
			    	this.addEventListener('readystatechange', function () {
			    		if (typeof this.response != 'string') return;
			          	if (this.readyState === 4) {
							// 响应信息
							xhrmsg['res'] = this.response && this.response.substr(0, 200);
							xhrmsg['status'] = this.status;
							this.status >= 200 && this.status < 400 ? 
								xhrmsg['level'] = 'success' : xhrmsg['level'] = 'error';
							xhrArray.push(xhrmsg);
						}
			        });
		    	}
		       	
	       		_self.xhrSend.apply(this, arguments);		       	
		    }
		}
	};
	
	// 初始化
	xhrlog.init();
	
	/**
	 * 设置默认参数	ops： {logUrl, filterUrl}
	 * 日志上传服务器，过滤的 ajax 请求地址
	 */
	Report.default = function (ops) {
		if (typeof ops === 'string') {
			logUrl = ops;
		}
		else if (typeof ops === 'object') {
			logUrl = ops.logUrl || logUrl;
			
			if (typeof ops.filterUrl === 'string') {
				filterUrl.push(ops.filterUrl);
			}
			else {
				// 请使用数组
				filterUrl = filterUrl.concat(ops.filterUrl);
			}
		}
	};
	
	/**
	 * 发出日志，并同时发出记录的 ajax 信息
	 * @param {Object} data 发送内容
	 */
	Report.send = function (data) {
		
		if (typeof data === 'string') {
			data = {
				msg: data || ''
			};
		}
		
		var postobj = {
			appName: 'h5-js',
			type: 99,
			pageID: pageId,
			agent: userAgent + ';' + appVersion,
			scripturl: data.scripturl || '',
			col: data.col || 0,
			line: data.line || 0,
			msg: data.msg.replace(/[$@<>]/g, ' # ') || '',
			location: window.location.href,
			ajaxs: xhrArray
		};
		
		$.ajax({
			url: logUrl,
			type: 'post',
			data: JSON.stringify(postobj),
			complete: function () {
				// 发出后把 ajax 记录清空
				xhrArray = [];
			}
		});
	};
	
	// export
	window.Report = window.Report || Report;
})(window, jQuery);
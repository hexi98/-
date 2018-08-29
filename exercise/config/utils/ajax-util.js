//  ========== 
//  =ajax工具类=
//  ========== 
(function($){
	//  ========== 
	//  =同步处理异步get请求，传入URL以及参数对象，返回promise对象= 
	//  ========== 
	$.getRequestPromise=function(url){
		var defer = $.Deferred();
		$.ajax({
	        type : "get",
	        cache:false,
	        url : url,
	        dataType : "json",
	        contentType :"application/json;charset=utf-8", 
	        success:function(data){
	         	defer.resolve(data);
	        },
	        error:function(data){
	            defer.reject(data);
	        }
	    });
	    
	    return defer.promise();
	}
	
	
	//  ========== 
	//  =同步处理异步post请求，传入URL以及参数对象，返回promise对象= 
	//  ========== 
	$.postRequestPromise=function(url,params){
		var defer = $.Deferred();
		$.ajax({
	        type : "post",
	        cache:false,
	        url : url,
	        data:JSON.stringify(params),
	        dataType : "json",
	        contentType :"application/json;charset=utf-8", 
	        success:function(data){
	         	defer.resolve(data);
	        },
	        error:function(data){
	            defer.reject(data);
	        }
	    });
	    
	    return defer.promise();
	}
	
	
		//  ========== 
	//  =同步处理异步post请求，传入URL以及参数对象，返回promise对象= 
	//  ========== 
	$.postRequestPromiseByFormData=function(url,params){
		var defer = $.Deferred();
		$.ajax({
	        type : "post",
	        cache:false,
	        url : url,
	        data:params,
	        processData:false,
	        dataType : "json",
	        contentType: false, 
	        success:function(data){
	         	defer.resolve(data);
	        },
	        error:function(data){
	            defer.reject(data);
	        }
	    });
	    
	    return defer.promise();
	}
	
	
	//  ========== 
	//  = 异步处理异步get请求，传入URL以及参数对象以及回调函数 = 
	//  ========== 
	$.getRequest=function getRequest(url,success,fail){
		$.ajax({
	        type : "get",
	        cache:false,
	        url : url,
	        dataType : "json",
	        contentType :"application/json;charset=utf-8", 
	        success:success,
	        error:fail
	   });
	}
	
	//  ========== 
	//  = 异步处理异步post请求，传入URL以及参数对象以及回调函数 = 
	//  ========== 
	$.postRequest=function(url,params,success,fail){
		$.ajax({
	        type : "post",
	        cache:false,
	        url : url,
	        data:JSON.stringify(params),
	        dataType : "json",
	        contentType :"application/json;charset=utf-8", 
	        success:success,
	        error:fail
	   });
	}
	
	
	//  ========== 
	//  =以下不加contentType= 
	//  ========== 
	
	//  ========== 
	//  =同步处理异步get请求，传入URL以及参数对象，返回promise对象= 
	//  ========== 
	$.getRequestPromiseNet=function(url){
		var defer = $.Deferred();
		$.ajax({
	        type : "get",
	        cache:false,
	        url : url,
	        dataType : "json",
	        success:function(data){
	         	defer.resolve(data);
	        },
	        error:function(data){
	            defer.reject(data);
	        }
	    });
	    
	    return defer.promise();
	}
	
	
	//  ========== 
	//  =同步处理异步post请求，传入URL以及参数对象，返回promise对象= 
	//  ========== 
	$.postRequestPromiseNet=function(url,params){
		var defer = $.Deferred();
		$.ajax({
	        type : "post",
	        cache:false,
	        url : url,
	        data:JSON.stringify(params),
	        dataType : "json",
	        success:function(data){
	         	defer.resolve(data);
	        },
	        error:function(data){
	            defer.reject(data);
	        }
	    });
	    
	    return defer.promise();
	}
	
	//  ========== 
	//  = 异步处理异步get请求，传入URL以及参数对象以及回调函数 = 
	//  ========== 
	$.getRequestNet=function getRequest(url,success,fail){
		$.ajax({
	        type : "get",
	        cache:false,
	        url : url,
	        dataType : "json",
	        success:success,
	        error:fail
	   });
	}
	
	//  ========== 
	//  = 异步处理异步post请求，传入URL以及参数对象以及回调函数 = 
	//  ========== 
	$.postRequestNet=function(url,params,success,fail){
		$.ajax({
	        type : "post",
	        cache:false,
	        url : url,
	        data:JSON.stringify(params),
	        dataType : "json", 
	        success:success,
	        error:fail
	   });
	}
	
	
})(jQuery)

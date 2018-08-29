(function($){
	$.pyqPersonal=function(arg){
		console.log(1);
		var temp1 = new Vue({
			el:'.DIANZAN',
			data:{
				counter:0
			}
		});
		var temp2 = new Vue({
			el:'.PINGLUN',
			methods:{
				skip:function(e){
					window.location.href='http://xiangqing.html';
				}
			}
		});
	
	}
	
})(jQuery)

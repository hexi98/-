$("body").append(
	'<div class="div-mask">'+
		'<div id="div-loading" style="display: block;">'+
			'<div class="spinner">'+
				'<div class="rect1"></div>'+
				'<div class="rect2"></div>'+
				'<div class="rect3"></div>'+
				'<div class="rect4"></div>'+
				'<div class="rect5"></div>'+
			'</div>'+
		'</div>'+
	'</div>'
);

function easyloaderDismiss(){
	$(".div-mask").hide();
}

function easyloaderShow(){
	$(".div-mask").show();
}
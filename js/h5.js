/*
* Ajax in zepto
*/
function ajax (opt){
	var xmlhttp=new XMLHttpRequest(),
		timeOut = false,
		that=this,
		sendData=null,
		checkstatus,
		setimeout,
		timeOutMsg = "请求超时，请重试！";
	xmlhttp.onreadystatechange = readyHandle;
	function readyHandle(){
		if(xmlhttp.readyState!=4&&timeOut){
			xmlhttp.abort();
			xmlhttp = null;
			var rdat=opt.dataType=='json'?{ok:0,msg:timeOutMsg}:timeOutMsg;
			opt.success&&opt.success.call(opt.context?opt.context:this,rdat);
			clearInterval(checkstatus);
			return
		}
		if(xmlhttp.readyState==4){
			clearInterval(checkstatus);
			clearTimeout(setimeout);
			if(xmlhttp.status==200 && xmlhttp.status<300 || xmlhttp.status == 304){
			  	var rdat=opt.dataType=='json'?JSON.parse(xmlhttp.responseText):xmlhttp.responseText;
				opt.success&&opt.success.call(opt.context?opt.context:this,rdat);
			}else{
				opt.error&&opt.error.call(opt.context?opt.context:this,xmlhttp.statusText);
			}
		}
	}
	if(!opt.type||opt.type=='GET'){
		opt.url=opt.url+(opt.data?(opt.url.indexOf('?')>0?'':'&')+opt.data:'');
	}
	xmlhttp.open(opt.type?opt.type:"GET",opt.url,opt.ayns?opt.ayns:true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(opt.type=='POST'?opt.data:null);
	if(opt.timeout) {
		setimeout = setTimeout(function(){timeOut = true},opt.timeout);
		checkstatus = setInterval(readyHandle,13)
	}

}


/*
* Get URL parameters
*/
function getURLPara(paraName){
	var url_ = location.search, paraValue;
	if(url_.indexOf('?') != -1){
		var paraStr = url_.substr(1).split('&');
		var paraObj ={};
		for (var i=0, j; j=paraStr[i]; i++){
			paraObj[j.substring(0, j.indexOf('='))] = j.substr(j.indexOf('=')+1)
		}
		paraValue = paraObj[paraName];
	}
	return paraValue;
	//decodeURIComponent()
}
//单次
function getQueryString(paraName) {  
	var reg = new RegExp("(^|&)" + paraName + "=([^&]*)(&|$)");  
	var r = window.location.search.substr(1).match(reg);  
	if (r != null) {   
		return unescape(r[2]);  
	}
	return null;
}


/*
* 输入框处理
*/
//数字
obj.on('keypress', function(e){
	if( !/\d/.test(String.fromCharCode(e.keyCode ? e.keyCode : e.charCode)) ){
		e.preventDefault();
	}
})


/*
* 滚动距离Top
*/
function getScrollTop(){
	var scrollTop;
	if(typeof(window.pageYOffset) == 'number'){ // DOM compliant, IE9+
		scrollTop = window.pageYOffset; 
	}else{
		if(document.body && document.body.scrollTop){ // IE quirks mode, Chrome/Safari
			scrollTop = document.body.scrollTop; 
		}else if(document.documentElement && document.documentElement.scrollTop){ // IE6+ standards compliant mode, FF
			scrollTop = document.documentElement.scrollTop; 
		}
	}
	return scrollTop;
}

/*
* 事件代理父级判断
*/
function hasTag(o, s, endo){
	while( o != endo){
		var _s = o.nodeName.toLowerCase();
		if(_s == s){
			return o
		}else{
			o = o.parentNode
		}
	}
	return null
}

function hasClass(o, s){
    //return o.className.match(new RegExp('(\\s|^)'+ s +'(\\s|$)'));
    return ((' ' + o.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' '+ s + ' ') > -1 )
    //o.classList.contains(s)
}


/* 
* 退化处理
*/

//DOMContentLoaded，Diego Perini，License:GPL
function IEContentLoaded (fn) {
	var d = window.document, done = false, 
	init = function () {
		if (!done) {
			done = true;
			fn();
		}
	};
	// polling for no errors         
	(function () {
		try {
			// throws errors until after ondocumentready         
			d.documentElement.doScroll('left'); 
		} catch (e) {
			setTimeout(arguments.callee, 50);
			return;
		}
		// no errors, fire         
		init();
	})();
	// trying to always fire before onload         
	d.onreadystatechange = function() {
		if (d.readyState == 'complete') {
			d.onreadystatechange = null;
			init();
		}
	};
}

//querySelector
if (!document.querySelector){
	document.querySelector = function(selector){
		var head = document.documentElement.firstChild;
		var styleTag = document.createElement("STYLE");
		head.appendChild(styleTag);
		document.__qsResult = [];

		styleTag.styleSheet.cssText = selector + "{x:expression(document.__qsResult.push(this))}";
		window.scrollBy(0, 0);
		head.removeChild(styleTag);

		var result = [];
		for (var i in document.__qsResult){
			result.push(document.__qsResult[i]);
		}
		return result;
	}
}
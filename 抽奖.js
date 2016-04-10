// JavaScript Document
var data = ['iphone 5', 'Ipad', '三星笔记本', '佳能相机', '惠普打印机', '谢谢参与', '50元充值卡', '1000元购物券'];
var timer = null;
var flag = 0;
window.onload = function(){
	var play = document.getElementById('play');
	var stopp = document.getElementById('stop');
	//开始抽奖
	play.onclick = playfun;//鼠标事件
	stopp.onclick = stopfun;//鼠标事件
	document.onkeyup = function(event){
		event = event || window.event;
		if(event.keyCode == 13)
		  if(flag == 0){
		      playfun();
			  flag = 1;
		  }
		  else{
			  stopfun();
			  flag = 0;
		  }
	}
}

function playfun(){
	var play = document.getElementById('play');
	var title = document.getElementById('title');
	clearInterval(timer);
	timer = setInterval(function(){
		var random = Math.floor(Math.random()*data.length);
		title.innerHTML = data[random];
	},50);
	play.style.background = '#999';
}

function stopfun(){
	clearInterval(timer);
	var play = document.getElementById('play');
	play.style.background = '#036';
}
// JavaScript Document
window.onload = function(){
  var box = document.getElementById('box');
  var ul = box.getElementsByTagName('ul');
  ul.innerHTML += ul.innerHTML;
  var li = ul.getElementsByTagName('li');
  var img = ul.getElementsByTagName('img');
  var l = li.length;
  var len = li.length/2;
  var ico = document.getElementById('ico').getElementsByTagName('a');
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var li_w = 0;
  img[0].onload = function(){
    li_w = li[0].offsetWidth;
  }
  var timer = null;
  var now = 0;
  function auto(){
    next.onclick();
  }
  timer = setInterval(auto,3000);
  prev.onclick = function(){
    if(now>0)
	  now--;
	else{
	  now = len - 1;
	  ul.style.left = -(li_w*len) + 'px';
	}
	scroll();
  }
  next.onclick = function(){
    if(now<l-1)
	  now++;
	else{
	  now = len;
	  ul.style.left = -(li_w*(len-1))+'px';
	}
	scroll();	
  }
}
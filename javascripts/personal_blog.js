// JavaScript Documents
window.onload = function(){
  var phone = document.getElementsByClassName('phone');
  var project_name = document.getElementsByClassName('project_name');
  for(var i = 0; i<phone.length;i++){
    phone[i].onmouseover = function(){
	  this.style.opacity = '0.5';
	  this.style.color = '#ffa2ab';
	}
	phone[i].onmouseout = function(){
	  this.style.opacity = '1';
	  this.style.color = '#000';
	}
  }
  for(var j = 0; j<project_name.length;j++){
	var k = Math.floor(j/2)*2;
	if(j>k){
      project_name[j].style.background = 'white';
      $(".project_name:even>a").css({"color":"white"});//jquery
	}
	else{
	  project_name[j].style.background = 'black';
	  $(".project_name:odd>a").css({"color":"black"});//jquery
	}	
    project_name[j].onmouseover = function(){
	  this.style.opacity = '0.5';
	  this.style.color = '#ffa2ab';
	}
	project_name[j].onmouseout = function(){
	  this.style.opacity = '1';
	  this.style.color = '#000';
	}
  }
}
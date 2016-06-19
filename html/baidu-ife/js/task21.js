var input_tag;
var input_tag_array = [];
var	input_hobby_array = [];
var originalHtml,originalStyle;
//tag输入能够在检测到输入为空格，逗号等分隔符时刷新表单较为困难。用keyup事件绑定函数的做法
var tag_input = document.getElementById("tag-input");
tag_input.onkeyup = function(){
	showTag();
}

var tags = document.getElementById('tag-display');
tags.onmouseover = function(e){
	if(e.target.className == 'tags'){
		originalHtml = e.target.innerHTML;
		originalStyle = e.target.style;
		e.target.innerHTML = 'delete ' + originalHtml;
		e.target.style.width = '100px';
	}
	e.target.onclick = function(e){
		if(e.target.className == 'tags')
		for(var i=0;i<input_tag_array.length;i++){
			if(input_tag_array[i] == originalHtml)
				var index = i;	
		}
		input_tag_array.splice(index,1);
		renderQueue();
		e.stopPropagation();//消除冒泡，否则该事件会继续执行一次。
	}
}
tags.onmouseout = function(e){
	if(e.target.className == 'tags'){
		e.target.innerHTML = originalHtml;
		e.target.style = originalStyle;
	}
}

function showTag(){
	input_tag = tag_input.value;
	if(/[^0-9a-zA-Z\u4e00-\u9fa5]+/.test(input_tag)){//最后一个输入为分隔符，则刷新列表
		input_tag_array.push(input_tag.trim());//入数组
		input_tag_array = deleteSameElement(input_tag_array);
		if(input_tag_array.length>10)
			input_tag_array.splice(0,1);
		renderQueue();
	}
}

function deleteSameElement(input){
	for(var i=0;i<input.length-1;i++){
		if(input[input.length-1] == input[i]){//重复
			alert("repeated element!")
			input.splice(input_tag_array.length-1,1);
		}
	}
	return input;
}

function renderQueue(){
	var tag_display_content = document.getElementById("tag-display");
	tag_display_content.innerHTML = input_tag_array.map(function(e){
		if(e!=null)
			return '<div class="tags" style="width:' + e.length*10 + 'px;">' + e + '</div>';
	}).join('')
	tag_input.value = "";
}
var confirm_hobbies = document.getElementById("confirm-hobby");

confirm_hobbies.onclick = function(){
	input_hobby_array = document.getElementById("hobby-input").value.trim().split(/[^0-9a-zA-Z\u4e00-\u9fa5]/);
	input_hobby_array = deleteSameElement(input_hobby_array);
	if(input_hobby_array.length>10)
		input_hobby_array.splice(0,input_hobby_array.length-10);
	var hobby_display = document.getElementById("hobby-display");
	hobby_display.innerHTML = input_hobby_array.map(function(e){
		return "<div>" + e + "</div>";
	}).join('')
}

var dataQueue = [];
var sign;
function leftIn(){
	var inputValue = document.getElementById("input").value;
	if(inputValue<10||inputValue>100){
		alert("输入数字应该在10到100之间!");
		return;
	}
	for(var i=dataQueue.length;i>0;i--){
		dataQueue[i] = dataQueue[i-1];
	}
	dataQueue[0] = inputValue;
	renderQueue();
}

function rightIn(){
	var inputValue = document.getElementById("input").value;
	if(inputValue<10||inputValue>100){
		alert("输入数字应该在10到100之间!");
		return;
	}
	var i = 0;
	dataQueue[dataQueue.length] = inputValue;
	renderQueue();
}

function renderQueue(){
	var display_area = document.getElementById("display-area");
	display_area.innerHTML = "";
	if(dataQueue.length>60){
		alert("数组元素已经超过60个！");
		dataQueue.length = 60;
	}
	for(var i=0;i<dataQueue.length;i++){
		var displayBlock = '<div id="block' + i + '" class="displayBlock" style="float:left;width:30px;position:relative;top:' + (130-dataQueue[i]) + 'px;width:30px;height:' + dataQueue[i] + 'px;border:1px white solid;background:red;"></div>';
		display_area.innerHTML += displayBlock;
	}
	sign = 1;
}

function leftOut(){
	alert(dataQueue[0]+' will be deleted!');
	for(var i = 0;i<dataQueue.length-1;i++){
		dataQueue[i] = dataQueue[i+1];
	}
	dataQueue[dataQueue.length-1] = undefined;
	dataQueue.length--;
	renderQueue();
}

function rightOut(){
	alert(dataQueue[dataQueue.length-1]+'will be deleted!');
	dataQueue[dataQueue.length-1] = undefined;
	dataQueue.length--;
	renderQueue();
}

function deleteBlock(ev){
	for(var i=0;i<dataQueue.length;i++){
		var str = "block" + i;
		var index;
		if(str == ev.target.id){
			index = i;
		}
	}
	for(var i=index; i<dataQueue.length-1;i++){
		dataQueue[i] = dataQueue[i+1];
	}
	dataQueue.length--;
	renderQueue();
}

function sortBlock(){//冒泡排序
	var i=0;
	var j=0;
	var temp;
	var timer = setInterval(function(){	
	if(dataQueue[j]>dataQueue[j+1]){
		temp = dataQueue[j];
		dataQueue[j] = dataQueue[j+1];
		dataQueue[j+1] = temp;
		renderQueue();
	}
	if(j<dataQueue.length-i-1)
		j++;
	else
		if(i<dataQueue.length-1){
			i++;
			j=0;
		}
		else{
			clearInterval(timer);
			alert("排序完毕！");
		}
}		,500);
}




function init(){
	var left_in = document.getElementById("left-in");
	var left_out = document.getElementById("left-out");
	var right_in = document.getElementById("right-in");
	var right_out = document.getElementById("right-out");
	var display_area = document.getElementById("display-area");
	var sort_button = document.getElementById("sort");
	left_in.onclick= function(){
		leftIn();
	}
	right_in.onclick= function(){
		rightIn();
	}
	left_out.onclick= function(){
		leftOut();
	}
	right_out.onclick= function(){
		rightOut();
	}
	display_area.onclick = function(ev){
		deleteBlock(ev);
	}
	sort_button.onclick = function(){
		sortBlock();
	}
}
init();
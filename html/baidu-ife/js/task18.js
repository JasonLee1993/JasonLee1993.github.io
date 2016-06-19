var dataQueue = [];

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
		var displayBlock = '<div id="block' + i + '" class="displayBlock" style="color:white;font-size:15px;line-height:50px;text-align:center;float:left;width:50px;height:50px;border:1px white solid;background:red;">' + dataQueue[i] + '</div>';
		display_area.innerHTML += displayBlock;
	}
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

function init(){
	var left_in = document.getElementById("left-in");
	var left_out = document.getElementById("left-out");
	var right_in = document.getElementById("right-in");
	var right_out = document.getElementById("right-out");
	var display_area = document.getElementById("display-area");
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
}
init()
var nodeList = [];
var BFindex = 0;
var timer;
var selectOne = undefined;
var judge = [];
var container = document.getElementById("container");
var divs = container.getElementsByTagName("div");
var BFS = document.getElementById("BFS");
var DFS = document.getElementById("DFS");
var deleteButton = document.getElementById("deleteDiv");
var rootNode = document.getElementsByClassName("root")[0];
var BF = document.getElementById("BF");
var DF = document.getElementById("DF");
for(var i=0;i<divs.length;i++){	
		setSelect(i);
}

//给所有DIV绑定鼠标点击事件。
function setSelect(num){//闭包,将num作为i的副本封装进函数。否则只绑定了divs的第divs.length-1个元素
	divs[num].onclick = function(e){
	e.stopPropagation(); //阻止冒泡事件的发生。
		if(!judge[num]){
			judge[num]=1;
		}
		else{
			judge[num]=0;
		}
		clearSelect();
		if(judge[num]){
			var className;
			className = divs[num].getAttribute("class")
			className = className.concat(" selectDiv");
			divs[num].setAttribute("class",className);			
			selectOne = divs[num];
		}
		else
			selectOne = undefined;
	}
}

//在鼠标点击一个时，取消所有的选中属性设置。
function clearSelect(){
	for(var i=0;i<divs.length;i++){
		var className = divs[i].getAttribute("class");
		className = className.replace("selectDiv","");
		divs[i].setAttribute("class",className);
	}
}

//delete Node
deleteButton.onclick = function(){
	if(selectOne==undefined)
		alert("Please click one node you wanna delete!");
	else
		selectOne.parentNode.removeChild(selectOne);
}

//add Node
var add_btn = document.getElementById("addButton");
add_btn.onclick = function(e){
	e.stopPropagation();
	var inputValue = document.getElementById("addContent").value;
	if(setSelect==undefined||inputValue==""){
		alert("Please input value of this added node!");
	}
	else{
		var newDiv = document.createElement('div');
		newDiv.innerHTML = inputValue;
		newDiv.className = 'child_';
		selectOne.appendChild(newDiv);
		divs = container.getElementsByTagName("div");//重新绑定点击事件
		for(var i=0;i<divs.length;i++){	
			setSelect(i);
		}
}
}

//traverseTree
function traverseDF(node){
	if(node){
		nodeList.push(node);
		for(var i=0;i<node.children.length;i++)
			traverseDF(node.children[i]);
	}
}

function traverseBF(node){
	if(node){
		nodeList.push(node);
		traverseBF(node.nextElementSibling);
		node = nodeList[BFindex++];
		traverseBF(node.firstElementChild);
	}
}

function traverseBFTree(node){
	if(node){
		nodeList.push(node);
		BFindex++;
		traverseBF(node.firstElementChild);

	}
}

function setStyle(){
	var i=0;
	timer = setInterval(function(){
		if(i<nodeList.length)
			nodeList[i].style.background = "pink";
		else
			nodeList[i-1].style.background = "white";
		if(i>0)
			nodeList[i-1].style.background = "white";
		if(i<nodeList.length)
			i++;
		else{
			clearInterval(timer);
		}
	},500);
}

function setInitialStyle(){
	for(var i=0;i<nodeList.length;i++){
		nodeList[i].style.background = "white";
	}
}

BF.onclick = function(){
	clearInterval(timer);
	BFindex = 0;
	nodeList = [];
	traverseBFTree(rootNode);
	setInitialStyle();
	setStyle();
}

DF.onclick = function(){
	clearInterval(timer);
	nodeList = [];
	traverseDF(rootNode);
	setInitialStyle();
	setStyle();
}

BFS.onclick = function(){
	var searchValue = document.getElementById("search").value;
	clearInterval(timer);
	BFindex = 0;
	nodeList = [];
	traverseBFTree(rootNode);
	setInitialStyle();
	searchList(searchValue);
}

DFS.onclick = function(){
	var searchValue = document.getElementById("search").value;
	if(searchValue==""){
		alert("Please input a value!");
		return;
	}
	clearInterval(timer);
	BFindex = 0;
	nodeList = [];
	traverseDF(rootNode);
	setInitialStyle();
	searchList(searchValue);
}

function searchList(searchValue){
	var i=0;
	timer = setInterval(function(){
		//firstChild.nodeValue正好是不包含其子元素的文本值
		if(i==nodeList.length){
			clearInterval(timer);
			nodeList[i-1].style.background = "white";
			alert("Not Found !")
		}
		if(nodeList[i].firstChild.nodeValue.trim() == searchValue){
			nodeList[i].style.background = "red";
			nodeList[i-1].style.background = "white";
			alert("Found !");
			clearInterval(timer);
		}
		else{
			if(i>0){
				nodeList[i-1].style.background = "white";
			}
			nodeList[i].style.background = "pink";
			if(i<nodeList.length){
				i++;
			}
		}
	},500);
}
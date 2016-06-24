var nodeList = [];
var BFindex = 0;
var timer;
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

var rootNode = document.getElementsByClassName("root")[0];
var BF = document.getElementById("BF");
var DF = document.getElementById("DF");

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


var BFS = document.getElementById("BFS");
var DFS = document.getElementById("DFS");
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
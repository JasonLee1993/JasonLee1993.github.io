var preOrder = document.getElementById("DLR");
var inOrder = document.getElementById("LDR");
var postOrder = document.getElementById("LRD");
var root = document.getElementsByClassName("root")[0];
var list = [];
var timer;
/*前序遍历*/
preOrder.onclick = function(){
	clearInterval(timer);
	list = [];
	pre(root);
	setColor();
	changeColor();
}
/*中序*/
inOrder.onclick = function(){
	clearInterval(timer);
	list = [];
	inO(root);
	setColor();
	changeColor();
}
/*后序*/
postOrder.onclick = function(){
	clearInterval(timer);
	list = [];	
	post(root);
	setColor();
	changeColor();
}

function setColor(){
	for(var i=0;i<list.length;i++)
		list[i].style.background = "white";
}

function pre(node){
	if(node!==null){
		list.push(node);
		pre(node.firstElementChild);
		pre(node.lastElementChild)
	}
}
function inO(node){
	if(node!==null){
		inO(node.firstElementChild);
		list.push(node);
		inO(node.lastElementChild);
	}
}
function post(node){
	if(node!==null){
		post(node.firstElementChild);
		post(node.lastElementChild);
		list.push(node);
	}
}
function changeColor(){
	var i=0;
	timer = setInterval(function(){
		if(i<list.length){
		if(i>0)			
			list[i-1].style.background = "white";
		list[i].style.background = "pink";
		}
		else{
			list[i-1].style.background = "white";
			clearInterval(timer);
			alert("Finished!");
			list = [];
		}
		i++;
	},500);
}
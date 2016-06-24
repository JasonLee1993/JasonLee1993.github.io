var tree = document.getElementsByClassName("tree_container")[0];
var mark,select;
function setMinusandPlus(){
	var divs = tree.getElementsByTagName("div");
	for(var i=0;i<divs.length;i++){
		setSpan(i,divs);
	}
	for(var i=0;i<divs.length;i++){
		setCloseandOpen(divs,i);
	}
}

function setCloseandOpen(divs,num){
	divs[num].childNodes[0].onclick = function(e){
		e.stopPropagation();//阻止冒泡。
		if(mark)
			divs[mark].style.background = '';
		mark = undefined;
		OpenandCloseDiv(num,divs);
	}
	divs[num].onclick = function(e){
		e.stopPropagation();
		if(select)
			divs[select].style.background = '';
		select = num;
		divs[num].style.background = 'pink';
	}	
}

function setSpan(num,divs){
	var temp = divs[num].getElementsByTagName("span")[0];
	if(temp!==undefined)
		divs[num].removeChild(temp);
	var divs_innerHTML = divs[num].innerHTML;
	var spanElement;
	divs[num].innerHTML = "<span></span>"+divs_innerHTML; //在每个节点div标签中包含一个span
	spanElement = divs[num].parentNode.getElementsByTagName("span")[0];
	if(divs[num].style.display=="none"){ //该div块显示，则其父div的span设置样式为-,否则为+。	
		spanElement.style['background-image']= 'url(./images/plus.png)';
	}
	else
		spanElement.style['background-image'] = 'url(./images/minus.png)';
	//添加span同时为其绑定展开和收回事件

}

function OpenandCloseDiv(num,divs){
	var divsChilds = divs[num].childNodes;
	for(var i=0;i<divsChilds.length;i++){
		if(divsChilds[i].nodeName == 'DIV')
		OpenorClose(divsChilds[i]);
	}
	setMinusandPlus();
}

function OpenorClose(element){
	if(element.style.display == "none")
		element.style.display = "block";
	else{//其本身和所有其他子元素都问display属性none
		letDisplayNone(element);
	}
}

function letDisplayNone(element){
	var allSons = element.getElementsByTagName('div');
	element.style.display = 'none';
	for(var i=0;i<allSons.length;i++)
		allSons[i].style.display = 'none';
}

//加载源文件，加上符号
setMinusandPlus();
//查找功能
var search_btn = document.getElementsByClassName("search_btn")[0];

search_btn.onclick = function(e){
	e.stopPropagation();
	var inputValue = document.getElementsByClassName("input_")[0].value;
	divs = tree.getElementsByTagName("div");
	if(mark)
		divs[mark].style.background = 'white';
	mark = undefined;
	for(var i=0;i<divs.length;i++){
		if(searchDiv(divs,i,inputValue)){
			mark = i;
		}	
	}
	if(divs[mark].style.display=='none'){
		letDisplayBlock(divs[mark]);
	}
	divs[mark].style.background = 'orange';
}

function letDisplayBlock(divElement){//递归使其所有父元素的display属性为block
	if(divElement.parentNode.style.display=='none')
		letDisplayBlock(divElement.parentNode);
	divElement.style.display = 'block';
}

function searchDiv(divs,num,key){
	if(divs[num].firstChild.nextSibling.nodeValue==key)//该元素的text值
		return 1;
	else
		return 0;
}

//删除功能
var delete_btn = document.getElementsByClassName("delete")[0];
delete_btn.onclick = function(e){
	e.stopPropagation();
	var divs = tree.getElementsByTagName("div");
	if(select){
		divs[select].parentNode.removeChild(divs[select]);
		setMinusandPlus();
	}
	else
		alert("Please select one node!");
}
//添加功能
var add_btn = document.getElementsByClassName("add_btn")[0];
add_btn.onclick = function(){
	var inputValue = document.getElementsByClassName("input_")[0].value;
	divs = tree.getElementsByTagName("div");
	if(select){
		var newDiv = document.createElement('div');
		newDiv.innerHTML = inputValue;
		divs[select].appendChild(newDiv);
		setMinusandPlus();
	}
	else
		alert("Please select a node!");
}
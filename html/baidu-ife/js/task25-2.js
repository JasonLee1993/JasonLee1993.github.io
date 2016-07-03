// ==========================================封装TreeNode================================================
function TreeNode(obj){
	this.parent = obj.parent;
	this.childs = obj.childs || [];
	this.data = obj.data || "";
	this.selfElement = obj.selfElement;
	this.selfElement.TreeNode = this;
}
// 原型模式封装公共操作
TreeNode.prototype = {
	constructor:TreeNode,
	render:function(arrow,visibility,toHighlight,deHighlight){
		if(arguments.length < 3){
			toHighlight = false;//默认为false
			deHighlight = false;
		}
		if(arrow){
			if(this.isLeaf()) //叶子结点
				this.selfElement.getElementsByClassName("arrow")[0].className = "arrow empty-arrow";
			else if (this.isFolded()) //折叠状态
				this.selfElement.getElementsByClassName("arrow")[0].className = "arrow right-arrow";
			else
				this.selfElement.getElementsByClassName("arrow")[0].className = "arrow down-arrow";
		}
		if(visibility){
			if(this.selfElement.className.indexOf("nodebody-visible") == -1)
				this.selfElement.className = this.selfElement.className.replace("hidden","visible");
			else
				this.selfElement.className = this.selfElement.className.replace("visible","hidden");
		}
		if(toHighlight){
			this.selfElement.getElementsByClassName("node-title")[0].className = "node-title node-title-highlight";
		}
		else
			this.selfElement.getElementsByClassName("node-title")[0].className = "node-title";
	},
	//删除节点
	deleteNode:function(){
		var i;
		if(!this.isLeaf()){
			for(i=0;i<this.childs.length;i++)
				this.childs[i].deleteNode();
		}
		this.parent.selfElement.removeChild(this.selfElement);
		this.parent.render(true,false);
	},
	//增加节点
	addChild:function(text){
		if(text == null) return this;
		if(text.trim() == ""){
			alert("节点内容不能为空！");
			return this;
		}
		if(!this.isLeaf()&&this.isFolded()){
			this.toggleFold();
		}
		var newNode = document.createELment("div");
		newNode.className = "nodebody-visible";
		var newHeader = document.createELment("label");
		newHeader.className = "node-header";
		var newSymbol = document.createElement("div");
		newSymbol.className = "arrow empty-arrow";
		var newTitle = document.createElement("span");
		newTitle.className = "node-title";
		newTitle.innerHTML = text;
		var space = document.createElement("span");
		space.innerHTML = "&nbsp;&nbsp;";
		var newDelete = document.createElement("img");
        newDelete.className = "deleteIcon";
        newDelete.src = "images/delete.png";
        var newAdd = document.createElement("img");
        newAdd.className = "addIcon";
        newAdd.src = "images/add.png";
        newHeader.appendChild(newSymbol);
        newHeader.appendChild(newTitle);
        newHeader.appendChild(space);
        newHeader.appendChild(newAdd);
        newHeader.appendChild(newDelete);
        newNode.appendChild(newHeader);
        this.selfElement.appendChild(newNode);
        this.childs.push(new TreeNode({parent:this,childs:[],data:text,selfElement:newNode}));
        this.render(true,false);
        return this;
	},
	//展开，收拢
	toggleFold:function(){
		if(this.isLeaf()) return this;
		for(var i=0;i<this.childs.length;i++)
			this.childs[i].render(false,true);
		this.render(true,false);
		return this;
	},
	//判断是否为叶子结点
	isLeaf:function(){
		return this.childs.length == 0;
	}
	//判断是否折叠
	isFolded:function(){
		if(this.isLeaf()) return false;
		if(this.childs[0].selfElement.className == "nodebody-visible") return false;
		return true;
	}
};
//=======================================以上是封装TreeNode的代码=============================================
//=============================================事件绑定区====================================================
var root = new TreeNode({parent:null,childs:[],data:"前端工程师",selfElement:document.getElementsByClassName("nodebody-visible")[0]})
addEvent(root.selfElement,"click",function(e){
	var target = e.target || e.srcElement;
	var domNode = target;
	while(domNode.className.indexOf("nodebody") == -1) domNode = domNode.parentNode;
	selectedNode = domNode.TreeNode;
	if(target.className.indexOf("node-title") != -1||target.className.indexOf("arrow")!=-1){
		selectedNode.toggleFold();
	}
	else if(target.className == "addIcon")
		selectedNode.addChild(prompt("请输入子节点的内容：！"));
	else if(target.className == "deleteIcon")
		selectedNode.deleteNode();
});
root.search = function(query){
	var resultList = [];
	var queue = [];
	var current = this;
	queue.push(current);
	while(queue.length>0){
		current = queue.shift();
		current.render(false,false,false,true);
		if(current.data == query) resultList.push(current);
		for(var i=0;i<current.childs.length;i++)
			queue.push(current.childs[i]);
	}
	return resultList;
}

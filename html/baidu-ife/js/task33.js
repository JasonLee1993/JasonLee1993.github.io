//table对象
var table = {
	//目标坐标
	position: [0, 0],
	//上次位置坐标
	targetOld: [0, 0],
	//目标方向
	direction: 2, //向右
	//渲染表格
	renderTable: function() {
		var tables = document.getElementById("right"); //获取棋盘区域。
		//获取目标格子
		var oldRow = tables.getElementsByTagName("tr")[this.targetOld[0]]; //上次保留的
		var old = oldRow.getElementsByTagName("td")[this.targetOld[1]];
		oldSpan = old.getElementsByTagName("span")[0];
		if (oldSpan) {
			old.removeChild(oldSpan);
		}
		var targetRow = tables.getElementsByTagName("tr")[this.position[0]];
		var target = targetRow.getElementsByTagName("td")[this.position[1]];
		if (old) {
			old.className = "";
		} //去除类名
		target.className = "blocks"; //添加类名
		var spanElement = document.createElement("span"); //创建span标签
		target.appendChild(spanElement); //添加在该元素内
		var spanElement = target.getElementsByTagName("span")[0];
		//设置方向
		switch (this.direction) {
			case 0:
				{ //上
					spanElement.className = "";
					spanElement.style.top = 0;
					break;
				}
			case 2:
				{ //下
					spanElement.className = "";
					spanElement.style.bottom = 0;
					break;
				}
			case 1:
				{ //左
					spanElement.className = "vertical";
					spanElement.style.left = 0;
					break;
				}
			case 3:
				{ //右
					spanElement.className = "vertical";
					spanElement.style.right = 0;
					break;
				}
		}
		this.targetOld = this.position;
	},
	//运动
	go: function() {
		if (this.direction == 0) {
			this.position = [this.position[0] - 1, this.position[1]];
		} else if (this.direction == 1) {
			this.position = [this.position[0], this.position[1] - 1];
		} else if (this.direction == 2) {
			this.position = [this.position[0] + 1, this.position[1]];
		} else if (this.direction == 3) {
			this.position = [this.position[0], this.position[1] + 1];
		}
		if (this.position[0] < 0) {
			this.position[0] = 0;
			alert("Border of the table!");
			return;
		}
		if (this.position[1] < 0) {
			this.position[1] = 0;
			alert("Border of the table!");
			return;
		}
		if (this.position[0] > 10) {
			this.position[0] = 10;
			alert("Border of the table!");
			return;
		}
		if (this.position[1] > 10) {
			this.position[1] = 10;
			alert("Border of the table!");
			return;
		}
	},
	//旋转
	left: function() {
		this.direction++;
		if (this.direction > 3) {
			this.direction = 0;
		}
	},
	right: function() {
		this.direction--;
		if (this.direction < 0) {
			this.direction = 3;
		}
	},
	back: function() {
		this.left();
		this.left();
	},
	//绑定点击事件函数
	judgeAndMove: function() {

		var input = document.getElementsByTagName("input")[0];
		var inputValue = input.value;
		switch (inputValue) {
			case "GO":
				{
					table.go();
					break;
				}
			case "TUN LEF":
				{
					table.left();
					break;
				}
			case "TUN RIG":
				{
					table.right();
					break;
				}
			case "TUN BAC":
				{
					table.back();
					break;
				}
			default:
				{
					alert("please input the right words!");
					break;
				}
		}
		this.renderTable();
	}
}

//绑定按钮
var button = document.getElementsByTagName("button")[0];
button.onclick = function() {
	table.judgeAndMove();
}
table.renderTable();
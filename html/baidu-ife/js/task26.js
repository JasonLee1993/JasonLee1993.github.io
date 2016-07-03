//绑定按钮
var buttons = document.getElementsByTagName("button");
for (var i = 0; i < buttons.length; i++) {
	buttons[i].onclick = function(e) {
		var orbitNum = this.parentNode.id - 0; //转化为数字。
		var messageName = this.className;
		Commander.sendMessage(orbitNum, messageName);
	}
}

//指挥官对象
var Commander = {
		sendMessage: function(orbit, message) {
			//延迟1秒钟发送
			setTimeout(function() {
				//模拟丢包率0.3
				var random = Math.random();
				if (random < 0.3) {
					log.sendData("丢包！");
					return;
				} else {
					log.sendData("成功！");
					SpaceShipStation.processMessage(orbit, message);
				}
			}, 1000);
		}
	}
	//空间站对象
var SpaceShipStation = {
	flyInterval: [],
	energyInterval: [],
	shipList: [{
		status: "not exist", //轨道状态
		energy: 0, //飞船能量
		rate: 0, //飞船速度
		angle: 0 //飞船角度
	}, {
		status: "not exist",
		energy: 0,
		rate: 0,
		angle: 0
	}, {
		status: "not exist",
		energy: 0,
		rate: 0,
		angle: 0
	}, {
		status: "not exist",
		energy: 0,
		rate: 0,
		angle: 0
	}],
	processMessage: function(orbit, message) {
		switch (message) {
			case 'create':
				this.createSpaceShip(orbit);
				break;
			case 'fly':
				this.flySpaceShip(orbit);
				break;
			case 'stop':
				this.stopSpaceShip(orbit);
				break;
			case 'destroy':
				this.destroySpaceShip(orbit);
				break;
		}
	},
	createSpaceShip: function(orbit) {
		var ShipMod = document.createElement('DIV');
		var orbitNum = "orbit" + orbit;
		var shipObject = "ship" + orbit;
		if (this.shipList[orbit - 1].status == "exist") {
			alert("该轨道存在飞船！请先摧毁飞船！");
			return;
		} else {
			//创建飞船实体HTML
			var shipContainer = document.getElementsByClassName(orbitNum)[0];
			ShipMod.className = "spaceShip" + orbit + " spaceShip";
			ShipMod.innerHTML = "100%";
			shipContainer.appendChild(ShipMod);
			//初始化飞船能量和轨道状态
			this.shipList[orbit - 1] = {
				status: "exist",
				energy: 100,
				rate: 36 / 50,
				angle: 0
			}
			this.energyInterval[orbit] = setInterval(function() {
				SpaceShip.solarEnergy(orbit);
				SpaceShip.render(orbit);
			}, 30);
		}
	},
	flySpaceShip: function(orbit) {
		if (this.shipList[orbit - 1].status == "not exist") {
			alert("请先创建飞船！");
			return;
		} else {
			//开始飞行，每20ms更新一次位置
			this.flyInterval[orbit] = setInterval(function() {
				SpaceShip.updateLocation(orbit);
			}, 20);
		}
	},
	stopSpaceShip: function(orbit) {
		clearInterval(this.flyInterval[orbit]);
	},
	destroySpaceShip: function(orbit) {
		if (this.shipList[orbit - 1].status == "not exist") {
			alert("本就不存在飞船，请先创建飞船！");
			return;
		} else {
			var ShipMod = document.getElementsByClassName("spaceShip" + orbit)[0];
			clearInterval(this.flyInterval[orbit]);
			clearInterval(this.energyInterval[orbit]);
			this.shipList[orbit - 1].status == "not exist";
			ShipMod.parentNode.removeChild(ShipMod);
			this.shipList[orbit - 1] = {
				status: "not exist",
				energy: 0,
				rate: 0,
				angle: 0
			}
		}
	}
}

var SpaceShip = {
	updateLocation: function(orbit) {
		//获取飞船实体
		var ShipMod = document.getElementsByClassName("spaceShip" + orbit)[0];
		var status = SpaceShipStation.shipList[orbit - 1].status;
		var energy1 = SpaceShipStation.shipList[orbit - 1].energy;
		var rate1 = SpaceShipStation.shipList[orbit - 1].rate;
		var angle1 = SpaceShipStation.shipList[orbit - 1].angle;
		angle1 = (angle1 + rate1) % 360;
		energy1 = energy1 - 0.2;
		if (energy1 < 0) {
			angle1 = (angle1 + rate1 * ((0.2 + energy1) / 0.2)) % 360;
			energy1 = 0;
		}
		ShipMod.style.transform = "rotate(" + angle1 + "deg)";
		if (energy1 > 0) {
			SpaceShipStation.shipList[orbit - 1] = {
				status: "exist",
				energy: energy1,
				rate: rate1,
				angle: angle1
			}
		} else {
			SpaceShipStation.stopSpaceShip(orbit);
		}
	},
	//太阳能增加能量
	solarEnergy: function(orbit) {
		var energy1 = SpaceShipStation.shipList[orbit - 1].energy;
		if(energy1>100){
			energy1=100;
		}
		SpaceShipStation.shipList[orbit-1].energy = energy1+0.05;
	},
	render: function(orbit) {
		var ShipMod = document.getElementsByClassName("spaceShip" + orbit)[0];
		var energy1 = SpaceShipStation.shipList[orbit - 1].energy;
		ShipMod.innerHTML = parseInt(energy1) + "%";
	}
}
var log = {
	sendData:function(data){
		var time = new Date();
		time = time.toLocaleString();
		var logArea = document.getElementById("log");
		logArea.innerHTML+="<div>" + data + "--------" + time + "<div>";
	}
}
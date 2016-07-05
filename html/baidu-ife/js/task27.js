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
		radios: [],
		sendMessage: function(orbit, message) {
			var pick = document.querySelectorAll("#pickSystem")[0];
			var radiosInput = pick.getElementsByTagName("input");
			this.radios = [];
			for (var i = 0; i < radiosInput.length; i++) {
				if (radiosInput[i].checked) {
					if (radiosInput[i].name == "consumeEnergy") {
						switch (radiosInput[i].value) {
							case "low":
								this.radios.push(30, 5);
								break;
							case "medium":
								this.radios.push(50, 7);
								break;
							case "hith":
								this.radios.push(80, 9);
								break;
						}
					}
					if (radiosInput[i].name == "addEnergy") {
						switch (radiosInput[i].value) {
							case "low":
								this.radios.push(2);
								break;
							case "medium":
								this.radios.push(3);
								break;
							case "high":
								this.radios.push(4);
								break;
						}
					}
				}
			}
			if (this.radios.length != 3) {
				alert("请选择飞船型号！");
				return;
			}
			this.bus(this.Adapter(orbit, message));
		},
		//commander端配置器
		Adapter: function(orbit, message) {
			var binaryNum = "";
			switch (orbit) {
				case 1:
					binaryNum += "00";
					break;
				case 2:
					binaryNum += "01";
					break;
				case 3:
					binaryNum += "10";
					break;
				case 4:
					binaryNum += "11";
					break;
			}
			switch (message) {
				case "create":
					binaryNum += "00";
					break;
				case "fly":
					binaryNum += "01";
					break;
				case "stop":
					binaryNum += "10";
					break;
				case "destroy":
					binaryNum += "11";
					break;
			}
			return binaryNum;
		},
	//延迟1秒钟发送
	bus: function(binaryMessage) {
		setTimeout(function() {
			//模拟丢包率0.1
			var random = Math.random();
			if (random < 0.1) { //概率减少
				log.sendData("丢包！");
				Commander.bus(binaryMessage); //重试
			} else {
				log.sendData("成功！");
				SpaceShipStation.processMessage(binaryMessage);
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
		angle: 0, //飞船角度
		consumed: 0,
		added: 0
	}, {
		status: "not exist",
		energy: 0,
		rate: 0,
		angle: 0,
		consumed: 0,
		added: 0
	}, {
		status: "not exist",
		energy: 0,
		rate: 0,
		angle: 0,
		consumed: 0,
		added: 0
	}, {
		status: "not exist",
		energy: 0,
		rate: 0,
		angle: 0,
		consumed: 0,
		added: 0
	}],
	//空间站端解配器
	Adapter: function(binaryMessage) {
		var firstPart = binaryMessage.slice(0, 2);
		var secondPart = binaryMessage.slice(2);
		var message = [];
		switch (firstPart) {
			case "00":
				message.push(1);
				break;
			case "01":
				message.push(2);
				break;
			case "10":
				message.push(3);
				break;
			case "11":
				message.push(4);
				break;
		}
		switch (secondPart) {
			case "00":
				message.push("create");
				break;
			case "01":
				message.push("fly");
				break;
			case "10":
				message.push("stop");
				break;
			case "11":
				message.push("destroy");
				break;
		}
		return message;
	},
	processMessage: function(binaryMessage) {
		var message = this.Adapter(binaryMessage);
		var orbit = message[0];
		switch (message[1]) {
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
				rate: Commander.radios[0] / 50,
				angle: 0,
				consumed: Commander.radios[1],
				added: Commander.radios[2]
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
				angle: 0,
				consumed: 0,
				added: 0
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
		var consumed1 = SpaceShipStation.shipList[orbit - 1].consumed;
		var added1 = SpaceShipStation.shipList[orbit - 1].added;
		angle1 = (angle1 + rate1) % 360;
		energy1 = energy1 - consumed1 / 50; //消耗能源
		if (energy1 < 0) {
			angle1 = (angle1 + rate1 * ((consumed1 / 50 + energy1) / (consumed1 / 50))) % 360;
			energy1 = 0;
		}
		ShipMod.style.transform = "rotate(" + angle1 + "deg)";
		if (energy1 > 0) {
			SpaceShipStation.shipList[orbit - 1] = {
				status: "exist",
				energy: energy1,
				rate: rate1,
				angle: angle1,
				consumed: consumed1,
				added: added1
			}
		} else {
			SpaceShipStation.stopSpaceShip(orbit);
		}
	},
	//太阳能增加能量
	solarEnergy: function(orbit) {
		var energy1 = SpaceShipStation.shipList[orbit - 1].energy;
		var added1 = SpaceShipStation.shipList[orbit - 1].added;
		if (energy1 > 100) {
			energy1 = 100;
		}
		SpaceShipStation.shipList[orbit - 1].energy = energy1 + added1 / 50;
	},
	render: function(orbit) {
		var ShipMod = document.getElementsByClassName("spaceShip" + orbit)[0];
		var energy1 = SpaceShipStation.shipList[orbit - 1].energy;
		ShipMod.innerHTML = parseInt(energy1) + "%";
	}
}
var log = {
	sendData: function(data) {
		var time = new Date();
		time = time.toLocaleString();
		var logArea = document.getElementById("log").getElementsByTagName("div")[0];
		logArea.innerHTML = "<div>" + data + "--------" + time + "<div>" + logArea.innerHTML;
	}
}
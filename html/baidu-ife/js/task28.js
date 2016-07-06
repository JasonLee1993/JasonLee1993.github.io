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
		},
		receiver: function(binaryMessage) {
			var processedMessage = DC.adapter(binaryMessage);
			Screen.display(processedMessage);
		},
	}
	//DC
var DC = {
		adapter: function(binaryMessage) {
			var returnMessage = [];
			var firstPart = binaryMessage.slice(0, 2);
			var secondPart = binaryMessage.slice(2, 4);
			var thirdPart = binaryMessage.slice(4, 6);
			var fourthPart = binaryMessage.slice(6, 8);
			var lastPart = binaryMessage.slice(8);
			switch (firstPart) {
				case "00":
					returnMessage.push(1);
					break;
				case "01":
					returnMessage.push(2);
					break;
				case "10":
					returnMessage.push(3);
					break;
				case "11":
					returnMessage.push(4);
					break;
			}
			switch (secondPart) {
				case "00":
					returnMessage.push("前进号");
					break;
				case "01":
					returnMessage.push("奔腾号");
					break;
				case "10":
					returnMessage.push("超越号");
					break;
				case "11":
					returnMessage.push("");
					break;
			}
			switch (thirdPart) {
				case "00":
					returnMessage.push("劲量型");
					break;
				case "01":
					returnMessage.push("光能型");
					break;
				case "10":
					returnMessage.push("永久型");
					break;
				case "11":
					returnMessage.push("");
					break;
			}
			switch (fourthPart) {
				case "00":
					returnMessage.push("已销毁");
					break;
				case "01":
					returnMessage.push("停止");
					break;
				case "10":
					returnMessage.push("飞行中");
					break;
			}
			returnMessage.push(parseInt(lastPart, 2));
			return returnMessage;
		}
	}
	//大屏幕
var Screen = {
		shipList: [],
		display: function(message) {
			this.shipList[message[0] - 1] = {
				orbitNum: "飞船"+message[0],
				powerSystem: message[1],
				energySystem: message[2],
				status: message[3],
				energyLeft: message[4]
			};
			var index = message[0] - 1;
			var screen1 = document.getElementsByClassName("screen")[0];
			var screen2 = document.getElementsByClassName("screen")[1];
			var trs = screen1.getElementsByTagName("tr");
			if (this.shipList[index].status == "已销毁") {
				trs[index].innerHTML = "<td>" + this.shipList[index].orbitNum + this.shipList[index].status + "</td>";
			} else {
				trs[index].innerHTML = "<td>" + this.shipList[index].orbitNum + "</td>" + "<td>" + this.shipList[index].powerSystem + "</td>" + "<td>" + this.shipList[index].energySystem + "</td>" + "<td>" + this.shipList[index].status + "</td>" + "<td>" + this.shipList[index].energyLeft + "</td>";
			}
		}
	}
	//空间站对象
var SpaceShipStation = {
	flyInterval: [],
	energyInterval: [],
	statusInterval: [],
	shipList: [{
		status: "not exist", //轨道状态
		energy: 0, //飞船能量
		rate: 0, //飞船速度
		angle: 0, //飞船角度
		consumed: 0,
		added: 0,
		energySystem: "",
		powerSystem: "",
		flystatus: ""
	}, {
		status: "not exist",
		energy: 0,
		rate: 0,
		angle: 0,
		consumed: 0,
		added: 0,
		energySystem: "",
		powerSystem: "",
		flystatus: ""
	}, {
		status: "not exist",
		energy: 0,
		rate: 0,
		angle: 0,
		consumed: 0,
		added: 0,
		energySystem: "",
		powerSystem: "",
		flystatus: ""
	}, {
		status: "not exist",
		energy: 0,
		rate: 0,
		angle: 0,
		consumed: 0,
		added: 0,
		energySystem: "",
		powerSystem: "",
		flystatus: ""
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
			this.shipList[orbit - 1].status = "exist";
			this.shipList[orbit - 1].energy = 100;
			this.shipList[orbit - 1].rate = Commander.radios[0] / 50;
			this.shipList[orbit - 1].consumed = Commander.radios[1];
			this.shipList[orbit - 1].added = Commander.radios[2];
			var consuming = this.shipList[orbit - 1].consumed;
			var adding = this.shipList[orbit - 1].added;
			switch (consuming) {
				case 5:
					this.shipList[orbit - 1].powerSystem = "前进号";
					break;
				case 7:
					this.shipList[orbit - 1].powerSystem = "奔腾号";
					break;
				case 9:
					this.shipList[orbit - 1].powerSystem = "超越号";
					break;
			}
			switch (adding) {
				case 2:
					this.shipList[orbit - 1].energySystem = "劲量型";
					break;
				case 3:
					this.shipList[orbit - 1].energySystem = "光能型";
					break;
				case 4:
					this.shipList[orbit - 1].energySystem = "永久型";
					break;
			}
			this.shipList[orbit - 1].flystatus = "not flying";
			this.energyInterval[orbit] = setInterval(function() {
				SpaceShip.solarEnergy(orbit);
				SpaceShip.render(orbit);
			}, 30);
			//自创建开始，就要飞船实时返回状态
			this.statusInterval[orbit] = setInterval(function() {
				SpaceShip.broadCast(orbit);
			}, 1000);
		}
	},
	flySpaceShip: function(orbit) {
		if (this.shipList[orbit - 1].status == "not exist") {
			alert("请先创建飞船！");
			return;
		} else {
			//开始飞行，每20ms更新一次位置
			this.flyInterval[orbit] = setInterval(function() {
				SpaceShipStation.shipList[orbit - 1].status = "flying";
				SpaceShip.updateLocation(orbit);
			}, 20);
		}
	},
	stopSpaceShip: function(orbit) {
		clearInterval(this.flyInterval[orbit]);
		this.shipList[orbit - 1].status = "exist";
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
			this.shipList[orbit - 1].status = "not exist";
			this.shipList[orbit - 1].powerSystem = "";
			this.shipList[orbit - 1].energySystem = "";
			SpaceShip.broadCast(orbit);
			clearInterval(this.statusInterval[orbit]);
		}
	}
}

var SpaceShip = {
	updateLocation: function(orbit) {
		//获取飞船实体
		var ShipMod = document.getElementsByClassName("spaceShip" + orbit)[0];
		var energy1 = SpaceShipStation.shipList[orbit - 1].energy;
		var rate1 = SpaceShipStation.shipList[orbit - 1].rate;
		var angle1 = SpaceShipStation.shipList[orbit - 1].angle;
		var consumed1 = SpaceShipStation.shipList[orbit - 1].consumed;
		angle1 = (angle1 + rate1) % 360;
		energy1 = energy1 - consumed1 / 50; //消耗能源
		if (energy1 < 0) {
			angle1 = (angle1 + rate1 * ((consumed1 / 50 + energy1) / (consumed1 / 50))) % 360;
			energy1 = 0;
		}
		ShipMod.style.transform = "rotate(" + angle1 + "deg)";
		if (energy1 > 0) {
			SpaceShipStation.shipList[orbit - 1].energy = energy1;
			SpaceShipStation.shipList[orbit - 1].angle = angle1;
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
	},
	selfStatus: function(orbit) {
		var energy1 = parseInt(SpaceShipStation.shipList[orbit - 1].energy);
		var orbit1 = orbit;
		var status1 = SpaceShipStation.shipList[orbit - 1].status;
		var energySystem1 = SpaceShipStation.shipList[orbit - 1].energySystem;
		var powerSystem1 = SpaceShipStation.shipList[orbit - 1].powerSystem;
		var status = [];
		status.push(orbit1, powerSystem1, energySystem1, status1, energy1);
		return status;
	},
	adapter: function(message) {
		var messageReturn = "";
		switch (message[0]) {
			case 1:
				messageReturn += "00";
				break;
			case 2:
				messageReturn += "01";
				break;
			case 3:
				messageReturn += "10";
				break;
			case 4:
				messageReturn += "11";
				break;
		}
		switch (message[1]) {
			case "前进号":
				messageReturn += "00";
				break;
			case "奔腾号":
				messageReturn += "01";
				break;
			case "超越号":
				messageReturn += "10";
				break;
				//考虑空的情况
			case "":
				messageReturn += "11";
				break;
		}
		switch (message[2]) {
			case "劲量型":
				messageReturn += "00";
				break;
			case "光能型":
				messageReturn += "01";
				break;
			case "永久型":
				messageReturn += "10";
				break;
			case "":
				messageReturn += "11";
				break;
		}
		switch (message[3]) {
			case "not exist":
				messageReturn += "00";
				break;
			case "exist":
				messageReturn += "01";
				break;
			case "flying":
				messageReturn += "10";
				break;
		}
		messageReturn += message[4].toString(2);
		return messageReturn;
	},
	broadCast: function(orbit) {
		var initialMessages = this.selfStatus(orbit);
		var adaptedMessages = this.adapter(initialMessages);
		Commander.receiver(adaptedMessages);
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
/**
 * 获取时间
 */
function getTime() {
    var date = new Date();
    var year = ("0000" + date.getFullYear()).substr(-4);
    var month = ("00" + (date.getMonth() + 1)).substr(-2);
    var day = ("00" + date.getDay()).substr(-2);
    var hour = ("00" + date.getHours()).substr(-2);
    var minute = ("00" + date.getMinutes()).substr(-2);
    var second = ("00" + date.getSeconds()).substr(-2);
    var millisecond = ("000" + date.getMilliseconds()).substr(-3);
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "." + millisecond;
}
/**
 * 控制台输出
 * @param message 消息
 * @param colour 颜色
 */
var consoleText = document.getElementById("console-text");
function log(message, colour) {
    var date = new Date();
    var p = document.createElement("p");
    p.innerHTML = getTime() + " ";
    var span = document.createElement("span");
    span.innerHTML = message;
    span.style.color = colour;
    p.appendChild(span);
    consoleText.appendChild(p);
    console.log("%c" + message, "background-color:" + colour);
    consoleText.scrollTop = consoleText.scrollHeight;
}
/**
 * 操作面板拖动
 */
(function() {
    //获取对象元素
    var control = document.getElementById("control");
    var title = document.getElementById("control-title");
    //初始位置
    control.style.left = 0;
    control.style.top = 0;
    var draggingControl = false;
    var start = [0, 0];
    var position = [
        control.style.left.substr(0, control.style.left.length - 2) - 0,
        control.style.top.substr(0, control.style.top.length - 2) - 0
    ];
    //绑定事件
    title.addEventListener("mousedown", function(e) {  //鼠标按下事件
        start[0] = e.clientX - position[0];
        start[1] = e.clientY - position[1];
        draggingControl = true;
    });
    addEventListener("mouseup", function() {  //鼠标抬起事件
        draggingControl = false;
    });
    addEventListener("mousemove", function(e) {  //鼠标移动事件
        if(draggingControl) {
            position[0] = e.clientX - start[0];
            position[1] = e.clientY - start[1];
            if(position[0] > window.innerWidth - control.offsetWidth) {
                position[0] = window.innerWidth - control.offsetWidth;
            }
            if(position[0] < 0) {
                position[0] = 0;
            }
            if(position[1] > window.innerHeight - control.offsetHeight) {
                position[1] = window.innerHeight - control.offsetHeight;
            }
            if(position[1] < 0) {
                position[1] = 0;
            }
            control.style.left = position[0] + "px";
            control.style.top = position[1] + "px";
        }
    });
})();
/**
 * 控制台拖动
 */
(function() {
    //获取对象元素
    var consoleDiv = document.getElementById("console");
    var title = document.getElementById("console-title");
    //初始位置
    consoleDiv.style.left = (window.innerWidth - consoleDiv.offsetWidth) + "px";
    consoleDiv.style.top = (window.innerHeight - consoleDiv.offsetHeight) + "px";
    var draggingControl = false;
    var start = [0, 0];
    var position = [
        consoleDiv.style.left.substr(0, consoleDiv.style.left.length - 2) - 0,
        consoleDiv.style.top.substr(0, consoleDiv.style.top.length - 2) - 0
    ];
    //绑定事件
    title.addEventListener("mousedown", function(e) {  //鼠标按下事件
        start[0] = e.clientX - position[0];
        start[1] = e.clientY - position[1];
        draggingControl = true;
    });
    addEventListener("mouseup", function() {  //鼠标抬起事件
        draggingControl = false;
    });
    addEventListener("mousemove", function(e) {  //鼠标移动事件
        if(draggingControl) {
            position[0] = e.clientX - start[0];
            position[1] = e.clientY - start[1];
            if(position[0] > window.innerWidth - consoleDiv.offsetWidth) {
                position[0] = window.innerWidth - consoleDiv.offsetWidth;
            }
            if(position[0] < 0) {
                position[0] = 0;
            }
            if(position[1] > window.innerHeight - consoleDiv.offsetHeight) {
                position[1] = window.innerHeight - consoleDiv.offsetHeight;
            }
            if(position[1] < 0) {
                position[1] = 0;
            }
            consoleDiv.style.left = position[0] + "px";
            consoleDiv.style.top = position[1] + "px";
        }
    });
})();
(function() {
    //按钮事件
    var buttonClick = function() {
        var orbit = this.parentNode.dataset.id - 0;
        var message = this.dataset.type;
        switch(message) {
            case 'create':
                if(this.dataset.status == 'create') {
                    commander.createSpaceShip(orbit);
                    this.dataset.status = 'created';
                    this.innerHTML = '自爆销毁';
                    this.nextElementSibling.disabled = false;
                    this.nextElementSibling.nextElementSibling.disabled = false;
                    this.nextElementSibling.nextElementSibling.nextElementSibling.disabled = false;
                } else {
                    commander.destroy(orbit);
                    this.dataset.status = 'create';
                    this.innerHTML = '创建飞船';
                    this.nextElementSibling.disabled = true;
                    this.nextElementSibling.dataset.status = 'start';
                    this.nextElementSibling.innerHTML = '飞行';
                    this.nextElementSibling.nextElementSibling.disabled = true;
                    this.nextElementSibling.nextElementSibling.value = 1;
                    this.nextElementSibling.nextElementSibling.nextElementSibling.disabled = true;
                }
                break;
            case 'drive':
                if(this.dataset.status == 'start') {
                    commander.start(orbit);
                    this.dataset.status = 'stop';
                    this.innerHTML = '停止';
                } else {
                    commander.stop(orbit);
                    this.dataset.status = 'start';
                    this.innerHTML = '飞行';
                }
                break;
            case 'rate':
                var value = this.previousElementSibling.value - 0;
                commander.setRate(orbit, value);
                break;
        }
    };
    //绑定按钮事件
    var buttons = document.getElementsByTagName("button");
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", buttonClick);
    }
})();
/**
 * Created by Liming on 2016/3/21.
 */
/**
 * 常量：停止状态
 * @type {number}
 */
var STOP = 0;
/**
 * 常量：飞行状态
 * @type {number}
 */
var START = 1;

/**
 * 飞船类
 * @param {number} orbit 所在轨道
 */
function SpaceShip(orbit) {
    var obj = {
        //所在轨道
        _orbit: orbit,
        //动力系统
        drive: {
            //飞行
            start: function() {
                if(obj.__energy > 0) {
                    obj.__status = START;
                }
            },
            //停止飞行
            stop: function() {
                obj.__status = STOP;
            },
            //由宇宙管理员操作的飞行功能
            _fly: function() {
                if(obj.__status == START) {
                    obj._angle += obj.__rate;
                }
                obj._angle = obj._angle % 360;
            }
        },
        //能源系统
        energy: {
            /**
             * 添加能源
             * @param num 添加量
             */
            add: function(num) {
                obj.__energy += num;
                if(obj.__energy > 100) {
                    obj.__energy = 100;
                }
            },
            consume: function(num) {
                if(obj.__status == START) {
                    obj.__energy -= num;
                }
                if(obj.__energy <= 0) {
                    obj.__status = STOP;
                    obj.__energy = 0;
                }
            },
            //取当前能源值
            get: function() {
                return obj.__energy;
            }
        },
        //信号系统
        telegraph: {
            /**
             * 向飞船发送信号
             * @param message 信号内容
             */
            sendMessage: function(message) {
                //检查消息是否是发给自己的
                if(message.id != obj._orbit) {
                    return;
                }
                //执行命令
                switch(message.command) {
                    //开始飞行
                    case 'start':
                        obj.drive.start();
                        break;
                    //停止飞行
                    case 'stop':
                        obj.drive.stop();
                        break;
                    //自爆
                    case 'destroy':
                        obj.destroy.destroy();
                        break;
                    case 'rate':
                        obj.__rate = message.value;
                        break;
                }
            }
        },
        //自爆系统
        destroy: {
            //立即销毁自身
            destroy: function() {
                obj._destroyed = true;
            }
        },
        //当前状态
        __status: STOP,
        //当前能源
        __energy: 100,
        //已经销毁
        _destroyed: false,
        //速度
        __rate: 1,
        //所在位置（旋转角度)
        _angle: 0
    };
    return obj;
}
/**
 * 宇宙管理员（上帝）
 */
var spaceManager = {
    // 宇宙管理员（上帝）的记事本
    notebook: {
        //飞船列表
        spaceShipList: [],
        //飞船飞行管理ID
        spaceShipFlyManager: 0,
        //太阳能管理ID
        solarManager: 0
    },
    /**
     * 创建宇宙飞船
     * @param orbitId 轨道ID
     */
    createSpaceShip: function(orbitId) {
        //创建飞船对象并保存到数组
        var shipId = this.notebook.spaceShipList.push(new SpaceShip(orbitId));
        //创建飞船主体div
        var spaceshipDiv = document.createElement("div");
        spaceshipDiv.id = "spaceship" + shipId;
        spaceshipDiv.className = "space-ship orbit-ship" + orbitId;
        //创建能量条div
        var energyDiv = document.createElement("div");
        energyDiv.className = "energy";
        spaceshipDiv.appendChild(energyDiv);
        //创建能量文本div
        var textDiv = document.createElement("div");
        textDiv.className = "text";
        textDiv.innerHTML = "100%";
        spaceshipDiv.appendChild(textDiv);
        //将飞船显示到页面上
        document.body.appendChild(spaceshipDiv);
    },
    //无线电，向宇宙中的飞船广播消息
    Mediator: {
        /**
         * 发送消息
         * @param message 消息
         */
        sendMessage: function(message) {
            //1秒后发送消息
            setTimeout(function() {
                //一定概率（30%）丢包
                if(Math.random() <= 0.3) {
                    log("向轨道" + (message.id + 1) + "发送的 " + message.command + " 指令丢包了！", "red");
                    return;
                }
                log("向轨道" + (message.id + 1) + "发送 " + message.command + " 指令成功！", "green");
                for(var i = 0; i < spaceManager.notebook.spaceShipList.length; i++) {
                    //已销毁的飞船不处理
                    if(spaceManager.notebook.spaceShipList[i]._destroyed) {
                        continue;
                    }
                    //向飞船发送消息
                    spaceManager.notebook.spaceShipList[i].telegraph.sendMessage(message);
                }
            }, 1000);
        },
    /**
         * 创建宇宙飞船
         * @param orbitId 轨道ID
         */
        createSpaceShip: function(orbitId) {
            //1秒后发送创建飞船消息
            setTimeout(function() {
                //一定概率（30%）丢包
                if(Math.random() <= 0.3) {
                    log("向轨道" + (orbitId + 1) + "发送的 create 指令丢包了！", "red");
                    return;
                }
                log("向轨道" + (orbitId + 1) + "发送 create 指令成功！", "green");
                spaceManager.createSpaceShip(orbitId);
            }, 1000);
        }
    }
};
//飞船飞行及显示管理
(function() {
    spaceManager.notebook.spaceShipFlyManager = setInterval(function() {
        for(var i = 0; i < spaceManager.notebook.spaceShipList.length; i++) {
            //已销毁的飞船不处理
            if(spaceManager.notebook.spaceShipList[i]._destroyed) {
                //在界面显示中删除飞船
                if(!spaceManager.notebook.spaceShipList[i].clear) {
                    spaceManager.notebook.spaceShipList[i].clear = true;
                    document.body.removeChild(document.getElementById("spaceship" + (i + 1)));
                }
                continue;
            }
            //飞船飞行控制
            spaceManager.notebook.spaceShipList[i].drive._fly();
            //飞船Div
            var ship = document.getElementById("spaceship" + (i + 1));
            //修改飞船位置
            ship.style.webkitTransform = "rotate(" + spaceManager.notebook.spaceShipList[i]._angle + "deg)";
            ship.style.mozTransform = "rotate(" + spaceManager.notebook.spaceShipList[i]._angle + "deg)";
            ship.style.msTransform = "rotate(" + spaceManager.notebook.spaceShipList[i]._angle + "deg)";
            ship.style.oTransform = "rotate(" + spaceManager.notebook.spaceShipList[i]._angle + "deg)";
            ship.style.transform = "rotate(" + spaceManager.notebook.spaceShipList[i]._angle + "deg)";
            //能源显示
            ship.firstElementChild.style.width = spaceManager.notebook.spaceShipList[i].energy.get() + "%";
            ship.lastElementChild.innerHTML = spaceManager.notebook.spaceShipList[i].energy.get() + "%";
        }
    }, 100);
})();
//太阳能管理
(function() {
    spaceManager.notebook.solarManager = setInterval(function() {
        for(var i = 0; i < spaceManager.notebook.spaceShipList.length; i++) {
            //已销毁的飞船不处理
            if(spaceManager.notebook.spaceShipList[i]._destroyed) {
                continue;
            }
            //太阳能充能系统
            spaceManager.notebook.spaceShipList[i].energy.add(2);
            //飞行耗能
            spaceManager.notebook.spaceShipList[i].energy.consume(5);
        }
    }, 1000);
})();
/**
 * 指挥官
 */
var commander = {
    //指挥官的记事本
    notebook: {
        //各个轨道的状态
        orbitStatus: [false, false, false, false]
    },
    //创建飞船
    createSpaceShip: function(orbitId) {
        //记录中该轨道已经有飞船了
        if(this.notebook.orbitStatus[orbitId]) {
            log("轨道" + (orbitId + 1) + "上已经存在飞船！", "blue");
            return;
        }
        this.notebook.orbitStatus[orbitId] = true;
        log("在轨道" + (orbitId + 1) + "上创建飞船！", "yellow");
        spaceManager.Mediator.createSpaceShip(orbitId);
    },
    //开始飞行
    start: function(orbitId) {
        //记录中该轨道没有飞船
        if(!this.notebook.orbitStatus[orbitId]) {
            log("轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
            return;
        }
        log("向轨道" + (orbitId + 1) + "发送开始飞行指令！", "yellow");
        //发送广播消息
        spaceManager.Mediator.sendMessage({
            id: orbitId,
            command: 'start'
        });
    },
    //停止飞行
    stop: function(orbitId) {
        //记录中该轨道没有飞船
        if(!this.notebook.orbitStatus[orbitId]) {
            log("轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
            return;
        }
        log("向轨道" + (orbitId + 1) + "发送停止飞行指令！", "yellow");
        //发送广播消息
        spaceManager.Mediator.sendMessage({
            id: orbitId,
            command: 'stop'
        });
    },
    //飞船自爆
    destroy: function(orbitId) {
        //记录中该轨道没有飞船
        if(!this.notebook.orbitStatus[orbitId]) {
            log("轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
            return;
        }
        //从记录中删除飞船
        this.notebook.orbitStatus[orbitId] = false;
        log("向轨道" + (orbitId + 1) + "发送销毁指令！", "yellow");
        //发送广播消息
        spaceManager.Mediator.sendMessage({
            id: orbitId,
            command: 'destroy'
        });
    },
    //设置速度
    setRate: function(orbitId, rate) {
        //记录中该轨道没有飞船
        if(!this.notebook.orbitStatus[orbitId]) {
            log("轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
            return;
        }
        log("向轨道" + (orbitId + 1) + "发送速度设置指令！", "yellow");
        spaceManager.Mediator.sendMessage({
            id: orbitId,
            command: 'rate',
            value: rate
        });
    }
};
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var cityName = document.getElementById("aqi-city-input").value.trim();
 	var qualityIndex = document.getElementById("aqi-value-input").value.trim();
 	var aqi_city_input = document.getElementById("aqi-city-input");
 	var aqi_value_input = document.getElementById("aqi-value-input");
 	if(!cityName.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
 		alert("城市名需为中英文字符！");
 		return;
 	}
 	if(!qualityIndex.match(/^\d+$/)){
 		alert("空气质量指数为整数！");
 		return;
 	}
 	aqiData[cityName] = qualityIndex;
 	return aqiData;
}

/**
 * 渲染aqi-table表格
 */	
function renderAqiList() { 
	var aqi_table = document.getElementById("aqi-table");
	aqi_table.innerHTML = '';
 	aqi_table.innerHTML += '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	for(var i in aqiData){
		aqi_table.innerHTML += '<tr><td>'+ i + '</td><td>'+aqiData[i]+'</td><td><button>删除</button></td>'+'\n';
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(property) {
  // do sth.
  delete aqiData[property];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var add_btn = document.getElementById("add-btn");
  add_btn.onclick = function(){
  	addBtnHandle();
  }
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数!!!
  var aqi_table = document.getElementById("aqi-table");
  aqi_table.addEventListener("click",function(event){
  	if(event.target.nodeName.toLowerCase()=='button')
  		delBtnHandle(event.target.parentNode.parentNode.childNodes[0].innerHTML);
  })
}
init();
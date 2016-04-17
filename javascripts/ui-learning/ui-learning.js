// JavaScript Document
window.onload = function(){
var str = '';
var data = [
  [{title: '第一章 表单类型常用代码'},
   {url:'',title:'验证输入'},
   {url:'',title:'禁止输入'},
  ],
  [{title: '第二章 常用图片相关代码'},
   {url:'',title:'可添加的下拉选项' },
   {url:'',title:'图片放大镜效果' },
   {url:'',title:'点击图片逐渐放大' }
  ],
  [
  { title : '第三章 内容展示常用代码'},
  { url : '', title : '单元行上鼠标悬停提示' },
  { url : '', title : '隔行换色鼠标经过换色' },
  { url : '', title : '添加或删除表格行' },
  { url : '', title : '可拖动的弹出层' },
  { url : '', title : '选项卡轮播' },
  { url : '', title : '模拟滚动条' },
  { url : '', title : '缓动的对联广告' },
  { url : '', title : '拖动滑块验证' }
  ],
  [
  { title : '第四章 常用图片轮换'},
  { url : '', title : '百度爱玩 - 图片轮换' },
  { url : '', title : '百度爱玩 - 遮罩下拉' },
  { url : '', title : '百度爱玩 - 榜单tab切换' },
  { url : '', title : 'css3弹出层' },
  { url : '', title : '米4-活动页面' },
  { url : '', title : '百度爱玩 - 图片轮换' },
  { url : '', title : '百度微购－中秋送好礼' },
  { url : '', title : '商品分类' },
  { url : '', title : '渐显的tab菜单2' },
  { url : '', title : '经典图片轮换－单个滚动' },
  { url : '', title : '经典图片轮换－整个翻页' }
  ],
  [
  { title : '第五章 移动端效果'},
  { url : '', title : '选项卡切换' }
  ],
  [
  { title : '第六章 时间日期效果'},
  { url : '', title : 'canvas实现小时钟' }
  ]
];

for(var i = 0; i<data.length;i++){
  var items = data[i];
  var sub = '';
  for(var j=0; j<items.length;j++){
	var son = items[j];
	if(j==0){
	  sub += '<li><h1><a href="javascript:;" title="' + son.title + '">' + son.title + '</a></h1><dl class="sub-dl">';
	}
	else{
      sub += '<dd><a href="' + son.url + '" target="_blank" title="' + son.title + '">' + son.title + '</a></dd>';
	}
	if(j == items.length - 1){
      sub += '</dl></li>';    
    }
  }
  str += sub;
}

var ol = document.getElementById('ol');
ol.innerHTML=str;
var h1 = ol.getElementsByTagName('h1');
var dl = ol.getElementsByTagName('dl');
var tmp = -1;
var open = false;
for(var i=0;i<h1.length; i++){
  h1[i].index = i;
  h1[i].onclick = function(){
	    for(var i=0;i<h1.length;i++)
		  dl[i].style.display='none';
	  if(tmp == this.index && open){
	    dl[this.index].style.display='none';
		open = false;
	  }
	  else{
	    dl[this.index].style.display='block';
		open = true;
	  }
	  tmp = this.index;
}
}
}
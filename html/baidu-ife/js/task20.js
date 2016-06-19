//别人儿大神的算法确实清晰。
var search = document.getElementById("search");
var display_area = document.getElementById("display-area");
var insert = document.getElementById("insert");
var inputArray = [];
var i=0;
insert.onclick = function(){
	//加上.trim()去掉前后空格。
	var inputValue = document.getElementById("textarea").value.trim();
	inputArray = [];
	/* 代码实现相当于split()方法	
	for(var j=0;j<inputValue.length;j++){
		if(inputValue[j]!='\n'&&inputValue[j]!='\t'&&inputValue[j]!='\r'&&inputValue[j]!=' '&&inputValue[j]!=','&&inputValue[j]!='、'){
			if(inputArray[i]==undefined)
				inputArray[i] = inputValue[j];
			else
				inputArray[i] += inputValue[j];
		}
		else
			i++;
	}
	*/
	/*拆分一个字符串，根据正则表达式要比循环读取简单而且精确。
	用到了split方法，filter方法。*/
	inputArray = inputValue.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(a){
		if(a!=null&&a.length>0)
			return true;
		else
			return false;
	});
	renderQueue();
/* 数组排序，暂时没有用上
	sortInputArray = sort(inputArray,0,inputArray.length-1);
	for(i=0;i<inputArray.length;i++){
		for(k=0;k<inputArray[i].length){
			if()
		}
	}
*/
}

search.onclick = function(){
	var searchValue = document.getElementById("input").value.trim();
	renderQueue(searchValue);
}

function renderQueue(str){//.map(function(d){})中的d指的是数组中的元素。
	display_area.innerHTML = inputArray.map(function(d){
		if(str!=null&&str.length>0)
			//直接运用现成的replace方法，g参数表示匹配全局
			d = d.replace(new RegExp(str,"g"),"<span class='selected'>"+str+"</span>");
		return '<div>' + d + '</div>';
	}).join('');
}
/*
function sort(array[],first,last){
	if(first<last){
		var mid = parseInt((first+last)/2);
		var array1 = [];
		var array2 = [];
		var arrayTotal = [];
		array = sort(array[],first,mid); //前一半排序
		array = sort(array[],mid,last); //后一半排序
		arrayTotal = mergeArray(array[],first,mid,last);
	}
	return arrayTotal;
}

function mergeArray(array[],first,mid,last){ //Merge two ordered arrays.
	var i = first, j = mid + 1;
	var m = mid, n = last;
	var k = 0;
	while(i<=m&&j<=n){
		if(array[i]<=array[j])
			temp[k++] = array[i++];
		else
			temp[k++] = array[j++];
	}
	while(i<=m)
		temp[k++] = array[i++];
	while(j<=n)
		temp[k++] = array[j++];
	for(i=0;i<k;i++)
		array[first+i] = temp[i];
	return array;
}
*/

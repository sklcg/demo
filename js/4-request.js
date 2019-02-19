function naturalPost(url,data,backcall){
	var xhr = new XMLHttpRequest();
	xhr.open('post', url);
	xhr.setRequestHeader('Content-type','application/json;charset=utf-8');
	xhr.send(data);
	xhr.onreadystatechange = function () {
		if(xhr.readyState == 4 && xhr.status == 200) {
			backcall(xhr.responseText);
		}
	};
}
function decodeImage(response){
	//RETURN AN IMAGE URL
	return eval('('+response+')').img;
}
function requestRenderingResult(){
	//将Render按钮置为加载中状态
	setLoadingStatus(1);
	
	//获取object的类型与transform信息
	//upload image pair, and request renderring result.
	var json ={
		"type":"render",
		"meshid":ObjectInfo.mesh,//Select.options[objectSelect.selectedIndex].value,
		"direction":ObjectInfo.transformIndex,
		"image":cropAndEncodeImage()
	};
	naturalPost("http://192.168.8.44:8000", JSON.stringify(json),function(response){
		//取消Render按钮的loading状态
		setLoadingStatus(0);
		var imageURL = decodeImage(response);
		if(Fixed){
			RenderResultURL[ObjectInfo.transformIndex] = imageURL;
		}
		displayRenderView(imageURL);
	});
}

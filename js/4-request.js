function naturalPost(url, data, backcall){
	var xhr = new XMLHttpRequest();
	xhr.open('post', url);
	xhr.send(data);
	xhr.onreadystatechange = function () {
		if(xhr.readyState == 4 && xhr.status == 200) {
			backcall(xhr.responseText);
		}
	};
}
function decodeImage(response){
	//RETURN AN IMAGE URL
	return eval('('+response+')').data;
}
function requestRenderingResult(){
	//将Render按钮置为加载中状态
	setLoadingStatus(1);
	
	var data = new FormData();
    data.append('command', 'render');
    data.append('mesh', ['none','sphere', 'bunny','dragon'][ObjectInfo.mesh]);
    data.append('transform', ObjectInfo.transformIndex);
	
	view = cropAndEncodeImage()
    data.append('front_view', view["front"]);
	data.append('rear_view', view['rear']);
	
	naturalPost("http://192.168.31.120:8000", data, function(response){
	//naturalPost("http://39.106.26.122:8000", data, function(response){
		//取消Render按钮的loading状态
		setLoadingStatus(2);
		
		var imageURL = decodeImage(response);
		if(Fixed){
			RenderResultURL[ObjectInfo.mesh][ObjectInfo.transformIndex] = imageURL;
		}
		displayRenderView(imageURL);
	});
}

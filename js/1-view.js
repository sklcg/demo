function setViewSizeFittingScreen(){	
	var width = document.body.clientWidth;
	var height = document.body.clientHeight;
	
	ViewMain.style.width=width;
	ViewMain.style.height=height;
		
	ViewAux.style.width=width/4;
	ViewAux.style.height=height/4;
	
	PanelRender.style.width = (width*0.75 - 2);
	PanelRender.style.height = height/8;
	
	ButtonRenderObject.style.width = (width*0.75 - 2)/2;
	ButtonRenderObject.style.height = height/8;
	
	ButtonSelectObject.style.width = ButtonRenderObject.style.width;
	ButtonSelectObject.style.height = ButtonRenderObject.style.height;
	
	ViewSelect.style.left = width/4;
	ViewSelect.style.width = ButtonRenderObject.style.width;
	ViewSelect.style.bottom = ButtonRenderObject.style.height;
	
	PanelRender.style.width = (width*0.75 - 2)/2*2;
	ButtonFixView.style.width=parseInt(width/8);
	ButtonFixView.style.height=parseInt(width/8);
	ButtonFixView.style.borderRadius=parseInt(width/2)+'px';
	
	PanelObject.style.width = width/6*3.5;
	for(var i = 0; i < MeshButtons.length; ++i){
		console.log(i);
		MeshButtons[i].style.width = width / 6;
		MeshButtons[i].style.height = width / 6;
		MeshButtons[i].style.fontSize = width / 6;
	}
}

function setViewSizeFittingCamera(){
	//微调布局，精细化页面
	//处理video标签的内边距，但是基于此假设：相机的实际view大小 > view大小。
	//相机的view在video标签中的显示是自适应的。
	//maybebug 处理方式不是特别通用，可能对部分机型无效
	if(ViewAux.videoWidth == 0 || ViewMain.videoWidth==0){
		//相机未就绪，此时无法调整view大小,0.2s后再次尝试
		setTimeout(function(){setViewSizeFittingCamera(ViewMain,ViewAux,ViewRender);},200);
		return;
	}
	var w0 = parseInt(ViewAux.style.width);
	var h0 = parseInt(ViewAux.style.height);
	
	var w1 = ViewAux.videoWidth;
	var h1 = ViewAux.videoHeight;			
	
	//基于假设: w1 > w0 and h1 > h0
	//缩小video标签大小
	if(w0 / h0 < w1 / h1){
		ViewAux.style.height = parseInt(w0*h1/w1);
	}
	else{
		ViewAux.style.width = parseInt(w1*h0/h1);
	}
	
	w0 = parseInt(ViewMain.style.width);
	h0 = parseInt(ViewMain.style.height);
	
	w1 = ViewMain.videoWidth;
	h1 = ViewMain.videoHeight;
	
	//基于假设: w1 > w0 and h1 > h0
	//由于ViewMain是填充屏幕,所以此处处理方法与ViewAux相反，增大ViewMain
	if(w0 / h0 < w1 / h1){
		ViewMain.style.width = parseInt(w1 * h0 / h1);
	}
	else{
		ViewMain.style.height = parseInt(w0 * h1 / w1);
	}
	
	//设置ViewRender与ViewMain大小一致
	ViewRender.style.width=parseInt(ViewMain.style.width);
	ViewRender.style.height=parseInt(ViewMain.style.height);
}

function displayCameraView(){
	navigator.mediaDevices.enumerateDevices().then(function(allDevices) {
		//获取摄像头设备
   		var videoDevices = [];
	    for (var i = 0; i != allDevices.length; ++i) {
	        if (allDevices[i].kind === 'videoinput') {
	        	videoDevices.push(allDevices[i]);
	        }
	    }
		//maybebug: 少于或多于两个摄像头
		if(videoDevices.length<2){
			console.log('There are fewer than two available cameras.');
			return;
		}
		var mainConstraint = {video:{
			//width : parseInt(ViewMain.style.width),
			//height : parseInt(ViewMain.style.height),
			deviceId : videoDevices[MainViewId].deviceId
		}};
		var auxConstraint = {video:{
			//width : parseInt(ViewAux.style.width),
			//height : parseInt(ViewAux.style.height),
			deviceId : videoDevices[1 - MainViewId].deviceId
		}};
		
		//将摄像头获取的视频流，显示在两个view标签中
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(mainConstraint).then(function(stream) {
                ViewMain.src = window.URL.createObjectURL(stream);
                ViewMain.play();
            });
            navigator.mediaDevices.getUserMedia(auxConstraint).then(function(stream) {
                ViewAux.src = window.URL.createObjectURL(stream);
                ViewAux.play();
            });
        }
        //todo: 兼容其他浏览器内核
        //for legacy browser
		//视频加载完成后精细页面布局
		setTimeout(function(){setViewSizeFittingCamera();},200);
    });
}
function unFixView(){
	Fixed = false;
	ViewMain.play();
	ViewAux.play();
	ButtonFixView.innerText="Fix";
	ButtonFixView.style.opacity=0.4;
	ButtonFixView.style.backgroundColor="azure";
	
	//所有的结果都要重新渲染
	[Object(),Object(),Object(),Object()]
}
function fixView(){
	Fixed = true;
	ViewMain.pause();
	ViewAux.pause();
	ButtonFixView.innerHTML="Go";
	ButtonFixView.style.opacity=1;
	ButtonFixView.style.backgroundColor="lightgray";
}
function switchCameraView(){
	var temp = ViewMain.src;
	ViewMain.src = ViewAux.src;	
	ViewAux.src = temp;
	unFixView();
}

function setLoadingStatus(status){
	var img = document.getElementById("loading-status");
	if(status == 1){
		img.src = 'img/loading/loading-0.gif' 
		img.style.position="fixed";
		img.style.bottom="0px";
		img.style.display="inline-block";
		img.style.height=ButtonRenderObject.style.height;
		var w1 = parseInt(ButtonRenderObject.style.width);
		var w2 = parseInt(img.offsetWidth);
		img.style.right=(w1-w2)/2;
		ButtonRenderObject.firstChild.innerText=".";
		ButtonRenderObject.setAttribute("disabled","true");
		fixView();
	}
	else if(status == 2){
		img.style.display="none";
		ButtonRenderObject.firstChild.innerText="Resume";	
		ButtonRenderObject.removeAttribute("disabled");		
	}
	else if(status == 0){
		img.style.display="none";
		displayRenderView(0);
		ButtonRenderObject.firstChild.innerText="Render";
		ButtonRenderObject.removeAttribute("disabled");
	}
}
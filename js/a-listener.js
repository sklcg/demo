function addEventListener(){
	ToggleShowPanel.addEventListener('click',function(){
		PanelObject.style.display="inline-block";
		ToggleShowPanel.style.display="none";
	});
	ToggleHidePanel.addEventListener('click',function(){
		ToggleShowPanel.style.display="inline-block";
		PanelObject.style.display="none";
	});
	switchCameraView();
	ViewAux.addEventListener('click',function(){
		MainViewId = 1 - MainViewId;
		switchCameraView();
	});
	ButtonRefresh.addEventListener('click',function(){
		var renderImage = document.getElementById("render-image");
		if(renderImage==undefined ||renderImage==null){
			return ;
		}
		renderImage.style.left=0;
		renderImage.style.top=0;
		renderImage.style.width = parseInt(ViewRender.offsetWidth);
		ObjectInfo.transformIndex = 0;
		updateObjectView();
	});
// 	ButtonFixView.addEventListener('click',function(){
// 		if(Fixed){
// 			unFixView();
// 		}
// 		else{
// 			fixView();
// 		}
// 	});
	ButtonRenderObject.addEventListener('click',function(){
		if(Fixed){
			unFixView();
			setLoadingStatus(0);
		}
		else{
			requestRenderingResult();
		}
	});
	ButtonZoomIn.addEventListener('click',function(){
		var renderImage = document.getElementById("render-image");
		if(renderImage==undefined ||renderImage==null){
			return ;
		}
		var maxWidth = parseInt(ViewRender.offsetWidth)*3;
		var width = parseInt(renderImage.style.width); 
		var newWidth = Math.min(parseInt(Math.pow(width,1.05)),maxWidth);
		
		renderImage.style.width = newWidth;
	});
	ButtonZoomOut.addEventListener('click',function(){
		var renderImage = document.getElementById("render-image");
		if(renderImage==undefined ||renderImage==null){
			return ;
		}
		var minWidth = parseInt(ViewRender.offsetWidth)/5;
		var width = parseInt(renderImage.style.width); 
		var newWidth = Math.max(parseInt(Math.pow(width,0.95)),minWidth);
		
		renderImage.style.width = newWidth;
	});
// 	ButtonRotateUp.addEventListener('click',function(){
// 		ObjectInfo.transformIndex = ObjectInfo.up[ObjectInfo.transformIndex];
// 		updateObjectView();
// 	});
// 	ButtonRotateDown.addEventListener('click',function(){
// 		ObjectInfo.transformIndex = ObjectInfo.down[ObjectInfo.transformIndex];
// 		updateObjectView();
// 	});
// 	ButtonRotateLeft.addEventListener('click',function(){
// 		ObjectInfo.transformIndex = ObjectInfo.left[ObjectInfo.transformIndex];
// 		updateObjectView();		
// 	});
	ButtonRotateRight.addEventListener('click',function(){
		ObjectInfo.transformIndex = ObjectInfo.right[ObjectInfo.transformIndex];
		updateObjectView();
	});
	ButtonRotateClockwise.addEventListener('click',function(){
		ObjectInfo.transformIndex = ObjectInfo.clock[ObjectInfo.transformIndex];
		updateObjectView();
	});
// 	ButtonRotateAnticlockwise.addEventListener('click',function(){
// 		ObjectInfo.transformIndex = ObjectInfo.anticlock[ObjectInfo.transformIndex];
// 		updateObjectView();
// 	});
	ButtonSelectObject.addEventListener('click',function(){
		if(ViewSelect.style.display=="" || ViewSelect.style.display=="none"){
			ViewSelect.style.display="inline";
		}
		else{
			ViewSelect.style.display="none";
		}
	});
	ViewMain.addEventListener('click',function(){
		ViewSelect.style.display="none";		
	});
	ViewRender.addEventListener('click',function(){
		ViewSelect.style.display="none";		
	});
}
function updateObjectView(){
	if(ObjectInfo.mesh == 0){
		displayRenderView(0);
	}
	else{
		var url = RenderResultURL[ObjectInfo.transformIndex];
		if(typeof(url) == "undefined"){
			requestRenderingResult();
		}
		else{
			displayRenderView(url);
		}		
	}
}

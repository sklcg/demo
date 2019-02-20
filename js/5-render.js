function displayRenderView(imageURL){
	if(imageURL == 0){
		var image = document.getElementById("render-image");
		if(image==undefined || image==null){
			ViewRender.innerHTML="";
		}
		else{
			image.style.display = "none";
		}
		return; 
	}
	var image = document.getElementById("render-image");
	if(image==undefined || image==null){
		var image = document.createElement("img");	
		image.src=imageURL;
		image.id = "render-image";
		ViewRender.innerHTML="";
		ViewRender.appendChild(image);
		image.style.width = ViewRender.style.width;
		image.style.position="relative";
		image.addEventListener('touchstart', function (event){	
			var touch = event.targetTouches[0];
			LastPos = {
				x:touch.screenX,
				y:touch.screenY
			};
		});
		image.addEventListener('touchmove', function(event){
			if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
			if(typeof(Modifing)!="undefined" && Modifing == true) return;
			Modifing = true;
		　　var touch = event.targetTouches[0];
			offset = {
				x:touch.screenX - LastPos.x,
				y:touch.screenY - LastPos.y
			};
			LastPos = {
				x:touch.screenX,
				y:touch.screenY
			};
			image.style.left = image.offsetLeft + offset.x; 
			image.style.top = image.offsetTop + offset.y;
			Modifing = false;
		});
	}
	else{
		image.style.display = "block";
		image.src=imageURL;
	}
	
}
function resize(){
	var image = document.getElementById("render-image");
	//todo resize();
}
function resetObject(meshid){
	ObjectInfo.mesh = meshid;
	ObjectInfo.transformIndex = 4;
	ViewSelect.style.display="none";
	updateObjectView();
}
window.addEventListener("DOMContentLoaded", function() {
	init();
	setViewSizeFittingScreen();
	displayCameraView();
	addEventListener();	
}, false);
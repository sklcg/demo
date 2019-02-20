function initObjectInfo(){
	ObjectInfo = Object();
	ObjectInfo.mesh = 2;
	//0 None; 1 Shpere; 2 Bunny; 3 Dragon
	ObjectInfo.transformIndex = 4;
	ObjectInfo.left = [17, 5, 41, 29, 16, 9, 42, 3, 19, 31, 43, 7, 29, 17, 5, 41, 28, 10, 6, 2, 31, 43, 7, 19, 41, 29, 17, 5, 40, 11, 18, 1, 43, 7, 19, 31, 5, 41, 29, 17, 4, 8, 30, 0, 7, 19, 31, 43];
	ObjectInfo.right = [43, 31, 19, 7, 40, 1, 18, 11, 41, 5, 17, 29, 7, 43, 31, 19, 4, 0, 30, 8, 5, 17, 29, 41, 19, 7, 43, 31, 16, 3, 42, 9, 17, 29, 41, 5, 31, 19, 7, 43, 28, 2, 6, 10, 29, 41, 5, 17];
	ObjectInfo.up = [30, 18, 6, 42, 0, 17, 10, 43, 4, 16, 28, 40, 42, 30, 18, 6, 3, 29, 11, 7, 16, 28, 40, 4, 6, 42, 30, 18, 2, 41, 8, 19, 28, 40, 4, 16, 18, 6, 42, 30, 1, 5, 9, 31, 40, 4, 16, 28];
	ObjectInfo.down = [4, 40, 28, 16, 8, 41, 2, 19, 30, 42, 6, 18, 16, 4, 40, 28, 9, 5, 1, 31, 42, 6, 18, 30, 28, 16, 4, 40, 10, 17, 0, 43, 6, 18, 30, 42, 40, 28, 16, 4, 11, 29, 3, 7, 18, 30, 42, 6];
	ObjectInfo.clock = [3, 0, 1, 2, 7, 4, 5, 6, 11, 8, 9, 10, 2, 3, 0, 1, 19, 16, 17, 18, 8, 9, 10, 11, 1, 2, 3, 0, 31, 28, 29, 30, 9, 10, 11, 8, 0, 1, 2, 3, 43, 40, 41, 42, 10, 11, 8, 9];
	ObjectInfo.anticlock = [1, 2, 3, 0, 5, 6, 7, 4, 9, 10, 11, 8, 0, 1, 2, 3, 17, 18, 19, 16, 10, 11, 8, 9, 3, 0, 1, 2, 29, 30, 31, 28, 11, 8, 9, 10, 2, 3, 0, 1, 41, 42, 43, 40, 8, 9, 10, 11];
	
}
function initGlobalDomHandler(){
	ViewMain = document.getElementById('view-main');
	ViewAux = document.getElementById('view-aux');
	ViewRender = document.getElementById('view-render');	
	ViewSelect = document.getElementById("view-select-object");
	
	ButtonFixView = document.getElementById('button-fix-view');
	
	PanelRender = document.getElementById('panel-render');
	ButtonRenderObject = document.getElementById('button-render-object');
	ButtonSelectObject = document.getElementById("button-select-object");
	
	ToggleShowPanel = document.getElementById("toggle-show-panel");
	ToggleHidePanel = document.getElementById("toggle-hide-panel");
	
	PanelObject = document.getElementById("panel-object");
	ButtonRefresh = document.getElementById("button-rotate-refresh");
	ButtonZoomIn = document.getElementById("button-zoom-in");
	ButtonZoomOut = document.getElementById("button-zoom-out");
	ButtonRotateUp = document.getElementById("button-rotate-up");
	ButtonRotateDown = document.getElementById("button-rotate-down");
	ButtonRotateLeft = document.getElementById("button-rotate-left");
	ButtonRotateRight = document.getElementById("button-rotate-right");
	ButtonRotateClockwise = document.getElementById("button-rotate-clockwise");
	ButtonRotateAnticlockwise = document.getElementById("button-rotate-anticlockwise");
	
	MeshButtons = [
		ButtonRefresh,
		ToggleShowPanel,
		ToggleHidePanel,
		ButtonZoomIn,
		ButtonZoomOut,
		ButtonRotateUp,
		ButtonRotateDown,
		ButtonRotateLeft,
		ButtonRotateRight,
		ButtonRotateClockwise,
		ButtonRotateAnticlockwise
	]
}
function init(){
	initGlobalDomHandler();
	initObjectInfo();
	Fixed = false;
	MainViewId = 0;
	RenderResultURL=Object();
}

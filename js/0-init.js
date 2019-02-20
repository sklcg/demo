function initObjectInfo(){
	ObjectInfo = Object();
	ObjectInfo.mesh = 2;
	//0 None; 1 Shpere; 2 Bunny; 3 Dragon
	ObjectInfo.transformIndex = 0;
	//ObjectInfo.anticlock = [11, 10, 8, 9, 15, 14, 12, 13, 6, 7, 4, 5, 2, 3, 0, 1, 18, 19, 17, 16, 22, 23, 21, 20];
	ObjectInfo.clock = [14, 15, 12, 13, 10, 11, 8, 9, 2, 3, 1, 0, 6, 7, 5, 4, 19, 18, 16, 17, 23, 22, 20, 21];
	ObjectInfo.left = [18, 19, 17, 16, 22, 23, 21, 20, 11, 10, 8, 9, 15, 14, 12, 13, 6, 7, 4, 5, 2, 3, 0, 1];
	ObjectInfo.right = [22, 23, 20, 21, 18, 19, 16, 17, 10, 11, 9, 8, 14, 15, 13, 12, 3, 2, 0, 1, 7, 6, 4, 5];
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
		// ButtonRotateUp,
		// ButtonRotateDown,
		// ButtonRotateLeft,
		ButtonRotateRight,
		ButtonRotateClockwise,
		// ButtonRotateAnticlockwise
	]
}
function init(){
	initGlobalDomHandler();
	initObjectInfo();
	Fixed = false;
	MainViewId = 0;
	RenderResultURL=[Object(),Object(),Object(),Object()];
}

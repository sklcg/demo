function getCenterSquare(w,h){
	if(w < h){
		var sx = 0;
		var sy = (h - w) / 2;
		h = w;
	}
	else{
		var sx = (w - h) / 2;
		var sy = 0;
		w = h;
	}
	//startX,startY,width,height
	return [sx,sy,w,h];
}

function setLocation(ViewRender){	
	var w = Math.min(document.body.clientWidth,parseInt(ViewMain.style.width));
	var h = Math.min(document.body.clientHeight,parseInt(ViewMain.style.height));
	cfg = getCenterSquare(w,h);	
	ViewRender.style.left=cfg[0];
	ViewRender.style.top=cfg[1];
	ViewRender.style.width=cfg[2];
	ViewRender.style.height=cfg[3];
}
function cropAndEncodeImage(){
	var size = 224;
	var canvas = document.createElement("canvas");
	canvas.width = size;
	canvas.height = size;
	
	var context = canvas.getContext('2d');
	
	context.drawImage(ViewMain, 0, 0, size, size);	
	var rear_view = canvas.toDataURL('image/jpeg');
	
	context.drawImage(ViewAux, 0, 0, size, size);	
	var front_view = canvas.toDataURL('image/jpeg');
	
	setLocation(ViewRender);	
	return {'front': front_view, 'rear': rear_view};
}
function cropAndEncodeImage_former(){
	var finalSize = 224;
	//227，训练的网路模型的输入是227
	var canvas = document.createElement("canvas");
	canvas.style.backgroundColor="red";
	canvas.width = finalSize;
	canvas.height = finalSize*2;
	/*
	 * 下面的裁剪缩放代码基于以下几个原则（原因）：\n
	 * 1. View标签的大小，小于Video中流的实际大小，视频流是缩放显示在View中的。
	 * 	  ->所以保存时，应该以video的大小为准，不能以view的大小为准
	 * 
	 * 2. 在精细化函数消除边距的时候，ViewMain对video流进行了截取，有一小部分没有显示在屏幕中。*
	 * 
	 * 3. 渲染的物体需要尽量在屏幕的中央
	 * 	  ->由2,3知，需要截取显示在屏幕中的部分，而不能直接用全部的video大小进行截取。
	 * 
	 * 因此，ViewMain选取方法是选取屏幕内可见部分的最大最居中的正方形区域，并也压缩至227x227
	 * 
	 * 而对于ViewAux，其没有超出屏幕的部分，直接选取ViewAux对应Video中最大最居中正方形区域即可
	 */
	
	var context = canvas.getContext('2d');
	//先获取可见区域的宽高
	var w0 = Math.min(document.body.clientWidth,parseInt(ViewMain.style.width));
	var h0 = Math.min(document.body.clientHeight,parseInt(ViewMain.style.height));
	
	var w = ViewMain.videoWidth;
	var h = ViewMain.videoHeight;
	//根据可见w0，h0比例，获取video流（大图）中应该选取的w，h
	//最后选取正方形区域、
	if(w/h < w0/h0){
		var cfg = getCenterSquare(w,w*h0/w0);
	}
	else{
		var cfg = getCenterSquare(h*w0/h0,h);
	}			
	context.drawImage(ViewMain, cfg[0], cfg[1], cfg[2], cfg[3], 0, 0, finalSize, finalSize);
	
	//将ViewRender缩放并置于裁剪位置
	cfg = getCenterSquare(w0,h0);
	ViewRender.style.left=cfg[0];
	ViewRender.style.top=cfg[1];
	ViewRender.style.width=cfg[2];
	ViewRender.style.height=cfg[3];
	
	var cfg = getCenterSquare(parseInt(ViewAux.videoWidth),parseInt(ViewAux.videoHeight));
	context.drawImage(ViewAux, cfg[0],cfg[1],cfg[2],cfg[3],0,finalSize, finalSize, finalSize);
	var data = canvas.toDataURL('image/jpeg');
	return data;
}
function preprocess(){
    console.log("Preprocessing");
    let img=cv.imread(can);
    let contours=new cv.MatVector();
    let hierarchy=new cv.Mat();
    cv.cvtColor(img,img,cv.COLOR_RGBA2GRAY);
    cv.threshold(img,img,150,255,cv.THRESH_BINARY);
    cv.findContours(img,contours,hierarchy,cv.RETR_CCOMP,cv.CHAIN_APPROX_SIMPLE);
    let cnt=contours.get(0);
    let rect=cv.boundingRect(cnt);
    img=img.roi(rect);
    var hei=img.rows;
    var wid=img.cols;
    //console.log(hei,wid);
    var scale=0;
    if (hei>wid){
        scale=Math.round(hei/20);
        hei=20;
        wid=Math.round(wid/scale);
    }
    else{
        scale=Math.round(wid/20)
        wid=20;
        hei=Math.round(hei/scale);
    }
    //console.log(scale);
    let le=new cv.Size(wid,hei);
    cv.resize(img,img,le,0,0,interpolation=cv.INTER_AREA);
    const left=Math.ceil(4+(20-wid)/2);
    const right=Math.floor(4+(20-wid)/2);
    const top=Math.ceil(4+(20-hei)/2);
    const down=Math.floor(4+(20-hei)/2);
    //const nn=None;
    cv.copyMakeBorder(img,img, top, down, left, right, cv.BORDER_CONSTANT,value=[0,0,0,255]);
    const canvas=document.createElement('canvas');
    //cv.imshow(canvas,img);
    //document.body.appendChild(canvas);
    cv.findContours(img,contours,hierarchy,cv.RETR_CCOMP,cv.CHAIN_APPROX_SIMPLE);
    cnt=contours.get(0);
    const momen=cv.moments(cnt,false);
    const cnx=momen.m10/momen.m00;
    const cny=momen.m01/momen.m00;
    //console.log(cnx,cny);
    let lshift=Math.round(14.0-cny);
    let yshift=Math.round(14.0-cnx);
    const matrix=cv.matFromArray(2,3,cv.CV_64FC1,[1,0,lshift,0,1,yshift]);
    cv.warpAffine(img,img,matrix,new cv.Size(img.rows,img.cols),cv.INTER_LINEAR,cv.BORDER_CONSTANT,[0,0,0,255]);
    let pixelvals=img.data;
    pixelvals=Float32Array.from(pixelvals);
    pixelvals=pixelvals.map(function(itt){
        return itt/255;
    });
    //console.log(pixelvals);
    loadmodel([pixelvals]);
}
var prevx=0;
var prevy=0;
var currx=0;
var curry=0;
var paint=false
var  can;
var  context;
function canvas_prep(){
    can=document.getElementById('myCanvas');
      context=can.getContext('2d');
    // context.beginPath();
    // context.rect(0,0,158.993,158.993);
    context.fillStyle='#000000';
    context.fillRect(0,0,150,150);
    context.strokeStyle='white';
    context.lineWidth=15;
    context.lineJoin='round';
    //context.fill();
    can.addEventListener('mousedown',pressed);
    can.addEventListener('mousemove',sketch);
    can.addEventListener('mouseup',stopp);
    can.addEventListener('touchstart',tstart);
    can.addEventListener('touchmove',tsketch);
    can.addEventListener('touchend',tstopp);
    
    function pressed(event){

        //console.log("Mouse Pressed");
        paint=true;
        prevx=event.clientX-can.offsetLeft;
        prevy=event.clientY-can.offsetTop;

    }
    function sketch(event){
        //console.log("Mouse pressed");
        if (paint==false){
            return;
        }
        currx=event.clientX-can.offsetLeft;
        curry=event.clientY-can.offsetTop;
        //console.log(currx,curry);
        if(currx<0||currx>158.993||curry<0||curry>158.993){
            paint=false;
            return;
        }
        context.beginPath();
        context.moveTo(prevx,prevy);
        context.lineTo(currx,curry);
        context.closePath();
        context.stroke();
        prevx=currx;
        prevy=curry; 
    }
    function stopp(event){
        if (paint==false){
            return;
        }
        paint=false;
        //console.log("Mouse released");
        prevx=0;
        prevy=0;
    }
    function tstart(event){

        //console.log("touch detected");
        paint=true;
        prevx=event.touches[0].clientX-can.offsetLeft;
        prevy=event.touches[0].clientY-can.offsetTop;

    }
    function tsketch(event){
        //console.log("Mouse pressed");
        if (paint==false){
            return;
        }
        currx=event.touches[0].clientX-can.offsetLeft;
        curry=event.touches[0].clientY-can.offsetTop;
        //console.log(currx,curry);
        if(currx<0||currx>158.993||curry<0||curry>158.993){
            paint=false;
            return;
        }
        context.beginPath();
        context.moveTo(prevx,prevy);
        context.lineTo(currx,curry);
        context.closePath();
        context.stroke();
        prevx=currx;
        prevy=curry; 
    }
    function tstopp(event){
        if (paint==false){
            return;
        }
        paint=false;
        //console.log("touch released");
        prevx=0;
        prevy=0;
    }
}
function clearcanvas(){
    preprocess();
    context.fillStyle='#000000';
    context.fillRect(0,0,150,150);
    //nxtquestion();

}

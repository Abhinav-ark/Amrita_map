function swapValues(){
    var start = document.getElementById("start");
    var end = document.getElementById("end");
    var temp = start.value;
    start.value = end.value;
    end.value = temp;
}
function clearSearch(){
    document.getElementById("start").value=null;
    document.getElementById("end").value=null;
    vis.generatePoints();
    hideNav();
}

function originalPos(){
    target.style.transform = 'rotate(0deg)';
    target.style.transition='transform 200ms ease-in';
    compass.style.transform = 'rotate(0deg)';
//     compass.style.transition='transform 200ms ease-in';
    target.style.top=0;
    target.style.left=0;
    target.style.height='35em';
    target.style.width='19em';
    //console.log("get",getCompassRotation());
    if(i>=1){
        adjustDir(i-1);
    }
    rt=0;
}

function getCompassRotation(){
    var st = window.getComputedStyle(compass, null);
    var tm = st.getPropertyValue("transform");
    var values = tm.split('(')[1].split(')')[0].split(',');
    var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
    return angle < 0 ? angle+360 : angle; 
}

var dirArrow = document.querySelector("#dirArrow");

function adjustDir(i){
    var deg=(getCompassRotation()+vis.aStarDirs[i])%360;
    dirArrow.style.transform='rotate('+deg+'deg)';
    dirArrow.style.transition='transform 200ms ease-in';
}

var rt=0;

function rotate90(){
    rt-=90;
    target.style.transform = 'rotate('+rt+'deg)';
    target.style.transition='transform 200ms ease-in';
    compass.style.transform = 'rotate('+rt+'deg)';
    // compass.style.transition='transform 200ms ease-in';
    //console.log("get",getCompassRotation()+180,vis.aStarDirs[i],i);
    adjustDir(i-1);
    console.log("called");
}

function mapNavInfo(){
    alert("On a TouchSceen, Use 1 finger to Pan, 2 fingers to zoom and 3 fingers to rotate.");
}

function showNav(){
    document.getElementById("navigator").style.display = "flex";
}

function hideNav(){
    document.getElementById("navigator").style.display = "none";
}

var direction=document.getElementById('direction');
var i=0;
function showDir(){
    if(i==vis.aStarNodes.length){
        hideNav();
        i=0;
        location.reload();
    }
    if(i<=0)
    {
        document.getElementById("dirbackbtn").style.display = "none";
    }
    console.log(vis.aStarNodes[i],vis.aStarDists[i]);
    if(i==1)
    {
        yellowPoint(vis.aStarPoints[i-1],vis.points[vis.src]);
        document.getElementById("dirbackbtn").style.display = "flex";
    }
    if(i>1)
    {
        yellowPoint(vis.aStarPoints[i-1],vis.aStarPoints[i-2]);
    }
    direction.innerText = "Go " + vis.aStarDists[i] +"m towards "+vis.aStarNodes[i]+".";
    // console.log("get",getCompassRotation(),vis.aStarDirs[i],vis.aStarDirs);
    adjustDir(i);
    i=i+1;
}

function goBackDir(){
    i=i-2;
    if(i<0){
        i=0;
    }
    if(i==0)
    {
        orangePoint(vis.aStarPoints[i],vis.points[vis.src]);
    }
    else
    {
        orangePoint(vis.aStarPoints[i],vis.aStarPoints[i-1]);
    }
    showDir();
}

function yellowPoint(point,lastpoint){
    vis.ctx.fillStyle = 'yellow';
    vis.ctx.beginPath();
    vis.ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI, false);
    vis.ctx.fill();
    vis.ctx.lineWidth = 2  ;
    vis.ctx.strokeStyle = '#003300';
    vis.ctx.stroke();
    vis.ctx.beginPath();
    vis.ctx.strokeStyle = 'yellow';   
    vis.ctx.moveTo(point.x, point.y);
    vis.ctx.lineTo(lastpoint.x, lastpoint.y);
    vis.ctx.stroke();
}

function orangePoint(point,lastpoint){
    vis.ctx.fillStyle = 'orange';
    vis.ctx.beginPath();
    vis.ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI, false);
    vis.ctx.fill();
    vis.ctx.lineWidth = 2  ;
    vis.ctx.strokeStyle = '#003300';
    vis.ctx.stroke();
    vis.ctx.beginPath();
    vis.ctx.strokeStyle = 'orange';   
    vis.ctx.moveTo(point.x, point.y);
    vis.ctx.lineTo(lastpoint.x, lastpoint.y);
    vis.ctx.stroke();
}

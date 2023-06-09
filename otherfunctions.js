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
    compass.style.transition='transform 200ms ease-in';
    target.style.top=0;
    target.style.left=0;
    target.style.height='35em';
    target.style.width='19em';
}

var rt=0;

function rotate90(){
    rt-=90;
    target.style.transform = 'rotate('+rt+'deg)';
    target.style.transition='transform 200ms ease-in';
    compass.style.transform = 'rotate('+rt+'deg)';
    compass.style.transition='transform 200ms ease-in';
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
    console.log(vis.aStarNodes[i],vis.aStarDists[i]);
    direction.innerText = "Go " + vis.aStarDists[i] +"m towards "+vis.aStarNodes[i]+".";
    i=i+1;
}
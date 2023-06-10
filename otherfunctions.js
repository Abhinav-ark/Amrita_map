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
}

function originalPos(){
    target.style.transform = 'rotate(0deg)';
    target.style.transition='transform 200ms ease-in';
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
}

function mapNavInfo(){
    alert("On a TouchSceen, Use 1 finger to Pan, 2 fingers to zoom and 3 fingers to rotate.");
}
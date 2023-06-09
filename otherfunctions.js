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
}

function originalPos(){
    target.style.transform = 'rotate(0deg)';
    target.style.top=0;
    target.style.left=0;
    target.style.height='35em';
    target.style.width='19em';
}

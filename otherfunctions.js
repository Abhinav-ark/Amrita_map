function swapValues(){
    var start = document.getElementById("start");
    var end = document.getElementById("end");
    var temp = start.value;
    start.value = end.value;
    end.value = temp;
}
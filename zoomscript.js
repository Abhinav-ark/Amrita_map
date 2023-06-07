var target = document.querySelector("#canvas")
// target.addEventListener("wheel", function(e){
window.addEventListener("wheel", function(e){
e.preventDefault();
if (e.ctrlKey) {
    console.log("pinch", e.deltaY)
    var width = getStyleInt(target, "width")
    var newWidth = width - e.deltaY
    setStyleInt(target, "width", newWidth)
    setStyleInt(target, "height", newWidth)
} else {
    console.log("pan", e.deltaX, e.deltaY)
    var x = getStyleInt(target, "left")
    setStyleInt(target, "left", x-e.deltaX)
    var y = getStyleInt(target, "top")
    setStyleInt(target, "top", y-e.deltaY)
}
}, {passive: false})

function getStyleInt(target, key) {
var val = getComputedStyle(target)[key];
return parseInt(val, 10)
}

function setStyleInt(target, key, val) {
target.style[key] = val+"px"
}
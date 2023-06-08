var target = document.querySelector("#canvas");
var isPinching = false;
var startPinchDistance = 0;
var startWidth = 0;

target.addEventListener("wheel", function (e) {
  e.preventDefault();

  if (e.ctrlKey) {
    // Zoom
    var width = getStyleInt(target, "width");
    var newWidth = width - e.deltaY;
    setStyleInt(target, "width", newWidth);
    setStyleInt(target, "height", newWidth);
  } else {
    // Pan
    var x = getStyleInt(target, "left");
    setStyleInt(target, "left", x - e.deltaX);
    var y = getStyleInt(target, "top");
    setStyleInt(target, "top", y - e.deltaY);
  }
});

target.addEventListener("touchstart", function (e) {
  if (e.touches.length === 2) {
    // Start of pinch gesture
    isPinching = true;
    startPinchDistance = getPinchDistance(e.touches[0], e.touches[1]);
    startWidth = getStyleInt(target, "width");
  }
});

target.addEventListener("touchmove", function (e) {
  if (isPinching && e.touches.length === 2) {
    // Pinch gesture
    var currentPinchDistance = getPinchDistance(e.touches[0], e.touches[1]);
    var scale = currentPinchDistance / startPinchDistance;
    var newWidth = startWidth * scale;
    setStyleInt(target, "width", newWidth);
    setStyleInt(target, "height", newWidth);
  }
});

target.addEventListener("touchend", function () {
  // End of pinch gesture
  isPinching = false;
});

function getStyleInt(target, key) {
  var val = getComputedStyle(target)[key];
  return parseInt(val, 10);
}

function setStyleInt(target, key, val) {
  target.style[key] = val + "px";
}

function getPinchDistance(touch1, touch2) {
  var dx = touch1.clientX - touch2.clientX;
  var dy = touch1.clientY - touch2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

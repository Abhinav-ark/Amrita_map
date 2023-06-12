var source = document.querySelector("#map");
var target = document.querySelector("#canvas");
var compass = document.querySelector('#compass');
var isPinching = false;
var startPinchDistance = 0;
var startWidth = 0;
var touchStartX = 0;
var touchStartY = 0;
var panX = 0;
var panY = 0;
var rotationAngle = 0;
var maxDisplacement = 500; // Maximum displacement in pixels for pan gestures

source.addEventListener("wheel", function (e) {
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
    var newX = x - e.deltaX;
    var y = getStyleInt(target, "top");
    var newY = y - e.deltaY;

    // Limit pan displacement
    newX = Math.max(Math.min(newX, maxDisplacement), -maxDisplacement);
    newY = Math.max(Math.min(newY, maxDisplacement), -maxDisplacement);

    setStyleInt(target, "left", newX);
    setStyleInt(target, "top", newY);
  }
});

source.addEventListener("touchstart", function (e) {
  if (e.touches.length === 2) {
    // Start of pinch gesture
    isPinching = true;
    startPinchDistance = getPinchDistance(e.touches[0], e.touches[1]);
    startWidth = getStyleInt(target, "width");
  } else if (e.touches.length === 1) {
    // Start of pan gesture
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    panX = getStyleInt(target, "left");
    panY = getStyleInt(target, "top");
  }
});

source.addEventListener("touchmove", function (e) {
  if (isPinching && e.touches.length === 2) {
    // Pinch gesture
    var currentPinchDistance = getPinchDistance(e.touches[0], e.touches[1]);
    var scale = currentPinchDistance / startPinchDistance;
    var newWidth = startWidth * scale;
    setStyleInt(target, "width", newWidth);
    setStyleInt(target, "height", newWidth);
  } else if (e.touches.length === 1) {
    // Pan gesture
    var touchX = e.touches[0].clientX;
    var touchY = e.touches[0].clientY;
    var deltaX = touchX - touchStartX;
    var deltaY = touchY - touchStartY;
    var newX = panX + deltaX;
    var newY = panY + deltaY;

    // Limit pan displacement
    newX = Math.max(Math.min(newX, maxDisplacement), -maxDisplacement);
    newY = Math.max(Math.min(newY, maxDisplacement), -maxDisplacement);

    setStyleInt(target, "left", newX);
    setStyleInt(target, "top", newY);
  }
});

source.addEventListener("touchend", function () {
  // End of pinch gesture
  isPinching = false;
});

source.addEventListener("touchstart", function (e) {
  if (e.touches.length === 3) {
    // Start of rotation gesture
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }
});

source.addEventListener("touchmove", function (e) {
  if (e.touches.length === 3) {
    // Rotate
    rt=0;
    var touchX = e.touches[0].clientX;
    var touchY = e.touches[0].clientY;
    var deltaX = touchX - touchStartX;
    var deltaY = touchY - touchStartY;
    rotationAngle += (deltaX + deltaY) * 0.02;
    target.style.transform = 'rotate(' + rotationAngle + 'deg)';
    compass.style.transform= 'rotate(' + rotationAngle + 'deg)';
    adjustDir(i-1);
  }
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

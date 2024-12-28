var source = document.querySelector("#map");
var target = document.querySelector("#canvas");
var compass = document.querySelector("#compass");
var isPinching = false;
var startPinchDistance = 0;
var startWidth = 0;
var touchStartX = 0;
var touchStartY = 0;
var panX = 0;
var panY = 0;
var rotationAngle = 0;
var maxDisplacement = 500;
var scale = 1;

function getCurrentRotation() {
  const style = window.getComputedStyle(target);
  const matrix = new WebKitCSSMatrix(style.transform);
  return Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
}

function applyTransform() {
  //getting current rotatio
  if (rotationAngle === 0) {
      rotationAngle = getCurrentRotation();
  }

  target.style.transform = `rotate(${rotationAngle}deg) scale(${scale})`;
  compass.style.transform = `rotate(${rotationAngle}deg)`;
}



source.addEventListener("wheel", function (e) {
  e.preventDefault();

  if (e.ctrlKey) {
      // Preserve rotation when zooming
      const currentRotation = getCurrentRotation();
      scale -= e.deltaY * 0.01;
      scale = Math.max(0.5, Math.min(3, scale));
      rotationAngle = currentRotation; // Maintain rotation
      applyTransform();
  } else {
      var x = getStyleInt(target, "left");
      var newX = x - e.deltaX;
      var y = getStyleInt(target, "top");
      var newY = y - e.deltaY;

      newX = Math.max(Math.min(newX, maxDisplacement), -maxDisplacement);
      newY = Math.max(Math.min(newY, maxDisplacement), -maxDisplacement);

      setStyleInt(target, "left", newX);
      setStyleInt(target, "top", newY);
  }
});


source.addEventListener("touchstart", function (e) {
    if (e.touches.length === 2) {
        isPinching = true;
        startPinchDistance = getPinchDistance(e.touches[0], e.touches[1]);
        startWidth = target.getBoundingClientRect().width;
    } else if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        panX = getStyleInt(target, "left");
        panY = getStyleInt(target, "top");
    } else if (e.touches.length === 3) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }
});

source.addEventListener("touchmove", function (e) {
  if (isPinching && e.touches.length === 2) {
      // Preserve rotation during pinch zoom
      const currentRotation = getCurrentRotation();
      var currentPinchDistance = getPinchDistance(e.touches[0], e.touches[1]);
      scale = currentPinchDistance / startPinchDistance;
      scale = Math.max(0.5, Math.min(3, (startWidth * scale) / getStyleInt(target, "width")));
      rotationAngle = currentRotation; // Maintain rotation
      applyTransform();
  } else if (e.touches.length === 1) {
      var touchX = e.touches[0].clientX;
      var touchY = e.touches[0].clientY;
      var deltaX = touchX - touchStartX;
      var deltaY = touchY - touchStartY;
      var newX = panX + deltaX;
      var newY = panY + deltaY;

      newX = Math.max(Math.min(newX, maxDisplacement), -maxDisplacement);
      newY = Math.max(Math.min(newY, maxDisplacement), -maxDisplacement);

      setStyleInt(target, "left", newX);
      setStyleInt(target, "top", newY);
  } else if (e.touches.length === 3) {
      var touchX = e.touches[0].clientX;
      var touchY = e.touches[0].clientY;
      var deltaX = touchX - touchStartX;
      var deltaY = touchY - touchStartY;
      rotationAngle += (deltaX + deltaY) * 0.02;
      applyTransform();
  }
});

source.addEventListener("touchend", function () {
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
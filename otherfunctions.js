function swapValues() {
  var start = document.getElementById("start");
  var end = document.getElementById("end");
  var temp = start.value;
  start.value = end.value;
  end.value = temp;
}

function showDistanceContainer() {
  document.getElementsByClassName("distanceCont")[0].style.display = "flex";
}

function hideDistanceContainer() {
  document.getElementsByClassName("distanceCont")[0].style.display = "none";
}

function clearSearch() {
  document.getElementById("start").value = null;
  document.getElementById("end").value = null;

  clearPlaces();
  hideOnYourWay();
  hideDistanceContainer();
  vis.generatePoints();
  hideNav();
}

function originalPos() {
  target.style.transform = "rotate(0deg)";
  target.style.transition = "transform 200ms ease-in";
  compass.style.transform = "rotate(0deg)";
  target.style.top = 0;
  target.style.left = 0;
  target.style.height = "35em";
  target.style.width = "19em";
  if (i >= 1) {
    adjustDir(i - 1);
  }
  rt = 0;
}

function getCompassRotation() {
  var st = window.getComputedStyle(compass, null);
  var tm = st.getPropertyValue("transform");
  var values = tm.split("(")[1].split(")")[0].split(",");
  var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
  return angle < 0 ? angle + 360 : angle;
}

function adjustDir(i) {
  var deg = (getCompassRotation() + vis.aStarDirs[i]) % 360;
  dirArrow.style.transform = "rotate(" + deg + "deg)";
  dirArrow.style.transition = "transform 200ms ease-in";
}

var rt = 0;

function rotate90() {
  rt -= 90;
  target.style.transform = "rotate(" + rt + "deg)";
  target.style.transition = "transform 200ms ease-in";
  compass.style.transform = "rotate(" + rt + "deg)";
  adjustDir(i - 1);
}
function R_rotate15() {
  rt += 15;
  target.style.transform = "rotate(" + rt + "deg)";
  target.style.transition = "transform 200ms ease-in";
  compass.style.transform = "rotate(" + rt + "deg)";
  adjustDir(i - 1);
}

function L_rotate15() {
  rt -= 15;
  target.style.transform = "rotate(" + rt + "deg)";
  target.style.transition = "transform 200ms ease-in";
  compass.style.transform = "rotate(" + rt + "deg)";
  adjustDir(i - 1);
}
function compassNorth() {
  target.style.transform = "rotate(" + 0 + "deg)";
  target.style.transition = "transform 200ms ease-in";
  compass.style.transform = "rotate(" + 0 + "deg)";
  adjustDir(i - 1);
}

function mapNavInfo() {
  alert(
    "On a TouchScreen Use 1 finger to Pan, 2 fingers to zoom and 3 fingers to rotate.\n Shortcut Keys: \n Ctrl + --> to rotate 15 degrees clockwise \n Ctrl + <-- to rotate 15 degrees anti clockwise"
  );
}

function showNav() {
  if (window.screen.width < 540) {
    document.getElementsByClassName("navigators")[0].style.display = "none";
    document.getElementsByClassName("navigators")[1].style.display = "flex";
  } else {
    document.getElementsByClassName("navigators")[0].style.display = "flex";
    document.getElementsByClassName("navigators")[1].style.display = "none";
  }
}

function hideNav() {
  document.getElementsByClassName("navigators")[1].style.display = "none";
  document.getElementsByClassName("navigators")[0].style.display = "none";
}

function hideOnYourWay() {
  document.getElementsByClassName("placecont")[1].style.display = "none";
  document.getElementsByClassName("placecont")[0].style.display = "none";
}

function showOnYourWay() {
  if (window.screen.width < 540) {
    document.getElementsByClassName("placecont")[0].style.display = "none";
    document.getElementsByClassName("placecont")[1].style.display = "block";
  } else {
    document.getElementsByClassName("placecont")[0].style.display = "block";
    document.getElementsByClassName("placecont")[1].style.display = "none";
  }
}

const confirmfinish = document.getElementById("confirmfinish");
confirmfinish.style.display = "none";

function finishNav() {
  confirmfinish.style.display = "grid";
  confirmfinish.showModal();
}

function closeFinish() {
  confirmfinish.close();
  confirmfinish.style.display = "none";
  goBackDir();
  loadOnYourWay();
  showNav();
  showOnYourWay();
}

moreinfo = document.getElementById("moreinfo");
function showMore() {
  moreinfo.style.display = "block";
  moreinfo.showModal();
}

function closeMore() {
  resetCarousel();
  showHideIcons();
  moreinfo.close();
  moreinfo.style.display = "none";
}

var i = 0;
function showDir() {
  if (i == vis.aStarNodes.length) {
    hideNav();
    finishNav();
  }
  if (i <= 0) {
    document.getElementById("dirbackbtn").style.display = "none";
  }
  console.log(vis.aStarNodes[i], vis.aStarDists[i]);
  if (i == 1) {
    yellowPoint(vis.aStarPoints[i - 1], vis.points[vis.src]);
    document.getElementById("dirbackbtn").style.display = "flex";
  }
  if (i > 1) {
    yellowPoint(vis.aStarPoints[i - 1], vis.aStarPoints[i - 2]);
  }
  direction.innerText =
    "Go " + vis.aStarDists[i] + "m towards " + vis.aStarNodes[i] + ".";
  adjustDir(i);
  i = i + 1;
  loadOnYourWay();
  if (i == vis.aStarNodes.length + 1) {
    hideOnYourWay();
  }
}

function goBackDir() {
  i = i - 2;
  if (i < 0) {
    i = 0;
  }
  if (i == 0) {
    orangePoint(vis.aStarPoints[i], vis.points[vis.src]);
  } else {
    orangePoint(vis.aStarPoints[i], vis.aStarPoints[i - 1]);
  }
  showDir();
}

// 0->desktop
//1->mobile
var rindex = 0;

var places = document.getElementsByClassName("places")[rindex];

var direction = document.getElementsByClassName("direction")[rindex];

var dirArrow = document.getElementsByClassName("dirArrow")[rindex];

function handleResize() {
  if (window.screen.width < 540) {
    rindex = 1;
  } else {
    rindex = 0;
  }
  places = document.getElementsByClassName("places")[rindex];
  direction = document.getElementsByClassName("direction")[rindex];
  dirArrow = document.getElementsByClassName("dirArrow")[rindex];
}

handleResize();

window.addEventListener("resize", () => {
  handleResize();
  showNav();
  i = i - 1;
  showDir();
});

function clearPlaces() {
  var div = document.getElementsByClassName("places")[rindex];

  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

hideOnYourWay();

function loadOnYourWay() {
  clearPlaces();
  showOnYourWay();

  var placetemplate = document.getElementsByClassName("placetemplate")[rindex];

  document.getElementsByClassName("placetcont")[rindex].style.display = "flex";
  document.getElementsByClassName("placetcont")[
    Math.abs(rindex - 1)
  ].style.display = "none";

  for (let j = i - 1; j < vis.aStarNodes.length; j++) {
    var placeelement = placetemplate.content.cloneNode(true);
    placeelement.querySelector(".placetitle").innerHTML = vis.aStarNodes[j];
    var description = placeDetails[vis.aStarNodes[j]];
    placeelement.querySelector(".placedesc .ptext").innerHTML =
      description["desc"];
    placeelement.querySelector(".placeimg img").src = description["img"];
    placeelement.querySelector(".placedesc .more").onclick = description["fn"];
    places.appendChild(placeelement);
  }
}

function yellowPoint(point, lastpoint) {
  vis.ctx.fillStyle = "yellow";
  vis.ctx.beginPath();
  vis.ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI, false);
  vis.ctx.fill();
  vis.ctx.lineWidth = 2;
  vis.ctx.strokeStyle = "#003300";
  vis.ctx.stroke();
  vis.ctx.beginPath();
  vis.ctx.strokeStyle = "yellow";
  vis.ctx.moveTo(point.x, point.y);
  vis.ctx.lineTo(lastpoint.x, lastpoint.y);
  vis.ctx.stroke();
}

function orangePoint(point, lastpoint) {
  vis.ctx.fillStyle = "orange";
  vis.ctx.beginPath();
  vis.ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI, false);
  vis.ctx.fill();
  vis.ctx.lineWidth = 2;
  vis.ctx.strokeStyle = "#003300";
  vis.ctx.stroke();
  vis.ctx.beginPath();
  vis.ctx.strokeStyle = "orange";
  vis.ctx.moveTo(point.x, point.y);
  vis.ctx.lineTo(lastpoint.x, lastpoint.y);
  vis.ctx.stroke();
}

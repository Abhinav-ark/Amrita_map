firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

var iconref =0;
var scroll = [0,214,428]; 

const resetCarousel = () => {
    iconref=0;
    carousel.classList.add("dragging");
    carousel.scrollLeft = 0;
    carousel.classList.remove("dragging");
}

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    if(iconref>2){iconref=2}else{if(iconref<0){iconref=0}};
    arrowIcons[0].style.display = iconref == 0 ? "none" : "block";
    arrowIcons[1].style.display = iconref == 2 ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        icon.id == "left" ? iconref = iconref-1 : iconref = iconref+1;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    console.log("kk");
    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        iconref=iconref+1;
        showHideIcons();
        return carousel.scrollLeft = scroll[iconref];
    }
    // if user is scrolling to the left
    iconref = iconref-1;
    showHideIcons();
    carousel.scrollLeft =scroll[iconref];
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

const mapContainer = document.querySelector("#map"); // Replace with the correct map container selector

let isPanning = false;
let startX, startY, scrollLeft, scrollTop;

mapContainer.addEventListener("mousedown", (e) => {
    isPanning = true;
    startX = e.pageX - mapContainer.offsetLeft;
    startY = e.pageY - mapContainer.offsetTop;
    scrollLeft = mapContainer.scrollLeft;
    scrollTop = mapContainer.scrollTop;
    mapContainer.style.cursor = "grabbing";
});

mapContainer.addEventListener("mousemove", (e) => {
    if (!isPanning) return;
    e.preventDefault();
    const x = e.pageX - mapContainer.offsetLeft;
    const y = e.pageY - mapContainer.offsetTop;
    const walkX = (x - startX); // Horizontal distance moved
    const walkY = (y - startY); // Vertical distance moved
    mapContainer.scrollLeft = scrollLeft - walkX;
    mapContainer.scrollTop = scrollTop - walkY;
});

mapContainer.addEventListener("mouseup", () => {
    isPanning = false;
    mapContainer.style.cursor = "grab";
});

mapContainer.addEventListener("mouseleave", () => {
    isPanning = false;
    mapContainer.style.cursor = "grab";
});


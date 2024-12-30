const firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, 
    isDragging = false, 
    prevPageX, 
    prevScrollLeft, 
    positionDiff;

let iconref = 0;
const scroll = [0, 214, 428];

const preloadVisibleImages = () => {
    const visibleImages = Array.from(carousel.querySelectorAll("img"))
        .filter((img, index) => {
            const imgPosition = index - iconref;
            return imgPosition >= -1 && imgPosition <= 1;
        });

    visibleImages.forEach(img => {
        if (img.dataset.src && !img.classList.contains('loaded')) {
            loadImage(img);
        }
    });
}

const resetCarousel = () => {
    iconref = 0;
    carousel.classList.add("dragging");
    carousel.scrollLeft = 0;
    carousel.classList.remove("dragging");
    
    carousel.querySelectorAll("img").forEach(img => {
        img.classList.remove('loaded');
        img.src = '';
    });
}

const showHideIcons = () => {
    if (iconref > 2) {
        iconref = 2;
    } else if (iconref < 0) {
        iconref = 0;
    }
    arrowIcons[0].style.display = iconref == 0 ? "none" : "block";
    arrowIcons[1].style.display = iconref == 2 ? "none" : "block";
    preloadVisibleImages();
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

const placeDetails =
{
    "Police Station":{desc:"Been there since the beginning of college in 1995. Provides reliable security.",img:"./Res/police_station.jpg",fn:policestation},
    "Burger":{desc:"Best Burger Place in the locality. Must try the special cheese burger.",img:"./Res/burger.jpg",fn:burger},
    "Mall":{desc:"Biggest Mall in coimbatore. Lovely for shopping any desired thing",img:"./Res/mall.jpg",fn:mall},
    "Arcade":{desc:"Makes you feel the Nostalgia with the OG arcade games",img:"./Res/arcade.jpg",fn:arcade},
    "Bridge":{desc:"One of the oldest fascinating architectural marvels since 1995.",img:"./Res/bridge.jpg",fn:bridge},
    "Railway Station":{desc:"Fast access to trains to go to coimbatore and palakkad.",img:"./Res/railway_station.jpg",fn:railwaystation},
    "Island":{desc:"Boating and kayaking destination. It has a small beach perfect for relaxing on weekends.",img:"./Res/island.jpg",fn:island},
    "Store":{desc:"General Store of Amrita, Gives you access to anything you will need for existence.",img:"./Res/store.jpg",fn:store}
};

const moreinfotitle = document.querySelector("#moreinfotitle h2");
const moreinfotext =document.getElementById("moreinfotext");
const carousel = document.querySelector(".carousel");
const images = carousel.querySelectorAll("img");

function policestation(){
    moreinfotitle.innerHTML="Police Station";
    images.forEach((img, index) => {
        img.classList.add('lazy-load-image');
        img.dataset.src = `./Res/Carousel/Policestation${index + 1}.jpg`;
        initializeLazyLoad(img);
    });
    moreinfotext.innerHTML="Located in the North East end of our campus, The Police station is one of the oldest buildings in Amrita, protecting the students and the staff everyday. There are 20 police personal working 24x7.";
    showMore();
}

function burger(){
    moreinfotitle.innerHTML="Burger Stop";
    images.forEach((img, index) => {
        img.classList.add('lazy-load-image');
        img.dataset.src = `./Res/Carousel/Burger${index + 1}.jpg`;
        initializeLazyLoad(img);
    });
    moreinfotext.innerHTML="Located in the North West end of our campus, The Burger stop is citywide famous for its wide variety of burgers. The cheese burger and double chocolate shake are must tries here.<br>Timings: 8am to 8pm";
    showMore();
}

function mall(){
    moreinfotitle.innerHTML="The Amrita Mall";
    images.forEach((img, index) => {
        img.classList.add('lazy-load-image');
        img.dataset.src = `./Res/Carousel/Mall${index + 1}.jpg`;
        initializeLazyLoad(img);
    });
    moreinfotext.innerHTML="Largest Mall in Ettimadai, covering 50,000sq.ft, spanning over 4 floors incorporating over 40 brands is one of the most famous weekend hangout spots of Amrita.<br> Timings: 10am to 8pm";
    showMore();
}

function arcade(){
    moreinfotitle.innerHTML="Arcade";
    images.forEach((img, index) => {
        img.classList.add('lazy-load-image');
        img.dataset.src = `./Res/Carousel/Arcade${index + 1}.jpg`;
        initializeLazyLoad(img);
    });
    moreinfotext.innerHTML="Weekend spot for retro style arcade games, bowling, dashing cars and a lot more...<br> Timings: 5pm to 8pm <br> Entry Fee: $200";
    showMore();
}

function bridge(){
    moreinfotitle.innerHTML="Bridge";
    images.forEach((img, index) => {
        img.classList.add('lazy-load-image');
        img.dataset.src = `./Res/Carousel/Bridge${index + 1}.jpg`;
        initializeLazyLoad(img);
    });
    moreinfotext.innerHTML="The Famous river bridge of Amrita, is one of the most fascinating Architectural marvels here since its construction in 1995.";
    showMore();
}

function railwaystation(){
    moreinfotitle.innerHTML="Ettimadai Railway Station";
    images.forEach((img, index) => {
        img.classList.add('lazy-load-image');
        img.dataset.src = `./Res/Carousel/Railwaystation${index + 1}.jpg`;
        initializeLazyLoad(img);
    });
    moreinfotext.innerHTML="Two Platform Campus Railway Station of Amrita, Providing connectivity to Coimbatore and Palakkad city. <br> <b>Train Timings: <br> Palakkad 10:00am, 5:00pm <br> Coimbatore 8:15am, 3:15pm</b> ";
    showMore();
}

function island(){
    moreinfotitle.innerHTML="Ettimadai Island";
    images.forEach((img, index) => {
        img.classList.add('lazy-load-image');
        img.dataset.src = `./Res/Carousel/Island${index + 1}.jpg`;
        initializeLazyLoad(img);
    });
    moreinfotext.innerHTML="The most gorgeous landscape of Amrita, filled with beautiful scenery and Biodiversity. Serves as a surfing and kayaking destination for students. The Beach is perfect for relaxing on weekends.";
    showMore();
}

function store(){
    moreinfotitle.innerHTML="Amrita General Store";
    images.forEach((img, index) => {
        img.classList.add('lazy-load-image');
        img.dataset.src = `./Res/Carousel/Store${index + 1}.jpg`;
        initializeLazyLoad(img);
    });
    moreinfotext.innerHTML="General Store of Amrita, Gives you access to anything you will need for existence. Groceries, Stationary, Snacks, Fruits and Vegetables, Hardware, Basic Electronics, anything you name, they have it!";
    showMore();
}


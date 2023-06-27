const placeDetails =
{
    "Police Station":{desc:"Been there since the beginning of college in 1995. Provides reliable security.",img:"./Res/police_station.jpg"},
    "Burger":{desc:"Best Burger Place in the locality. Must try the special cheese burger.",img:"./Res/burger.jpg"},
    "Mall":{desc:"Biggest Mall in coimbatore. Lovely for shopping any desired thing",img:"./Res/mall.jpg"},
    "Arcade":{desc:"Makes you feel the Nostalgia with the OG arcade games",img:"./Res/arcade.jpg"},
    "Bridge":{desc:"One of the oldest fascinating architectural marvels since 1995.",img:"./Res/bridge.jpg"},
    "Railway Station":{desc:"Fast access to trains to go to coimbatore and palakkad.",img:"./Res/railway_station.jpg"},
    "Island":{desc:"Boating and kayaking destination. It has a small beach perfect for relaxing on weekends.",img:"./Res/island.jpg"},
    "Store":{desc:"General Store of Amrita, Gives you access to anything you will need for existence.",img:"./Res/store.jpg"}
};

const points = [{x:Math.floor(0.71*this.width), y:Math.floor(0.15*this.height), id:0, distance:Infinity, parent:null},
    {x:Math.floor(0.72*this.width), y:Math.floor(0.27*this.height), id:1, distance:Infinity, parent:null},
    {x:Math.floor(0.6*this.width), y:Math.floor(0.15*this.height), id:2, distance:Infinity, parent:null},
    {x:Math.floor(0.6*this.width), y:Math.floor(0.27*this.height), id:3, distance:Infinity, parent:null},
    {x:Math.floor(0.68*this.width), y:Math.floor(0.5*this.height), id:4, distance:Infinity, parent:null},
    {x:Math.floor(0.6*this.width), y:Math.floor(0.59*this.height), id:5, distance:Infinity, parent:null},
    {x:Math.floor(0.85*this.width), y:Math.floor(0.65*this.height), id:6, distance:Infinity, parent:null},
    {x:Math.floor(0.63*this.width), y:Math.floor(0.66*this.height), id:7, distance:Infinity, parent:null},
    {x:Math.floor(0.69*this.width), y:Math.floor(0.8*this.height), id:8, distance:Infinity, parent:null}];

const map={"Police Station":0, "Burger":1, "Mall":2, "Arcade":3, "Bridge":4, "Railway Station":5, "Island":6, "Store":7};

const refs={0:"Police Station", 1:"Burger", 2:"Mall", 3:"Arcade", 4:"Bridge", 5:"Railway Station", 6:"Island", 7:"Store"};

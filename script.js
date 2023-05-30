class Visualizer{
    constructor(w, h, ctx, distance, nodeSlider, pathFrequency){
        this.points = [];
        this.edges = {};
        this.int = 0;
        this.width = w;
        this.height = h;
        this.ctx = ctx;
        this.distance = distance;
        this.nodeNumber = 15;
        this.pathFrequency = 0.8;
    }

    generatePoints = () =>{
        let x = this.nodeNumber;
        this.distance.innerText = "";
        clearInterval(this.int);
        this.points = [];
        this.edges = {};

        for(let i = 0; i < x; ++i){
            const point = this.randomPoint(i);
            this.points.push(point);
            this.edges[point.id] = []
        }

        this.generateEdges();
        this.clearCanvas();
        this.drawPoints();
    }


    generateEdges = () => {
        const threshold = this.pathFrequency;
        this.points.forEach(point1 => 
            this.points.forEach(point2 =>{
                if(point1 !== point2 && Math.random() > threshold ){
                    
                    if((point1.id === 0 && point2.id === this.points.length - 1) || ((point2.id === 0 && point1.id === this.points.length - 1))){

                    }else{

                        this.edges[point1.id].push(point2.id);
                        this.edges[point2.id].push(point1.id);
                    }
                }
            })
        )
        this.sortEdges();
    }

    randomPoint = (i) => {
        const x = Math.floor(Math.random() * this.width);
        const y = Math.floor(Math.random() * this.height);
        const id = i;
        return {x, y, id, distance: Infinity, parent: null}
    }

    drawPoints(){
        this.drawEdges();

        this.points.forEach((point, idx) => {
            let r = 4
            this.ctx.fillStyle = 'green';
            if(idx === 0){
                r=7
                this.ctx.fillStyle="blue";}
            else if 
            (idx === this.points.length -1 ){
                r=7
                this.ctx.fillStyle='red';
            }


            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, r, 0, 2 * Math.PI, false);

  

            this.ctx.fill();
            this.ctx.lineWidth = 2  ;
            this.ctx.strokeStyle = '#003300';
            this.ctx.stroke();
        })

    }

    clearCanvas(){
        this.ctx.fillStyle="white"
        this.ctx.fillRect(0,0,this.width, this.height)
    }

    getDistance(A, B){
        let a = this.points[A].x - this.points[B].x
        let b = this.points[A].y - this.points[B].y
        let dist = Math.sqrt(a * a + b * b)
        return dist;
    }

    sortEdges(){
        Object.keys(this.edges).forEach(node => {
            this.edges[node].sort((a, b) => this.getDistance(node, a) - this.getDistance(node,b))
            this.edges[node] = [... new Set(this.edges[node])];    
        })
    }

    drawPath(pointA, pointB, color = 'lightgrey'){
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;   
        this.ctx.moveTo(pointA.x, pointA.y);
        this.ctx.lineTo(pointB.x, pointB.y);
        this.ctx.stroke();
        if(color === 'black'){
            this.distance.innerText = "Total travel distance to last point: " + Math.floor(pointB.distance);
        }

    }

    drawEdges(){
        Object.keys(this.edges).forEach(
            node => {
                this.edges[node].forEach(node2 => {
                    this.drawPath(this.points[node], this.points[node2])
                })
            }
        )
    }

    dijkstra(){

        if(this.points.length === 0){
            this.ctx.font = '48px serif';
            this.ctx.fillText("Generate points first!", 10, 50);
            return;
        }

        this.points[0].distance = 0;
        let visited = new Set();
        let queue = [...this.points];
        let node;
        let lines = [];
        let solved = false;
        while(queue.length > 0){

            let distances = queue.map(el => el.distance)
            let min = Math.min(...distances)
            let idx = distances.indexOf(min)
            let lastNode = node;
            node = queue[idx];


            if(node.parent !== null){

                lines.push([this.points[node.parent], node, 'black'].slice())


                // this.drawPath(this.points[node.parent], node, 'black');
            }

            queue.splice(idx, 1);
            visited.add(node);

            if(node.id === this.points.length - 1){
                if(node.distance !== Infinity){
                    solved = true;
                }
                break;
            }

            this.edges[node.id].forEach(node2 => {
                if(visited[node2]){return;}

                let newdist = node.distance + this.getDistance(node.id, node2);

                if(newdist < this.points[node2].distance){
                    this.points[node2].distance =  newdist
                    this.points[node2].parent = node.id;
                }
            })
        }
        if(!solved){
            this.ctx.font = '48px serif';
            this.ctx.fillText("No connection to target", 10, 50);
        }
        else{
            while(node.parent !== null){

                lines.push([node, this.points[node.parent], 'red'].slice())

                // this.drawPath(node, this.points[node.parent], 'red');
                node = this.points[node.parent];
            }
        }

        this.int = this.drawLinesSlowly(lines);
        return node.distance;
    }


    drawLinesSlowly(lines){
        
        if(this.int){

            clearInterval(this.int)
            this.clearCanvas();
            this.drawEdges();
            this.drawPoints();
        }

        if(lines.length === 0){
            return;
        }

        const drawPath = this.drawPath.bind(this);


        let int = setInterval( 
            handleThing, 800
        )
        let i = 0

        function handleThing(){
            let next = lines[i]
            drawPath(...next);
            i += 1
            if(i >= lines.length){
                clearInterval(int)
            }

        }


        return int;
    }


}

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const width = canvas.width;
    const height = canvas.height
    let ctx = canvas.getContext("2d");

    let distance = document.getElementById('distance');


   
    const vis = new Visualizer(width, height, ctx, distance);
    vis.generatePoints();
    vis.dijkstra();

    let populate = document.getElementById('populate');
    let search = document.getElementById('search');

  


    populate.onclick = ()=>vis.generatePoints();
    search.onclick = ()=>vis.dijkstra();
    

    const slider = document.getElementById("nodeSlider");
    const slider2 = document.getElementById("pathFrequency");

    slider.oninput = function() {
        vis.nodeNumber = this.value; 
      }
      slider2.oninput = function() {
        vis.pathFrequency = (100 - this.value) / 100; 
      }



});

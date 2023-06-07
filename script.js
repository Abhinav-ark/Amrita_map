class Visualizer{
    constructor(w, h, ctx, distance, nodeSlider){
        this.points = [];
        this.edges = {};
        this.int = 0;
        this.width = w;
        this.height = h;
        this.ctx = ctx;
        this.distance = distance;
    }

    generatePoints = () =>{
        this.distance.innerText = "";
        clearInterval(this.int);
        this.points = [{x:Math.floor(0.5*this.width), y:Math.floor(0.2*this.height), id:0, distance:Infinity, parent:null},
                       {x:Math.floor(0.6*this.width), y:Math.floor(0.5*this.height), id:1, distance:Infinity, parent:null},
                       {x:Math.floor(0.4*this.width), y:Math.floor(0.5*this.height), id:2, distance:Infinity, parent:null},
                       {x:Math.floor(0.6*this.width), y:Math.floor(0.6*this.height), id:3, distance:Infinity, parent:null},
                       {x:Math.floor(0.5*this.width), y:Math.floor(0.7*this.height), id:4, distance:Infinity, parent:null},
                       {x:Math.floor(0.7*this.width), y:Math.floor(0.75*this.height), id:5, distance:Infinity, parent:null},
                       {x:Math.floor(0.9*this.width), y:Math.floor(0.8*this.height), id:6, distance:Infinity, parent:null},
                       {x:Math.floor(0.6*this.width), y:Math.floor(0.67*this.height), id:7, distance:Infinity, parent:null}];
        
        //all neighbours should be in sorted order
        //remove 5 7 for accessibility
        this.edges = {0:[1,2],1:[2,6],2:[0,1,3,4],3:[2,4],4:[2,5],5:[4,6,7],6:[1,5],7:[5]};
        //this.edges = {0:[1,2],1:[2,6],2:[0,1,3,4],3:[2,4],4:[2,5],5:[4,6],6:[1,5],7:[]};

        //this.sortEdges();
        this.clearCanvas();
        this.drawPoints();
    }


    drawPoints(source=-1,dest=-1){
        this.drawEdges();
        console.log("s",source,dest);
        //this.dijkstra(source,dest);
        this.points.forEach((point, idx) => {
            let r = 4
            this.ctx.fillStyle = 'green';
            if(idx == source){
                r=7
                this.ctx.fillStyle="blue";}
            else if 
            (idx == dest ){
                r=7
                this.ctx.fillStyle='red';
            }

            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, r, 0, 2 * Math.PI, false);

  

            this.ctx.fill();
            this.ctx.lineWidth = 2  ;
            this.ctx.strokeStyle = '#003300';
            this.ctx.stroke();
        });
        //this.sortEdges();
        //this.dijkstra(Number(source),Number(dest));
    }

    clearCanvas(){
        /*this.ctx.fillStyle="transparent"*/
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

    dijkstra(src,dst){
        if(!((src===-1) || (dst===-1)))
        {
            //
            [this.points[0],this.points[src]]=[this.points[src],this.points[0]];
            [this.points[0].id,this.points[src].id]=[this.points[src].id,this.points[0].id];
            [this.points[this.points.length-1],this.points[dst]]=[this.points[dst],this.points[this.points.length-1]];
            [this.points[this.points.length-1].id,this.points[dst].id]=[this.points[dst].id,this.points[this.points.length-1].id];
            this.sortEdges();
            console.log("d",src,dst);
            //

            this.points[src].distance = 0;
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

                if(node.id === this.points.length-1){
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
                this.ctx.font = '30px serif';
                this.ctx.fillText("Place not accessible", 25, 50);
            }
            else{
                while(node.parent !== null){

                    lines.push([node, this.points[node.parent], 'red'].slice())

                    // this.drawPath(node, this.points[node.parent], 'red');
                    node = this.points[node.parent];
                }
            }

            this.int = this.drawLinesSlowly(lines,src,dst);
            return node.distance;
        }
    }



    drawLinesSlowly(lines,src,dst){
        
        if(this.int){

            clearInterval(this.int)
            this.clearCanvas();
            this.drawEdges();
            this.drawPoints(src,dst);
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

    solve()
    {
        let src=Number(document.getElementById('start').value);
        let dst=Number(document.getElementById('end').value);
        this.clearCanvas();
        this.drawPoints(src,dst);
        if(src!=0 && dst!=0)
        {
            this.dijkstra(src,dst);
        }
        
    }

}

document.addEventListener("DOMContentLoaded", () => {
    var canvas = new fabric.Canvas("canvas");
    // var canvas=document.getElementById("canvas")
    const width = canvas.width;
    const height = canvas.height
    let ctx = canvas.getContext("2d");

    let distance = document.getElementById('distance');

    const vis = new Visualizer(width, height, ctx, distance);
    vis.generatePoints();
    
    //
    
    //
    
    let search = document.getElementById('search');
    search.onclick = ()=>vis.solve();

});
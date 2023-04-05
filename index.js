

class Circle {
    constructor(x,y){
        this.active = false;
        this.x = x;
        this.y = y;

        this.circle = document.createElement('div');
        this.circle.classList.add('circle');
        document.body.appendChild(this.circle);
    }
    distanceFrom(x,y){
        return Math.sqrt((x-this.x)**2 + (y-this.y)**2);
    }
}


class answerCircle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.placed = false;
        this.ans_circle = document.createElement('div');
        this.ans_circle.classList.add('ans_circle');
        document.body.appendChild(this.ans_circle);
    }
    isPlaced(){
        this.placed = true;
    }
}

class Line{
    constructor(st,en){
        this.st = st;
        this.en = en;
        this.edge = document.createElement('div');
        this.edge.classList.add('line');
        document.body.appendChild(this.edge);
    }
}
const NUM_CIRCLE = 5;
const NUM_EDGE = 10; 

const circles = [];
const answer_circles=[];
const lines = [];
let table = new Array(NUM_CIRCLE);
for (let i=0; i<NUM_CIRCLE; i++){
    table[i] = new Array(NUM_CIRCLE).fill(false);
}
for (let i=0; i<NUM_CIRCLE; i++){
    var x = Math.random() *400;
    var y = Math.random() *400;
    circles.push(new Circle(x,y));
    circles[i].circle.style.top = circles[i].y+'px';
    circles[i].circle.style.left = circles[i].x+'px';
    //간선이 안겹치도록 노드를 배치하는 알고리즘?
    x = Math.random()*1200;
    y = Math.random()*800;
    answer_circles.push(new answerCircle(x,y));
    answer_circles[i].ans_circle.style.top = answer_circles[i].y+'px';
    answer_circles[i].ans_circle.style.left = answer_circles[i].x+'px';
    
}
const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext("2d");



for (let i=0; i<NUM_EDGE; i++){
    var s = Math.floor(Math.random()*(NUM_CIRCLE));
    var e = Math.floor(Math.random()*(NUM_CIRCLE));

    lines.push(new Line(s,e));
    ctx.beginPath();
    ctx.moveTo(circles[lines[i].st].x,circles[lines[i].st].y);
    ctx.lineTo(circles[lines[i].en].x,circles[lines[i].en].y);
    ctx.lineWidth = 5
    ctx.strokeStyle = 'orange';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(answer_circles[lines[i].st].x,answer_circles[lines[i].st].y);
    ctx.lineTo(answer_circles[lines[i].en].x,answer_circles[lines[i].en].y);
    ctx.lineWidth = 5
    ctx.strokeStyle = 'gray';
    ctx.stroke();

}

document.addEventListener("keydown",(e)=>{
    if (e.key == "Enter"){
        circles.forEach((obj,index)=>{
                console.log("pressed");
                obj.active = true;
                obj.circle.classList.add('border');
            
        });
    }
});
document.addEventListener("mousedown",(e)=>{
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    var ableToSelect = true;
    circles.forEach((obj,index)=>{
        if(ableToSelect && obj.distanceFrom(mouseX,mouseY)<=30){
            obj.active = true;
            obj.circle.classList.add('border');
            ableToSelect = false; return;
        }
    });
});
document.addEventListener("mouseup",(e)=>{
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    circles.forEach((obj,index)=>{
        obj.active = false;
        obj.circle.classList.remove('border');
    });
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    lines.forEach((l,index)=>{

        ctx.beginPath();
        ctx.strokeStyle = 'gray';
        ctx.moveTo(answer_circles[lines[index].st].x,answer_circles[lines[index].st].y);
        ctx.lineTo(answer_circles[lines[index].en].x,answer_circles[lines[index].en].y);
        ctx.lineWidth = 5
        ctx.stroke();
    });
    lines.forEach((l,index)=>{
        ctx.beginPath();
        ctx.moveTo(circles[lines[index].st].x,circles[lines[index].st].y);
        ctx.lineTo(circles[lines[index].en].x,circles[lines[index].en].y);
        ctx.lineWidth = 5
        ctx.strokeStyle = 'orange';
        ctx.stroke();
    });
});

document.addEventListener("mousemove", (e)=>{
    const mouse_x = e.clientX;
    const mouse_y = e.clientY;

    circles.forEach((obj,index)=>{
        if (obj.active){
        obj.circle.style.top =  mouse_y+'px';
        obj.y = mouse_y;
        obj.circle.style.left = mouse_x+'px';
        obj.x = mouse_x;
        
        answer_circles.forEach((pobj,i)=>{
            if (((pobj.x-obj.x)**2+(pobj.y-obj.y)**2)<500){
                obj.x = pobj.x;
                obj.y = pobj.y;
                obj.circle.style.top =  obj.y+'px';
                obj.circle.style.left = obj.x+'px';
                
            }
        });

        }
    });

});
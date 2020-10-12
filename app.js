const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const CANVAS_SIZE = 600;


canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillstyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
let painting = false;
let filling = false;
ctx.strokeStyle="black";
ctx.fillStyle="white";
ctx.lineWidth = 2.5;

function stopPainting(){
    painting=false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleRangeChange(event){
    const linewidth = event.target.value;
    ctx.lineWidth = linewidth;
}

function startPainting(){
    painting = true;
}
function handleColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}   
function handleModeClick(event){
    if(filling === true){
        filling = false;    
        mode.innerText="Paint";
    }else{
        filling = true;
        mode.innerText="Fill";
    }
}

function handleCanvasClick(event){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}
function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.download = "hello";
    link.href = image;
    link.click();  
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}
Array.from(colors).forEach(color => color.addEventListener("click",handleColor));

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}
if(save){
    save.addEventListener("click",handleSaveClick);
}
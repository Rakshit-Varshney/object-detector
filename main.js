status="";
objects=[];

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
video=createCapture(VIDEO);
video.size(480,380);
video.hide();
}
function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        objectDetector.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status:objects detected";
            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status=detecting objects";
    input=document.getElementById("object").value;
    if(input==objects[0].label){
        document.getElementById("number_of_objects").innerHTML="object found";
    }
    else{
        document.getElementById("number_of_objects").innerHTML="object not found";
    }
    video.stop();
}
function modelLoaded(){
    console.log("model loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error,results){
if(error){
    console.log(error);
}
console.log(results);
objects=results;
}
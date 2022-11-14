status =""
objects = []
function preload(){
  
}

function setup(){
    canvas = createCanvas(650,420)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()

}
function start() {
    ObjectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "status: detecting objects"
}
function modelLoaded(){
    console.log("model is loaded")
    status = true


}
function gotresult(error,results) {
if (error) {
    console.log(error)
} else {
    console.log(results)
    objects = results
}
}
function draw(){
    image(video, 0,0,650,420)
    document.getElementById("number").innerHTML = "number of objects detected = " + objects.length
    if (status != "") {
        ObjectDetector.detect(video, gotresult )
 
    for (var i = 0; i < objects.length; i++) {
        var percent = floor(objects[i].confidence * 100)
        fill("red")
        text(objects[i].label + percent + "%", objects[i].x, objects[i].y)
        noFill()
        stroke("red")
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)
    }
}
    
} 
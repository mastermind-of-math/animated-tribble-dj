song = "";
leftS = 0;
rightS = 0;
rightY = 0;
rightX = 0;
leftY = 0;
leftX = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO)
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotResults)
    
}

function code(){
    song.play();
    song.rate(1);
}

function volume(v){
    song.setVolume(v/500);
    document.getElementById("volume").innerText = "Volume: " + Math.floor(v/5);
}

function speed(s){
    song.rate(s)
    document.getElementById("speed").innerText = "Speed: " + s + "x";
}

function randomv(){
    abc = Math.floor(500*Math.random())+1
    volume(abc);
    document.getElementById("volume").innerText = "Volume: " + Math.floor(abc/5);
}

function randoms(){
    abc = (Math.floor(5*Math.random())/2)+0.5
    speed(abc);
    document.getElementById("speed").innerText = "Speed: " + abc + "x";
}

function modelLoaded(){
    console.log("Model Has Loaded!");
}

function gotResults(results){
    if(results.length > 0){
        result = results[0].pose
        leftX = result.leftWrist.x;
        leftY = result.leftWrist.y;
        rightX = result.rightWrist.x;
        rightY = result.rightWrist.y;
        rightS = result.keypoints[10].score;
        leftS = result.keypoints[9].score;
        console.log([{"results":{"poses":results, "data":{"confidence":{"Left Wrist Confidence":leftS, "Right Wrist Confidence":rightS}, "positions":{"Left Wrist X":leftX, "Left Wrist Y":leftY, "Right Wrist X":rightX, "Right Wrist Y":rightY}}}}]);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    if(song.isPlaying()){
        fill(255, 0, 0);
        noStroke();
        if(leftS > 0){
            circle(leftX, leftY, 25);
            clearv = Math.floor(Number(leftY));
            clearv = clearv * -1 + 500;
            volume(Math.abs(clearv));
        }
        if(rightS > 0){
            circle(rightX, rightY, 25);
            if(rightY > 450){
                speed(2.5)
            } else if(rightY > 350){
                speed(2)
            } else if(rightY > 250){
                speed(1.5)
            } else if(rightY > 150){
                speed(1)
            } else if(rightY > 50){
                speed(0.5)
            }
        }
    }
}
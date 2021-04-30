var balloon,balloonImage;
// create database and position variable here
var database;
var height;

function preload(){ 
   balloonImage=loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png");
   bg =loadImage("cityImage.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(400,200,50,50);
  balloon.addAnimation("hotAirBalloon",balloonImage);
  balloon.scale=0.5;

  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value",readHeight,showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage);
    //write code to move air balloon in left direction
    updateHeight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage);
    //write code to move air balloon in right direction
    updateHeight(10,0);
   
  }
  else if(keyDown(UP_ARROW)){
     //write code to move air balloon in up direction
    balloon.addAnimation("hotAirBalloon",balloonImage);
    updateHeight(0,-10);
    
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage);
    //write code to move air balloon in down direction
    updateHeight(0,+10);
     
    
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  console.log(height.x)
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}
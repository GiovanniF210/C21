var playerCar, Car;
var plCarImage, bCarImage, yCarImage, rCarImage, pCarImage, gCarImage, oCarImage;
var track, trackImage;
var explosionImg
var score = 0;
var lboundary, rboundary;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){

    plCarImage = loadImage("WhiteCar.png");
    
    bCarImage = loadImage("BlueCar.png");
    yCarImage = loadImage("YellowCar.png");
    rCarImage = loadImage("RedCar.png");
    pCarImage = loadImage("PurpleCar.png");
    gCarImage = loadImage("GreenCar.png");
    oCarImage = loadImage("OrangeCar.png");
    

    trackImage = loadImage("path.png");

    explosionImg = loadImage("Explosion.png");
}

function setup() {
createCanvas(500, windowHeight);

track = createSprite (250, 310, 10, 10);
track.addImage("track", trackImage);
track.scale=1.3
 
playerCar = createSprite (250, 500, 10, 10);
playerCar.addImage("plCar", plCarImage);
playerCar.addImage("Exploded", explosionImg);
playerCar.scale=0.13

lboundary = createSprite (41, 310, 40, 620)
lboundary.visible = false;

rboundary = createSprite (465, 310, 40, 620)
rboundary.visible = false;

carsGroup=new Group();
boundariesGroup=new Group();

}

function draw() {

 
 if(gameState===PLAY){
  score = score +1;

  playerCar.collide(lboundary);
  playerCar.collide(rboundary);

  spawnCar();

  track.velocityY = 35

  if(track.y > 400){
    track.y = 245
  }

  if(keyDown("a")){
    playerCar.velocityX = -8
  } else if (keyWentUp("a")){
    playerCar.velocityX = 0
  }

  if(keyDown("d")){
    playerCar.velocityX = 8
  } else if (keyWentUp("d")){
    playerCar.velocityX = 0
  }

  if (carsGroup.isTouching(playerCar)){
    gameState = END;
    carsGroup.destroyEach();
    playerCar.changeAnimation("Exploded", explosionImg);
  }

  
 background("green");


 drawSprites();

 text ("Pontuação: " +score, 20, 30);

 } 
}

function spawnCar(){
    if (frameCount%60===0){
        var rand2 = Math.round(random(100, 400));
        var Car = createSprite (rand2,-20,10,10);
        Car.velocityY = 13;
        var rand1 = Math.round(random(1,6));
        switch (rand1){
          case 1: Car.addImage(bCarImage);
          break;
          case 2: Car.addImage(yCarImage);
          break;
          case 3: Car.addImage(rCarImage);
          break;
          case 4: Car.addImage(pCarImage);
          break;
          case 5: Car.addImage(gCarImage);
          break;
          case 6: Car.addImage(oCarImage);
          break;
          default: break;
        }
        Car.scale = 0.14;
        Car.lifetime = 70;
        carsGroup.add(Car);
    }    
}
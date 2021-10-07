var PLAY = 1;
var END = 0;
var gameState = PLAY;

var fox;
var grass, invisibleGround, grassImage;

var forest,forestImage;
var branch,branchImg

var score;
var gameOverImg,restartImg

function preload(){
  fox = loadImage("fox.png");
 
  
  grassImage = loadImage("grass.png");
  
  forestImage = loadImage("cloud.png");
  
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")

}

function setup() {
  createCanvas(600, 200);

  var message = "This is a message";
 console.log(message)

 forest = createSprite(300,100)

  
  fox = createSprite(50,160,20,50);

  

  fox.scale = 0.5;
  
  grass = createSprite(200,180,400,20);
  grass.addImage("grass",grassImage);
  grass.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  trex.setCollider("rectangle",0,0,fox.width,fox.height);
  fox.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    grass.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      grass.x = grass.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& fox.y >= 100) {
        fox.velocityY = -12;
    }
    
    //add gravity
    fox.velocityY = fox.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(fox)){
        
        gameState = END;
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
      grass.velocityX = 0;
      fox.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  fox.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}

function reset(){
  score=0;
  gameOver.visible=false
  restart.visible=false
  cloudsGroup.destroyEach()
  obstaclesGroup.destroyEach()
  gameState=PLAY
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var branch = createSprite(600,165,10,40);
   branch.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: branch.addImage(branchImg);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(branch);
 }
}

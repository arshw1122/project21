var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Player, Player_running;
var ground, invisibleGround, groundImage;

var coinsGroup, coinImage;
var obstaclesGroup, obstacleImage

var score=0;

var gameOver, restart;


function preload(){
  Player_running =   loadImage("Player1.png");
  
  groundImage = loadImage("BG.jpeg");
  
  coinImage = loadImage("coin .png");
  
  obstacleImage = loadImage("Barrier1.png");
  
  
  

}
function setup() {
  createCanvas(600, 200);
  
  player = createSprite(50,180,20,50);
  
  player.addImage("running",Player_running);
  
  player.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
 
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  coinsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    //change the trex animation
   
    
    if(keyDown("space") && trex.y >= 159) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    player.collide(invisibleGround);
    spawnCoins();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
    }
  }
  else if (gameState === END) {
   
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    
    //change the trex animation
   
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    
    
  }
  
  
  drawSprites();
}

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var coin = createSprite(600,120,40,10);
    coin.y = Math.round(random(80,120));
    coin.addImage(coinImage);
    coin.scale = 0.5;
    coin.velocityX = -3;
    
     //assign lifetime to the variable
    coin.lifetime = 200;
    
    //adjust the depth
    coin.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    coinsGroup.add(coin);
  }
  
}



function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    obstacle.addImage(obstacleImage);  
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
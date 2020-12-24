var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImg, obstacle, obstacleImg
var foodGroup;
var obstacleGroup;
var score1;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("obstacle.png");
  
}


function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1

  ground = createSprite(400,350,900,10)
  ground.veloctiyX = -4;
  ground.x = ground.width/2;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score1 = 0;
  
  monkey.debug = true;
  monkey.setCollider ("circle",0,0,260);
}


function draw() {
  background("limegreen")
  
  if (ground.x < 0){
    ground.x = ground.x + ground.width/2
    
  }
  
  if (gameState === PLAY){
    
     score1 = score1 + Math.round(getFrameRate()/60);
  
  if (keyDown("space") && monkey.y >= 160){
       
      monkey.setVelocity(0,-10);
}
    spawnFood();
    spawnObstacles();
    //trying to make the monkey seem running.
    ground.velocityX = -6
    
     if (monkey.isTouching(foodGroup)){
    
    foodGroup.destroyEach();
       
    
  }
  
  if (monkey.isTouching(obstacleGroup)){
    
    gameState = END
    
  }
    
      //gravity
  monkey.velocityY = monkey.velocityY + 0.8;
    
  }
  
  if ( gameState === END){
    
    ground.velocityX = 0;
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    monkey.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    monkey.velocityY = 0;
    if (keyDown("r")){
    reset();
    }
    fill("red")
    text ("press 'r' to restart", 150, 200)
    score1 = score1
    
  }
  
  
  
 
  
  //gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  //colliding
  monkey.collide(ground)
  
  
  drawSprites();
  fill("red")
  text("score :" + " " + score1,270,30)
  
  
}

function spawnFood(){
  
  
  if (frameCount%80 === 0){
    
    food = createSprite(600,60,10,10)
    food.velocityX = -6;
    food.addAnimation("running",bananaImg)
    food.y = Math.round(random(120,200));
    food.lifetime = 110// lifetime = distance/velocity = 600/6 = 100
    food.scale = 0.1
    
    foodGroup.add(food);
    
  }
}
  
  function spawnObstacles(){
  
 if (frameCount%300 === 0){
   obstacle = createSprite(600,330,10,10);
   obstacle.velocityX = -6
   obstacle.addAnimation("running", obstacleImg);
   obstacle.scale = 0.1
   obstacle.lifetime = 100
   obstacleGroup.add(obstacle);
   
} 
}

  

function reset(){
  
  gameState = PLAY;
  
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();

}





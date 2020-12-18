var PLAY = 1;
var END = 0;
var gameState= PLAY ;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivaltime=0;
var score = 0;
 
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
 createCanvas(600, 600);
  
   monkey=createSprite(80,450,20,20);
   monkey.addAnimation("moving",monkey_running);
  monkey.velocityY = monkey.velocityY + 1  ; 
   monkey.scale=0.2;
  
  
  ground=createSprite(300,500, 900,9 );
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  invisibleground=createSprite(300,510,900,10);
  invisibleground.x=invisibleground.width/2;
  invisibleground.visible=false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  

  
}


function draw() {
 
   background(200);
  
  monkey.collide(invisibleground);
  monkey.velocityY = monkey.velocityY + 0.6;
  
  if(gameState === PLAY){
    
    banana();
   obstacle();  
    
    if (ground.x < 400){
    ground.x = ground.width/2;
  }
    
     if(keyWentDown("space") && monkey.isTouching(ground)){
    monkey.velocityY=-10;
    
  }
    
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score=score+1;
    }
    
    if(monkey.isTouching(obstacleGroup)){
    gameState=END;
    
    }
    stroke("white");
   textSize(20);
   fill("white");
   text("score: "+score,500,50);
  
   stroke("black");
   textSize(20);
   fill("black");
   survivaltime=Math.ceil(frameCount/frameRate());
   text("Survival Time :"+survivaltime,100,50);
}
 
  if(gameState === END){
    
    ground.velocityX=0;
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    score=score+0;
    survivaltime=survivaltime+0;
    reset();
  }
   
  
   
  
   drawSprites();
}

function reset(){
  
  gameState=PLAY;
  score=0;
  survivaltime=0;
  
  
}


function banana(){

   if(World.frameCount % 80 == 0){
    var banana=createSprite(550,Math.round(random(250,360)),9,10);
    banana.scale=0.2;
    banana.addImage(bananaImage);
    banana.velocityX=-10; 
    banana.lifetime=300;
 
    bananaGroup.add(banana);

 }
}

function obstacle(){
  if(World.frameCount % 300 == 0){
  var obstacle=createSprite(500,477, 900,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.1;
  obstacle.lifetime=250;
 obstacle.velocityX=-10;   
 obstacleGroup.add(obstacle);
  } 
}


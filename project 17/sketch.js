
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var ground;
var obstaclesGroup;
var bananaGroup;
var survivalTime=0;
var gameState;
var play;
var end=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() 
{
    createCanvas(400,400);
    monkey=createSprite(80,340,20,20);
    monkey.addAnimation("monkey",monkey_running);
    monkey.scale=0.1;
   ground=createSprite(200,380,400,20);
    ground.velocityX=-4;
    ground.x=ground.width/2

    obstaclesGroup=createGroup();
    bananaGroup=createGroup();

}


function draw()
{
background("black");
  
  if(gameState===play)
  {

     if (ground.x < 400)
     {
          ground.x = ground.width/2;
      }
    
      stroke("white");
    textSize(20);
    fill("white");
    survivalTime=Math.ceil(frameCount/frameRate());
    text("SurvivalTime: "+survivalTime,200,50);
        stroke("white");
    textSize(20);
    fill("white");
      text("score: "+score,50,50);

   
  
  if(keyDown("space")&& monkey.y >= 300 )
    {
        monkey.velocityY = -12;
    }
   monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
    if(monkey.isTouching(bananaGroup))
    {
      score=score+Math.round(random(1,2));
      bananaGroup.destroyEach();
    }
    spawnObstacles();
  spawnBanana();
    if(monkey.isTouching(obstaclesGroup))
  {
    gameState=end;
    obstaclesGroup.destroyEach();
  }
  }
  
  if(gameState===end)
  {
    text("GAME OVER",200,200);
    monkey.visible=false;
    bananaGroup.destroyEach();
    obstaclesGroup.destroyEach();
    ground.visible=false;
  }
  
  
  
  drawSprites();
}
function spawnObstacles(){
  if(frameCount%300===0){
    var obstacles=createSprite(random(300,360),355,20,20);
    obstacles.addImage(obstacleImage);
    obstacles.scale=0.1;
    obstacles.velocityX=-8
    obstaclesGroup.add(obstacles);
    obstacles.lifetime=400;
  }
}
function spawnBanana(){
  if(frameCount%80===0){
    var banana=createSprite(random(200,300),random(200,300),20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-9
    bananaGroup.add(banana);
    banana.lifetime=400;
  }
}






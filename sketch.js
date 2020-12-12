var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var ghost, ghostStanding;
var invisibleBlock, invisibleBlockGroup;
var gameState = "PLAY";

function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png")
  climberImage=loadImage("climber.png");
  ghostStanding=loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostStanding);
  ghost.scale=0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background(0);
  
  if (gameState==="PLAY"){
    if(tower.y>400){
    tower.y=300;
  }
  
  if (keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  
  if (keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  
  if (keyDown("space")){
    ghost.velocityY=-5;
  }
  
  if (climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="END";
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  
  spawndoors();
  }
  
  if(gameState==="END"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over!",230,250);
  }
  
  
  drawSprites();
}

function spawndoors(){
  if(frameCount%240===0){
    door = createSprite(200,-50)
    door.addImage(doorImage);
    door.velocityY =1;
    door.x=Math.round(random(120,400))
    doorGroup.add(door);
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    //ghost.debug=true;
    
    climber = createSprite(200,10);
    climber.addImage(climberImage);
    climber.velocityY = 1;
    climber.x=door.x;
    climberGroup.add(climber);
    //climber.debug=true;
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlockGroup.add(invisibleBlock);
    //invisibleBlock.debug=true;
  }
}
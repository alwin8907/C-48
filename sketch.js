var bgimg
var treasurehunterimg
var treasurehunter
var enemyimg
var enemy1
var obstacle1
var obstacle2
var ground
var enemygroup
var gamestate
var standing
var restartimg
var restart
var score=0
var treasure
var treasureimg
function preload(){
 bgimg=loadImage("images/treasure background.jpg")
treasurehunterimg=loadAnimation("images/treasurehunter1.png","images/treasurehunter2.png","images/treasurehunter3.png")
enemyimg=loadImage("images/enemy.png")
obstacle1=loadImage("images/obstacle1.png")
obstacle2=loadImage("images/obstacle2.png")
standing=loadAnimation("images/treasurehunter3.png")
restartimg=loadImage("images/update-arrow.png")
treasureimg=loadImage("images/treasurechest.png")
}

function setup(){
    createCanvas(displayWidth-25,displayHeight-155)
  treasurehunter=createSprite(100,displayHeight-300)
  treasurehunter.addAnimation("running",treasurehunterimg)
  treasurehunter.addAnimation("standing",standing)
  treasurehunter.scale=0.4
  treasurehunter.setCollider("rectangle",0,0,100,500)
  ground=createSprite(displayWidth/2,displayHeight-200,displayWidth,10)
  ground.visible=false
  enemygroup=new Group()
  gamestate="play"
restart=createSprite(displayWidth/2,displayHeight/2+50)
restart.addImage(restartimg)
restart.scale=0.2
restart.visible=false
treasure=createSprite(displayWidth-150,displayHeight-300)
treasure.addImage(treasureimg)
treasure.scale=0.7
treasure.visible=false
}


function draw(){
  background(bgimg)
  if(gamestate==="play"){
    if(keyDown("space")&&(treasurehunter.y>displayHeight-330)){
      treasurehunter.velocityY=-18
    }
    treasurehunter.velocityY=treasurehunter.velocityY+0.5
    enemy()
    score=score+Math.round(getFrameRate()/60)
    if(treasurehunter.isTouching(enemygroup)){
      gamestate="end"
      }
      if(score===1500){
        gamestate="restart"
        

      }
    
  }

else if(gamestate==="end"){
treasurehunter.changeAnimation("standing",standing)
enemygroup.setVelocityXEach(0)
restart.visible=true
fill("red")
textSize(60)
  textStyle(BOLD)
text("GAME OVER",displayWidth/2-200,displayHeight/2-100)
}
else if(gamestate==="restart"){
  treasure.visible=true
  enemygroup.destroyEach()
treasurehunter.changeAnimation("standing",standing)
fill("red")
textSize(60)
  textStyle(BOLD)
text("YOU WON",displayWidth/2-200,displayHeight/2-100)
restart.visible=true
}
fill("red")
textSize(30)
  textStyle(BOLD)

text("Score: "+score,displayWidth-300,50)
treasurehunter.collide(ground)

console.log(getFrameRate())

if(mousePressedOver(restart)){
reset()
}
  drawSprites()
}

function enemy(){
if(World.frameCount%200===0){
enemy1=createSprite(displayWidth,displayHeight-300)
var rand=Math.round(random(1,3))
switch(rand){
  case 1:enemy1.addImage(enemyimg)
  break
  case 2:enemy1.addImage(obstacle1)
  enemy1.y=displayHeight-250
  break
  case 3:enemy1.addImage(obstacle2)
  enemy1.y=displayHeight-250
  break
}

enemy1.scale=0.3
enemy1.velocityX=-4
enemy1.lifetime=displayWidth/4
enemygroup.add(enemy1)
}

}



function reset(){
gamestate="play"
score=0
enemygroup.destroyEach()
restart.visible=false
treasurehunter.changeAnimation("running",treasurehunterimg)
}

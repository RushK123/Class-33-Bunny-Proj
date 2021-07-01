const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope, fruitLink, fruit, fruitOptions;
var backgroundImg, rabbitImg, melonImg, rabbit, sadAnimation, blinkAnimation, eatAnimation;
var cutButton, cutButton2, cutButton3, eatSound, sadSound, bgSound, ropeCutSound, airSound, balloon, mutebutton;
var rope2, rope3, fruitLink2, fruitLink3;



function preload(){
  backgroundImg = loadImage("background.png");
  rabbitImg = loadImage("Rabbit-01.png");
  melonImg = loadImage("melon.png");
  sadAnimation = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  blinkAnimation = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eatAnimation = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png");
  blinkAnimation.playing = true;
  sadAnimation.playing = true;
  eatAnimation.playing = true;
  blinkAnimation.framedelay = 20;
  sadAnimation.framedelay = 20;
  eatAnimation.framedelay = 10;
  eatAnimation.looping = false;
  sadAnimation.looping = false;
  eatSound = loadSound("eating_sound.mp3");
  sadSound = loadSound("sad.wav");
  ropeCutSound = loadSound("rope_cut.mp3");
  bgSound = loadSound("sound1.mp3");
  airSound = loadSound("air.wav");
}



function setup() 
{
  bgSound.play();
  //bgSound.setVolume(0.2);
  createCanvas(500,700);
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW=displayWidth;
    canH= displayHeight;
    createCanvas(displayWidth,displayHeight);

  }else{
    canW= windowWidth;
    canH= windowHeight;
    createCanvas(windowWidth,windowHeight);
  }
  //frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH-10,2*canW,20);
  rope = new Rope(6,{x:270, y:30})
  rope2 = new Rope(8,{x:90, y:70})
  rope3 = new Rope(8,{x:450, y:145})
  textSize(50);

  fruitOptions = {
    density : 0.001 
  }
  fruit = Bodies.circle(300, 300, 15,fruitOptions);
  Composite.add(rope.body,fruit);
  fruitLink = new Link(rope,fruit);
  fruitLink2 = new Link(rope2,fruit);
  fruitLink3= new Link(rope3,fruit);

  rabbit = createSprite(250, canH-70, 10, 10);
  rabbit.addImage(rabbitImg);
  rabbit.scale = 0.1;

  cutButton = createImg("cut_btn.png");
  cutButton.position(250, 30);
  cutButton.size(50,50);
  cutButton.mouseClicked(drop);

  cutButton2 = createImg("cut_btn.png");
  cutButton2.position(90, 70);
  cutButton2.size(50,50);
  cutButton2.mouseClicked(drop2);

  cutButton3 = createImg("cut_btn.png");
  cutButton3.position(400, 140);
  cutButton3.size(50,50);
  cutButton3.mouseClicked(drop3);


  balloon = createImg("balloon.png");
  balloon.position(95, 250);
  balloon.size(60,60);
  balloon.mouseClicked(airblow);

  mutebutton = createImg("mute.png");
  mutebutton.position(400, 50);
  mutebutton.size(70,70);
  mutebutton.mouseClicked(mute);


  rabbit.addAnimation("eat", eatAnimation);
  rabbit.addAnimation("sad", sadAnimation);
  rabbit.addAnimation("blink", blinkAnimation);
  rabbit.changeAnimation("blink");




}




function draw() 
{

  background(backgroundImg);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  Engine.update(engine);



  ground.show();
  rope.show();
  rope2.show();
  rope3.show();

  if (fruit != null){
    image(melonImg,fruit.position.x, fruit.position.y,60,60);
  }

  

  if (collide(fruit, rabbit)){
    rabbit.changeAnimation("eat"); 
    eatSound.play();
    fruit = null;
  }
  if (fruit!= null && fruit.position.y >= (canH-50)){
    rabbit.changeAnimation("sad");
    fruit = null;
    bgSound.stop();
    sadSound.play();
  }
    
  drawSprites();
 
   
}

function drop(){
  rope.break();
  fruitLink.detached();
  fruitLink = null;
  

}

function drop2(){
  rope2.break();
  fruitLink2.detached();
  fruitLink2 = null;
  

}


function drop3(){
  rope3.break();
  fruitLink3.detached();
  fruitLink3 = null;
  

}


function collide(fruit, sprite){
  if (fruit!==null){

    var d = dist(fruit.position.x, fruit.position.y, sprite.position.x, sprite.position.y);

    if (d <= 80){
      World.remove(world, fruit);
      fruit= null;
      return true;
    }else{
      return false;
    }
  }
}


function airblow(){
  Body.applyForce(fruit,{x:0, y:0}, {x:0.02, y:0});

}

function mute(){
  if (bgSound.isPlaying()){
    bgSound.stop();

  }else{
    bgSound.play();
  }
  
}
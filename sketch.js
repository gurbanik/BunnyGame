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
var rope, rope2, rope3
var fruit,ground;
var fruit_con,fruit_con_2,fruit_con_3

var bg_img;
var food;
var rabbit;

var button, button3, button4
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var blower, button2

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Andriod/i.test(navigator.userAgent)
  if(isMobile){
    canw = displayWidth
    canh = displayHeight
    createCanvas(displayWidth+80,displayHeight);
  } else{
    canw = windowWidth
    canh = windowHeight
    createCanvas(windowWidth,windowHeight);
  }

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button3 = createImg('cut_btn.png')
  button3.position(330,35)
  button3.size(50,50)
  button3.mouseClicked(drop2)

  button4 = createImg('cut_btn.png')
  button4.position(360,200)
  button4.size(50,50)
  button4.mouseClicked(drop3)

  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:350,y:35});
  rope3 = new Rope(5,{x:400,y:210});
  ground = new Ground(200,canh,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(400,canh-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  //button2 = createImg('balloon.png')
  //button2.size(150, 100)
  //button2.position(10,250)
  //button2.mouseClicked(airblow)

  mute_btn = createImg('mute.png')
  mute_btn.position(430, 10)
  mute_btn.size(50,50)
  mute_btn.mouseClicked(mute)
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit)
  fruit_con_3 = new Link(rope3,fruit)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,canw,canh);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show()
  rope3.show()

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play()
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    fruit=null;
    sad_sound.play() 
   }
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
  cut_sound.play()
}

function drop2()
{
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null; 
  cut_sound.play()
}

function drop3()
{
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null; 
  cut_sound.play()
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=120)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airblow(){
  Matter.Body.applyForce(fruit, {x:0,y:0}, {x:0.01, y:0})
  air.play()
}

function mute(){
  if(bk_song.isPlaying()){
    bk_song.stop()
  }
  else{
    bk_song.play()
  }

}

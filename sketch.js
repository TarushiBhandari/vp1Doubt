var dog, dogImg, happyDog, happyDogImg, database;
var foodS, foodStock, data;

function preload(){

dogImg= loadImage("imageAdder/Dog.png");
happyDodImg= loadImage("imageAddernb/happydog.png");

}

function setup() {
  
  database= firebase.database();

  foodStock= database.ref('Food');
  foodStock.on("value",readStock);

  createCanvas(500, 500);

  dog= createSprite(250,350,10,10);
  dog.addImage(dogImg);
  dog.scale= 0.15;

  happyDog= createSprite(250,350,10,10);
  happyDog.addImage(happyDogImg);
  happyDog.scale= 0.15;
}


function draw() {  
  background(46,139,87);

  if(foodS!==undefined){
    if(keyWentDown(UP_ARROW)){
        writeStock(foodS);
        dog.addImage(happyDogImg);
      }
    if(keyWentDown(DOWN_ARROW)){
        dog.addImage(dogImg);
      }
    if(foodS===0){
        dog.addImage(dogImg)
        foodS=20;
      }
   }

drawSprites();

fill("black");
text("PRESS UP ARROW KEY TO FEED DRAGO",30,100);
text("FOOD STOCK:"+foodS,100,480);
text("PRESS DOWN KEY TO STOP FEEDING DRAGO",30,180);

}

function readStock(data){
  foodS= data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food: x
  })
}
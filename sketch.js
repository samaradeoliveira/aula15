
var trex, trex_running, trex_collided;
var edges;
var ground, groundImage;
var InvisibleGround;
var cloud, cloudImage;
var obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;

//definir variável gameOver, gameOverImg, restart, restartImg
var gameOver, gameOverImg;
var restart, restartImg;



var Score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Pre carregamento de imagens para criar uma animação em sprites
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");

  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");

  //carregar imagens nas variáveis auxiliares



}

function setup() {
  createCanvas(600, 200);

  InvisibleGround = createSprite(200, 190, 400, 10);
  InvisibleGround.visible = false;

  //criar grupo de obstáculo
  obstaculoG = new Group();
  nuvenG = new Group();

  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;



  edges = createEdgeSprites();

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;


  //Fazer sprites gameOver, restart (e características )





}


function draw() {
  background("black");


  text("pontuação: " + Score, 500, 50);


  if (gameState === PLAY) {
    ground.velocityX = -4;
    Score = Score + Math.round(frameCount / 60);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && trex.y >= 160) {
      trex.velocityY = -15;
    }
    trex.velocityY = trex.velocityY + 0.8;


    criarNuvem();
    criarobstaculos();

    if (obstaculoG.isTouching(trex)) {
      gameState = END;
    }
  }

  else if (gameState === END) {
    ground.velocityX = 0;

    //visible



    obstaculoG.setVelocityXEach(0);
    nuvenG.setVelocityXEach(0);

    obstaculoG.setLifetimeEach(-1);
    nuvenG.setLifetimeEach(-1);





    trex.velocityY = 0;
    trex.changeAnimation("collided", trex_collided)





  }

  trex.collide(InvisibleGround);
  drawSprites();
}

function criarobstaculos() {

  if (frameCount % 60 == 0) {
    var obstaculo = createSprite(610, 165, 10, 40);
    obstaculo.velocityX = -5;

    var aleatorio = Math.round(random(1, 6));

    switch (aleatorio) {
      case 1: obstaculo.addImage(obstaculo1);
        break;

      case 2: obstaculo.addImage(obstaculo2);
        break;

      case 3: obstaculo.addImage(obstaculo3);
        break;

      case 4: obstaculo.addImage(obstaculo4);
        break;

      case 5: obstaculo.addImage(obstaculo5);
        break;

      case 6: obstaculo.addImage(obstaculo6);
        break;

      default: break;
    }

    obstaculo.scale = 0.5;
    obstaculo.lifetime = 300;


    obstaculoG.add(obstaculo);
  }
}

function criarNuvem() {

  if (frameCount % 60 == 0) {

    cloud = createSprite(610, 100, 10, 10);

    cloud.y = Math.round(random(50, 100));

    cloud.addImage("nuvem", cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;


    cloud.lifetime = 200;


    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;



    nuvenG.add(cloud);

  }
}

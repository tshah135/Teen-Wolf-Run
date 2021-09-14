var woodsImg;
var arrowImg, celticImg, revengeSpiralImg, treeImg, triskeleImg; 
var woods;
var invisibleGround;
var collectables;
var collectablesGroup, enemiesGroup;
var enemy2Img, enemy3Img, enemy4Img, enemy5Img;
var fireImg, fire2Img;
var score = 0;
var gameState = "play";
var wolf, fire, fire2, wolf_running;

function preload(){
    
    woodsImg = loadImage("woods.png")
    wolf_running = loadAnimation("wolf1.png", "wolf2.png", "wolf3.png");
    arrowImg = loadImage("arrow.png")
    celticImg = loadImage("celtic.png")
    revengeSpiralImg = loadImage("revenge_spiral.png")
    treeImg = loadImage("tree.png")
    triskeleImg = loadImage("triskele.png")
    enemy2Img = loadImage("enemy_2.png");
    enemy3Img = loadImage("enemy_3.png");
    enemy4Img = loadImage("enemy_4.png");
    enemy5Img = loadImage("enemy_5.png");
    fireImg = loadImage("fire.png");
    fire2Img = loadImage("fire_2.png");
    Bsound = loadSound("teen_wolf.m4a");
}

function setup() {

    createCanvas(600, 600);

    woods = createSprite(300, 300);
    //woods.addImage("woods", woodsImg);
    woods.scale = 1.3;
    woods.velocityX = -10;

    wolf = createSprite(235, 500, 100, 100);
    wolf.addAnimation("running", wolf_running);
    wolf.scale = 0.4; 
    wolf.debug = true;
    wolf.setCollider("rectangle", 10, 10, 500, 350)
    //wolf.visible = true;

    Bsound.loop();

    fire = createSprite(0, 410, 0, 10);
    fire.addImage("fire", fireImg);
    fire.scale = 0.8;
    fire.debug = false;
    fire.setCollider("rectangle", 0, 50, 100, 400)
    //fire.visible = true;

    fire2 = createSprite(300, 300);
    fire2.addImage("fire", fire2Img);
    fire2.visible = false;

    invisibleGround = createSprite(300,580,600,10);
    invisibleGround.visible = false;

    collectablesGroup = new Group();
    enemiesGroup = new Group();
}

function draw() {

    background(200)
    woods.addImage("woods", woodsImg);

    if (gameState == "play") {

    woods.velocityX = -(6+2*score/100);

    if (woods.x < 0){
        woods.x = woods.width/2;
      }

    if (collectablesGroup.isTouching(wolf)) {
        score = score + 1;
        collectablesGroup.destroyEach();
    }

    if (collectablesGroup.isTouching(fire)) {
       collectablesGroup.destroyEach();
    }

    if (enemiesGroup.isTouching(fire)) {
        enemies.destroy();
    }


    if((touches.length > 0 || keyDown("SPACE")) && wolf.y  >= height-150) {
        wolf.velocityY = -17;
         touches = [];
      }

    wolf.velocityY = wolf.velocityY + 0.8

    wolf.collide(invisibleGround)

    if(enemiesGroup.isTouching(wolf)) {
        wolf.destroy();
        fire.destroy();
        gameState = "end"   

    }
    
    spawnCollectables(); 
    spawnEnemies();
}
    
    if (gameState == "end") {
        background(fire2Img);
        stroke("yellow");
        fill("yellow");
        textSize(75);
        text("Game Over", 100, 90);
        textSize(30);
        text("Score: " + score, 230, 150);
        }

        enemiesGroup.setLifetimeEach(-1);
        collectablesGroup.setLifetimeEach(-1);

    drawSprites()
}

function spawnCollectables() {
    if (frameCount % 180 == 0) {
        collectables = createSprite(600, random(260, 450), 20, 30);
        collectables.setCollider("circle", 0, 0, 150);
        collectables.debug = true;

        collectables.velocityX = -(score + 9);
        collectables.lifetime = 200;
        collectables.scale = 0.1;
        collectablesGroup.add(collectables);

        var rand = Math.round(random(1, 5));
        switch(rand) {
            case 1: collectables.addImage(arrowImg);
                    break;
            case 2: collectables.addImage(celticImg);
                    break;
            case 3: collectables.addImage(revengeSpiralImg);
                    break;
            case 4: collectables.addImage(treeImg);
                    break;
            case 5: collectables.addImage(triskeleImg);
                    break;
            default: break;
        }

        

    }
}

function spawnEnemies() {
    if (frameCount % 160 == 0) {
        enemies = createSprite(600, 555, 20, 15);
        enemies.setCollider("circle", 0, 150);
        enemies.debug = true;

        enemies.velocityX = -(score + 9);
        enemies.lifetime = 200;
        enemies.scale = 0.25;
        enemiesGroup.add(enemies);

        var rand = Math.round(random(2, 5));
        switch(rand) {
            case 2: enemies.addImage(enemy2Img);
                    break;
            case 3: enemies.addImage(enemy3Img);
                    break;
            case 4: enemies.addImage(enemy4Img);
                    break;
            case 5: enemies.addImage(enemy5Img);
                    break;
            default: break;
        }
    }
}


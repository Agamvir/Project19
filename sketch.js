var fish, fishImg;
var score = 0;
var highScore = 0;
var underwater, underwaterImg
var star, starImg, starGroup;
var gameState = "play";
var mc = 1;
var gameover, gameoverImg;
var restart, restartImg;

function preload(){
    fishImg = loadImage("fish.png");
    underwaterImg = loadImage("underwater.png");
    starImg = loadImage("star.png");
    gameoverImg = loadImage("gameover.png");
    restartImg = loadImage("restart.webp");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    fish = createSprite(windowWidth/1.2, windowHeight/5);
    fish.addImage("fish.png", fishImg);
    fish.scale = 0.1;
    fish.velocityY = 1

    gameover = createSprite(windowWidth/2, windowHeight/2);
    gameover.addImage("gameover.png", gameoverImg);
    gameover.visible = false;
    gameover.scale = 0.1

    restart = createSprite(windowWidth/2.1, windowHeight/1.2);
    restart.addImage("restart.webp", restartImg);
    restart.visible = false;
    restart.scale = 0.1

    underwater = createSprite(windowWidth/2, windowHeight/2);
    underwater.addImage("underwater.png", underwaterImg);

    fish.depth = underwater.depth
    underwater.depth =+ 1

    gameover.depth = fish.depth + 1
    
    starGroup = new Group();
}   

function draw() {
    background(0, 100, 220)
    drawSprites();

    textSize(25);
    fill("white");
    text("Score: " + score, 50, 50);

    textSize(25);
    fill("white");
    text("Danger Level: " + mc, 350, 50);

            if (gameState === "play"){
                if (keyDown("UP")){
                    fish.y = fish.y - 10
                }
            
                if (keyDown("LEFT")){
                    fish.x = fish.x - 10
                }
            
                if (keyDown("RIGHT")){
                    fish.x = fish.x + 10
                }
            
                if (keyDown("DOWN")){
                    fish.y = fish.y + 10
                }

                drawStars();

                score = score + Math.round(getFrameRate()/40);

                if (score % 200 == 0 && score > 0){
                    fish.velocityY = fish.velocityY + 1;
                    mc = mc + 1;
                }


            }

            if (fish.y > windowHeight){
                gameState = "end"  
            }
            
            if (gameState === "end"){
                gameover.visible = true;
                restart.visible = true;
            }

            if (mousePressedOver(restart)){
                reset();
            }

        
}

function drawStars() {
    if (frameCount % 500 == 0 && mc > 1){
        star = createSprite(windowWidth/16, windowHeight/5);
        star.addImage("star.png", starImg);
        star.scale = 0.1;
        starGroup.add(star);
        starGroup.setVelocityXEach(15);
        star.y = Math.round(random(120, 600));
        starGroup.setLifetimeEach(250);
    }

    if (starGroup.isTouching(fish)){
        fish.velocityY = fish.velocityY - 1
        mc = mc - 1;
        starGroup.destroyEach(star);
    }
}

function reset() {
    gameState = "play";
    score = 0;
    mc = 1;
    fish.x = windowWidth/1.2;
    fish.y = windowHeight/5;
    fish.velocityY = 1;
    gameover.visible = false;
    restart.visible = false;
}
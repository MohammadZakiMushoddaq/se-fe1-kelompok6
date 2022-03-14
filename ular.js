const CELL_SIZE = 20;
const CANVAS_SIZE = 400;
const REDRAW_INTERVAL = 100;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
let MOVE_INTERVAL = 180;
let life = 3; // inisialisasi nilai nyawa awal
let level = 1; // Inisialisasi nilai Level awal

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake() {
    return {
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
    }
}
let snake1 = initSnake();

let apple = {
    position: initPosition(),
}

let apple2 = {
    position: initPosition(),
}

let nyawaUlar = {
    position: initPosition(),
}

let tembok = {
    position: {
        x: [3,4,5,6,7,8,9,10,11,12,13,14,15,16],
        y: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
    },
    color: "black",
}

let tembok2 = {
    position: {
        x: [3,4,5,6,7,8,9,10,11,12,13,14,15,16],
        y: [11,11,11,11,11,11,11,11,11,11,11,11,11,11]
    },
    color: "black",
}

let tembok3 = {
    position: {
        x: [0,1,2,3,4,16,17,18,19,20],
        y: [8,8,8,8,8,8,8,8,8,8,8]
    },
    color: "black",
}

let tembok4 = {
    position: {
        x: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
        y: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    },
    color: "black",
}

let tembok5 = {
    position: {
        x: [15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15],
        y: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    },
    color: "black",
}
let tembok6 = {
    position: {
        x: [8,9,10,11,12],
        y: [8,8,8,8,8,8],
    },
    color: "black",
}

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawImage(ctx, img, x, y) {
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "100px Passero One";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText("score : "+snake.score,50,100,200);
}
//Fungsi Bilangan Prima
function  bilanganPrima(angka) {
    let bagi = 0;
    for(let i=1; i <= angka; i++){
      if(angka%i == 0){
        bagi++
      }
    }
    if(bagi == 2){
      return true
    }else{
      return false
    }
  }

function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");
        let apel = document.getElementById("apple");
        let kepala = document.getElementById("kepala-ular");
        let badan = document.getElementById("badan-ular");
        let nyawa = document.getElementById("nyawa-ular");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        drawImage(ctx,kepala, snake1.head.x, snake1.head.y,);//Menggambar Kepala Ular
        for (let i = 1; i < snake1.body.length; i++) {
            drawImage(ctx, badan, snake1.body[i].x, snake1.body[i].y,);//Menggambar Badan Ular
        }
        
        drawImage(ctx, apel, apple.position.x, apple.position.y);
        drawImage(ctx, apel, apple2.position.x, apple2.position.y);

        if(bilanganPrima(snake1.score)){
            drawImage(ctx, nyawa, nyawaUlar.position.x, nyawaUlar.position.y);
        }
        
        for(let i = 0; i < life; i++){
            scoreCanvas = document.getElementById("score1Board");
            drawImage(ctx, nyawa, i+0.2, 0.2);
        }

        if(level ===2){
            for(let i = 0; i < tembok.position.x.length; i++){
                drawCell(ctx, tembok.position.x[i], tembok.position.y[i], tembok.color);
            }
        }else if(level === 3){
            for(let i = 0; i < tembok.position.x.length; i++){
                drawCell(ctx, tembok.position.x[i], tembok.position.y[i], tembok.color);
            }
            for(let i = 0; i < tembok2.position.x.length; i++){
                drawCell(ctx, tembok2.position.x[i], tembok2.position.y[i], tembok2.color);
            }
        }else if (level === 4){
            for(let i = 0; i < tembok.position.x.length; i++){
                drawCell(ctx, tembok.position.x[i], tembok.position.y[i], tembok.color);
            }
            for(let i = 0; i < tembok2.position.x.length; i++){
                drawCell(ctx, tembok2.position.x[i], tembok2.position.y[i], tembok2.color);
            }
            for(let i = 0; i < tembok3.position.x.length; i++){
                drawCell(ctx, tembok3.position.x[i], tembok3.position.y[i], tembok3.color);
            }
        }else if(level === 5){
            for(let i = 0; i < tembok4.position.x.length; i++){
                drawCell(ctx, tembok4.position.x[i], tembok4.position.y[i], tembok4.color);
            }
            for(let i = 0; i < tembok6.position.x.length; i++){
                drawCell(ctx, tembok6.position.x[i], tembok6.position.y[i], tembok5.color);
            }
            for(let i = 0; i < tembok5.position.x.length; i++){
                drawCell(ctx, tembok5.position.x[i], tembok5.position.y[i], tembok5.color);
            }
        }

        drawScore(snake1);
        document.getElementById("level").innerHTML = "Level " + level;
        document.getElementById("moveSpeed").innerHTML = "Speed: " + MOVE_INTERVAL + " .ms";
    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}
//Fitur Untuk Cek Leve;
function cekLevel(snake) {
    if(snake.score % 5 === 0){
        alert("Level  "+  level  +"  Complete");
        level++;
        let lvlUp = new Audio('assets/levelUp.mp3');
        lvlUp.play();
        MOVE_INTERVAL -=20;
    }
}

function eat(snake, apple , apple2) {
    if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
        apple.position = initPosition();
        snake.score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
        cekLevel(snake)
    }
    if (snake.head.x == apple2.position.x && snake.head.y == apple2.position.y) {
        apple2.position = initPosition();
        snake.score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
        cekLevel(snake)
    }
}

function eatLife(snake, gambarNyawa) {
    if (snake.head.x == gambarNyawa.position.x && snake.head.y == gambarNyawa.position.y) {
        gambarNyawa.position = initPosition();
        snake.score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
        cekLevel(snake)
        life++;
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple ,apple2);
    eatLife(snake, nyawaUlar);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple,apple2);
    eatLife(snake, nyawaUlar);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple,apple2);
    eatLife(snake, nyawaUlar);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple, apple2);
    eatLife(snake, nyawaUlar);
}

function checkCollision(snakes) {
    let isCollide = false;
    //this
    for (let k = 1; k < snakes.body.length; k++) {
        if (snakes.head.x == snakes.body[k].x && snakes.head.y == snakes.body[k].y) {
            isCollide = true;
        }
    }

    if(level >= 2 && level <= 4 ){
        if(level >= 2){
            for (let i = 0; i < tembok.position.x.length; i++){
                if (snakes.head.x == tembok.position.x[i] && snakes.head.y == tembok.position.y[i]){
                    isCollide = true;
                }
            }
        }if(level >= 3){
            for (let i = 0; i < tembok2.position.x.length; i++){
                if (snakes.head.x == tembok2.position.x[i] && snakes.head.y == tembok2.position.y[i]){
                    isCollide = true;
                }
            }
        }if(level >= 4){
            for (let i = 0; i < tembok3.position.x.length; i++){
                if (snakes.head.x == tembok3.position.x[i] && snakes.head.y == tembok3.position.y[i]){
                    isCollide = true;
                }
            }
        }
    }else if(level === 5){
        for (let i = 0; i < tembok4.position.x.length; i++){
            if (snakes.head.x == tembok4.position.x[i] && snakes.head.y == tembok4.position.y[i]){
                isCollide = true;
            }
        }
        for (let i = 0; i < tembok5.position.x.length; i++){
            if (snakes.head.x == tembok5.position.x[i] && snakes.head.y == tembok5.position.y[i]){
                isCollide = true;
            }
        }
        for (let i = 0; i < tembok6.position.x.length; i++){
            if (snakes.head.x == tembok6.position.x[i] && snakes.head.y == tembok6.position.y[i]){
                isCollide = true;
            }
        }
    }

    if (isCollide) {
        if(life === 1){
            let gameOver = new Audio('assets/game-over.mp3');
            gameOver.play();
            alert("Game over");
            level = 1
            snake1 = initSnake();
            life = 3;
            MOVE_INTERVAL = 180;
        }else {
            snake1 = initSnake();
            life--
        }
    }
    return isCollide;
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    if (!checkCollision(snake)) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        move(snake1);
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }
})

move(snake1)


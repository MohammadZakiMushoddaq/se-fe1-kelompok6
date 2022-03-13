const CELL_SIZE = 20;
const CANVAS_SIZE = 400;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
};
const MOVE_INTERVAL = 150;
let life = 3; //inisialisasi nyawa default 3

function initPosition() {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
  };
}

function initHeadAndBody() {
  let head = initPosition();
  let body = [{ x: head.x, y: head.y }];
  return {
    head: head,
    body: body,
  };
}

function initDirection() {
  return Math.floor(Math.random() * 4);
}

function initSnake() {
  return {
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
  };
}
let snake = initSnake();

let apple = {
  position: initPosition(),
};

let apple2 = {
  position: initPosition(),
};

let nyawaUlar = { 
  position: initPosition(),
};

function drawCell(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawImage(ctx,img,x,y){
  ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore(snake) {
  let scoreCanvas;
  if (snake.color == snake.color) {
    scoreCanvas = document.getElementById("score1Board");
  }
  let scoreCtx = scoreCanvas.getContext("2d");

  scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  scoreCtx.font = "100px Passero One";
  scoreCtx.fillStyle = snake.color;
  scoreCtx.fillText("Score : " +snake.score,50,100,200);
}

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
  setInterval(function () {
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");
    let apel = document.getElementById("apple");
    let kepala = document.getElementById("kepala-ular");
    let badan = document.getElementById("badan-ular");
    let nyawa = document.getElementById("nyawa-ular");

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    drawImage(ctx,kepala, snake.head.x, snake.head.y,);//Menggambar Kepala Ular
    for (let i = 1; i < snake.body.length; i++) {
      drawImage(ctx, badan, snake.body[i].x, snake.body[i].y,);//Menggambar Badan Ular
    }
    drawImage(ctx, apel, apple.position.x, apple.position.y); //Menggambarkan Apel
    drawImage(ctx, apel, apple2.position.x, apple2.position.y); //Menggambarkan Apel

    if(bilanganPrima(snake.score)){
      drawImage(ctx, nyawa, nyawaUlar.position.x, nyawaUlar.position.y); //Menampilkan nyawa di canvas
    }

    for(let i = 0; i < life; i++){
      scoreCanvas = document.getElementById("score1Board"); //menampilkan nyawa di pojok kiri atas
      drawImage(ctx, nyawa, i+0.2, 0.2);
    }
    drawScore(snake);
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

function eat(snake, apple ,apple2) {
  if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
    apple.position = initPosition();
    snake.score++;
    snake.body.push({ x: snake.head.x, y: snake.head.y });
  }
  if (snake.head.x == apple2.position.x && snake.head.y == apple2.position.y) {
    apple2.position = initPosition();
    snake.score++;
    snake.body.push({ x: snake.head.x, y: snake.head.y });
  }
}

function eatLive(snake, nyawaUlar) {
  if (snake.head.x == nyawaUlar.position.x && snake.head.y == nyawaUlar.position.y) {
      nyawaUlar.position = initPosition();
      snake.score++;
      snake.body.push({x: snake.head.x, y: snake.head.y});
      life++;
  }
}

function moveLeft(snake) {
  snake.head.x--;
  teleport(snake);
  eat(snake,apple,apple2);
  eatLive(snake, nyawaUlar);
}

function moveRight(snake) {
  snake.head.x++;
  teleport(snake);
  eat(snake,apple,apple2);
  eatLive(snake, nyawaUlar);
}

function moveDown(snake) {
  snake.head.y++;
  teleport(snake);
  eat(snake,apple,apple2);
  eatLive(snake, nyawaUlar);
}

function moveUp(snake) {
  snake.head.y--;
  teleport(snake);
  eat(snake, apple,apple2);
  eatLive(snake, nyawaUlar)
}

function checkCollision(snakes) {
  let isCollide = false;
  for (let i = 0; i < snakes.length; i++) {
    for (let j = 0; j < snakes.length; j++) {
      for (let k = 1; k < snakes[j].body.length; k++) {
        if (
          snakes[i].head.x == snakes[j].body[k].x &&
          snakes[i].head.y == snakes[j].body[k].y
        ) {
          isCollide = true;
        }
      }
    }
  }
  if (isCollide) {
    if(life === 1){
      var bel = new Audio('assets/game-over.mp3');
      bel.play();
      alert("Game over");
      snake = initSnake();
      life = 3;
      MOVE_INTERVAL = 180;
    } else {
      snake = initSnake();
      snake.score = 0;
      life--;
      
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
    setTimeout(function () {
      move(snake);
    }, MOVE_INTERVAL);
  } else {
    move(snake);
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
  };

  if (direction !== oppositeDirections[snake.direction]) {
    snake.direction = direction;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    turn(snake, DIRECTION.LEFT);
  } else if (event.key === "ArrowRight") {
    turn(snake, DIRECTION.RIGHT);
  } else if (event.key === "ArrowUp") {
    turn(snake, DIRECTION.UP);
  } else if (event.key === "ArrowDown") {
    turn(snake, DIRECTION.DOWN);
  }
});

move(snake);

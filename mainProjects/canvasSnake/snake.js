//global Variables
canvas = document.querySelector("canvas");
canvas.width = 500;
canvas.height = 500;
let scale = canvas.width / 20;
ctx = canvas.getContext('2d');
prevTime = 0;
speed = 11;
let score = 0;
let scoreElement = document.querySelector(".score");
let headPos;
let tail = [];
let prevTailPos = [];
let total = 0;
let hasCollidedOverMyself = false;
//functions
function Snake() {
    this.x = scale;
    this.y = scale;
    this.xSpeed = scale;
    this.ySpeed = 0;
}
function isCollidedWithTail() {
    for (let i = 0; i < tail.length; i++) {
        if (tail[i].x == snake.x && tail[i].y == snake.y) {
            return true;
        }
    }
}
function Food() {
    this.x = Math.floor((Math.random() * canvas.width) / scale) * scale;
    this.y = Math.floor((Math.random() * canvas.height) / scale) * scale;
}
function tailArr() {
    for (let i = 0; i < tail.length - 1; i++) {
        tail[i] = tail[i + 1];
    }
    tail[total - 1] = { x: snake.x, y: snake.y };
}
function tailDraw() {
    for (let i = 0; i < tail.length; i++) {
        ctx.fillStyle = "#0000d1";
        ctx.fillRect(tail[i].x, tail[i].y, scale, scale);
    }
}
function foodInstantiate() {

    food.x = Math.floor((Math.random() * canvas.width) / scale) * scale;
    food.y = Math.floor((Math.random() * canvas.height) / scale) * scale;
    let i = 0;
    for (i; i < tail.length; i++) {
        if (tail[i].x == food.x && tail[i].y == food.y) {
            food.x = Math.floor((Math.random() * canvas.width) / scale) * scale;
            food.y = Math.floor((Math.random() * canvas.height) / scale) * scale;
            i = 0;
        }
    }
    ctx.fillRect(food.x, food.y, scale, scale);
}
function displaceBack() {

}
function isCollided() {
    if (snake.x < 0 || snake.x > canvas.width - scale || snake.y < 0 || snake.y > canvas.height - scale) {
        return true;
    }
}
function mayCollide() {
    if (snake.x == 0 || snake.x == canvas.width - scale || snake.y == 0 || snake.y == canvas.height - scale) {
        return true;
    }
}
function isEaten() {
    if (snake.x == food.x && snake.y == food.y) {
        return true;
    }
}
function scoreIncrement() {
    score++;
    if (score < 10)
        scoreElement.innerHTML = `Score: 0${score}`;
    else
        scoreElement.innerHTML = `Score: ${score}`;
}
function main(timeStamp) {
    if (!isCollided() && !hasCollidedOverMyself)
        window.requestAnimationFrame(main);
    //restricting movement for some interval of time everytime
    if ((timeStamp - prevTime) / 1000 < 1 / speed)
        return;
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        prevTime = timeStamp;
        snake.x = snake.x + snake.xSpeed;
        snake.y = snake.y + snake.ySpeed;
        headPos = { x: snake.x, y: snake.y };
        hasCollidedOverMyself = isCollidedWithTail();
        tailDraw();
        ctx.fillStyle = "blue";
        ctx.fillRect(snake.x, snake.y, scale, scale);
        if (isCollided()) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "blue";
            ctx.fillRect(snake.x - snake.xSpeed, snake.y - snake.ySpeed, scale, scale);
            ctx.fillStyle = "#0000d1";
            for (let i = 0; i < tail.length; i++) {
                ctx.fillRect(prevTailPos[i].x, prevTailPos[i].y, scale, scale);
            }
        }
        //if snake head is near to the border then storing the position of the tail to transfer it back if collides
        if (mayCollide()) {
            prevTailPos = tail;
        } 
        tailArr();
        ctx.fillStyle = "red";
        if (!isEaten()) {
            ctx.fillRect(food.x, food.y, scale, scale);
        }
        if (isEaten()) {
            scoreIncrement();
            //increase speed after every 5 score
            if (score % 5 == 0) {
                speed += 3;
            }
            foodInstantiate();
            total++;
        }
    }
}
//main logics
let snake = new Snake();
let food = new Food();
//Making the snake move in 4 different direction
document.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowRight":
            if (snake.xSpeed == 0) {
                snake.xSpeed = scale;
                snake.ySpeed = 0;
            }
            break;
        case "ArrowLeft":
            if (snake.xSpeed == 0) {
                snake.xSpeed = -scale;
                snake.ySpeed = 0;
            }
            break;
        case "ArrowUp":
            if (snake.ySpeed == 0) {
                snake.xSpeed = 0;
                snake.ySpeed = -scale;
            }
            break;
        case "ArrowDown":
            if (snake.ySpeed == 0) {
                snake.xSpeed = 0;
                snake.ySpeed = scale;
            }
            break;
    }
})
window.requestAnimationFrame(main);

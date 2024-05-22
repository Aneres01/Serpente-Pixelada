const board = document.getElementById('gameBoard');
const boardSize = 400;
const squareSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = { x: 100, y: 100 };
let direction = { x: 0, y: 0 };
let gameInterval;

function createSquare(className, position) {
    const square = document.createElement('div');
    square.style.left = position.x + 'px';
    square.style.top = position.y + 'px';
    square.classList.add(className);
    board.appendChild(square);
}

function draw() {
    board.innerHTML = '';
    snake.forEach(segment => createSquare('snake', segment));
    createSquare('food', food);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        placeFood();
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.y < 0 || head.x >= boardSize || head.y >= boardSize || snakeCollision(head)) {
        clearInterval(gameInterval);
        alert('Game Over');
    }
}

function snakeCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function placeFood() {
    food.x = Math.floor(Math.random() * (boardSize / squareSize)) * squareSize;
    food.y = Math.floor(Math.random() * (boardSize / squareSize)) * squareSize;
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -squareSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: squareSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -squareSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: squareSize, y: 0 };
            break;
    }
}

document.addEventListener('keydown', changeDirection);

gameInterval = setInterval(() => {
    moveSnake();
    draw();
}, 200);
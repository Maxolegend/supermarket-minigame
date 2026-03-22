// Supermarket Minigame Logic

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const playerSpeed = 5;
const itemSpawnRate = 1000; // milliseconds
let score = 0;
let timerDuration = 60; // seconds
let timer;

// Player setup
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    color: 'blue',
    direction: { x: 0, y: 0 }
};

// Item array
let items = [];

function setup() {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    startItemSpawning();
    startTimer();
    gameLoop();
}

function handleKeyDown(event) {
    switch (event.key) {
        case 'ArrowUp':
            player.direction.y = -playerSpeed;
            break;
        case 'ArrowDown':
            player.direction.y = playerSpeed;
            break;
        case 'ArrowLeft':
            player.direction.x = -playerSpeed;
            break;
        case 'ArrowRight':
            player.direction.x = playerSpeed;
            break;
    }
}

function handleKeyUp(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            player.direction.y = 0;
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            player.direction.x = 0;
            break;
    }
}

function spawnItem() {
    const item = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 30,
        height: 30,
        color: 'red'
    };
    items.push(item);
}

function startItemSpawning() {
    setInterval(spawnItem, itemSpawnRate);
}

function collisionDetected(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function updateScore() {
    items = items.filter(item => {
        if (collisionDetected(player, item)) {
            score++;
            return false; // remove item from array
        }
        return true; // keep item
    });
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawItems() {
    items.forEach(item => {
        ctx.fillStyle = item.color;
        ctx.fillRect(item.x, item.y, item.width, item.height);
    });
}

function displayScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function displayTimer() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Time: ' + timerDuration, canvas.width - 100, 20);
}

function startTimer() {
    timer = setInterval(() => {
        timerDuration--;
        if (timerDuration <= 0) {
            clearInterval(timer);
            alert('Game Over! Your score: ' + score);
        }
    }, 1000);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.x += player.direction.x;
    player.y += player.direction.y;
    updateScore();
    drawPlayer();
    drawItems();
    displayScore();
    displayTimer();
    requestAnimationFrame(gameLoop);
}

setup();
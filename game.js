const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let gameActive = false;
let score = 0;
let timeLeft = 60;
let playerX = canvas.width / 2;
let playerY = canvas.height - 50;
let items = [];

const keys = {};

window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

startBtn.addEventListener('click', () => {
    gameActive = true;
    score = 0;
    timeLeft = 60;
    items = [];
    playerX = canvas.width / 2;
    playerY = canvas.height - 50;
    startBtn.disabled = true;
    startTimer();
    spawnItems();
    gameLoop();
});

function startTimer() {
    const interval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            gameActive = false;
            clearInterval(interval);
            startBtn.disabled = false;
            alert('Game Over! Score: ' + score);
        }
    }, 1000);
}

function spawnItems() {
    for (let i = 0; i < 5; i++) {
        items.push({
            x: Math.random() * (canvas.width - 30),
            y: Math.random() * (canvas.height - 200),
            size: 30,
            collected: false
        });
    }
}

function gameLoop() {
    if (!gameActive) return;

    // Clear canvas
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Handle input
    if (keys['ArrowLeft'] || keys['a']) playerX -= 5;
    if (keys['ArrowRight'] || keys['d']) playerX += 5;
    if (keys['ArrowUp'] || keys['w']) playerY -= 5;
    if (keys['ArrowDown'] || keys['s']) playerY += 5;

    // Boundaries
    playerX = Math.max(0, Math.min(canvas.width - 30, playerX));
    playerY = Math.max(0, Math.min(canvas.height - 30, playerY));

    // Draw player (shopping cart)
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🛒', playerX + 15, playerY + 25);

    // Draw and check items
    items.forEach(item => {
        if (!item.collected) {
            ctx.font = '30px Arial';
            ctx.fillText('🍎', item.x + 15, item.y + 15);

            // Collision detection
            if (Math.hypot(playerX - item.x, playerY - item.y) < 40) {
                item.collected = true;
                score++;
                scoreDisplay.textContent = score;
            }
        }
    });

    requestAnimationFrame(gameLoop);
}

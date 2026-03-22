<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Supermarket Minigame</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="game-container">
        <div class="header">
            <h1>🛒 Supermarket Minigame</h1>
            <div class="stats">
                <div class="stat">Score: <span id="score">0</span></div>
                <div class="stat">Time: <span id="timer">60</span>s</div>
                <div class="stat">Items: <span id="items">0</span>/5</div>
            </div>
        </div>

        <div id="startScreen" class="screen active">
            <div class="start-content">
                <h2>Welcome to Supermarket Minigame!</h2>
                <p>Collect 5 items within 60 seconds!</p>
                <ul>
                    <li>🍎 Apple</li>
                    <li>🍞 Bread</li>
                    <li>🥛 Milk</li>
                    <li>🧀 Cheese</li>
                    <li>🍌 Banana</li>
                </ul>
                <p><strong>Controls:</strong> Arrow Keys or A/D to move</p>
                <button id="startBtn" class="btn">Start Game</button>
            </div>
        </div>

        <canvas id="gameCanvas" width="800" height="600"></canvas>

        <div id="gameOverScreen" class="screen">
            <div class="game-over-content">
                <h2 id="gameOverTitle">Time's Up!</h2>
                <p id="gameOverMessage"></p>
                <p>Final Score: <span id="finalScore">0</span></p>
                <button id="restartBtn" class="btn">Play Again</button>
            </div>
        </div>
    </div>

    <script src="game.js"></script>
</body>
</html>

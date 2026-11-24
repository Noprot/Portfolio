const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d");

// variable values

const screenWidth = canvas.width
const screenHeight = canvas.height

let speedMultiplier = 1


// objects
const ball = { x: 300, y: 200, radius: 20, dx: 4, dy: 4 };
const player = { x: 20, y: 150, width: 20, height: 250, score: 0 };
const computer = { x: screenWidth - 40, y: 150, width: 20, height: 250, score: 0 };


canvas.addEventListener("mousemove", (event) => { 
    const rect = canvas.getBoundingClientRect();
    const pointerY = (event.clientY - rect.top) * (canvas.height / rect.height);
    player.y = Math.max(0, Math.min(canvas.height - player.height, pointerY - player.height / 2));
});


function resetBall()
{
    ball.x = screenWidth/2;
    ball.y = screenHeight/2;
    ball.dx = -ball.dx;
    speedMultiplier = 1;
}

function update()
{
    ball.x += ball.dx * speedMultiplier;
    ball.y += ball.dy * speedMultiplier;
    speedMultiplier = speedMultiplier + 0.0005;

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy *= -1;
    }

    computer.y += (ball.y - (computer.y + computer.height / 2)) * 0.08;

    const activePaddle = ball.x < canvas.width / 2 ? player : computer;


    if (
        ball.x - ball.radius < activePaddle.x + activePaddle.width &&
        ball.x + ball.radius > activePaddle.x &&
        ball.y > activePaddle.y &&
        ball.y < activePaddle.y + activePaddle.height
        ) 
    {
        ball.dx *= -1; // Reverse horizontal direction
    }


    if (ball.x < 0) {
        computer.score++;
        resetBall();
    } else if (ball.x > canvas.width) {
        player.score++;
        resetBall();
    }

}


function draw() {
    // Wipe the previous frame clean
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";

    // Draw scores
    ctx.font = "60px monospace";

    let half = screenWidth / 2;

    ctx.fillStyle = "#a2d8a4";
    ctx.fillText(player.score, half + 120, 70);
    ctx.fillStyle = "#ce9191";
    ctx.fillText(computer.score, half - 120, 70);

    

    // Draw paddles
    ctx.fillStyle = "#a2d8a4";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "#ce9191";
    ctx.fillRect(computer.x, computer.y, computer.width, computer.height);

    // Draw ball
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() 
{
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

    // Start the game!
gameLoop();
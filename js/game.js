const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const groundImg = new Image()
groundImg.src = 'img/ground.png'

const foodImg = new Image()
foodImg.src = 'img/apple.png'

let box = 32;
let score = 0;

// Set food coordinates
let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box
}

let snake = []
snake[0] = {
  x: 9 * box,
  y: 10 * box
}

function drawGame() {
  // Background drawing
  ctx.drawImage(groundImg, 0, 0)

  // Food drawing
  ctx.drawImage(foodImg, food.x , food.y)

  // Snake drawing
  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = 'green'
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.fillStyle = 'white'
  ctx.font = '50px Arial'
  ctx.fillText(score, box * 2.5, box * 1.7)
}

let game = setInterval(drawGame, 100)


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

document.addEventListener('keydown', direction)

let dir

function direction(event) {
  console.log(event)
  if (event.key === 'ArrowUp' && dir !== 'down')
    dir = 'up'
  else if (event.key === 'ArrowRight' && dir !== 'left')
    dir = 'right'
  else if (event.key === 'ArrowDown' && dir !== 'up')
    dir = 'down'
  else if (event.key === 'ArrowLeft' && dir !== 'right')
    dir = 'left'
}

function drawGame() {
  // Background drawing
  ctx.drawImage(groundImg, 0, 0)

  // Food drawing
  ctx.drawImage(foodImg, food.x, food.y)

  // Snake drawing
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'green ' : 'forestgreen '
      ctx.fillRect(snake[i].x, snake[i].y, box, box)
  }

  ctx.fillStyle = 'white'
  ctx.font = '50px Arial'
  ctx.fillText(score, box * 2.5, box * 1.7)

  // Save snake coordinates 
  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (snakeX === food.x && snakeY === food.y) {
    score++
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box
    }
  } else {
    snake.pop()
  }

  if (dir == 'left') snakeX -= box
  if (dir == 'right') snakeX += box
  if (dir == 'up') snakeY -= box
  if (dir == 'down') snakeY += box

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead)

}

let game = setInterval(drawGame, 100)

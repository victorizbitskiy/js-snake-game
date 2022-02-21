const canvas = document.getElementById('game')
const context = canvas.getContext('2d')

const backgroundImg = new Image()
backgroundImg.src = 'img/background.png'

const foodImg = new Image()
foodImg.src = 'img/apple.png'

let boxScale = 32
let score = 0

let food = createNewFood()
let snake = new Array(getStartPosition())
let keydown

function createNewFood() {
  return {
    x: Math.floor((Math.random() * 17 + 1)) * boxScale,
    y: Math.floor((Math.random() * 15 + 3)) * boxScale
  }
}

function getStartPosition() {
  return {
    x: 9 * boxScale,
    y: 10 * boxScale
  }
}

function isEatTail(snakeArray) {
  if (snakeArray.length === 1)
    return false

  for (let i = 1; i < snakeArray.length; i++) {
    if (snakeArray[0].x === snakeArray[i].x && snakeArray[0].y === snakeArray[i].y)
      return true
  }
}

function isCollision(head) {
  if (head.x < boxScale || head.x > boxScale * 17
    || head.y < 3 * boxScale || head.y > boxScale * 17) {
    return true
  }
}

function getNextHead(snakeHead) {
  // Save current snake head coordinates 
  let snakeHeadX = snakeHead.x
  let snakeHeadY = snakeHead.y

  if (keydown === 'left') snakeHeadX -= boxScale
  if (keydown === 'right') snakeHeadX += boxScale
  if (keydown === 'up') snakeHeadY -= boxScale
  if (keydown === 'down') snakeHeadY += boxScale

  // Return new snake head coordinates
  return {
    x: snakeHeadX,
    y: snakeHeadY
  }
}

function drawScore() {
  context.fillStyle = 'white'
  context.font = '50px Arial'
  context.fillText(score, boxScale * 2.5, boxScale * 1.7)
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = i === 0 ? 'green ' : 'forestgreen '
    context.fillRect(snake[i].x, snake[i].y, boxScale, boxScale)
  }
}

function drawFood() {
  context.drawImage(foodImg, food.x, food.y)
}

function isFoodEaten() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    return true
  }
}

function keyHandler(event) {
  if (event.key === 'ArrowUp' && keydown !== 'down')
    keydown = 'up'
  else if (event.key === 'ArrowRight' && keydown !== 'left')
    keydown = 'right'
  else if (event.key === 'ArrowDown' && keydown !== 'up')
    keydown = 'down'
  else if (event.key === 'ArrowLeft' && keydown !== 'right')
    keydown = 'left'
}

document.addEventListener('keydown', keyHandler)

function drawGameLoop() {
  // Add background to context
  context.drawImage(backgroundImg, 0, 0)

  drawScore()
  drawFood()
  drawSnake()

  let newHead = getNextHead(snake[0])

  if (snake[0].x === newHead.x && snake[0].y === newHead.y)
    return

  if (!isCollision(newHead)) {

    if (isEatTail(snake)) {
      context.fillStyle = 'red'
      context.fillRect(snake[0].x, snake[0].y, boxScale, boxScale)
      clearInterval(game)
      return
    }

    snake.unshift(newHead)

    if (isFoodEaten()) {
      score++
      food = createNewFood()
    } else {
      snake.pop()
    }

  } else {
    context.fillStyle = 'red'
    context.fillRect(snake[0].x, snake[0].y, boxScale, boxScale)
    clearInterval(game)
    return
  }
}

const pauseBtn = document.getElementById('pause')
pauseBtn.currentValue = "false"

function pauseHandler() {
  if (pauseBtn.currentValue == "true") {
    game = setInterval(drawGameLoop, 200)
    document.addEventListener('keydown', keyHandler)
    pauseBtn.textContent = 'Pause'
    pauseBtn.currentValue = false
  } else {
    clearInterval(game)
    document.removeEventListener('keydown', keyHandler)
    pauseBtn.textContent = 'Pause ||'
    pauseBtn.currentValue = "true"
  }
}

const newGameBtn = document.getElementById('newGame')

function newGameBtnHandler() {
  score = 0
  food = createNewFood()
  snake = new Array(getStartPosition())
  keydown = ''
  clearInterval(game)
  game = setInterval(drawGameLoop, 200)
}

pauseBtn.addEventListener('click', pauseHandler)
newGameBtn.addEventListener('click', newGameBtnHandler)

let game = setInterval(drawGameLoop, 200)






const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const groundImg = new Image()
groundImg.src = "img/ground.png"

const foodImg = new Image()
foodImg.src = "img/apple.png"

let box = 32;
let score = 0;

// Задаем координаты еды
let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 1)) * box
}

let snake = []
snake[0] = {
  x: 9 * box,
  y: 10 * box
}

function drawGame() {
  // Рисуем фон
  ctx.drawImage(groundImg, 0, 0)

  // Рисуем еду
  ctx.drawImage(foodImg, food.x , food.y)
}

let game = setInterval(drawGame, 100)


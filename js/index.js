const canvas = document.querySelector('canvas')
const header = document.querySelector('.header')
const context = canvas.getContext('2d')
const gameOverScreen = document.querySelector('.game-over')
const score = document.querySelector('.score')
const scoreValue = score.children[1]
const resetBtn = document.querySelector('.reset-btn')
const size = 30
const eatAudio = new Audio('../assets/audio/eat-fx.mp3')
const gameOverAudio = new Audio('../assets/audio/game-over-fx.mp3')

let snake = [{ x: 300, y: 300 }]
const randomNUmber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
  const number = randomNUmber(0, canvas.width - size)
  return Math.round(number / 30) * 30
}

const food = {
  x: randomPosition(),
  y: randomPosition(),
  color: '#00ff00',
}

const drawSnake = () => {
  context.fillStyle = '#00ff00'

  snake.forEach((position, index) => {
    if (index === snake.length - 1) {
      context.fillStyle = '#61ff61'
    }
    context.fillRect(position.x, position.y, size, size)
  })
}

let direction
let loopID

const drawFood = () => {
  context.fillStyle = food.color
  context.fillRect(food.x, food.y, size, size)
}

const moveSnake = () => {
  if (!direction) return

  const head = snake[snake.length - 1]

  if (direction === 'right') {
    snake.push({ x: head.x + size, y: head.y })
  }

  if (direction === 'left') {
    snake.push({ x: head.x - size, y: head.y })
  }

  if (direction === 'up') {
    snake.push({ x: head.x, y: head.y - size })
  }

  if (direction === 'down') {
    snake.push({ x: head.x, y: head.y + size })
  }

  snake.shift()
}

const checkEat = () => {
  const head = snake[snake.length - 1]
  let teste = 0

  if (head.x === food.x && head.y === food.y) {
    snake.push(head)
    eatAudio.play()
    teste += 10
    scoreValue.innerText = +scoreValue.innerText + 10

    let x = randomPosition()
    let y = randomPosition()

    while (
      snake.find((position) => {
        position.x === x && position.y === y
      })
    ) {
      x = randomPosition()
      y = randomPosition()
    }

    food.x = x
    food.y = y
  }
}

const checkCollision = () => {
  const head = snake[snake.length - 1]
  const neckIndex = snake.length - 2
  const canvasLimit = canvas.width - size
  const wallCollision =
    head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit
  const selfCollison = snake.find((position, index) => {
    return index < neckIndex && position.x === head.x && position.y === head.y
  })

  if (wallCollision || selfCollison) {
    gameOver()
  }
}

const gameOver = () => {
  direction = undefined

  canvas.style.display = 'none'
  header.style.display = 'none'
  score.style.display = 'none'
  gameOverScreen.style.display = 'flex'
}

const restartGame = () => {
  resetBtn.addEventListener('click', () => {
    canvas.style.display = 'block'
    header.style.display = 'block'
    score.style.display = 'flex'
    gameOverScreen.style.display = 'none'
    scoreValue.innerText = '00'
    snake = [{ x: 300, y: 300 }]
  })
}
restartGame()

const gameLoop = () => {
  clearInterval(loopID)
  context.clearRect(0, 0, 600, 600)

  drawFood()
  moveSnake()
  drawSnake()
  checkEat()
  checkCollision()

  loopID = setTimeout(() => {
    gameLoop()
  }, 300)
}
gameLoop()

document.addEventListener('keydown', ({ key }) => {
  if (key === 'ArrowRight' && direction != 'left') {
    direction = 'right'
  }
  if (key === 'ArrowLeft' && direction != 'right') {
    direction = 'left'
  }
  if (key === 'ArrowUp' && direction != 'down') {
    direction = 'up'
  }
  if (key === 'ArrowDown' && direction != 'up') {
    direction = 'down'
  }
})

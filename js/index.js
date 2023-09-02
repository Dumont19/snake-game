const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const size = 30

const snake = [
  { x: 300, y: 300 },
  
]
const randomNUmber = (min, max) => {
    return Math.round(Math.random() * (max -  min) + min)
}

const randomPosition = () => {
    const number = randomNUmber(0, canvas.width - size)
    return Math.round(number / 30)  * 30
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: 'red'
}

const drawSnake = () => {
  context.fillStyle = '#00ff00'

  snake.forEach((position, index) => {
    if (index === snake.length - 1) {
      context.fillStyle ='#61ff61'
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

const gameLoop = () => {
    clearInterval(loopID)
    context.clearRect(0, 0, 600, 600)

    drawFood()
    moveSnake()
    drawSnake()

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


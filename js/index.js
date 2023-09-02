const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const size = 30

const snake = [
  { x: 200, y: 200 },
  { x: 230, y: 200 },
  { x: 260, y: 200 },
  
]

const drawSnake = () => {
  context.fillStyle = '#00ff00'

  snake.forEach((position, index) => {
    if (index === snake.length - 1) {
      context.fillStyle ='#61ff61'
    }
    context.fillRect(position.x, position.y, size, size)
  })
}
drawSnake()

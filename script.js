// @ts-check

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const center = {
  x: innerWidth/2,
  y: innerWidth/2
}

canvas.width = innerWidth
canvas.height = innerHeight

const player = new Player(100, 100, 30, 'blue', ctx)
player.x = center.x
player.y = center.y
player.draw()

let projectiles = []

addEventListener('click', ({ clientX, clientY }) => {
  const projectile = new Projectile(center.x, center.y, 5, 'red', ctx, {x: Math.random(), y: Math.random()})
  projectiles.push(projectile)
})

function animate () {
  console.log('animate');
  projectiles.forEach(p => {
    p.update()
  })
  requestAnimationFrame(animate)
}

animate()
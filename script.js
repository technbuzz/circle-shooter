// @ts-check

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 800
canvas.height = 600

const center = {
  x: canvas.width/2,
  y: canvas.height/2
}


const player = new Player(100, 100, 10, 'white', ctx)
player.x = center.x
player.y = center.y
player.draw()

let projectiles = []
let enemies = []

addEventListener('click', ({ clientX, clientY }) => {
  console.log(projectiles);
  
	const angle = Math.atan2(clientY - canvas.height/2, clientX - canvas.width/2)

	const velocity = {
		x: Math.cos(angle) * 5,
		y: Math.sin(angle) * 5
	}

	console.log(angle)
  const projectile = new Projectile(center.x, center.y, 5, 'white', ctx, velocity)
  projectiles.push(projectile)
})

let animId
function animate () {

  animId = requestAnimationFrame(animate)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  player.draw()
  projectiles.forEach((p, pi)=> {
    p.update()
    if(p.detectEdges()) {
      setTimeout(() => {
        projectiles.splice(pi, 1)
      });
    }
  })
  enemies.forEach((e, ei) => {
    e.update()
    const dist = Math.hypot(player._x - e._x, player._y - e._y)
    if (dist - e.radius - player.radius < 1) {
      // cancelAnimationFrame(animId)
    }

    projectiles.forEach((projectile, pi) => {
      const dist = Math.hypot(projectile._x - e._x, projectile._y - e._y)
      if (dist - e.radius - projectile.radius < 1) {
        setTimeout(() => {
          enemies.splice(ei, 1)
          projectiles.splice(pi, 1)
        });
      }
      
    })
  })
}

animate()
Enemy.spawn(center, enemies)

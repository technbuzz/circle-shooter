// @ts-check

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 800
canvas.height = 600

const center = {
  x: canvas.width/2,
  y: canvas.height/2
}


const player = new Player(100, 100, 30, 'blue', ctx)
player.x = center.x
player.y = center.y
player.draw()

let projectiles = []
let enemies = []

function spawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * (30 - 4) + 4
    let x
    let y

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
      y = Math.random() * canvas.height
    } else {
      x = Math.random() * canvas.width
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius

    }


    const color = 'green'
    const angle = Math.atan2(center.y - y, center.x - x)

    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }

    const enemy = new Enemy(x, y, radius, color, ctx, velocity)
    enemies.push(enemy)
  }, 1000);
}

addEventListener('click', ({ clientX, clientY }) => {
  console.log(projectiles);
  
	const angle = Math.atan2(clientY - canvas.height/2, clientX - canvas.width/2)

	const velocity = {
		x: Math.cos(angle),
		y: Math.sin(angle)
	}

	console.log(angle)
  const projectile = new Projectile(center.x, center.y, 5, 'red', ctx, velocity)
  projectiles.push(projectile)
})

let animId
function animate () {

  animId = requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

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
spawnEnemies()

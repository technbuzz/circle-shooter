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
let particles = []

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
  particles.forEach((p, pi)=> {
    if (p.alpha <= 0) {
      particles.splice(pi, 1)
    } else {
      p.update()
    }
  })
  projectiles.forEach((p, pi)=> {
    p.update()
    if(p.detectEdges()) {
      setTimeout(() => {
        projectiles.splice(pi, 1)
      });
    }
  })
  console.log('particles: ', particles);
  enemies.forEach((e, ei) => {
    e.update()
    const dist = Math.hypot(player._x - e._x, player._y - e._y)
    if (dist - e.radius - player.radius < 1) {
      // cancelAnimationFrame(animId)
    }

    projectiles.forEach((projectile, pi) => {
      const dist = Math.hypot(projectile._x - e._x, projectile._y - e._y)
      // when projectile touches the enemy
      if (dist - e.radius - projectile.radius < 1) {

        // create explosion
        for (let i = 0; i < e.radius * 2; i++) {
          particles.push(new Particle(projectile._x, projectile._y, Math.random() * 2, e.color, ctx, {
            x: (Math.random() - 0.5) * (Math.random() * 8), 
            y: (Math.random() - 0.5) * (Math.random() * 6), 
          }))
        }

        if (e.radius - 10 > 5) {
          gsap.to(e, {
            radius: e.radius -10
          })
          // e.radius -= 10
          setTimeout(() => {
            projectiles.splice(pi, 1)
          });
        } else {
          setTimeout(() => {
            enemies.splice(ei, 1)
            projectiles.splice(pi, 1)
          });
        }
      }
      
    })
  })
}

animate()
Enemy.spawn(center, enemies)

// @ts-check

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const center = {
  x: innerWidth/2,
  y: innerWidth/2
}

canvas.width = 800
canvas.height = 800

const player = new Player(100, 100, 30, 'blue', ctx)
player.x = canvas.width / 2
player.y = canvas.height / 2
player.draw()

let projectiles = []
let enemies = []

addEventListener('click', ({ clientX, clientY }) => {
	const angle = Math.atan2(clientY - canvas.height/2, clientX - canvas.width/2)

	const velocity = {
		x: Math.cos(angle),
		y: Math.sin(angle)
	}

	console.log(angle)
  const projectile = new Projectile(canvas.width/2, canvas.height/2, 5, 'red', ctx, velocity)
  projectiles.push(projectile)
})

function spawnEnemies() {
	setInterval(() => {
		const radius = Math.random() * (30 - 4) + 4
		let x,y
		if (Math.random() < 0.5) {
			x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
			y = Math.random() * canvas.height
		} else {
			x = Math.random() * canvas.width
			y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
		}
		// x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
		// y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
		const color = 'green'

		const angle = Math.atan2(canvas.height/2 - y, canvas.width/2 - x)
		// const angle = Math.atan2(player.x, player.y)


		const velocity = {
			x: Math.cos(angle),
			y: Math.sin(angle)
		}

		console.log(angle)
		enemies.push(new Enemy(x, y, radius, color, ctx, velocity))
	}, 1000)
}


function animate () {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	player.draw()
  projectiles.forEach(p => {
    p.update()
  })
  enemies.forEach(p => {
    p.update()
  })
  requestAnimationFrame(animate)
}



animate()
spawnEnemies()

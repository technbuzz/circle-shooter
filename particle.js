class Particle {
  /**
   * 
   * @param {number} x The x-axis
   * @param {number} y The y-axis
   * @param {number} radius 
   * @param {string} color 
   * @param {CanvasRenderingContext2D} ctx 
   * @param {velocity} color 
   */
  constructor(x, y, radius, color, ctx, velocity) {
    this._x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.ctx = ctx
    this.velocity = velocity
  }

  set x(v) {
    this._x = v
  }

  set y(v) {
    this._y = v
  }

  draw () {
    this.ctx.beginPath()
    this.ctx.arc(this._x, this._y, this.radius, 0, Math.PI * 2, false)
    this.ctx.fillStyle = this.color
    this.ctx.fill()
  }

  update () {
    this.draw()
    this._x = this._x + this.velocity.x
    this._y = this._y + this.velocity.y
  }

  static spawn(center, enemies) {
    setInterval(() => {
      const radius = Math.random() * (30 - 4) + 4
      let x
      let y
  
      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : ctx.canvas.width + radius
        y = Math.random() * ctx.canvas.height
      } else {
        x = Math.random() * ctx.canvas.width
        y = Math.random() < 0.5 ? 0 - radius : ctx.canvas.height + radius
  
      }
  
  
      const color = `hsl(${Math.random() * 360}, 50%, 50%)`
      const angle = Math.atan2(center.y - y, center.x - x)
  
      const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
      }
  
      const enemy = new Enemy(x, y, radius, color, ctx, velocity)
      enemies.push(enemy)
    }, 1000);
  }
}
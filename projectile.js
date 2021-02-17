class Projectile {
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

  detectEdges() {
    if (this._x < 0) {
      return true
    }
  }
}
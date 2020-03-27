
import Object from './object.js';


class Effect extends Object {
  constructor(options = {}) {
    super(options);
    
    this.lifespan = options.lifespan || 15;
    this.life = this.lifespan;
    
    this.spin = 0.5 - Math.random();
    this.alpha = options.alpha || 1;
  }
  
  tick() {
    super.tick();
    
    this.life -= 1;
    this.sprite.rotation += 0.2 * this.spin;
    this.sprite.alpha = (this.life / this.lifespan) * this.alpha;
    
    let scale = 0.75 + (((this.lifespan - this.life) / this.lifespan) * 0.25);
    this.sprite.scale.x = 0.075 * scale * this.scale;
    this.sprite.scale.y = 0.075 * scale * this.scale;
    
    if (this.life <= 0) { this.remove(); }
  }
}


export default Effect;
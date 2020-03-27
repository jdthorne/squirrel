import Thing from './thing.js';
import Vector from '../util/vector.js';

const GRAVITY = 0.5;


class Debris extends Thing {
  constructor(options = {}) {
    super(options);
    
    this.velocity = options.velocity || new Vector(0, 0);
  }
  
  tick() {
    super.tick();
    
    this.velocity.y += GRAVITY;
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    
    let [hit, ground] = this.world.ground.enforce(this.position);
    if (hit) {
      this.position = ground;
      this.velocity.x *= 0.9;
      this.velocity.y = 0;
      this.sprite.alpha -= 0.01;
    }
    
    if (this.sprite.alpha < 0) {
      this.remove();
    }
  }
}


export default Debris;

import Vector from '../../util/vector.js';

import Movement from './movement.js';


class Direct extends Movement {

  // Direct: move directly to a target

  constructor(character, speed) {
    super(character);
    
    this.speed = speed;
  }
  
  activate(target, onArrival) {
    super.activate();
    
    this.target = target;
      
    let movement = target.minus(this.character.position);
    this.distance = movement.length();
    this.direction = movement.normalized();
    
    this.onArrival = onArrival;
  }
  
  tick() {
    this.character.position.x += this.direction.x * this.speed;
    this.character.position.y += this.direction.y * this.speed;

    this.distance -= this.speed;
    if (this.distance < 0 && !this.character.combat.dead) {
      this.onArrival();
    }
        
    this.aim(this.direction);

    if (this.character.animation) {
      this.character.animation.animate(0.02 * this.speed);
    }
  }
}

export default Direct;

import Vector from '../../util/vector.js';

import Movement from './movement.js';


class Patrol extends Movement {
  constructor(character, path, speed, options = {}) {
    super(character);
    
    this.path = path;
    this.speed = speed;
    
    this.pathLength = path.length();
    this.distance = 0;
    this.direction = 1;
    
    this.options = options || {};
    this.level = options.level;
  }
  
  tick() {
    let startPosition = this.character.position;
    let smooth = true;
    
    this.distance += this.speed * this.direction;
        
    if (this.distance < 0) {
      this.direction = 1;
      this.distance = 0;
      smooth = false;
    }
    if (this.distance > this.pathLength) {
      this.direction = -1;
      this.distance = this.pathLength;
      smooth = false;
    }
    
    this.point = this.path.pointAtLength(this.distance);
    this.character.position = this.point.clone();
    
    if (this.character.animation) {
      this.character.animation.animate(0.02 * this.speed);
    }
    
    if (this.options.level) {
      let horizontalMovement = new Vector({ x: this.character.position.x - startPosition.x, y: 0 }).normalized();
      this.aim(horizontalMovement);
    } else {
      this.aim(this.character.position.minus(startPosition), { smooth: smooth });
    }
  }  
}

export default Patrol;
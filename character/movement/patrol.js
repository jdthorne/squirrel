
import Vector from '../../util/vector.js';

import Movement from './movement.js';


class Patrol extends Movement {
  constructor(character, path, speed) {
    super(character);
    
    this.path = path;
    this.speed = speed;
    
    this.pathLength = path.length();
    this.distance = 0;
    this.direction = 1;
  }
  
  tick() {
    let startPosition = this.character.position;
    
    this.distance += this.speed * this.direction;
    
    if (this.distance < 0) {
      this.direction = 1;
      this.distance = 0;
    }
    if (this.distance > this.pathLength) {
      this.direction = -1;
      this.distance = this.pathLength;
    }
    
    this.character.position = this.path.pointAtLength(this.distance);
    
    this.aim(this.character.position.minus(startPosition));
  }
}

export default Patrol;
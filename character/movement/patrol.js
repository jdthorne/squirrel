
import Vector from '../../util/vector.js';

import Movement from './movement.js';


class Patrol extends Movement {
  constructor(character, path, speed, options) {
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
    
    this.character.position = this.path.pointAtLength(this.distance);
    
    if (this.character.animation) {
      this.character.animation.animate(0.05);
    }
    
    if (this.options.level) {
      let horizontalMovement = new Vector({ x: this.character.position.x - startPosition.x, y: 0 }).normalized();
      this.aim(horizontalMovement);
      
      Debug.log("level", horizontalMovement);
      Debug.log("level.rotation", this.character.rotation);
      Debug.log("level.scale", this.character.scale.x);
    } else {
      this.aim(this.character.position.minus(startPosition), { smooth: smooth });
    }
  }  
}

export default Patrol;
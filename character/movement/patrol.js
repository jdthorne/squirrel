
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
    
    let dx = this.character.position.x - this.character.group.x;
    if (dx < 0) {
      this.character.group.scale.x = -1;
    } else {
      this.character.group.scale.x = 1;
    }
    
    if (this.character.animation) {
      this.character.animation.animate(this.distance * 0.15);
    }
    
    this.character.group.x = this.character.position.x;
    this.character.group.y = this.character.position.y;
  }
}

export default Patrol;

import Vector from '../../util/vector.js';

// const ANGLE_SNAP = Math.PI / 16;
// const ANGLE_SNAP = Math.PI / 128;


class Movement {
  constructor(character) {
    this.character = character;
  }
  
  activate() {
    this.character.movement = this;
  }
  
  tick() {
  }

  aim(direction) {
    if (!direction) {
      this.character.scale.x = 1;
      this.character.rotation = 0;
      return;
    }
  
    direction = direction.normalized();
  
    if (direction.x < 0.2) {
      this.character.scale.x = -1;
    } else if (direction.x > 0.2) {
      this.character.scale.x = 1;
    }
    
    this.character.rotation = Math.atan2(direction.y, direction.x);
    
    if (this.character.scale.x < 0) { 
      this.character.rotation += Math.PI;
    }
  }
}

export default Movement;
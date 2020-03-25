
import Vector from '../../util/vector.js';


class Movement {
  constructor(character) {
    this.character = character;
  }
  
  activate() {
    if (this.character.movement) {
      this.character.movement.deactivate();
    }
    
    this.character.movement = this;
  }
  
  deactivate() {
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
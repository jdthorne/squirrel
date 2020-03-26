
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
  
  deactivate() { }
  tick() { }
  control(input) { }

  aim(direction, options = {}) {
    if (!direction) {
      this.character.scale.x = 1;
      this.character.rotation = 0;
      return;
    }
    
    if (direction.length() == 0) {
      return;
    }
  
    direction = direction.normalized();
  
    if (direction.x < 0.01) {
      this.character.scale.x = -1;
    } else if (direction.x > 0.01) {
      this.character.scale.x = 1;
    }
        
    if (options.smooth && this.aimDirection) {
      direction = direction.multipliedBy(0.1).plus(this.aimDirection.multipliedBy(0.9));
    }
    this.aimDirection = direction;
    
    this.character.rotation = Math.atan2(direction.y, direction.x);
    
    if (this.character.scale.x < 0) { 
      this.character.rotation += Math.PI;
    }
  }
}

export default Movement;
import Vector from '../../util/vector.js';


class Movement {
  constructor(character) {
    this.character = character;
  }
  
  activate() {
    this.character.movement = this;
  }
  
  tick() {
  }

  aim(direction, angle_snap) {
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
    
    this.character.rotation = Math.round(
      Math.atan2(direction.y, direction.x) / angle_snap
    ) * angle_snap;
    
    if (this.character.scale.x < 0) { 
      this.character.rotation += Math.PI;
    }
  }
}

export default Movement;
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
}

export default Movement;
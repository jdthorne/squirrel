
import Fall from '../movement/fall.js';


class Combat {
  constructor(character) {
    this.character = character;
    this.dead = false;
  }

  hit() {
    if (!this.vulnerable()) { return; }
    
    this.die();
  }
  
  die() {
    this.dead = true;
    
    if (this.character.movements && this.character.movements.fall) {
      this.character.movements.fall.activate();
    } else {
      this.character.movement = new Fall(this.character);
    }
  }
  
  vulnerable() {
    return true;
  }
  
  tick() {
  }
  
  // TODO: Fix this?
  enemies() {
    if (window.player) { return [window.player]; }
    return [];
  }
}

export default Combat;
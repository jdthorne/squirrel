
import Fall from '../movement/fall.js';

const INVUNERABILITY_PERIOD = 40.0;


class Combat {
  constructor(character) {
    this.character = character;
    this.dead = false;
    
    this.health = 0;
    this.iframes = 0;
  }

  hit() {
    if (!this.vulnerable()) { return; }
    if (this.iframes > 0) { return; }
    
    this.iframes = INVUNERABILITY_PERIOD;
    this.health -= 40;
    
    if (this.health < 0) {
      this.die();
    }
  }
  
  die() {
    this.dead = true;
    
    if (this.character.movements && this.character.movements.fall) {
      this.character.movements.fall.activate();
    } else {
      this.character.movement = new Fall(this.character);
    }
  }
  
  heal() {
    this.health += 1;
    
    if (this.health >= 0) {
      this.resurrect();
    }
  }
  
  resurrect() {
    this.dead = false;
    
    if (this.character.movements && this.character.movement == this.character.movements.fall) {
      this.character.movements.soar.activate();
    }
  }
  
  vulnerable() {
    return true;
  }
  
  tick() {
    if (this.iframes > 0) { this.iframes -= 1; }
  }
  
  // TODO: Fix this?
  enemies() {
    if (window.player) { return [window.player]; }
    return [];
  }
}


export default Combat;

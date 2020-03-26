
import Combat from './combat.js';


class LeapCombat extends Combat {
  constructor(character, options) {
    super(character);
    
    this.weapons = options.weapons || {};
  }

  vulnerable() {
    if (this.weapon && this.weapon.ready()) { return false; }
    
    return this.character.movement == this.character.movements.climb ||
           this.character.movement == this.character.movements.soar ||
           this.character.movement == this.character.movements.fall;
  }
  
  arm() {
    this.armed = true;
  }
  
  disarm() {
    if (this.weapon) { 
      this.weapon.deactivate(); 
      this.weapon = null;
    }
    
    this.armed = false;
  }
  
  attack(weapon) {
    if (!this.armed) { return; }
    if (this.weapon && this.weapon != weapon) { this.weapon.deactivate(); }
    
    this.weapon = weapon;
    this.weapon.activate();
  }
  
  hold() {
    if (this.weapon) {
      this.weapon.deactivate();
      this.weapon = null;
    }
  }
  
  enemies() {
    return this.character.world.enemies.enemies;
  }
  
  tick() {
    super.tick();
    
    if (this.weapon) { this.weapon.tick(); }
  }
}

export default LeapCombat;

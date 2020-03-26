
import Combat from './combat.js';

const TRIGGER_RANGE = 50.0;
const DAMAGE_RANGE = 75.0;


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
    
    if (!this.weapon || !this.weapon.ready()) { return; }

    // find enemies    
    let triggers = this.enemies().filter((e) => {
      let distance = e.position.minus(this.character.position).length();
      
      return (distance < TRIGGER_RANGE);
    });
    
    if (triggers.length == 0) { return; }

    let world = this.character.world;
  
    // do damage
    this.enemies().forEach((enemy) => {
      let distance = enemy.position.minus(this.character.position).length();
      
      if (distance < DAMAGE_RANGE) {
        world.effects.add("assets/slash.svg", enemy.position);
        enemy.combat.hit();
      }
    });
    
    this.disarm();
  }
}

export default LeapCombat;

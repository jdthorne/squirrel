
import Combat from './combat.js';

const TRIGGER_RANGE = 50.0;
const DAMAGE_RANGE = 75.0;


class LeapCombat extends Combat {
  vulnerable() {
    return this.character.movement == this.character.movements.climb ||
           this.character.movement == this.character.movements.soar ||
           (
             this.character.movement == this.character.movements.attack &&
             !this.character.movement.attacking
           );
  }
  
  enemies() {
    return this.character.world.enemies.enemies;
  }
  
  tick() {
    if (this.character.movement != this.character.movements.attack) { return; }
    
    let triggers = this.enemies().filter((e) => {
      let distance = e.position.minus(this.character.position).length();
      
      return (distance < TRIGGER_RANGE);
    });
    
    if (triggers.length > 0) {
      this.attack();
    }        
  }
  
  attack() {
    let world = this.character.world;
  
    this.enemies().forEach((enemy) => {
      let distance = enemy.position.minus(this.character.position).length();
      
      if (distance < DAMAGE_RANGE) {
        world.effects.add("assets/slash.svg", enemy.position);
        enemy.combat.hit();
      }
    });

    this.character.movements.soar.activate();
  }
}

export default LeapCombat;
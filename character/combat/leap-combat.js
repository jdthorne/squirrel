import Combat from './combat.js';

const TRIGGER_RANGE = 25.0;
const DAMAGE_RANGE = 50.0;


class LeapCombat extends Combat {
  vulnerable() {
    return this.character.movement == this.character.movements.climb ||
           this.character.movement == this.character.movements.fly;
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
    this.enemies().forEach((enemy) => {
      let distance = enemy.position.minus(this.character.position).length();
      
      if (distance < DAMAGE_RANGE) {
        enemy.combat.hit();
      }
    });
    
    this.character.movements.fly.activate();
  }
}

export default LeapCombat;
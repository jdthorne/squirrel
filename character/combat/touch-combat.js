import Combat from './combat.js';


class TouchCombat extends Combat {
  constructor(character, range) {
    super(character);
    
    this.range = range;
  }

  tick() {
    if (this.dead) { return; }
  
    this.enemies().forEach((enemy) => {
      if (!enemy.combat.vulnerable()) { return; }
      
      let distance = this.character.position.minus(enemy.position).length();
      
      if (distance < this.range) {
        enemy.combat.hit();
      }
    });
  }
}

export default TouchCombat;

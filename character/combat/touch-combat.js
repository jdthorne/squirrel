import Combat from './combat.js';


class TouchCombat extends Combat {
  constructor(character, range) {
    super(character);
    
    this.range = range;
  }

  tick() {
    super.tick();
    if (this.dead) { return; }
    
    this.closestEnemyDistance = Infinity;
    this.closestEnemy = null;
  
    this.enemies().forEach((enemy) => {      
      let distance = this.character.position.minus(enemy.position).length();
      
      if (distance < this.closestEnemyDistance) {
        this.closestEnemyDistance = distance;
        this.closestEnemy = enemy;
      }
      
      if (enemy.combat.vulnerable() && enemy.combat.iframes <= 0 && distance < this.range) {
        enemy.world.effects.add("assets/nom.svg", enemy.position);
        enemy.combat.hit();
      }
    });
  }
}

export default TouchCombat;

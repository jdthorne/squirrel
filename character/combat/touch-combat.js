
import Combat from './combat.js';
import Effect from '../../objects/effect.js';


class TouchCombat extends Combat {
  constructor(character, options) {
    super(character, options);
    
    this.range = options.range;
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
        enemy.world.objects.add(new Effect({
          asset: "assets/nom.svg",
          position: enemy.position
        }));

        enemy.combat.hit(40);
      }
    });
  }
}

export default TouchCombat;

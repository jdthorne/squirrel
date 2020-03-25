import Fly from './fly.js';

const TRIGGER_RANGE = 25.0;
const DAMAGE_RANGE = 50.0;


class Attack extends Fly {
  control(input) {
    this.stopAttacking(input);
    
    super.control(input);
    
    this.hitEnemies(input);    
  }
  
  stopAttacking(input) {
    if (!input.jump) {
      this.character.movements.fly.activate();
      return;
    }
  }
  
  hitEnemies(input) {
    let triggers = this.character.world.enemies.enemies.filter((e) => {
      let distance = e.position.minus(this.character.position).length();
      
      return (distance < TRIGGER_RANGE);
    });
    
    if (triggers.length == 0) { return; }
        
    this.character.world.enemies.enemies.forEach((enemy) => {
      let distance = enemy.position.minus(this.character.position).length();
      
      if (distance < DAMAGE_RANGE) {
        enemy.die();
        Debug.log("hit enemy!");
      }
    });
    
    this.character.movements.fly.activate();
  }

  animate() {
    this.character.animations.attack.activate();
    this.aim(this.character.velocity);
  }
}

export default Attack;

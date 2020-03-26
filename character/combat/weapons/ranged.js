

import Weapon from './weapon.js';
import Projectile from '../../../objects/projectile.js';
import Vector from '../../../util/vector.js';


const RANGE = 400.0;
const PROJECTILE_SPEED = 10.0;


class Ranged extends Weapon {
  constructor(character, options) {
    super(character, options);
    
    this.minimumCharge = options.minimumCharge || 0.0;
    this.charge = 0;
  }
  
  activate() {
    super.activate();
    
    this.charge += 1;
    
    if (this.ready()) {
      this.fire();
      this.character.combat.disarm();
    } else {
      this.animations.charging.activate();
    }
  }
  
  fire() {
    let direction = new Vector(0, 1);
    
    let target = this.findClosestEnemy();
    if (target) {
      direction = target.position.minus(this.character.position).normalized();
    }
    
    this.character.world.objects.add(new Projectile({
      asset: "assets/pinecone.svg",
      position: this.character.position,
      velocity: direction.multipliedBy(PROJECTILE_SPEED),
      combat: this.character.combat,
      damage: this.damage
    }));
  }

  findClosestEnemy() {
    let closestEnemyDistance = Infinity;
    let closestEnemy = null;
  
    this.character.combat.enemies().forEach((enemy) => {      
      let distance = this.character.position.minus(enemy.position).length();
      
      if (distance < closestEnemyDistance) {
        closestEnemyDistance = distance;
        closestEnemy = enemy;
      }
    });
    
    if (closestEnemyDistance > RANGE) { return null; }
    
    return closestEnemy;
  }
  
  tick() { }
  
  ready() {
    return (this.charge >= this.minimumCharge);  
  }
  
  deactivate() {
    super.deactivate();
    this.charge = 0;
  }
}


export default Ranged;
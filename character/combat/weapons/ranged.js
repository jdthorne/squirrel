

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
      this.animations.charging.animateTo(this.charge / this.minimumCharge);
    }
  }
  
  fire() {
    let velocity = new Vector(this.character.velocity.x, this.character.velocity.y + PROJECTILE_SPEED);
    
    let target = this.findClosestEnemy();
    if (target) {
      velocity = target.position.minus(this.character.position).normalized().multipliedBy(PROJECTILE_SPEED);
    }
    
    this.character.world.objects.add(new Projectile({
      asset: "assets/pinecone.svg",
      position: this.character.position,
      velocity: velocity,
      combat: this.character.combat,
      damage: this.damage,
      rotation: velocity.angle()
    }));
  }

  findClosestEnemy() {
    let closestEnemyDistance = Infinity;
    let closestEnemy = null;
  
    this.character.combat.enemies().forEach((enemy) => {
      if (enemy.combat.iframes > 0) { return; }
      if (enemy.combat.dead) { return; }
      
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
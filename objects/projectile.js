
import Object from './object.js';
import Effect from './effect.js';


const TRIGGER_RANGE = 50.0;
const DAMAGE_RANGE = 200.0;

class Projectile extends Object {
  constructor(options = {}) {
    super(options);

    this.combat = options.combat;    
    this.lifespan = options.lifespan || 240;
    this.life = this.lifespan;
    
    this.velocity = options.velocity;
    this.damage = options.damage;
    
    this.spin = 0.5 - Math.random();
  }
  
  tick() {
    super.tick();
    
    this.life -= 1;        
    if (this.life <= 0) { this.remove(); }
    
    this.sprite.rotation += this.spin;
    this.position = this.position.plus(this.velocity);
    
    let triggers = this.combat.enemiesWithin(TRIGGER_RANGE, this.position);
    if (triggers.length > 0) {
      this.hit();
    }
  }
  
  hit() {
    let world = this.combat.character.world;
    
    world.objects.add(new Effect({
      asset: "assets/explosion.svg",
      position: this.position,
      scale: 5
    }));
    
    this.combat.enemiesWithin(DAMAGE_RANGE, this.position).forEach((enemy) => {
      enemy.combat.hit(this.damage);
      enemy.combat.aggro(240);

      world.objects.add(new Effect({
        asset: "assets/explosion.svg",
        position: enemy.position,
        lifespan: 30
      }));
    });
    
    this.remove();
  }
  
  /*
        if (enemy.combat.vulnerable() && enemy.combat.iframes <= 0 && distance < this.range) {
        enemy.world.objects.add(new Effect({
          asset: "assets/nom.svg",
          position: enemy.position
        }));

        enemy.combat.hit(40);
      }
  */
}


export default Projectile;
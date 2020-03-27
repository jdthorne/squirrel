
import Thing from './thing.js';
import Effect from './effect.js';


const TRIGGER_RANGE = 50.0;
const DAMAGE_RANGE = 200.0;

class Projectile extends Thing {
  constructor(options = {}) {
    super(options);

    this.combat = options.combat;    
    this.lifespan = options.lifespan || 240;
    this.life = this.lifespan;
    
    this.velocity = options.velocity;
    this.damage = options.damage;
    
    this.rotation = options.rotation;
    this.spin = 0.5 - Math.random();
  }
  
  tick() {
    super.tick();
    
    this.life -= 1;        
    if (this.life <= 0) { this.remove(); }
    
    this.sprite.rotation += this.spin;
    if (this.rotation) { this.sprite.rotation = this.rotation; }
    
    this.position = this.position.plus(this.velocity);
    
    let triggers = this.combat.enemiesWithin(TRIGGER_RANGE, this.position);
    if (triggers.length > 0) {
      this.hit();
    }
    
    let [ground, _] = this.world.ground.enforce(this.position);
    if (ground) {
      this.hit();
    }
  }
  
  hit() {
    let world = this.world;
    
    for (let i = 0; i < 3; i++) {
      world.objects.add(new Effect({
        asset: "assets/explosion.svg",
        position: this.position,
        scale: 5,
        alpha: 0.6,
        lifespan: 60
      }));
    }
    
    this.combat.enemiesWithin(DAMAGE_RANGE, this.position).forEach((enemy) => {
      if (enemy.combat.dead) { return; }
      if (enemy.combat.iframes > 0) { return; }

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
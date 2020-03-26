
import Weapon from './weapon.js';
import Effect from '../../../objects/effect.js';


const TRIGGER_RANGE = 50.0;
const DAMAGE_RANGE = 75.0;

const INVUNERABILITY_PERIOD = 40.0;


class Melee extends Weapon {
  constructor(character, options) {
    super(character, options);
    
    this.minimumCharge = options.minimumCharge || 0.0;
    this.charge = 0;
  }
  
  activate() {
    super.activate();
    
    this.charge += 1;
    
    if (this.ready()) {
      this.animations.attacking.activate();
    } else {
      this.animations.charging.activate();
    }
  }
  
  ready() {
    return (this.charge >= this.minimumCharge);  
  }
  
  tick() {
    if (!this.ready()) { return; }
    this.fire();
  }
  
  fire() {
    let combat = this.character.combat;
  
    // find enemies
    let triggers = combat.enemies().filter((e) => {
      let distance = e.position.minus(this.character.position).length();
      
      return (distance < TRIGGER_RANGE);
    });
    
    if (triggers.length == 0) { return; }

    let world = this.character.world;
  
    // do damage
    combat.enemies().forEach((enemy) => {
      let distance = enemy.position.minus(this.character.position).length();
      
      if (distance < DAMAGE_RANGE) {
        world.objects.add(new Effect({
          asset: "assets/slash.svg",
          position: enemy.position
        }));

        enemy.combat.hit(this.damage);
        combat.iframes = INVUNERABILITY_PERIOD;
      }
    });
    
    combat.disarm();
  }
  
  deactivate() {
    super.deactivate();
    this.charge = 0;
  }
}


export default Melee;

import Weapon from './weapon.js'


const MIN_CHARGE = 20.0;

class Sword extends Weapon {
  constructor(character, animations) {
    super(character);

    this.animations = animations;

    this.charge = 0;
  }
  
  activate() {
    super.activate();
    
    this.charge += 1;
    
    Debug.log("sword.charge", this.charge);
    
    if (this.ready()) {
      this.animations.firing.activate();
    } else {
      this.animations.charging.activate();
    }
  }
  
  ready() {
    return (this.charge > MIN_CHARGE);  
  }
  
  deactivate() {
    super.deactivate();
    this.charge = 0;

    Debug.log("sword.charge", 0);
  }
}

export default Sword;
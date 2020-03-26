
import Weapon from './weapon.js';


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
  
  deactivate() {
    super.deactivate();
    this.charge = 0;
  }
}


export default Melee;
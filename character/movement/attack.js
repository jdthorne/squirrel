import Soar from './soar.js';


class Attack extends Soar {
  control(input) {
    this.stopAttacking(input);
    
    super.control(input);
  }
  
  stopAttacking(input) {
    if (!input.jump) {
      this.character.movements.soar.activate();
      return;
    }
  }  

  animate() {
    this.character.animations.attack.activate();
    this.aim(this.character.velocity);
  }
}

export default Attack;

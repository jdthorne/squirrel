import Soar from './soar.js';


class Attack extends Soar {
  control(input) {
    this.checkAttacking(input);
    
    super.control(input);
  }
  
  checkAttacking(input) {
    this.attacking = input.jump;
  }  

  animate() {
    if (this.attacking) {
      this.character.animations.attack.activate();
    } else {
      this.character.animations.attackRelax.activate();
    }
    
    this.aim(this.character.velocity);
  }
}

export default Attack;

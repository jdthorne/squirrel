import Fly from './fly.js';


class Attack extends Fly {
  control(input) {
    this.stopAttacking(input);
    
    super.control(input);
  }
  
  stopAttacking(input) {
    if (!input.jump) {
      this.character.movements.fly.activate();
      return;
    }
  }  

  animate() {
    this.character.animations.attack.activate();
    this.aim(this.character.velocity);
  }
}

export default Attack;

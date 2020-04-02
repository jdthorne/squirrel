
import Fall from './fall.js';

const MIN_SLIDE_SPEED = 10;

const SPEED_X = 0.35;
const SPEED_Y = 0.2;


class Soar extends Fall {

  // Soar: fall, but in a controlled arc

  constructor(character, navigation, ground) {
    super(character, ground);
    
    this.navigation = navigation;
  }
    
  control(input) {
    // push
    this.character.velocity.x += input.move.x * SPEED_X;
    this.character.velocity.y += input.move.y * SPEED_Y;
  }
  
  animate() {
    this.character.animations.soar.activate();
    this.aim(this.character.velocity);
  }
  
  slip() {
    let speed = this.character.velocity.length();
    if (speed < MIN_SLIDE_SPEED) {
      this.character.velocity.multiplyBy(MIN_SLIDE_SPEED / speed);
      
      if (this.character.velocity.y < 0) {
        this.character.velocity.multiplyBy(-1);
      }
    }

    this.character.velocity.multiplyBy(0.95);
  }
}

export default Soar;

import Movement from './movement.js';

const SPEED_X = 0.35;
const SPEED_Y = 0.2;

const GRAVITY = -0.5;
const MIN_SLIDE_SPEED = 10;


class Soar extends Movement {

  // Soar: fly in a controlled ballistic arc

  constructor(character, navigation, ground) {
    super(character);
    
    this.navigation = navigation;
    this.ground = ground;
  }
  
  tick() {
    // fall
    this.character.velocity.y -= GRAVITY;
        
    // move
    this.character.position.x += this.character.velocity.x;
    this.character.position.y += this.character.velocity.y;
   
    // hit ground
    let [hit, position, normal] = this.ground.enforce(this.character.position);
    this.sliding = hit;
    this.slide(position, normal);

    // animate 
    this.animate();
  }
  
  slide(position, normal) {
    if (!this.sliding) { return; }
    
    normal.normalize();
    
    this.character.velocity = this.character.velocity.minus(
      normal.multipliedBy(
        normal.dot(this.character.velocity)
      )
    )
    
    let speed = this.character.velocity.length();
    if (speed < MIN_SLIDE_SPEED) {
      this.character.velocity.multiplyBy(MIN_SLIDE_SPEED / speed);
      
      if (this.character.velocity.y < 0) {
        this.character.velocity.multiplyBy(-1);
      }
    }
    
    this.character.velocity.multiplyBy(0.9);
    this.character.position = position;
  }
  
  control(input) {
    if (this.sliding) { return; }

    // push
    this.character.velocity.x += input.move.x * SPEED_X;
    this.character.velocity.y += input.move.y * SPEED_Y;
  }
  
  animate() {
    this.character.animations.soar.activate();
    this.aim(this.character.velocity);
  }
}

export default Soar;

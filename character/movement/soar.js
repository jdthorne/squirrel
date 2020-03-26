import Movement from './movement.js';

const SPEED = 0.2;

const GRAVITY = -0.5;


class Soar extends Movement {

  // Soar: fly in a controlled ballistic arc

  constructor(character, navigation, ground) {
    super(character);
    
    this.navigation = navigation;
    this.ground = ground;
  }
  
  tick() {
    // hit ground
    let [hit, position] = this.ground.enforce(this.character.position);
    if (hit) {
      this.character.position = position;
      this.character.movements.climb.activate();
      return;
    }
  }
  
  control(input) {
    // push
    this.character.velocity.x += input.stick.x * SPEED;
    this.character.velocity.y += input.stick.y * SPEED;
    
    // fall
    this.character.velocity.y -= GRAVITY;
        
    // move
    this.character.position.x += this.character.velocity.x;
    this.character.position.y += this.character.velocity.y;
   
    // animate 
    this.animate();
  }
  
  animate() {
    this.character.animations.soar.activate();
    this.aim(this.character.velocity);
  }
}

export default Soar;

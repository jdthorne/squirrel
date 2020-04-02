
import Movement from './movement.js';

const GRAVITY = -0.5;


class Fall extends Movement {

  // Fall: fall in an uncontrolled ballistic trajectory

  constructor(character, ground) {
    super(character);    
    
    this.ground = ground;
  }
  
  activate() {
    super.activate();    
  }
  
  deactivate() {
    super.deactivate();
    this.character.scale.y = 1;
    this.sliding = false;
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
    
    this.slip();
    
    this.character.position = position;
    this.grounded = true;
  }
  
  slip() {
    this.character.velocity.multiplyBy(0.8);
  }

  animate() {
    if (this.character.animations && this.character.animations.fall) {
      this.character.animations.fall.activate();
    }

    this.character.scale.y = -1;
  }
}

export default Fall;

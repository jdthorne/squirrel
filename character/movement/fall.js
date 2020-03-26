
import Movement from './movement.js';

const GRAVITY = -0.5;


class Fall extends Movement {

  // Fall: fall in an uncontrolled ballistic trajectory
  // (todo: combine with soar?)

  constructor(character, ground) {
    super(character);    
    
    this.ground = ground;
  }
  
  activate() {
    super.activate();
    
    if (this.character.animations && this.character.animations.fall) {
      this.character.animations.fall.activate();
    }
  }
  
  deactivate() {
    super.deactivate();

    this.character.scale.y = 1;
  }
  
  tick() {
    // fall
    this.character.velocity.y -= GRAVITY;

    // move
    this.character.position.x += this.character.velocity.x;
    this.character.position.y += this.character.velocity.y;

    // hit ground?
    if (this.ground) {
      let [hit, position] = this.ground.enforce(this.character.position);
      if (hit) {
        this.character.position = position;
        this.character.velocity.x *= 0.95;
        this.character.velocity.y = 0;
        this.character.rotation = 0;
      }
    }
   
    // animate 
    this.character.scale.y = -1;
  }  
}

export default Fall;

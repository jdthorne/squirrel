import Movement from './movement.js';

const GRAVITY = -0.5;
const COOLDOWN = 40;


class Fall extends Movement {
  constructor(character) {
    super(character);    
  }
  
  activate() {
    super.activate();
    
    this.cooldown = COOLDOWN;
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
   
    // animate 
    this.character.scale.y = -1;
  }
  
  control(input) {
    this.cooldown -= 1;
    
    if (this.cooldown < 0) {
      this.character.movements.fly.activate();
    }
  }
}

export default Fall;

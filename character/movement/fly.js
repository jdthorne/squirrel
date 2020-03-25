import Movement from './movement.js';

const FLY_SPEED = 0.2;

const GRAB_DISTANCE = 10;
const GRAVITY = -0.5;


class Fly extends Movement {
  constructor(character, navigation) {
    super(character);
    
    this.navigation = navigation;
  }
  
  control(input) {
    // grab?
    if (!input.jump && this.character.velocity.y > 0) {
      let [grabbed, position] = this.navigation.snap(
        this.character.position,
        GRAB_DISTANCE
      );
      
      if (grabbed) {
        this.character.position = position;
        this.character.movements.climb.activate();
        return;
      }
    }

    // push
    this.character.velocity.x += input.stick.x * FLY_SPEED;
    this.character.velocity.y += input.stick.y * FLY_SPEED;
    
    // fall
    this.character.velocity.y -= GRAVITY;
        
    // move
    this.character.position.x += this.character.velocity.x;
    this.character.position.y += this.character.velocity.y;
   
    // animate 
    this.character.animations.fly.activate();
    this.aim(this.character.velocity);
  }
}

export default Fly;

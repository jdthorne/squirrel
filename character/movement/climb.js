
import Vector from '../../util/vector.js';

import Movement from './movement.js';


const WALK_SPEED = 6;
const JUMP_SPEED = -4;

const GRAB_DISTANCE = 10;


class Climb extends Movement {
  constructor(character, navigation) {
    super(character);

    this.navigation = navigation;
    this.cooldown = 0;
  }
  
  activate() {
    super.activate();
    this.cooldown = 10;
  }
  
  control(input) {
    let startPosition = new Vector(this.character.position);
    this.cooldown -= 1;
          
    // move
    if (input.move.length() < 0.2) {
      this.character.velocity.x = 0;
      this.character.velocity.y = 0;
    } else {
      this.character.velocity.x = input.move.x * WALK_SPEED;
      this.character.velocity.y = input.move.y * WALK_SPEED;
    }
    
    // grab
    let availableSpeed = this.character.velocity.length();
    let direction      = this.character.velocity.normalized();
    
    for (var iteration = 0; iteration < 10; iteration++) {
      let movement = direction.multipliedBy(availableSpeed);
      let target = this.character.position.plus(movement);
    
      let [grabbed, position] = this.navigation.snap(
        target,
        GRAB_DISTANCE
      );
      
      if (!grabbed) { break; }
      
      availableSpeed -= position.minus(this.character.position).length();
      this.character.position = position;        
      
      if (availableSpeed < 1) { break; }
    }

    // push off ground
    let [hit, ground] = this.character.world.ground.enforce(this.character.position);
    if (hit) {
      this.character.position = ground;
    }

    // animate
    let movement = this.character.position.minus(startPosition);
    
    if (movement.length() > WALK_SPEED/4) { 
      this.character.animations.run.activate();
      this.character.animations.run.animate(movement.length() * 0.0075);
      
      this.aim(movement);
    } else {
      this.character.animations.run.reset();
      this.character.animations.stand.activate();
      this.aim();
    }
  }
}

export default Climb;

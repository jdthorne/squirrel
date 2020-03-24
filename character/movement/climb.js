
import Vector from '../../util/vector.js';

import Movement from './movement.js';


const WALK_SPEED = 6;
const GRAB_DISTANCE = 10;
const ANGLE_SNAP = Math.PI / 16;


class Climb extends Movement {
  constructor(character, navigation) {
    super(character);

    this.running = false;    
    this.navigation = navigation;
  }
  
  control(input) {
    let startPosition = new Vector(this.character.position);
  
    // push
    this.character.velocity.x = input.stick.x * WALK_SPEED;
    this.character.velocity.y = input.stick.y * WALK_SPEED;

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
        
    // select animation
    let movement = this.character.position.minus(startPosition);
    
    if (movement.length() > WALK_SPEED/2) { 
      this.running = true;
      this.character.animations.run.activate();
    }
    
    if (movement.length() < 1) { 
      this.running = false;
      this.character.animations.stand.activate();
    }

    // aim in direction of movement [todo: should this always happen?]
    if (this.running) {
      this.character.aim(movement, ANGLE_SNAP);
    } else {
      this.character.aim();
    }    
  }
}

export default Climb;

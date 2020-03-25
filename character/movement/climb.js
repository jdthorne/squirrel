
import Vector from '../../util/vector.js';

import Movement from './movement.js';


const WALK_SPEED = 6;
const GRAB_DISTANCE = 10;
const ANGLE_SNAP = Math.PI / 16;


class Climb extends Movement {
  constructor(character, navigation) {
    super(character);

    this.navigation = navigation;
  }
  
  control(input) {
    let startPosition = new Vector(this.character.position);
      
    // push
    if (input.stick.length() < 0.2) {
      this.character.velocity.x = 0;
      this.character.velocity.y = 0;
    } else {
      this.character.velocity.x = input.stick.x * WALK_SPEED;
      this.character.velocity.y = input.stick.y * WALK_SPEED;
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

    // select animation
    let movement = this.character.position.minus(startPosition);
    
    if (movement.length() > WALK_SPEED/4) { 
      this.character.animations.run.activate();
      this.character.animations.run.animate(movement.length() * 0.006);
      
      this.aim(movement, ANGLE_SNAP);
    } else {
      this.character.animations.stand.activate();
      this.aim();
    }
  }
}

export default Climb;

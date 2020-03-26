
import Melee from './melee.js'


class Claws extends Melee {
  constructor(character, animations) {
    super(character, {
      animations: animations,
      
      minimumCharge: 0.0,
      damage: 40
    });
  }
}

export default Claws;
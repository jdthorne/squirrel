
import Melee from './melee.js'


class Sword extends Melee {
  constructor(character, animations) {
    super(character, {
      animations: animations,
      
      minimumCharge: 20.0,
      damage: 150
    });
  }
}

export default Sword;
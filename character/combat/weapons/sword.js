
import Melee from './melee.js'


class Sword extends Melee {
  constructor(character, animations) {
    super(character, {
      animations: animations,
      
      minimumCharge: 13.0,
      damage: 150,
      staysArmed: true
    });
  }
}

export default Sword;
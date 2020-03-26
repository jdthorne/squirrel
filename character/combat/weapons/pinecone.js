
import Ranged from './ranged.js'


class Pinecone extends Ranged {
  constructor(character, animations) {
    super(character, {
      animations: animations,
      
      minimumCharge: 40.0,
      damage: 22.0
    });
  }
}

export default Pinecone;
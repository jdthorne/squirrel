
import Ranged from './ranged.js'


class Pinecone extends Ranged {
  constructor(character, animations) {
    super(character, {
      animations: animations,
      
      minimumCharge: 40.0
    });
  }
}

export default Pinecone;
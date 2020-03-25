
import Animation from './animation.js';

class Squish extends Animation {
  constructor(character, sprite, options) {
    super(character, [sprite], options);
  }
  
  animate(progress) {
    this.character.group.scale.y = 1 + (Math.sin(progress) * 0.1);
  }
}

export default Squish;
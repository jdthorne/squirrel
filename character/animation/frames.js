
import Animation from './animation.js';

class Frames extends Animation {
  constructor(character, sprites) {
    super(character, sprites);
  }
  
  setup(group, options) {
    super.setup(group, options);
  }
  
  animate(progress) {
    return;
  
    progress = progress % 1;
    
    this.sprites.forEach((sprite, index) => {
      sprite.visible = index == Math.floor(progress * this.sprites.length);
    });
  }
}

export default Frames;

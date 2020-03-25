
import Animation from './animation.js';

class Frames extends Animation {
  constructor(character, sprites) {
    super(character, sprites);
    
    this.progress = 0;
  }
  
  animate(progress) {
    this.progress = (this.progress + progress) % 1;
    
    let currentFrame = Math.floor(this.progress * this.sprites.length);
    
    this.sprites.forEach((sprite, index) => {
      sprite.visible = (index == currentFrame);
      
      Debug.log("frames." + index, sprite.visible);
    });
  }
}

export default Frames;


import Animation from './animation.js';

class Frames extends Animation {
  constructor(character, sprites, options) {
    super(character, sprites, options);
    
    this.progress = 0;
    this.length = options.length || 1;
    this.repeat = options.repeat || false;
  }
  
  animate(progress) {
    this.animateTo(this.progress + progress);
  }
  
  animateTo(progress) {
    if (this.repeat) {progress = progress % 1; }

    let currentFrame = Math.floor(progress * this.sprites.length);
    if (currentFrame >= this.sprites.length) { currentFrame = this.sprites.length - 1; }
    
    this.sprites.forEach((sprite, index) => {
      sprite.visible = (index == currentFrame);
    });
    
    this.progress = progress;
  }
  
  reset() {
    this.animateTo(0);
  }
}

export default Frames;

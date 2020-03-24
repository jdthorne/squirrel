
import Character from './character.js';

import Patrol from './movement/patrol.js';
import Squish from './animation/squish.js';

const SPEED = 0.5;


class SnailSlug extends Character {
  constructor(path) {
    super();
    
    this.animation = new Squish(this, "assets/snail-slug.svg");
    this.movement = new Patrol(this, path, SPEED, this.animation);
  }  
}

export default SnailSlug;


import Character from './character.js';

import Patrol from './movement/patrol.js';
import Squish from './animation/squish.js';
import TouchCombat from './combat/touch-combat.js';

const SPEED = 0.5;
const COMBAT_RANGE = 50.0;


class SnailSlug extends Character {
  constructor(world, path) {
    super(world);
    
    this.animation = new Squish(this, "assets/snail-slug.svg");
    this.movement = new Patrol(this, path, SPEED, this.animation);
    this.combat = new TouchCombat(this, { health: 100, range: COMBAT_RANGE });
  }  
}

export default SnailSlug;

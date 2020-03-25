
import Character from './character.js';

import Patrol from './movement/patrol.js';
import Frames from './animation/frames.js';
import Squish from './animation/squish.js';
import TouchCombat from './combat/touch-combat.js';

const SPEED = 2;
const COMBAT_RANGE = 50.0;


class Pigeon extends Character {
  constructor(path) {
    super();
    
    this.animation = new Frames(this, [
      "assets/pigeon-flying0.svg",
      "assets/pigeon-flying1.svg",
    ], {
      scale: 1.5
    });
    this.movement = new Patrol(this, path, SPEED, { level: true });
    this.combat = new TouchCombat(this, COMBAT_RANGE);
  }
}

export default Pigeon;


import Character from './character.js';

import Patrol from './movement/patrol.js';
// import Fly from './movement/fly.js';

import Frames from './animation/frames.js';
import TouchCombat from './combat/touch-combat.js';

const SPEED = 2;
const COMBAT_RANGE = 50.0;

const ESCAPE_DISTANCE = 200.0;


class Pigeon extends Character {
  constructor(path) {
    super();
    
    this.animation = new Frames(this, [
      "assets/pigeon-flying0.svg",
      "assets/pigeon-flying1.svg",
    ], {
      scale: 1.5
    });

    this.movements = {
      patrol: new Patrol(this, path, SPEED, { level: true }),
      // fly: new Fly(this, SPEED * 2)
    };
    
    this.movements.patrol.activate();

    this.combat = new TouchCombat(this, COMBAT_RANGE);
  }
  
  tick() {
    super.tick();
    
    /*
    if (this.combat.closestEnemyDistance < ESCAPE_DISTANCE) {
      this.movements.escape.activate(this.combat.closestEnemy);
    }
    */
  }
}

export default Pigeon;

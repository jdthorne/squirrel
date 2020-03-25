
import Character from './character.js';

import Patrol from './movement/patrol.js';
import Fly from './movement/fly.js';

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
      escape: new Fly(this, SPEED * 4),
      cruise: new Fly(this, SPEED),
    };
    
    this.movements.patrol.activate();

    this.combat = new TouchCombat(this, COMBAT_RANGE);
  }
  
  tick() {
    super.tick();
    
    // run away?
    let enemy = this.combat.closestEnemy;
    if (!enemy) { return; }
    if (enemy.combat.vulnerable()) { return; }
    
    if (this.combat.closestEnemyDistance < ESCAPE_DISTANCE) {
      let runAway = this.position.minus(enemy.position).normalized().multipliedBy(ESCAPE_DISTANCE * 2);
      let runAwayTarget = this.position.plus(runAway);
      
      this.movements.escape.activate(
        runAwayTarget, 
        () => { 
          this.returnToPatrol(); 
        }
      );
    }
  }
  
  returnToPatrol() {
    this.movements.cruise.activate(
      this.movements.patrol.point,
      () => { this.movements.patrol.activate(); }
    );
  }
}

export default Pigeon;

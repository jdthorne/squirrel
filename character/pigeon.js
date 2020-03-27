
import Character from './character.js';

import Patrol from './movement/patrol.js';
import Direct from './movement/direct.js';

import Frames from './animation/frames.js';
import TouchCombat from './combat/touch-combat.js';

const SPEED = 2;
const COMBAT_RANGE = 50.0;

const ESCAPE_DISTANCE = 200.0;


class Pigeon extends Character {
  constructor(world, path) {
    super(world);
    
    this.animation = new Frames(this, [
      "assets/pigeon-flying0.svg",
      "assets/pigeon-flying1.svg",
    ], {
      scale: 1.5,
      repeat: true
    });

    this.movements = {
      patrol: new Patrol(this, path, SPEED, { level: true }),
      escape: new Direct(this, SPEED * 3),
      attack: new Direct(this, SPEED),
      cruise: new Direct(this, SPEED),
    };
    
    this.movements.patrol.activate();

    this.combat = new TouchCombat(this, { health: 25, range: COMBAT_RANGE });
  }
  
  tick() {
    super.tick();
    
    if (this.combat.dead) { return; }
    
    let enemy = this.combat.closestEnemy;
    if (!enemy) { return; }
    
    if (this.combat.aggrivation > 0) {
      this.attack(enemy, this.movements.escape);
    } else if (this.combat.closestEnemyDistance > ESCAPE_DISTANCE) {
      // do nothing
    } else if (enemy.combat.vulnerable() && !enemy.combat.dead) {
      this.attack(enemy, this.movements.attack);
    } else {
      this.runAwayFrom(enemy);
    }
  }
  
  attack(enemy, movement) {
    movement.activate(
      enemy.position,
      () => { this.returnToPatrol(); }
    )
  }
  
  runAwayFrom(enemy) {
    let runAway = this.position.minus(enemy.position).normalized().multipliedBy(ESCAPE_DISTANCE * 2);
    let runAwayTarget = this.position.plus(runAway);
    
    this.movements.escape.activate(
      runAwayTarget, 
      () => { this.returnToPatrol(); }
    );
  }
  
  returnToPatrol() {
    this.movements.cruise.activate(
      this.movements.patrol.point,
      () => { this.movements.patrol.activate(); }
    );
  }
}

export default Pigeon;

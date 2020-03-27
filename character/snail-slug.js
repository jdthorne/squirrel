
import Character from './character.js';

import Patrol from './movement/patrol.js';
import Frames from './animation/frames.js';
import TouchCombat from './combat/touch-combat.js';
import Debris from '../objects/debris.js';
import Pickup from '../objects/pickup.js';
import Vector from '../util/vector.js';

const SPEED = 0.5;
const COMBAT_RANGE = 50.0;


class SnailSlug extends Character {
  constructor(world, path) {
    super(world, {
      acorns: 1
    });
    
    this.animations = {
      patrol: new Frames(this, ["assets/snail-slug.svg"]),
      fall:   new Frames(this, ["assets/snail-slug-dead.svg"])
    };
    this.animations.patrol.activate();
    
    this.movement = new Patrol(this, path, SPEED);
    this.combat = new TouchCombat(this, { health: 100, range: COMBAT_RANGE });
  }
  
  die() {
    super.die();

    this.world.objects.add(new Pickup({
      asset: "assets/acorn.svg",
      position: this.position.clone(),
      velocity: new Vector(2 * this.world.player.scale.x, -5)
    }));

    this.world.objects.add(new Debris({
      asset: "assets/snail-slug-shell.svg",
      position: this.position.clone(),
      velocity: new Vector(5 * this.world.player.scale.x, -2)
    }));
  }
}

export default SnailSlug;

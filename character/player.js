
import Character from './character.js';

import Climb from './movement/climb.js';
import Soar from './movement/soar.js';
import Attack from './movement/attack.js';
import Fall from './movement/fall.js';
import LeapCombat from './combat/leap-combat.js';

import Frames from './animation/frames.js';

import Vector from '../util/vector.js'
import Debug from '../util/debug.js'


class Player extends Character {
  constructor(app, input, world) {
    super();
    
    this.movements = {
      climb:  new Climb(this, world.navigation),
      attack: new Attack(this, world.navigation),
      soar:   new Soar(this, world.navigation),
      fall:   new Fall(this, world.navigation)
    }
    
    this.animations = {
      stand:  new Frames(this, ["assets/squirrel-standing.svg"], { scale: 1.2 }),
      attack: new Frames(this, ["assets/squirrel-attacking.svg"], { scale: 1.2 }),
      soar:   new Frames(this, ["assets/squirrel-running2.svg"], { scale: 1.2 }),
      run:    new Frames(this, [
        "assets/squirrel-running0.svg",
        "assets/squirrel-running1.svg",
        "assets/squirrel-running2.svg",
        "assets/squirrel-running3.svg",
        "assets/squirrel-running4.svg",
      ], { scale: 1.2 }),
    }
    
    this.movements.climb.activate();
    this.animations.stand.activate();
    
    this.combat = new LeapCombat(this);
    
    this.app = app;
    this.input = input;
    this.world = world;
    
    this.world.player = this;
  }
  
  tick() {
    super.tick();
    
    this.movement.control(this.input);
    
    Debug.log("player.position", this.position);
    if (this.position.y > 2500) { 
      this.position = new Vector(460, 1350); 
      this.velocity = new Vector(0, 0); 
    }
  }
  
  hit() {
    if (this.movement == this.movements.attack) { return; }
    
    this.movements.fall.activate();
  }
}

export default Player;
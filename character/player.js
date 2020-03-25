
import Character from './character.js';

import Climb from './movement/climb.js';
import Fly from './movement/fly.js';
import Attack from './movement/attack.js';
import Fall from './movement/fall.js';

import Frames from './animation/frames.js';

import Vector from '../util/vector.js'
import Debug from '../util/debug.js'


class Player extends Character {
  constructor(app, input, world) {
    super();
    
    this.movements = {
      climb:  new Climb(this, world.navigation),
      attack: new Attack(this, world.navigation),
      fly:    new Fly(this, world.navigation),
      fall:   new Fall(this, world.navigation)
    }
    
    this.animations = {
      stand:  new Frames(this, ["assets/squirrel-standing.svg"]),
      attack: new Frames(this, ["assets/squirrel-running0.svg"]),
      fly:    new Frames(this, ["assets/squirrel-running1.svg"]),
      run:    new Frames(this, [
        "assets/squirrel-running0.svg",
        "assets/squirrel-running1.svg",
      ]),
    }
    
    this.movements.climb.activate();
    this.animations.stand.activate();
    
    this.app = app;
    this.input = input;
    this.world = world;
    
    this.world.player = this;
  }
  
  tick() {
    super.tick();
    
    this.movement.control(this.input);
    
    Debug.log("player.position", this.position);
    if (this.position.x < 0) { this.position.x = 0; }
    if (this.position.x > 2050) { this.position.x = 2050; }
    if (this.position.y > 1500) { this.position.y = 1500; }
  }
  
  hit() {
    if (this.movement == this.movements.attack) { return; }
    
    this.movements.fall.activate();
  }
}

export default Player;
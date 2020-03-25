
import Character from './character.js';

import Climb from './movement/climb.js';
import Fly from './movement/fly.js';

import Frames from './animation/frames.js';

import Vector from '../util/vector.js'
import Debug from '../util/debug.js'


class Player extends Character {
  constructor(app, input, world) {
    super();
    
    this.movements = {
      climb: new Climb(this, world.navigation),
      fly:   new Fly(this, world.navigation)
    }
    
    this.animations = {
      stand: new Frames(this, ["assets/squirrel-standing.svg"]),
      fly:   new Frames(this, ["assets/squirrel-running0.svg"]),
      run:   new Frames(this, [
        "assets/squirrel-running0.svg",
        "assets/squirrel-running1.svg",
      ]),
    }
    
    this.movements.climb.activate();
    this.animations.stand.activate();
    
    this.app = app;
    this.input = input;
    this.world = world;
  }
  
  tick() {
    super.tick();
    
    this.movement.control(this.input);
  }
}

export default Player;
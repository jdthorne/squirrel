
import Character from './character.js';

import Climb from './movement/climb.js';
import Soar from './movement/soar.js';
import Fall from './movement/fall.js';

import LeapCombat from './combat/leap-combat.js';
import Sword from './combat/weapons/sword.js';
import Claws from './combat/weapons/claws.js';

import Frames from './animation/frames.js';

import Vector from '../util/vector.js'
import Debug from '../util/debug.js'


const WALK_SPEED = 6;
const JUMP_SPEED = -4;

const GRAB_DISTANCE = 10;


class Player extends Character {
  constructor(app, input, world) {
    super();
    
    this.movements = {
      climb:  new Climb(this,  world.navigation, world.ground),
      soar:   new Soar(this,   world.navigation, world.ground),
      fall:   new Fall(this,   world.ground)
    }
    this.movements.climb.activate();
    
    this.animations = {
      stand:       new Frames(this, ["assets/squirrel-standing.svg"], { scale: 1.2 }),
      soar:        new Frames(this, ["assets/squirrel-running1.svg"], { scale: 1.2 }),
      fall:        new Frames(this, ["assets/squirrel-running2.svg"], { scale: 1.2 }),
      run:         new Frames(this, [
        "assets/squirrel-running0.svg",
        "assets/squirrel-running1.svg",
        "assets/squirrel-running2.svg",
        "assets/squirrel-running3.svg",
        "assets/squirrel-running4.svg",
      ], { scale: 1.2 }),

      swordCharge:      new Frames(this, ["assets/squirrel-sword-charging.svg"], { scale: 1.2 }),
      swordAttack:      new Frames(this, ["assets/squirrel-sword-attacking.svg"], { scale: 1.2 }),
      clawsAttack:      new Frames(this, ["assets/squirrel-claws-attacking.svg"], { scale: 1.2 }),
    }    
    this.animations.stand.activate();
    
    this.combat = new LeapCombat(this, {
      weapons: {
        sword: new Sword(this, {
          charging:  this.animations.swordCharge,
          attacking: this.animations.swordAttack
        }),
        claws: new Claws(this, {
          attacking: this.animations.clawsAttack
        })
      }
    });
    
    this.app = app;
    this.input = input;
    this.world = world;
    
    this.world.player = this;
  }
  
  tick() {
    super.tick();
    
    this.movement.control(this.input);
    
    this.stayInsideWorld();
    
    this.jump(this.input);
    this.grab(this.input);
    this.attack(this.input);
    this.recover();
    
    Debug.log("player.position", this.position);
    Debug.log("player.health", this.combat.health);
  }
  
  stayInsideWorld() {
    if (this.position.y <= 2500) { return; }

    this.position.x = 675
    this.position.y = 1435;
    this.velocity = new Vector(0, 0); 
  }
  
  jump(input) {
    if (this.movement != this.movements.climb) { return; }
    if (!input.jump) { return; }
    if (this.movement.cooldown > 0) { return; }
    
    this.velocity.x = (input.move.x * WALK_SPEED);
    this.velocity.y = (input.move.y * WALK_SPEED) + JUMP_SPEED;

    this.movements.soar.activate();
    this.combat.arm();
  }
  
  grab(input) {
    if (this.movement != this.movements.soar) { return; }
    if (input.jump) { return; }
    
    let [grabbed, position] = this.world.navigation.snap(
      this.position,
      GRAB_DISTANCE
    );
    
    if (grabbed) {
      this.position = position;
      this.movements.climb.activate();
    }
  }
  
  attack(input) {
    if (this.movement != this.movements.soar) { 
      this.combat.disarm();
      return; 
    } 
    
    if (this.combat.armed && input.jump) {
      let weapon = this.combat.weapons.claws;
      if (input.light) { weapon = this.combat.weapons.sword; }
  
      this.combat.attack(weapon);
    } else {
      this.combat.hold();
      this.animations.soar.activate();
      return;
    }
  }
  
  recover() {
    if (this.combat.health >= 0) { return; }
    
    this.combat.heal();
  }
  
  hit() {
    if (this.movement == this.movements.attack) { return; }
    
    this.movements.fall.activate();
  }
}

export default Player;
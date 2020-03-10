import Vector from './vector.js'
import Debug from './debug.js'


const WALK_SPEED = 20;
const FLY_SPEED = 0.1;
const JUMP_SPEED = -20;

const GRAB_DISTANCE = 50;
const GRAVITY = -1;


class Player {
  constructor(app, input, world) {
    this.app = app;
    this.input = input;
    this.world = world;
    
    this.flying = false;
    this.position = new Vector();
    this.velocity = new Vector();
    
    PIXI.loader.add("Squirrel.svg").load(() => this.setup());    
  }
  
  setup() {
    let sprite = new PIXI.Sprite(
      PIXI.loader.resources["Squirrel.svg"].texture
    );
    
    sprite.width = 256;
    sprite.height = 256;
    
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    
    this.app.stage.addChild(sprite);
    this.sprite = sprite;
  }
  
  tick() {  
    if (!this.sprite) { return; }
    
    let input = this.input;

    // move    
    if (!this.flying) {      
      this.velocity.x = input.stick.x * WALK_SPEED;
      this.velocity.y = input.stick.y * WALK_SPEED;
    } else {
      this.velocity.x += input.stick.x * FLY_SPEED;
      this.velocity.y += input.stick.y * FLY_SPEED;
    }

    // jump
    if (input.jump && !this.flying) {
      this.flying = true;
      this.velocity.x = input.stick.x * 12;
      this.velocity.y = JUMP_SPEED;
    }
    
    // grab
    if (!input.jump || this.velocity.y > JUMP_SPEED / 2) {
      let [grabbed, position] = this.world.snap(
        this.position,
        GRAB_DISTANCE
      );
      
      if (grabbed) {
        this.position = position;
        this.flying = false;
      }
    }
    
    // fall
    if (this.flying) {
      this.velocity.y -= GRAVITY;
      
      if (this.velocity.y > GRAB_DISTANCE) {
        this.velocity.y = GRAB_DISTANCE;
      }
    }
    
    // turn
    if (this.velocity.x < 0) {
      this.sprite.scale.x = -0.5;
    } else if (this.velocity.x > 0) {
      this.sprite.scale.x = 0.5;
    }

    // integrate                
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    
    this.position.add(this.velocity);

    Debug.log("position", this.position);
    Debug.log("velocity", this.velocity);
    Debug.log("flying", this.flying);
  }
}

export default Player;
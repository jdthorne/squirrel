import Vector from '../util/vector.js'
import Debug from '../util/debug.js'


const WALK_SPEED = 6;
const FLY_SPEED = 0.1;
const JUMP_SPEED = -4;

const GRAB_DISTANCE = 10;
const GRAVITY = -0.5;


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
    
    sprite.width = 64;
    sprite.height = 64;
    
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
      this.velocity.x = (input.stick.x * WALK_SPEED);
      this.velocity.y = (input.stick.y * WALK_SPEED) + JUMP_SPEED;
    }
    
    // grab
    if (!input.jump && !(this.flying && this.velocity.y < 0)) {
      let availableSpeed = this.velocity.length();
      let direction = this.velocity.normalized();
      
      for (var iteration = 0; iteration < 10; iteration++) {
        let movement = direction.multipliedBy(availableSpeed);
        let target = this.position.plus(movement);
      
        let [grabbed, position] = this.world.navigation.snap(
          target,
          GRAB_DISTANCE
        );
        
        if (!grabbed) { break; }
        
        availableSpeed -= position.minus(this.position).length();
        this.position = position;
        this.flying = false;
        
        if (availableSpeed < 1) { break; }
      }
      
      Debug.log("iterations", iteration);
    }
    
    // fall
    if (this.flying) {
      this.velocity.y -= GRAVITY;
      
      if (this.velocity.y > GRAB_DISTANCE) {
        this.velocity.y = GRAB_DISTANCE;
      }
  
      this.position.add(this.velocity);
    }
    
    // turn
    if (this.velocity.x < 0) {
      this.sprite.scale.x = -0.125;
    } else if (this.velocity.x > 0) {
      this.sprite.scale.x = 0.125;
    }

    // integrate                
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    
    if (this.velocity.length() > 0.1) {
      this.sprite.rotation = Math.atan2(this.velocity.y, this.velocity.x);
      if (this.sprite.scale.x < 0) { this.sprite.rotation += Math.PI; }
    }

    Debug.log("position", this.position);
    Debug.log("velocity", this.velocity);
    Debug.log("flying", this.flying);
  }
}

export default Player;
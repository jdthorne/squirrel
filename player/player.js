import Vector from '../util/vector.js'
import Debug from '../util/debug.js'


const WALK_SPEED = 6;
const FLY_SPEED = 0.1;
const JUMP_SPEED = -4;

const GRAB_DISTANCE = 10;
const GRAVITY = -0.5;

const ANGLE_SNAP = Math.PI / 16;


class Player {
  constructor(app, input, world) {
    this.app = app;
    this.input = input;
    this.world = world;
    
    this.flying = false;
    this.position = new Vector();
    this.velocity = new Vector();
    this.movement = new Vector();

    this.running = false;    
    this.runningFrame = 0;
    
    PIXI.loader.add([
      "assets/squirrel-standing.svg",
      "assets/squirrel-running0.svg",
      "assets/squirrel-running1.svg"
    ]).load(() => this.setup());    
  }
  
  setup() {
    let group = new PIXI.Container();
    this.app.stage.addChild(group);
  
    let sprites = {
      standing: new PIXI.Sprite(
        PIXI.loader.resources["assets/squirrel-standing.svg"].texture
      ),

      running0: new PIXI.Sprite(
        PIXI.loader.resources["assets/squirrel-running0.svg"].texture
      ),

      running1: new PIXI.Sprite(
        PIXI.loader.resources["assets/squirrel-running1.svg"].texture
      )      
    }
    
    Object.keys(sprites).forEach((spriteName) => {
      let sprite = sprites[spriteName];
    
      sprite.scale.x = 0.1;
      sprite.scale.y = 0.1;
      
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.675;
      
      sprite.visible = false;
      
      group.addChild(sprite);
    });

    this.sprites = sprites;
    this.spriteGroup = group;    
    
    this.showSprite('standing');
  }
  
  showSprite(name) {
    Object.keys(this.sprites).forEach((spriteName) => {
      let sprite = this.sprites[spriteName];
      
      sprite.visible = false;
    });
    
    this.sprites[name].visible = true;
  }
  
  tick() {  
    if (!this.spriteGroup) { return; }
    
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
    
    // integrate position
    let movement = this.position.minus(this.spriteGroup);
    this.movement.interpolate(movement, 0.2);
    
    // flip
    if (this.movement.x < -1) {
      this.spriteGroup.scale.x = -1;
    } else if (this.movement.x > 1) {
      this.spriteGroup.scale.x = 1;
    }
    
    if (this.movement.length() > WALK_SPEED/2) { this.running = true; }
    if (this.movement.length() < 1) { this.running = false; }
    
    if (this.running) {
      // move
      this.spriteGroup.x = this.position.x;
      this.spriteGroup.y = this.position.y;

      // rotate
      this.spriteGroup.rotation = Math.round(Math.atan2(this.movement.y, this.movement.x) / ANGLE_SNAP) * ANGLE_SNAP;
      if (this.spriteGroup.scale.x < 0) { this.spriteGroup.rotation += Math.PI; }
      
      // animate
      this.runningFrame += 1;
      if (this.runningFrame >= 20) { this.runningFrame = 0; }
      if (this.flying) { this.runningFrame = 0; }
      
      this.showSprite('running' + Math.floor(this.runningFrame / 10));
    } else {
      // stand
      this.spriteGroup.rotation = 0;
      this.showSprite('standing');
    }

    Debug.log("position", [this.spriteGroup.x, this.spriteGroup.y]);
    Debug.log("velocity", this.velocity);
    Debug.log("flying", this.flying);
  }
}

export default Player;
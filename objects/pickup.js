import Thing from './thing.js';
import Vector from '../util/vector.js';

const GRAVITY = 0.5;

const DRAW_RANGE = 100.0;
const PICKUP_RANGE = 30.0;


class Pickup extends Thing {
  constructor(options = {}) {
    options.assets = {
      highlight1: "assets/pickup.svg",
      highlight2: "assets/pickup.svg",
      sprite: options.asset
    }
    super(options);

    this.sleeping = false;    
    this.velocity = options.velocity || new Vector(0, 0);
    
    this.iframes = 60;
    this.draw = 0;
  }
  
  tick() {
    super.tick();

    this.sprite.rotation += 0.05;
    
    this.spin(this.sprites.highlight1,  1);
    this.spin(this.sprites.highlight2, -1);

    if (this.iframes > 0) { 
      this.iframes -= 1; 
    } else {
      this.pickup();
    }

    if (this.sleeping) { return; }
    
    this.velocity.y += GRAVITY;
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
            
    let [hit, ground] = this.world.ground.enforce(this.position);
    if (hit) {
      this.position = ground;
      this.velocity.x = 0;
      this.velocity.y = 0;
      this.sleeping = true;
    }

    if (this.velocity.y < 0) { return; }

    let [snap, nav] = this.world.navigation.snap(this.position, 0);
    if (snap) {
      this.position = nav;
      this.velocity.x = 0;
      this.velocity.y = 0;
      this.sleeping = true;
    }
  }
  
  spin(sprite, direction) {
    sprite.rotation += 0.1 * direction;
    
    sprite.alpha = 0.3;
    sprite.scale.x = this.sprite.scale.x * 0.75 * (1.5 + (0.25 * Math.sin(sprite.rotation / 2)));
    sprite.scale.y = this.sprite.scale.y * 0.75 * (1.5 + (0.25 * Math.sin(sprite.rotation / 2)));
  }
  
  pickup() {
    let player = this.world.player;
    
    let towardPlayer = player.position.minus(this.position);
    let distance = towardPlayer.length();
    if (distance > DRAW_RANGE && !this.draw) { return; }
    
    this.draw += 0.5;
    
    let direction = towardPlayer.normalize();
    this.position.add(direction.multipliedBy(this.draw));
    
    if (distance > PICKUP_RANGE) { return; }
    
    player.collect(this);
    this.remove();
  }
}


export default Pickup;


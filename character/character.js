
import Vector from '../util/vector.js';
import Fall from './movement/fall.js';
import Pickup from '../objects/pickup.js';


class Character {
  constructor(world, options = {}) {
    this.world = world;
    
    this.position = new Vector();
    this.velocity = new Vector();
    this.scale = new Vector(1, 1);
    this.rotation = 0;
    
    this.acorns = options.acorns;
  }
  
  show(app) {
    this.app = app;

    let group = new PIXI.Container();
    this.group = group;
    app.addChild(group);
    
    if (this.animations) {
      Object.keys(this.animations).forEach((a) => {
        this.animations[a].setup(group);
      });
      this.animation.activate();
    } else if (this.animation) {
      this.animation.setup(group);
    }
    
    if (this.combat) {
      this.combat.show(group);
    }
  }
  
  hide(app) {
    app.removeChild(this.group);
  }
  
  tick() {
    if (this.movement) { this.movement.tick(); }
    if (this.combat) { this.combat.tick(); }
    
    if (this.group) {
      this.group.position.x = this.position.x;
      this.group.position.y = this.position.y;
      
      this.group.scale.x = this.scale.x;
      this.group.scale.y = this.scale.y;
      
      this.group.rotation = this.rotation;
    }
  }
  
  die() { 
    if (!this.acorns) { return; }
    
    for (let i = 0; i < this.acorns; i++) {
      this.world.objects.add(new Pickup({
        asset: "assets/acorn.svg",
        position: this.position.clone(),
        velocity: new Vector(
          (2 * Math.random()) + (2 * this.world.player.scale.x), 
          (2 * Math.random()) - 5
        )
      }));
    }
    
    this.acorns = 0;
  }
}


export default Character;
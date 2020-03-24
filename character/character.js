
import Vector from '../util/vector.js';


class Character {
  constructor() {
    this.position = new Vector();
    this.velocity = new Vector();
    this.scale = new Vector(1, 1);
    this.rotation = 0;
  }
  
  show(app) {
    this.app = app;

    let group = new PIXI.Container();
    this.group = group;
    app.stage.addChild(group);
    
    if (this.animations) {
      Object.keys(this.animations).forEach((a) => {
        this.animations[a].setup(group, { visible: false })
      });
    } else if (this.animation) {
      this.animation.setup(group);
    }
  }
  
  tick() {
    if (this.movement) { this.movement.tick(); }
    
    if (this.group) {
      this.group.position.x = this.position.x;
      this.group.position.y = this.position.y;
      
      this.group.scale.x = this.scale.x;
      this.group.scale.y = this.scale.y;
      
      this.group.rotation = this.rotation;
    }
  }
  
  aim(direction, angle_snap) {
    if (!direction) {
      this.scale.x = 1;
      this.rotation = 0;
      return;
    }
  
    direction = direction.normalized();
  
    if (direction.x < 0.2) {
      this.scale.x = -1;
    } else if (direction.x > 0.2) {
      this.scale.x = 1;
    }
    
    this.rotation = Math.round(
      Math.atan2(direction.y, direction.x) / angle_snap
    ) * angle_snap;
    
    if (this.scale.x < 0) { 
      this.rotation += Math.PI;
    }
  }
}


export default Character;
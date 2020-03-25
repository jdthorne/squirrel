
import Vector from '../util/vector.js';
import Fall from './movement/fall.js';


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
        this.animations[a].setup(group)
      });
    } else if (this.animation) {
      this.animation.setup(group);
    }
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
}


export default Character;
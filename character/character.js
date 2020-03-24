class Character {
  constructor() {
  }
  
  show(app) {
    this.app = app;

    let group = new PIXI.Container();
    this.group = group;
    app.stage.addChild(group);
    
    if (this.animation) { this.animation.setup(group); }
  }
  
  tick() {
    if (this.movement) { this.movement.tick(); }
  }
}


export default Character;
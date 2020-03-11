import Vector from '../util/vector.js'


class Camera {
  constructor(app, player, world) {
    this.app = app;
    this.player = player;
    this.world = world;
    
    this.position = new Vector();
  }
  
  tick() {
    Debug.log("camera.player", this.player.position);
    
    let target = new Vector(
      -this.player.position.x,
      -this.player.position.y
    );
    
    this.position.interpolate(target, 0.1);
    
    this.app.stage.x = this.position.x + (window.innerWidth / 2);
    this.app.stage.y = this.position.y + (window.innerHeight / 2);
    
    // parallax
    if (this.world.background && this.world.background.sprite) {
      this.world.background.sprite.x = -this.app.stage.x * 0.1;
      this.world.background.sprite.y = -this.app.stage.y * 0.1;
    }
  }
}


export default Camera;
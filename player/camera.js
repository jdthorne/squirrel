import Vector from '../util/vector.js'


class Camera {
  constructor(app, player, world) {
    this.app = app;
    this.player = player;
    this.world = world;
    
    this.zoom = 1.0;
    
    this.position = new Vector();
  }
  
  tick() {
    Debug.log("camera.player", this.player.position);
            
    // zoom    
    let zoom = 1.7 - (this.player.movement.length() / 12);
    if (zoom > 2.0) { zoom = 2.0; }
    if (zoom < 1.0) { zoom = 1.0; }
    
    this.zoom = (zoom * 0.01) + (this.zoom * 0.99);
    
    this.app.stage.scale.x = this.zoom;
    this.app.stage.scale.y = this.zoom;

    // pan
    let target = new Vector(
      -this.player.position.x,
      -this.player.position.y
    );
    
    this.position.interpolate(target, 0.1);
    
    this.app.stage.x = (this.position.x * this.app.stage.scale.x) + (window.innerWidth / 2);
    this.app.stage.y = (this.position.y * this.app.stage.scale.y) + (window.innerHeight / 2);
    
    // parallax
    if (this.world.background && this.world.background.sprite) {
      this.world.background.sprite.x = -this.position.x * 0.2;
      this.world.background.sprite.y = -this.position.y * 0.2;
    }
  }
}


export default Camera;
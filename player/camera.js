class Camera {
  constructor(app, player, world) {
    this.app = app;
    this.player = player;
    this.world = world;
  }
  
  tick() {
    Debug.log("camera.player", this.player.position);
    
    this.app.stage.x = -this.player.position.x + (this.app.stage.width / 4);
    this.app.stage.y = -this.player.position.y + (this.app.stage.height / 4);
    
    // parallax
    if (this.world.background && this.world.background.sprite) {
      this.world.background.sprite.x = -this.app.stage.x * 0.1;
      this.world.background.sprite.y = -this.app.stage.y * 0.1;
    }
  }
}


export default Camera;
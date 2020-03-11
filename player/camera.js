class Camera {
  constructor(app, player) {
    this.app = app;
    this.player = player;
  }
  
  tick() {
    Debug.log("camera.player", this.player.position);
    
    this.app.stage.x = -this.player.position.x + (this.app.stage.width / 4);
    this.app.stage.y = -this.player.position.y + (this.app.stage.height / 4);
  }
}


export default Camera;
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
    // zoom    
    let zoom = 2.0 - (this.player.velocity.length() * 0.1);
    if (zoom > 2.0) { zoom = 2.0; }
    if (zoom < 1.0) { zoom = 1.0; }
    
    let zoomTrigger = this.player.triggers.find((t) => { return t.id.startsWith("zoom "); });
    if (zoomTrigger) {
      zoom = parseFloat(zoomTrigger.id.split(" ")[1])
    }
    
    this.zoom = (zoom * 0.01) + (this.zoom * 0.99);
    
    this.app.stage.scale.x = this.zoom;
    this.app.stage.scale.y = this.zoom;

    // pan
    let target = new Vector(
      -this.player.position.x,
      -this.player.position.y
    );
    
    this.position.interpolate(target, 0.1);

    // bound    
    let viewportSize = {
      width:  window.innerWidth  / this.zoom,
      height: window.innerHeight / this.zoom
    };

    /*
    let worldSize = this.world.artwork.layers["0"].sprite.texture; // width and height
    let viewportSize = {
      width:  window.innerWidth  / this.zoom,
      height: window.innerHeight / this.zoom
    };

    let xMin = -worldSize.width + (viewportSize.width / 2);
    let xMax =                0 - (viewportSize.width / 2);
    if (this.position.x < xMin) { this.position.x = xMin; }
    if (this.position.x > xMax) { this.position.x = xMax; }
    
    let yMin = -worldSize.height + (viewportSize.height / 2);
    if (this.position.y < yMin) { this.position.y = yMin; }    
    */
    
    // apply
    this.app.stage.x = (this.position.x * this.app.stage.scale.x) + (window.innerWidth / 2);
    this.app.stage.y = (this.position.y * this.app.stage.scale.y) + (window.innerHeight / 2);
        
    // render artwork
    this.world.artwork.render(this.position, viewportSize);
    // this.world.fade.center(this.position);
  }
}


export default Camera;
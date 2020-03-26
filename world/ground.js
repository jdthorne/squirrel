
import Layer from './layer.js'
import Vector from '../util/vector.js'


class Ground extends Layer {
  load(data) {
    super.load(data);
    
    this.paths.forEach((path) => {
      path.splitDownTo(25);
    });
  }
  
  show(app) {
    let graphics = new PIXI.Graphics();

    this.paths.forEach((path) => {    
      path.links.forEach((link) => {
        graphics.lineStyle(path.width, 0xFFFFFF, 1);
        graphics.moveTo(link.start.x, link.start.y);
        graphics.lineTo(link.end.x, link.end.y);
      });
    });

    app.stage.addChild(graphics);
  }
  
  enforce(point) { // => [success, point]
    let snap = false;
    let snapTo = 0;
    
    for (var pi = 0; pi < this.paths.length; pi++) {
      let path = this.paths[pi];
      for (var li = 0; li < path.links.length; li++) {
        let link = path.links[li];
        
        if (link.aabb.x1 > point.x) { continue; }
        if (link.aabb.x2 < point.x) { continue; }
        
        if (point.y < link.aabb.y2) { continue; }
        
        let xf = (point.x - link.aabb.x1) / (link.aabb.x2 - link.aabb.x1);
        let y = link.aabb.y1 + (xf * (link.aabb.y2 - link.aabb.y1));
        
        return [true, new Vector(point.x, y)];
      }
    }
    
    return [false, null];
  }
}

export default Ground;
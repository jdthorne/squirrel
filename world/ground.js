
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
    var snapped = false;
    
    this.paths.forEach((path) => {
      path.links.forEach((link) => {
        let startToPoint = point.minus(link.start);
        
        let t = startToPoint.dot(link.direction);
        
        if (t < 0) { t = 0; }
        if (t > link.length) { t = link.length; }
        
        let linkPoint = new Vector(
          link.start.x + (link.direction.x * t),
          link.start.y + (link.direction.y * t)
        );
        
        let linkPointToPoint = point.minus(linkPoint);
        
        if (linkPointToPoint.length() < path.halfWidth) {
          snapped = true;
          
          linkPointToPoint.normalize().multiplyBy(path.halfWidth);
          point = linkPoint.add(linkPointToPoint);
        }
      });
    });
      
    return [snapped, point];    
  }
}

export default Ground;
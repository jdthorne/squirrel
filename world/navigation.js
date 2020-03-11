import Layer from './layer.js'
import Vector from '../util/vector.js'

const LINK_WIDTH = 4;


class Navigation extends Layer {
  load(data) {
    super.load(data);
    
    this.paths.forEach((path) => {
      path.splitDownTo(12);
    });
  }
  
  show(app) {
    let graphics = new PIXI.Graphics();

    this.paths.forEach((path) => {    
      path.links.forEach((link) => {
        graphics.lineStyle(path.width, 0xFF00FF, 1);
        graphics.moveTo(link.start.x, link.start.y);
        graphics.lineTo(link.end.x, link.end.y);
      });
    });

    app.stage.addChild(graphics);
  }

  snap(point, maxDistance) { // => [success, point]
    var closestPoint = null;
    var closestPath = null;
    var closestDistance = null;
    var closestT = null;
    
    var distances = [];
    
    this.paths.forEach((path) => {
      path.links.forEach((link) => {
        let startToPoint = point.minus(link.start);
        
        let t = startToPoint.dot(link.direction);
        
        if (t < 0) { t = 0; }
        if (t > link.length) { t = link.length; }
        
        let thisPoint = new Vector(
          link.start.x + (link.direction.x * t),
          link.start.y + (link.direction.y * t)
        );
        
        let thisDistance = thisPoint.minus(point).length() - path.halfWidth;
              
        if (!closestPoint || thisDistance < closestDistance) {
          closestPoint = thisPoint;
          closestDistance = thisDistance;
          closestPath = path;
          closestT = t;
        }
      });
    });
      
    if (!closestPoint) { 
      return [false, point];
    }
    
    if (closestDistance > maxDistance) {
      return [false, point];
    }
    
    if (closestDistance > 0) {
      let closestPointToPoint = point.minus(closestPoint);
      closestPointToPoint.normalize();
      closestPointToPoint.multiplyBy(closestPath.halfWidth);
      
      return [true, closestPoint.plus(closestPointToPoint)];
    }
    
    return [true, point]; 
  }
}

export default Navigation;
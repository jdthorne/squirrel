import Layer from './layer.js'
import Vector from '../util/vector.js'

const LINK_WIDTH = 4;


class Navigation extends Layer {
  snap(point, maxDistance) { // => [success, point]
    var closestPoint = null;
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
        
        let thisDistance = thisPoint.minus(point).length();
              
        if (!closestPoint || thisDistance < closestDistance) {
          closestPoint = thisPoint;
          closestDistance = thisDistance;
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
    
    if (closestDistance > LINK_WIDTH) { 
      let closestPointToPoint = point.minus(closestPoint);
      closestPointToPoint.normalize();
      closestPointToPoint.multiplyBy(LINK_WIDTH);
      
      return [true, closestPoint.plus(closestPointToPoint)];
    }
    
    return [true, point]; 
  }
}

export default Navigation;
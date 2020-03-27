import Vector from './vector.js';

class AABB {
  constructor(points) {
    if (points) {
      this.addPoints(points);
    }
  }
  
  addPoints(points) {
    if (!this.anyPoints) {
      this.x1 = points[0].x;
      this.x2 = points[0].x;
      this.y1 = points[0].y;
      this.y2 = points[0].y;      
      this.anyPoints = true;
    }
  
    points.forEach((point) => {
      if (point.x < this.x1) { this.x1 = point.x; }
      if (point.y < this.y1) { this.y1 = point.y; }

      if (point.x > this.x2) { this.x2 = point.x; }
      if (point.y > this.y2) { this.y2 = point.y; }
    });
    
    this.center = new Vector({
      x: (this.x2 + this.x1) / 2,
      y: (this.y2 + this.y1) / 2
    });
  }
  
  contains(point) {
    if (this.x1 > point.x) { return false; }
    if (this.y1 > point.y) { return false; }

    if (this.x2 < point.x) { return false; }
    if (this.y2 < point.y) { return false; }
    
    return true;
  }
}


export default AABB;

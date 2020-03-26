import Vector from './vector.js';

class AABB {
  constructor(points) {
    this.x1 = points[0].x;
    this.y1 = points[0].y;
    this.x2 = points[0].x;
    this.y2 = points[0].y;
    
    points.forEach((point) => {
      if (point.x < this.x1) { this.x1 = point.x; }
      if (point.y < this.y1) { this.y1 = point.y; }

      if (point.x > this.x2) { this.x2 = point.x; }
      if (point.y > this.y2) { this.y2 = point.y; }
    });
  }
}


export default AABB;
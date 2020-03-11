import Vector from '../util/vector.js'


class Link {
  constructor(points) {
    this.points = points;
    
    this.start = points[0];
    this.control1 = points[1];
    this.control2 = points[2];
    this.end = points[3];
    
    this.startToEnd = this.end.minus(this.start);
    
    this.direction = this.end.minus(this.start);
    this.direction.normalize();
    
    this.length = this.startToEnd.length();
  }
  
  subdivide(t) {
    let points = this.points;
    
    let [x1, y1] = [points[0].x, points[0].y];
    let [x2, y2] = [points[1].x, points[1].y];
    let [x3, y3] = [points[2].x, points[2].y];
    let [x4, y4] = [points[3].x, points[3].y];
    
    let x12 = (x2-x1)*t + x1
    let y12 = (y2-y1)*t + y1

    let x23 = (x3-x2)*t + x2
    let y23 = (y3-y2)*t + y2

    let x34 = (x4-x3)*t + x3
    let y34 = (y4-y3)*t + y3

    let x123 = (x23-x12)*t + x12
    let y123 = (y23-y12)*t + y12

    let x234 = (x34-x23)*t + x23
    let y234 = (y34-y23)*t + y23

    let x1234 = (x234-x123)*t + x123
    let y1234 = (y234-y123)*t + y123
    
    return new Link([
      new Vector(x1, y1),
      new Vector(x12, y12),
      new Vector(x123, y123),
      new Vector(x1234, y1234)
    ]);
  }
  
  split() {
    let left = this.subdivide(0.5);
    this.points.reverse();
    let right = this.subdivide(0.5);
    this.points.reverse();
    
    return [left, right];
  }
  
  splitDownTo(length) {
    if (this.startToEnd.length() <= length) {
      return this;
    } else {      
      var [left, right] = this.split();
      return [
        left.splitDownTo(length),
        right.splitDownTo(length)
      ];
    }
  }
}

export default Link;
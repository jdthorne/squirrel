
import Vector from './vector.js'

const LINK_WIDTH = 16;

const flatten = function(array, result = []) {
  for (var i = 0; i < array.length; i++) {
    const value = array[i];
    if (Array.isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
}

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

class World {
  constructor() {
    this.links = [];
  }
  
  // snap a point to the navigation grid
  // returns [success, point]
  snap(point, maxDistance) {
    var closestPoint = null;
    var closestDistance = null;
    var closestT = null;
    
    var distances = [];
    
    this.links.forEach((link) => {
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
    
    return [true, closestPoint]; 
  }
  
  load(done) {
    fetch("world.svg")
      .then(response => response.text())
      .then(response => {
        let dom = new DOMParser().parseFromString(response, 'image/svg+xml');
        
        let paths = Array.prototype.slice.call(
          dom.getElementsByTagName("path")
        );
        
        paths.forEach((path) => {
          var links = path.getAttribute("d").split(/(?=[A-Z])/);
  
          var previousPoint = new Vector();
  
          links.forEach((link) => {
            var command = link[0];
            var data = link
                         .substring(1)
                         .split(/[, ]+/)
                         .map(v => parseFloat(v));
            
            if (command == "M") {
              var [x, y] = data;
              var point = new Vector(x, y);
              
            } else if (command == "C") {
              var [
                c1x, c1y,
                c2x, c2y,
                x, y
              ] = data;
              
              var point = new Vector(x, y);
              
              world.links.push(new Link([
                previousPoint,
                new Vector(c1x, c1y),
                new Vector(c2x, c2y),
                point
              ]));
            }
            
            previousPoint = point;
          });
        });
        
        world.links = world.links.map((link) => link.splitDownTo(25));
        world.links = flatten(world.links);
        
        if (done) {
          done();
        }
      })
      .catch(error => {
        console.error("Failed to load world");
        console.error(error);
      });  
  }
}

var world = new World();
export default world;
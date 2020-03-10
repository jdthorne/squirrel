class Vector {
  constructor(x = {}, y = null) {
    if (y) {
      this.x = x;
      this.y = y;
    } else if (x && x.x) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = 0;
      this.y = 0;
    }
  }
  
  length() {
    return Math.sqrt(this.lengthSquared());
  }

  lengthSquared() {
    return (this.x * this.x) + (this.y * this.y);
  }
  
  normalize() {
    var l = this.length();
    this.x = this.x / l;
    this.y = this.y / l;
  }
  
  multiplyBy(factor) {
    this.x *= factor;
    this.y *= factor;
  }
  
  plus(vector) {
    return new Vector(
      this.x + vector.x,
      this.y + vector.y
    );  
  }
  
  minus(vector) {
    return new Vector(
      this.x - vector.x,
      this.y - vector.y
    );
  }
  
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }
  
  dot(vector) {
    return (this.x * vector.x) + (this.y * vector.y);
  }
}

Vector.prototype.toJSON = function() {
  return "[" + this.x.toFixed(3) + ", " + this.y.toFixed(3) + "]";
}

export default Vector;
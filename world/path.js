import { flatten, sum } from '../util/array.js'

class Path {
  constructor() {
    this.links = [];
    this.width = 1;
  }
  
  splitDownTo(maxLength) {
    this.links = this.links.map((link) => {
      return link.splitDownTo(maxLength);
    });
    
    this.links = flatten(this.links);
  }
  
  length() {
    return sum(this.links.map((l) => l.length));
  }
  
  pointAtLength(length) {
    var point = null;
  
    this.links.forEach((link) => {
      if (length <= link.length) {
        point = link.pointAtLength(length)
      } else {
        length -= link.length;
      }
    });
    
    if (point) {
      return point;
    }
    
    return this.links[this.links.length - 1].end;
  }
}

export default Path;
import { flatten, sum } from '../util/array.js'
import AABB from '../util/aabb.js';


class Path {
  constructor(id) {
    this.id = id;
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
  
  center() {
    return this.aabb().center;
  }
  
  aabb() {
    if (!this._aabb) {
      this._aabb = new AABB();
      this.links.forEach((link) => {
        this._aabb.addPoints(link.points);
      });
    }
    
    return this._aabb;
  }
  
  pointAtLength(length) {
    var point = null;
    
    for (var linkIndex = 0; linkIndex < this.links.length; linkIndex++) {
      var link = this.links[linkIndex];
      
      if (length <= link.length) {
        return link.pointAtLength(length);
      }
      
      length -= link.length;
    }
    
    return this.links[this.links.length - 1].end;
  }
}

export default Path;
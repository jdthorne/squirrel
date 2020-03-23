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
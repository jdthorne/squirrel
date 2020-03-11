import { flatten } from '../util/array.js'

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
}

export default Path;
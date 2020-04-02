import Layer from './layer.js'
import Vector from '../util/vector.js'


class Triggers extends Layer {
  load(data) {
    super.load(data);
  }
  
  find(id) {
    return this.paths.find((p) => { return p.id == id; });
  }
  
  filter(f) {
    return this.paths.filter(f);
  }
}


export default Triggers;
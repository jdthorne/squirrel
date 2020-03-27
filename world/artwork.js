import Layer from './layer.js'

const PARALLAX_STRENGTH = 0.75;


class Artwork {
  constructor() {
    this.layers = {};
  }
  
  show(app) {
    let layerKeys = Object.keys(this.layers);    
    
    layerKeys = layerKeys.map((k) => parseFloat(k));
    layerKeys.sort((a, b) => a - b);
    layerKeys = layerKeys.map((k) => k.toString());    
    
    layerKeys.forEach((k) => {
      let layer = this.layers[k];
      let index = parseFloat(k);
      
      layer.show(app);
      
      layer.sprite.scale.x = 1.0 + index;
      layer.sprite.scale.y = 1.0 + index;
    });
  }
  
  load(group) {
    let id = group.getAttribute("serif:id");
    let regex = /\[([+-][.\d]+)\]/;
    
    let key = "0";
    if (regex.test(id)) {
      key = (parseFloat(regex.exec(id)[1]) * PARALLAX_STRENGTH).toString();
    }
    
    if (!this.layers[key]) { this.layers[key] = new Layer(); }
    
    this.layers[key].load(group);
  }
  
  parallax(position) {
    Object.keys(this.layers).forEach((index) => {
      let layer = this.layers[index];
      let offset = parseFloat(index);
      
      layer.sprite.x = position.x * index;
      layer.sprite.y = position.y * index;
    });
  }
}


export default Artwork;
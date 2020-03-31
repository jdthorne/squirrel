
import Tileset from './tiles/tileset.js'

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
      
      layer.show(app.stage);
    });
  }
  
  load(svgData) {
    let id = svgData.getAttribute("serif:id");
    let regex = /\[([+-][.\d]+)\]/;
    
    let parallax = 0;
    if (regex.test(id)) {
      parallax = parseFloat(regex.exec(id)[1]) * PARALLAX_STRENGTH;
    }
    
    let key = parallax.toString();
    
    if (!this.layers[key]) { this.layers[key] = new Tileset(parallax); }
    
    this.layers[key].load(svgData);
  }
  
  render(position, viewport) {
    let tileCount = 0;
    let budget = { 
      tilesRendered: 1,
      tilePadding: 1
    };
    
    Object.keys(this.layers).forEach((index) => {
      let layer = this.layers[index];
      
      layer.render(position, viewport, budget);
      
      tileCount += layer.tileCount;
    });
    
    Debug.log("artwork.memory", tileCount + "MB");
  }
}


export default Artwork;
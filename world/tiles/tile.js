
const TILE_SIZE = 512;
const SVG_SCALE = 2;

let nextTileId = 0;
let nextShow = 0;

class Tile {
  constructor(tileset, x, y) {
    this.id = nextTileId++;
    
    this.tileset = tileset;
    this.x = x;
    this.y = y;
  }
  
  name() {
    return "id" + this.tileset.id + "." + this.id;
  }
  
  show(parent) {
    let name = this.name();
    
    let svg = new PIXI.resources.SVGResource(this.textureData(), { scale: SVG_SCALE });

    this.texture = PIXI.Texture.from(svg);
      
    let sprite = new PIXI.Sprite(
      this.texture
    );
    
    sprite.position.x = this.x * TILE_SIZE;
    sprite.position.y = this.y * TILE_SIZE;
    
    sprite.scale.x = 1 / SVG_SCALE;
    sprite.scale.y = 1 / SVG_SCALE;

    this.sprite = sprite;

    parent.addChild(sprite);
    
    this.parent = parent;
  }
  
  hide() {
    
  }
  
  destroy() {
    this.destroyed = true;
    
    if (this.texture) { 
      this.texture.destroy(true); 
      this.texture = null; 
    }
    
    if (this.sprite) { 
      this.parent.removeChild(this.sprite); 
      this.sprite = null; 
    }
  }

  textureData() {
    let viewBox = [
      this.x * TILE_SIZE,
      this.y * TILE_SIZE,
      TILE_SIZE, 
      TILE_SIZE
    ].join(" ");
  
    let preamble = (`
      <?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <svg width="100%" height="100%" viewBox="` + viewBox + `" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
    `).replace(/\n/gm, '').replace(/^ */g, '');
    let postamble = '</svg>';
    
    let uri = "data:image/svg+xml;utf8," + preamble + this.svgData() + postamble;

    uri = uri.replace(/\n/gm, '');
        
    return uri;    
  }
  
  svgData() {
    if (!this._svgData) {
      this._svgData = this.tileset.datasets.map((d) => d.outerHTML).join("")
    }
    
    return this._svgData;
  }
}

export default Tile;


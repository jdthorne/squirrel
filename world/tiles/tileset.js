
import Tile from './tile.js';
import Timer from '../../util/timer.js';

const TILE_SIZE = 256;

let nextTilesetId = 0;


class Tileset {
  constructor(parallax) {
    this.id = nextTilesetId++;

    this.tiles     = [];
    this.tileCount = 0;
    this.datasets  = [];
    
    this.parallax = parallax;
  }
  
  load(data) {
    this.datasets.push(data);
  }

  show(parent) {
    let group = new PIXI.Container();
    this.group = group;
    this.group.scale.x = 1.0 + this.parallax;
    this.group.scale.y = 1.0 + this.parallax;

    parent.addChild(group);
  }
  
  render(position, viewport, budget) {
    let area = {
      x1: Math.floor(-(position.x + viewport.width/2)  / TILE_SIZE) - 1,
      y1: Math.floor(-(position.y + viewport.height/2) / TILE_SIZE) - 1,

      x2: Math.floor(-(position.x - viewport.width/2)  / TILE_SIZE) + 1,
      y2: Math.floor(-(position.y - viewport.height/2) / TILE_SIZE) + 1
    };

    this.fixTiles();
    this.renderTiles(area, budget);    
    this.unloadTiles(area, budget);
  
    this.group.position.x = position.x * this.parallax;
    this.group.position.y = position.y * this.parallax;
  }
  
  fixTiles() {
    Object.keys(this.tiles).forEach((x) => {
      Object.keys(this.tiles[x]).forEach((y) => {      
        let tile = this.tiles[x][y];
        
        if (tile && tile.svg.broken) { 
          Debug.log("Unloading broken tile");
          this.unloadTileAt(x, y); 
        }
      });
    });
  }
  
  renderTiles(area, budget) {
    let padding = budget.tilePaddingLoad;
    for (let x = area.x1 - padding; x <= area.x2 + padding; x++) {
      for (let y = area.y1 - padding; y <= area.y2 + padding; y++) {
        this.renderTileAt(x, y, budget);
      }
    }
  }

  renderTileAt(x, y, budget) {
    if (isNaN(x) || isNaN(y)) { return false; }
  
    if (this.tiles[x] && this.tiles[x][y]) { return; }

    if (budget.tilesRendered <= 0) { return; }
    budget.tilesRendered -= 1;

    Timer.time("tile.renderTileAt", () => {
      let tile = new Tile(this, x, y);
      tile.show(this.group);
    
      this.tiles[x] = this.tiles[x] || [];
      this.tiles[x][y] = tile;
      this.tileCount += 1;
    });
  }
  
  unloadTiles(area, budget) {
    let padding = budget.tilePaddingUnload;
    
    Object.keys(this.tiles).forEach((x) => {
      Object.keys(this.tiles[x]).forEach((y) => {      
        if (x < area.x1 - padding) { this.unloadTileAt(x, y, budget); }
        if (y < area.y1 - padding) { this.unloadTileAt(x, y, budget); }
        
        if (x > area.x2 + padding) { this.unloadTileAt(x, y, budget); }
        if (y > area.y2 + padding) { this.unloadTileAt(x, y, budget); }
      });
    });
  }
  
  unloadTileAt(x, y, budget) {
    if (budget && budget.tilesRendered <= 0) { return; }
    if (!this.tiles[x][y]) { return; }
    
    this.tiles[x][y].destroy();
    this.tiles[x][y] = null;
    this.tileCount -= 1;
    
    if (budget) { budget.tilesRendered -= 1; }
  }
}


export default Tileset;
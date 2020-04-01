
import Tile from './tile.js';

const TILE_SIZE = 512;

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

    this.renderTiles(area, budget);    
    this.unloadTiles(area, budget);
  
    this.group.position.x = position.x * this.parallax;
    this.group.position.y = position.y * this.parallax;
  }
  
  renderTiles(area, budget) {
    for (let x = area.x1; x <= area.x2; x++) {
      for (let y = area.y1; y <= area.y2; y++) {
        this.renderTileAt(x, y, budget);
      }
    }
  }

  renderTileAt(x, y, budget) { // => loaded
    if (isNaN(x) || isNaN(y)) { return false; }
  
    if (this.tiles[x] && this.tiles[x][y]) { return; }

    if (budget.tilesRendered <= 0) { return; }
    budget.tilesRendered -= 1;

    let tile = new Tile(this, x, y);
    tile.show(this.group);
  
    this.tiles[x] = this.tiles[x] || [];
    this.tiles[x][y] = tile;
    this.tileCount += 1;
  }
  
  unloadTiles(area, budget) {
    Object.keys(this.tiles).forEach((x) => {
      Object.keys(this.tiles[x]).forEach((y) => {
        if (x < area.x1 - budget.tilePadding) { this.unloadTileAt(x, y); }
        if (y < area.y1 - budget.tilePadding) { this.unloadTileAt(x, y); }
        
        if (x > area.x2 + budget.tilePadding) { this.unloadTileAt(x, y); }
        if (y > area.y2 + budget.tilePadding) { this.unloadTileAt(x, y); }
      });
    });
  }
  
  unloadTileAt(x, y) {
    if (!this.tiles[x][y]) { return; }
    
    this.tiles[x][y].destroy();
    this.tiles[x][y] = null;
    this.tileCount -= 1;
  }
}


export default Tileset;
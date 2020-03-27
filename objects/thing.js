
class Thing {
  constructor(options = {}) {
    this.assets = options.assets || { sprite: options.asset };
    this.position = options.position;
    this.scale = options.scale || 1;
    
    this.sprites = {};
  }
  
  show(layer, group, world) {
    this.layer = layer;
    this.group = group;
    this.world = world;
    
    this.sprites = {}
    Object.keys(this.assets).forEach((name) => {
      let sprite = new PIXI.Sprite(
        PIXI.loader.resources[this.assets[name]].texture
      )
  
      sprite.scale.x = 0.075 * this.scale;
      sprite.scale.y = 0.075 * this.scale;
      
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      
      sprite.position.x = this.position.x;
      sprite.position.y = this.position.y;
      
      sprite.rotation = 2 * Math.random() * Math.PI;
      
      this.group.addChild(sprite);
      
      this.sprites[name] = sprite;
    });
    
    this.sprite = this.sprites.sprite;
    
    this.tick();
  }
  
  remove() {
    Object.keys(this.sprites).forEach((name) => {
      this.group.removeChild(this.sprites[name]);
    });

    this.layer.remove(this);
  }
  
  tick() {
    Object.keys(this.sprites).forEach((name) => {
      this.sprites[name].position = this.position;
    });
  }
}


export default Thing;
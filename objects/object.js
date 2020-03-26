
class Object {
  constructor(options = {}) {
    this.asset = options.asset;
    this.position = options.position;
    this.scale = options.scale || 1;
  }
  
  show(layer, group) {
    this.layer = layer;
    this.group = group;
    
    let sprite = new PIXI.Sprite(
      PIXI.loader.resources[this.asset].texture
    )

    sprite.scale.x = 0.075 * this.scale;
    sprite.scale.y = 0.075 * this.scale;
    
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    
    sprite.position.x = this.position.x;
    sprite.position.y = this.position.y;

    this.sprite = sprite;    
    
    this.sprite.rotation = 2 * Math.random() * Math.PI;
    
    group.addChild(sprite);
    
    this.tick();
  }
  
  remove() {
    this.group.removeChild(this.sprite);
    this.layer.remove(this);
  }
  

  
  tick() {
  
  }
  
/*
  
  add(asset, position) {
    let effect = new Effect(asset, position, { scale: 1.5 });
    
    effect.show(this.group);
    this.effects.push(effect);
  }
  
  tick() {
    this.objects = this.objects.filter((e) => { 
      e.tick(); 

      if (e.life < 0) {
        e.hide(this.group);
        return false;
      }
      
      return true;
    });
  }
  */
}


export default Object;
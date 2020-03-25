


class Effect {
  constructor(asset, position, options = {}) {
    this.asset = asset;
    this.position = position;
    this.options = options;
    
    this.lifespan = options.lifespan || 15;
    this.life = this.lifespan;
    
    this.spin = 0.5 - Math.random();
  }
  
  show(group) {
    let sprite = new PIXI.Sprite(
      PIXI.loader.resources[this.asset].texture
    )
    
    this.options.scale = this.options.scale || 1.0;
    
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    
    sprite.position.x = this.position.x;
    sprite.position.y = this.position.y;

    this.sprite = sprite;    
    
    this.sprite.rotation = 2 * Math.random() * Math.PI;
    
    group.addChild(sprite);
    
    this.tick();
  }
  
  hide(group) {
    group.removeChild(this.sprite);
  }
  
  tick() {
    this.life -= 1;
    this.sprite.rotation += 0.2 * this.spin;
    this.sprite.alpha = this.life / this.lifespan;
    
    let scale = 0.75 + (((this.lifespan - this.life) / this.lifespan) * 0.25);
    this.sprite.scale.x = 0.075 * scale * this.options.scale;
    this.sprite.scale.y = 0.075 * scale * this.options.scale;
  }
}

class Effects {
  show(app) {
    let group = new PIXI.Container();
    this.group = group;
    app.stage.addChild(group);
    
    this.effects = [];
  }

  add(asset, position) {
    let effect = new Effect(asset, position, { scale: 1.5 });
    
    effect.show(this.group);
    this.effects.push(effect);
  }
  
  tick() {
    this.effects = this.effects.filter((e) => { 
      e.tick(); 

      if (e.life < 0) {
        e.hide(this.group);
        return false;
      }
      
      return true;
    });
  }
}

export default Effects;
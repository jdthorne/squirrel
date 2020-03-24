
import Character from './character.js';
import Patrol from './movement/patrol.js';

const SPEED = 0.5;


class SnailSlug extends Character {
  constructor(path) {
    super();   
    
    this.movement = new Patrol(this, path, SPEED); 
  }
  
  show(app) {
    this.app = app;
    
    this.setup();
  }
  
  setup() {    
    let group = new PIXI.Container();
    this.app.stage.addChild(group);
  
    let sprites = {
      sliding: new PIXI.Sprite(
        PIXI.loader.resources["assets/snail-slug.svg"].texture
      )
    };
    
    Object.keys(sprites).forEach((spriteName) => {
      let sprite = sprites[spriteName];
    
      sprite.scale.x = 0.075;
      sprite.scale.y = 0.075;
      
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.675;
      
      sprite.visible = false;
      
      group.addChild(sprite);
    });

    this.sprites = sprites;
    this.spriteGroup = group;    
    
    this.showSprite('sliding');
  }

  showSprite(name) {
    Object.keys(this.sprites).forEach((spriteName) => {
      let sprite = this.sprites[spriteName];
      
      sprite.visible = false;
    });
    
    this.sprites[name].visible = true;
  }
  
  tick() {    
    if (!this.spriteGroup) { return; }
    
    super.tick();
  }
}

export default SnailSlug;
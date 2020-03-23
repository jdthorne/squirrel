
const SPEED = 0.5;


class SnailSlug {
  constructor(path) {
    this.path = path;
    
    this.pathLength = path.length();
    this.distance = 0;
    this.direction = 1;
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
    
    this.distance += SPEED * this.direction;
    
    if (this.distance < 0) {
      this.direction = 1;
      this.distance = 0;
    }
    if (this.distance > this.pathLength) {
      this.direction = -1;
      this.distance = this.pathLength;
    }
    
    this.position = this.path.pointAtLength(this.distance);
    
    let dx = this.position.x - this.spriteGroup.x;
    if (dx < 0) {
      this.spriteGroup.scale.x = -1;
    } else {
      this.spriteGroup.scale.x = 1;
    }
    
    this.spriteGroup.scale.y = 1 + (Math.sin(this.distance * 0.15) * 0.1);
    
    this.spriteGroup.x = this.position.x;
    this.spriteGroup.y = this.position.y;
  }
}

export default SnailSlug;
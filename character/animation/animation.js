
class Animation {
  constructor(character, assets, options) {
    this.character = character;
    this.assets = assets;
    this.options = options || {};
  }
  
  activate() {
    this.character.animation = this;
    
    Object.keys(this.character.animations).forEach((animationName) => {
      let animation = this.character.animations[animationName];
      
      if (animation == this) {
        animation.show();
      } else {
        animation.hide();
      }
    });
  }
  
  show() {
    if (!this.sprites) { return; }
    this.sprites[0].visible = true;
  }
  
  hide() {
    if (!this.sprites) { return; }
    this.sprites.forEach((s) => { s.visible = false });
  }
  
  setup(group) {
    this.sprites = this.assets.map((asset) => {
      let sprite = new PIXI.Sprite(
        PIXI.loader.resources[asset].texture
      )
      
      let scale = this.options.scale || 1.0;
      
      sprite.scale.x = 0.075 * scale;
      sprite.scale.y = 0.075 * scale;
      
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.675;
      
      sprite.visible = false;
      
      group.addChild(sprite);
      
      return sprite;
    });
    
    this.sprites[0].visible = true;
  }
  
  animate(progress) {
    Debug.log("Animation.animate()", "not implemented")
  }
}


export default Animation;
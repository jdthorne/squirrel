
class Animation {
  constructor(character, assets) {
    this.character = character;
    this.assets = assets;
  }
  
  setup(group) {
    this.sprites = this.assets.map((asset) => {
      let sprite = new PIXI.Sprite(
        PIXI.loader.resources[asset].texture
      )
      
      sprite.scale.x = 0.075;
      sprite.scale.y = 0.075;
      
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
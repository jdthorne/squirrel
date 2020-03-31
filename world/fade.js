
const MAX_FADE = 0.5;
const FADE_RATE = 0.01;
const SKY = 0x6899c9;

class Fade {
  show(app) {
    return;
    
    this.app = app;
    
    let sprite = new PIXI.Sprite(
      PIXI.loader.resources["assets/fade.svg"].texture
    )

    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    
    sprite.alpha = MAX_FADE;
    
    app.stage.addChild(sprite);
    this.sprite = sprite;
    
    this.menu = document.getElementById("rest");
    this.menu.style.opacity = this.sprite.alpha * 2;
  }
  
  center(position) {
    this.sprite.position = position.multipliedBy(-1);
  }
  
  darken() {
    if (this.sprite.alpha >= MAX_FADE) { return; }
    
    this.sprite.alpha += FADE_RATE;
    this.menu.style.opacity = this.sprite.alpha * 2;
  }
  
  lighten() {
    if (this.sprite.alpha < 0) { return; }

    this.sprite.alpha -= FADE_RATE;  
    this.menu.style.opacity = this.sprite.alpha * 2;
  }
}


export default Fade;
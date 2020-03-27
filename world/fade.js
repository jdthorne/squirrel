const FADE_RATE = 0.01;
const SKY = 0x6899c9;

class Fade {
  show(app) {
    this.app = app;
    
    let sprite = new PIXI.Sprite(
      PIXI.loader.resources["assets/fade.svg"].texture
    )

    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    
    sprite.alpha = 1.0;
    
    app.stage.addChild(sprite);
    this.sprite = sprite;
    
    this.menu = document.getElementById("rest");
    this.firstRest = false;
  }
  
  center(position) {
    this.sprite.position = position.multipliedBy(-1);
  }
  
  darken() {
    if (this.sprite.alpha >= 1.0) { return; }
    
    this.sprite.alpha += FADE_RATE;
    if (this.firstRest) {
      this.menu.style.opacity = this.sprite.alpha * (1/0.75);
    }
  }
  
  lighten() {
    if (this.sprite.alpha <= 0) { 
      this.firstRest = true;
      return; 
    }
    
    this.sprite.alpha -= FADE_RATE;  
    if (this.firstRest) {
      this.menu.style.opacity = this.sprite.alpha * (1/0.75);
    }
  }
}


export default Fade;
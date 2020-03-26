
import Fall from '../movement/fall.js';

const INVUNERABILITY_PERIOD = 40.0;


class Combat {
  constructor(character, options) {
    this.character = character;
    this.dead = false;
    
    options = options || {};

    this.healthMax = options.health || 0;    
    this.health =    options.health || 0;
    this.iframes = 0;
  }
  
  show(group) {
    let showSprite = (asset) => {
      let sprite = new PIXI.Sprite(
        PIXI.loader.resources[asset].texture
      );
      
      sprite.position.y = 30;
      
      sprite.scale.x = 0.075 * 0.75;
      sprite.scale.y = 0.075 * 0.5;
      
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      
      sprite.visible = false;
      
      group.addChild(sprite);
      
      return sprite;
    };
    
    this.healthBar = showSprite("assets/health-bar.svg");
    this.healthBox = showSprite("assets/health-box.svg");  
  }
  
  updateHealthBar() {
    if (!this.healthMax) { return; }
    
    if (this.health < 0) {
      this.healthBar.visible = false;
      this.healthBox.visible = false;
      return;
    }
    
    let healthFraction = this.health / this.healthMax;
    
    this.healthBar.visible = true;
    this.healthBox.visible = true;
    
    this.healthBar.scale.x = this.healthBox.scale.x * healthFraction;
    
    Debug.log("combat.healthFraction", healthFraction);
  }

  hit(damage) {
    if (!this.vulnerable()) { return; }
    if (this.iframes > 0) { return; }
    
    this.iframes = INVUNERABILITY_PERIOD;
    this.health -= damage;
    
    this.updateHealthBar();
    
    if (this.health < 0) {
      this.die();
    }
  }
  
  die() {
    this.dead = true;
    
    if (this.character.movements && this.character.movements.fall) {
      this.character.movements.fall.activate();
    } else {
      this.character.movement = new Fall(this.character);
    }
  }
  
  heal() {
    this.health += 1;
    
    if (this.health >= 0) {
      this.resurrect();
    }
  }
  
  resurrect() {
    this.dead = false;
    
    if (this.character.movements && this.character.movement == this.character.movements.fall) {
      this.character.movements.soar.activate();
    }
  }
  
  vulnerable() {
    return true;
  }
  
  tick() {
    if (this.iframes > 0) { this.iframes -= 1; }
  }
  
  // TODO: Fix this?
  enemies() {
    if (window.player) { return [window.player]; }
    return [];
  }
}


export default Combat;

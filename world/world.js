import Debug from '../util/debug.js'

import Navigation from './navigation.js'
import Enemies from './enemies.js'
import Layer from './layer.js'
import Effects from './effects.js'
import Ground from './ground.js'


class World {
  constructor() {
    this.navigation = new Navigation();
    this.foreground = new Layer();
    this.background = new Layer();
    this.ground = new Ground();
    this.enemies = new Enemies();    
    this.effects = new Effects();
  }

  show(app) {
    this.background.show(app);
    this.background.scale(0.8);
    
    this.foreground.show(app);
    
    this.enemies.show(app);
    this.effects.show(app);
    
    // this.navigation.show(app);
  }
  
  tick() {
    this.enemies.tick();
    this.effects.tick();
  }
  
  load(done) {
    fetch("assets/demo-3-v2.svg")
      .then(response => response.text())
      .then(response => {
        let dom = new DOMParser().parseFromString(response, 'image/svg+xml');
        
        let groups = Array.prototype.slice.call(
          dom.getElementsByTagName("g")
        );
        
        groups.forEach((group) => {
          let id = group.getAttribute("id");
          if (!/^[A-Z]-/.test(id)) { return; }
          
          let loadInto = {
            A: this.foreground,
            B: this.background,
            N: this.navigation,
            E: this.enemies,
            G: this.ground,
          }[id[0]];
          
          if (loadInto) { loadInto.load(group); }
        });
        
        if (done) { done(); }
      })
      .catch(error => {
        console.error("Failed to load world");
        console.error(error);
      });  
  }  
}

export default World;
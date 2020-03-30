import Debug from '../util/debug.js'

import Navigation from './navigation.js'
import Enemies from './enemies.js'
import Layer from './layer.js'
import Objects from './objects.js'
import Ground from './ground.js'
import Artwork from './artwork.js'
import Triggers from './triggers.js'
import Fade from './fade.js'


class World {
  constructor() {
    this.artwork = new Artwork();
    this.navigation = new Navigation();
    this.ground = new Ground();
    this.enemies = new Enemies(this);
    this.objects = new Objects(this);
    this.triggers = new Triggers(this);
    this.fade = new Fade(this);
  }

  show(app) {
    this.artwork.show(app);
    this.enemies.show(app);
    this.objects.show(app);
    this.fade.show(app);    
  }
  
  reset() {
    this.enemies.reset();
  }
  
  tick() {
    this.enemies.tick();
    this.objects.tick();
  }
  
  load(done) {
    fetch("assets/demo-3.svg")
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
            A: this.artwork,
            N: this.navigation,
            E: this.enemies,
            G: this.ground,
            T: this.triggers
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
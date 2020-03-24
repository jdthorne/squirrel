
import Layer from './layer.js'
import SnailSlug from '../character/snail-slug.js'


const ENEMY_CLASSES = {
  SnailSlug: SnailSlug
};


class Enemies extends Layer {
  constructor() {
    super();
    
    this.enemies = [];
  }
  
  show(app) {
    this.enemies.forEach((enemy) => {
      enemy.show(app);
    });
  }
  
  tick() {
    this.enemies.forEach((enemy) => {
      enemy.tick();
    });
  }
  
  load(dom) {
    super.load(dom);
    
    this.paths.forEach((path) => {
      path.splitDownTo(25);
    });


    let id = dom.getAttribute("id");
    let type = id.substr(2);
    
    let enemyClass = ENEMY_CLASSES[type];
    
    if (!enemyClass) { return; }
    
    this.paths.forEach((path) => {
      this.enemies.push(new enemyClass(path));
    });
  }
}

export default Enemies;
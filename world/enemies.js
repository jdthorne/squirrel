import Layer from './layer.js'
import SnailSlug from '../enemy/snail-slug.js'


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
    return;

    let id = dom.getAttribute("id");
    let type = id.substr(2);
    
    Debug.log("Loading " + type);

    let enemyClass = ENEMY_CLASSES[type];
    
    if (!enemyClass) { return; }
    
    this.paths.forEach((path) => {
      this.enemies.push(new enemyClass(path));
    });
  }
}

export default Enemies;
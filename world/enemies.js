
import Layer from './layer.js'
import SnailSlug from '../character/snail-slug.js'
import Pigeon from '../character/pigeon.js'


const ENEMY_CLASSES = {
  SnailSlug: SnailSlug,
  Pigeon: Pigeon
};


class Enemies extends Layer {
  constructor(world) {
    super();
    
    this.world = world;
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
    this.paths = [];
    super.load(dom);
    
    this.paths.forEach((path) => {
      path.splitDownTo(25);
    });

    let id = dom.getAttribute("id");
    let type = id.substr(2);
    
    let enemyClass = ENEMY_CLASSES[type];
    
    if (!enemyClass) { return; }
    
    this.paths.forEach((path) => {
      this.enemies.push(new enemyClass(this.world, path));
    });
  }
}

export default Enemies;
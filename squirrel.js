import Debug from './util/debug.js';

let app = new PIXI.Application({
  width: 256, 
  height: 256, 
  backgroundColor: 0x6899c9
});
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

import World from './world/world.js';
import Player from './character/player.js';
import Input from './player/input.js';
import Camera from './player/camera.js';

PIXI.loader.add([
  "assets/squirrel-standing.svg",
  "assets/squirrel-running0.svg",
  "assets/squirrel-running1.svg",
  "assets/snail-slug.svg"
]).load(() => {  
  let world = new World();
  world.load(() => {
    world.show(app);
    
    let input = new Input(app);
    let player = new Player(app, input, world);
    let camera = new Camera(app, player, world);

    player.position.x = world.navigation.paths[0].links[0].start.x;
    player.position.y = world.navigation.paths[0].links[0].start.y;
    player.show(app);
  
    function render() {
      world.tick();
      input.tick();
      camera.tick();
      player.tick();
    
      app.renderer.render(app.stage);
      requestAnimationFrame(render);
    }
    
    render();
    
    Debug.log("startup complete");
  });
});
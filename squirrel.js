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
import Input from './player/input.js';
import Player from './player/player.js';
import Camera from './player/camera.js';

let world = new World();
let input = new Input(app);
let player = new Player(app, input, world);
let camera = new Camera(app, player, world);

world.load(() => {
  world.show(app);
  
  player.position.x = world.navigation.paths[0].links[0].start.x;
  player.position.y = world.navigation.paths[0].links[0].start.y;
});

function render() {
  input.tick();
  camera.tick();
  player.tick();

  app.renderer.render(app.stage);
  requestAnimationFrame(render);
}

render();

Debug.log("startup complete");
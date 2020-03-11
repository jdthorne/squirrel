import Debug from './util/debug.js';
import World from './world/world.js';

let app = new PIXI.Application({
  width: 256, 
  height: 256, 
  backgroundColor: 0x6899c9
});
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

let world = new World();

world.load(() => {
  world.show(app);
});



import Input from './player/input.js';
import Player from './player/player.js';
import Camera from './player/camera.js';

let input = new Input(app);
let player = new Player(app, input, world);
let camera = new Camera(app, player, world);

function render() {
  camera.tick();
  player.tick();

  app.renderer.render(app.stage);
  requestAnimationFrame(render);
}

render();

Debug.log("startup complete");
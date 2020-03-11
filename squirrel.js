import Debug from './util/debug.js';
import World from './world/world.js';

let app = new PIXI.Application({
  width: 256, 
  height: 256, 
  backgroundColor: 0x6899c9
});
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
// app.stage.scale.x = 0.5;
// app.stage.scale.y = 0.5;

document.body.appendChild(app.view);

let world = new World();

world.load(() => {
  world.show(app);
});

/*
6899c9

import Input from './input.js';
import Vector from './vector.js';
import Player from './player.js';


let input = new Input(app);
let player = new Player(app, input, world);

function render() {
  player.tick();

  app.renderer.render(app.stage);
  requestAnimationFrame(render);
}

render();
*/

Debug.log("startup complete");
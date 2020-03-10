import world from './world.js';

import Input from './input.js';
import Vector from './vector.js';
import Player from './player.js';

import Debug from './debug.js';

let app = new PIXI.Application({width: 256, height: 256});
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

let graphics = new PIXI.Graphics();
app.stage.addChild(graphics);

document.body.appendChild(app.view);

world.load(() => {
  console.log("Loaded " + world.links.length + " links");
  world.links.forEach((link) => {
    graphics.lineStyle(2, 0x880088, 1);
    graphics.moveTo(link.start.x, link.start.y);
    graphics.lineTo(link.control1.x, link.control1.y);    
    graphics.lineTo(link.control2.x, link.control2.y);    
    graphics.lineTo(link.end.x, link.end.y);    
  });

  world.links.forEach((link) => {
    graphics.lineStyle(4, 0xFF00FF, 1);
    graphics.moveTo(link.start.x, link.start.y);
    graphics.lineTo(link.end.x, link.end.y);
  });
});

app.stage.scale.x = 0.25;
app.stage.scale.y = 0.25;

let input = new Input(app);
let player = new Player(app, input, world);

function render() {
  player.tick();

  app.renderer.render(app.stage);
  requestAnimationFrame(render);
}

render();
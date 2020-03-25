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
  "assets/snail-slug.svg",
  "assets/pigeon-flying0.svg",
  "assets/pigeon-flying1.svg",
]).load(() => {  
  let world = new World();
  world.load(() => {
    world.show(app);
    
    let input = new Input(app);
    let player = new Player(app, input, world);
    let camera = new Camera(app, player, world);
    
    window.player = player;

    // player.position.x = world.navigation.paths[0].links[0].start.x;
    // player.position.y = world.navigation.paths[0].links[0].start.y + 100;
    player.position.x = 460
    player.position.y = 1350;
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

document.addEventListener("DOMContentLoaded", () => {
  let welcome = document.getElementById("welcome");
  
  welcome.addEventListener("click", () => {
    welcome.style.display = 'none';
  });

  welcome.addEventListener("touchstart", () => {
    welcome.style.display = 'none';
  });
});
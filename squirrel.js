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
  "assets/squirrel-running2.svg",
  "assets/squirrel-running3.svg",
  "assets/squirrel-running4.svg",
  "assets/squirrel-pinecone-charging.svg",
  "assets/squirrel-sword-charging.svg",
  "assets/squirrel-sword-attacking.svg",
  "assets/squirrel-claws-attacking.svg",
  "assets/pinecone.svg",
  "assets/explosion.svg",
  "assets/snail-slug.svg",
  "assets/pigeon-flying0.svg",
  "assets/pigeon-flying1.svg",
  "assets/slash.svg",
  "assets/nom.svg",
  "assets/health-bar.svg",
  "assets/health-box.svg",
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
    player.position.x = 675
    player.position.y = 1435;
    player.show(app);
    
    let msAverage = 0;
    function time(fn) {
      let start = (new Date()).getTime();
      
      fn();
      
      let end = (new Date()).getTime();
      let ms = end - start;      
      msAverage = (0.9 * msAverage) + (0.1 * ms);
      
      Debug.log("ms", Math.round(msAverage));
    }
    
    function render() {
      time(() => {
        world.tick();
        input.tick();
        camera.tick();
        player.tick();
      
        app.renderer.render(app.stage);
        requestAnimationFrame(render);
      });
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
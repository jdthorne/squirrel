import Debug from './util/debug.js';

let app = new PIXI.Application({
  width: 256, 
  height: 256, 
  backgroundColor: 0x62B5E2
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
  "assets/squirrel-pinecone-charging0.svg",
  "assets/squirrel-pinecone-charging1.svg",
  "assets/squirrel-sword-charging.svg",
  "assets/squirrel-sword-attacking.svg",
  "assets/squirrel-claws-attacking.svg",
  "assets/pinecone.svg",
  "assets/explosion.svg",
  "assets/snail-slug.svg",
  "assets/snail-slug-dead.svg",
  "assets/snail-slug-shell.svg",
  "assets/pigeon-flying0.svg",
  "assets/pigeon-flying1.svg",
  "assets/slash.svg",
  "assets/nom.svg",
  "assets/acorn.svg",
  "assets/pickup.svg",
  "assets/health-bar.svg",
  "assets/health-box.svg",
  "assets/fade.svg"
]).load(() => {  
  console.log("loaded assets");
  let world = new World();
  world.load(() => {
    world.show(app);
    
    let input = new Input(app);
    let player = new Player(world, input);
    let camera = new Camera(app, player, world);
    
    window.player = player;
    window.world = world;

    player.position = world.triggers.find("Start").center();
    player.show(app.stage);
    
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
  let welcome = document.querySelector("#welcome");
  
  let dismiss = () => {
    welcome.style.display = 'none';
  };
  
  welcome.addEventListener("click", dismiss);
  welcome.addEventListener("touchstart", dismiss);
  
  // ----
  
  function resetAllEnemies() {
    window.world.reset();
    world.fade.firstRest = false;
    world.fade.menu.style.opacity = 0;
  }
  
  let rest = document.getElementById("rest");
  rest.addEventListener("click",      () => { resetAllEnemies(); });
  rest.addEventListener("touchstart", () => { resetAllEnemies(); });
});
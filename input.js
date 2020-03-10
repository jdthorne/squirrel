import Vector from './vector.js'
import Debug from './debug.js';

const STICK_RADIUS = 64;

class Input {
  constructor(app) {  
    // setup
    this.app = app;
    
    app.view.addEventListener("touchstart", (e) => this.touch(e), false);
    app.view.addEventListener("touchmove",  (e) => this.touch(e), false);
    app.view.addEventListener("touchend",   (e) => this.touch(e), false);    
        
    // outputs
    this.stick = new Vector(0, 0);
    this.jump = false;

    // internal
    this.stickTouch = {
      identifier: null,
      start: new Vector()
    }
  }
  
  touch(event) {
    let touches = Array.prototype.slice.call(event.touches);
    
    this.touchStick(touches);
    this.touchButtons(touches);
  }
  
  touchStick(touches) {
    // find the stick touch
    var stickTouch = touches.find(
      (t) => { return t.identifier == this.stickTouch.identifier; }
    );
    
    if (!stickTouch) {
      // locate a new one
      stickTouch = touches.find(
        (t) => { return t.pageX < this.app.stage.width / 2; }
      );
      
      if (stickTouch) {
        this.stickTouch.identifier = stickTouch.identifier;
        this.stickTouch.start = new Vector(
          stickTouch.pageX,
          stickTouch.pageY
        );
      }
    } else {
      // resolve it
      let point = new Vector(
        stickTouch.pageX,
        stickTouch.pageY
      );
      
      let offset = point.minus(this.stickTouch.start);
      
      offset.multiplyBy(1.0 / STICK_RADIUS);
      
      if (offset.length() > 1) {
        offset.normalize();
      }
      
      this.stick = offset;
    }
    
    // clear it if we failed to find one
    if (!stickTouch) {
      this.stick.x = 0;
      this.stick.y = 0;
    }
  }
  
  touchButtons(touches) {
    let jump = touches.find(
      (t) => { return t.pageX > this.app.stage.width / 2; }
    );
    
    this.jump = jump;
  }
}

export default Input;
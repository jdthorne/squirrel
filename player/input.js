import Vector from '../util/vector.js'
import Debug from '../util/debug.js';

const STICK_RADIUS = 64;


Debug.log("Loaded");

class Input {
  constructor(app) {  
    // setup
    this.app = app;
    
    app.view.addEventListener("touchstart", (e) => this.touch(e), false);
    app.view.addEventListener("touchmove",  (e) => this.touch(e), false);
    app.view.addEventListener("touchend",   (e) => this.touch(e), false);    
    window.addEventListener("gamepadconnected", (e) => { Debug.log("GAMEPAD"); this.gamepad = e.gamepad; });
    window.addEventListener("gamepaddisconnected", (e) => { this.gamepad = null; });
    
    // outputs
    this.stick = new Vector(0, 0);
    this.jump = false;

    // internal
    this.stickTouch = {
      identifier: null,
      start: new Vector()
    }
  }
  
  tick() {
    if (navigator.getGamepads) {
      let gamepad = navigator.getGamepads()[0];
      
      if (gamepad) {
        Debug.log("axes", this.gamepad.axes.length);
        for (var i = 0; i < this.gamepad.axes.length; i++) {
          Debug.log("axes[" + i + "]", this.gamepad.axes[i]);
        }
        for (var i = 0; i < this.gamepad.buttons.length; i++) {
          Debug.log("buttons[" + i + "]", this.gamepad.buttons[i].value);
        }
        
        this.stick.x = this.gamepad.axes[0];
        this.stick.y = -this.gamepad.axes[1];
        
        this.jump = this.gamepad.buttons[0].value;
      }  
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
        (t) => { return t.pageX < window.innerWidth / 2; }
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
      (t) => { return t.pageX > window.innerWidth / 2; }
    );
    
    this.jump = jump;
  }
}

export default Input;
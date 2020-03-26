import Vector from '../util/vector.js'
import Debug from '../util/debug.js';

const STICK_RADIUS = 64;


class TouchStick {
  constructor(detector) {
    this.detector = detector;
    this.touch = null;
    
    this.value = new Vector(0, 0);
    
    this.start = null;
  }
  
  handle(touches) {
    if (this.touch) {
      this.touch = touches.find((t) => t.identifier == this.touch.identifier);
    }
      
    if (!this.touch) {
      let touch = touches.find((t) => { return this.detector(t); });
      if (touch) { 
        this.start = new Vector(touch.pageX, touch.pageY); 
        this.touch = touch;
      }
    }
    
    if (!this.touch) { 
      this.present = false;
      this.value = new Vector(0, 0);
      return;
    }
    
    let point = new Vector(this.touch.pageX, this.touch.pageY);
    let offset = point.minus(this.start);
    
    let push = offset.length() / STICK_RADIUS;
    let direction = offset.normalized();
    
    if (push > 1) { push = 1; }
    
    this.present = true;
    this.value = direction.multipliedBy(push);
  }
}


class Gamepad {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.left  = { value: new Vector(0, 0) };
    this.right = { value: new Vector(0, 0) };
    
    this.a = false;
    this.b = false;
    this.x = false;
    this.y = false;

    this.l1 = false;
    this.l2 = false;
    
    this.r1 = false;
    this.r2 = false;
  }
  
  tick() {
    if (!navigator.getGamepads) { 
      Debug.log("gamepad", "not supported");
      this.reset(); 
      return;
    }
    
    let gamepad = navigator.getGamepads()[0];
    if (!gamepad) {
      Debug.log("gamepad", "not connected"); 
      this.reset();
      return;
    }
    
    Debug.log("gamepad", "connected");
    // this.debug(gamepad);
    
    this.left.value.x  =  gamepad.axes[0];
    this.left.value.y  = -gamepad.axes[1];
    this.right.value.x =  gamepad.axes[2];
    this.right.value.y = -gamepad.axes[3];
    
    this.a = gamepad.buttons[0].value;
    this.b = gamepad.buttons[1].value;
    this.x = gamepad.buttons[2].value;
    this.y = gamepad.buttons[3].value;

    this.l1 = gamepad.buttons[4].value;
    this.l2 = gamepad.buttons[6].value;
    
    this.r1 = gamepad.buttons[5].value;
    this.r2 = gamepad.buttons[7].value;
  }
  
  debug(gamepad) {
    for (var i = 0; i < gamepad.axes.length; i++) {
      Debug.log("axes[" + i + "]", gamepad.axes[i]);
    }
    for (var i = 0; i < gamepad.buttons.length; i++) {
      Debug.log("buttons[" + i + "]", gamepad.buttons[i].value);
    }
  }
}


class Input {
  constructor(app) {  
    // setup
    this.app = app;
    
    app.view.addEventListener("touchstart", (e) => this.touch(e), false);
    app.view.addEventListener("touchmove",  (e) => this.touch(e), false);
    app.view.addEventListener("touchend",   (e) => this.touch(e), false);    
    window.addEventListener("gamepadconnected", (e) => { });
    window.addEventListener("gamepaddisconnected", (e) => { });
    
    // touches
    this.touches = {
      left:  new TouchStick((t) => { return t.pageX < window.innerWidth / 2 }),
      right: new TouchStick((t) => { return t.pageX > window.innerWidth / 2 }),
    }
    
    // gamepad
    this.gamepad = new Gamepad();
        
    // outputs
    this.move = new Vector(0, 0);
    this.jump = false;
    
    this.light = false;
    this.heavy = false;
  }
  
  touch(event) {
    let touches = Array.prototype.slice.call(event.touches);
    
    this.touches.left.handle(touches);
    this.touches.right.handle(touches);
    
    Debug.log("touches.left", this.touches.left.value);
    Debug.log("touches.left", this.touches.right.value);
  }
  
  tick() {
    this.gamepad.tick();
    
    this.move = this.touches.left.value.plus(this.gamepad.left.value);
    this.jump = this.touches.right.present || this.gamepad.a;
    
    this.light = this.touches.right.value.y < -0.5 || this.gamepad.r1;
    this.heavy = this.touches.right.value.y >  0.5 || this.gamepad.r2;
    
    Debug.log("input", {
      move: this.move,
      jump: this.jump,
      light: this.light,
      heavy: this.heavy
    });
  }
}

export default Input;
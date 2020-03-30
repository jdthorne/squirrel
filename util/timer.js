import Debug from './debug.js';

let timer = {
  time: (label, f) => {
    let start = (new Date()).getTime();
    
    let result = f();
    
    let end = (new Date()).getTime();
    
    Debug.log(label, Math.round(end - start) + "ms");
    return result;
  }
}


export default timer;
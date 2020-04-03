import Debug from './debug.js';

let data = {};

let timer = {
  time: (label, f) => {
    let start = (new Date()).getTime();
    
    let result = f();
    
    let end = (new Date()).getTime();
    
    data[label] = data[label] || {
      last: 0,
      avg: 0,
      max: 0
    };
    
    let last = (end - start);
    data[label].last = last;
    data[label].avg = (0.9 * data[label].avg) + (0.1 * last);
    data[label].max = Math.max(data[label].max, last);
    
    Debug.log(label, data[label]);
    return result;
  }
}

export default timer;
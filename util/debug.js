var logs = {};

var debug = {
  log: function(item, value) {
    if (value) {
      logs[item] = value;
    } else {
      if (!logs.messages) { logs.messages = []; }
      logs.messages.push(item);
    }
  
    document.getElementById("debug").innerText = JSON.stringify(logs, null, 2);
  }
};

window.Debug = debug;
export default debug;
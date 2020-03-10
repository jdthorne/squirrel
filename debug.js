var logs = {};

var debug = {
  log: function(item, value) {
    logs[item] = value;
  
    document.getElementById("debug").innerText = JSON.stringify(logs, null, 2);
  }
};

window.Debug = debug;
export default debug;
import Path from './path.js'
import Link from './link.js'

import Vector from '../util/vector.js'
import Debug from '../util/debug.js'


var measure = null;

function parseColor(name) {
  if (name[0] == '#') {
    name = name.substr(1);
    if (name.length == 3) { name = name.replace(/[a-fA-F0-9]/ig, '$1$1'); }
    
    return parseInt(name, 16);
  }

  if (!measure) {
    measure = document.createElement("div");
  }
  
  measure.style.color = name;
  
  document.body.appendChild(measure);
  
  const rgb = window.getComputedStyle(measure).color
                .match(/\d+/g)
                .map((a) => parseInt(a, 10))
  
  document.body.removeChild(measure);
  
  return (rgb[0] << 16) + (rgb[1] << 8) + rgb[2];
}

class Layer {
  constructor() {
    this.doms = [];
    this.paths = [];
  }
  
  show(app) {
    let preamble = `
      <?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <svg width="100%" height="100%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
    `.replace(/\n/g, '').replace(/^ */g, '');
    let postamble = '</svg>';
    
    let uri = "data:image/svg+xml;utf8," + preamble + this.doms.map((d) => d.outerHTML).join("") + postamble;

    uri = uri.replace(/\n/g, '');
    
    let sprite = new PIXI.Sprite(
      new PIXI.Texture.from(uri)
    );

    this.sprite = sprite;
    app.stage.addChild(sprite);
  }
  
  scale(value) {
    this.sprite.scale.x = value;
    this.sprite.scale.y = value;
  }
  
  load(dom) {
    this.doms.push(dom);
  
    let domPaths = Array.prototype.slice.call(
      dom.getElementsByTagName("path")
    );
    
    domPaths.forEach((domPath) => {
      var path = new Path(domPath.getAttribute("id"));
      
      var domLinks = domPath.
                      getAttribute("d").
                      split(/(?=[A-Z])/);
                      
      var previousPoint = new Vector();
      
      domLinks.forEach((domLink) => {
        var command = domLink[0];
        var data = domLink
                     .substring(1)
                     .split(/[, ]+/)
                     .map(v => parseFloat(v));
        
        if (command == "M") {
          var [x, y] = data;
          var point = new Vector(x, y);
          
        } else if (command == "C") {
          var [
            c1x, c1y,
            c2x, c2y,
            x, y
          ] = data;
          
          var point = new Vector(x, y);
          
          path.links.push(new Link([
            previousPoint,
            new Vector(c1x, c1y),
            new Vector(c2x, c2y),
            point
          ]));
        } else if (command == "L") {
          var [x, y] = data;
          var point = new Vector(x, y);
          
          var midpoint = point.minus(previousPoint);
          midpoint.multiplyBy(0.5);

          /*
          path.links.push(new Link([
            previousPoint,
            midpoint,
            midpoint,
            point
          ]));
          */
        }
        
        previousPoint = point;
      });
      
      if (domPath.getAttribute("style")) {
        let pathStyle = domPath.getAttribute("style").split(";");
        pathStyle.forEach((element) => {
          let [key, value] = element.split(':');
          
          switch (key) {
            case "stroke-width":
              path.width = parseFloat(value);
              path.halfWidth = path.width / 2;
              break;
          }
          
          // path.style[key] = value;
        });
      }
      
      this.paths.push(path);
    });
  }
}

export default Layer;

class Objects {
  constructor(world) {
    this.world = world;
  }

  show(app) {
    let group = new PIXI.Container();
    this.group = group;
    app.stage.addChild(group);
    
    this.objects = [];
  }

  add(object) {
    object.show(this, this.group, this.world);
    this.objects.push(object);
  }
  
  remove(object) {
    this.objects = this.objects.filter((o) => o != object);
  }  
  
  tick() {
    this.objects.forEach((o) => { o.tick(); });
  }
}

export default Objects;
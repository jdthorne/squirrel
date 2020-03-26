
class Weapon {
  constructor(character, options) {
    this.character = character;
    
    this.damage = options.damage;
    this.animations = options.animations || {};
  }

  activate() { }
  deactivate() { }
  ready() { return true; }
}

export default Weapon;

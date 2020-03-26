
class Weapon {
  constructor(character) {
    this.character = character;
  }

  activate() { }
  deactivate() { }
  ready() { return true; }
}

export default Weapon;

class Character {
  constructor() {
  }
  
  tick() {
    if (this.movement) { this.movement.tick(); }
  }
}


export default Character;
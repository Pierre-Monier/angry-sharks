class Hero {
  model;
  shoots = [];
  lives;
  points;
  isOutside;

  constructor(model) {
    this.model = model;
    this.loadLives();
    this.points = 0;
    this.isOutside = false;
  }

  loadLives() {
    const lives = [];
    for (let i = 0; i < 5; i++) {
      const life = new Life();
      life.setPosition(
        life.position[0] - i * 0.1,
        life.position[1],
        life.position[2]
      );
      lives.push(life);
    }

    this.lives = lives;
  }

  shoot() {
    const rocket = new Rocket();
    if (rocket.loaded) {
      this.shoots.push(rocket);
      rocket.position = hero.model.getModelHead();
    }
  }

  looseLife() {
    this.lives.pop();
  }

  getLives() {
    return this.lives.length;
  }

  addPoints(points) {
    this.points += points;
  }

  collision2d(other) {
    const box = this.model.getBBox();
    let x1 = box[0][0];
    let x2 = other.position[0];
    let y1 = box[1][1];
    let y2 = other.position[1];

    let width = box[1][0] - this.model.getBBox()[0][0];
    let height = this.model.getBBox()[1][1] - this.model.getBBox()[0][1];

    return x1 < x2 + width &&
      x1 + width > x2 &&
      y1 < y2 + height &&
      y1 + height > y2;

  }

  checkIsOutside() {
    if (this.model.loaded && this.model.isOutside() && !this.isOutside) {
      this.isOutside = true;
      const inter = setInterval(() => {
        if (this.model.isOutside()) {
          this.looseLife()
        } else {
          this.isOutside = false;
          clearInterval(inter)
        }
      }, 1000)
    }
  }
}

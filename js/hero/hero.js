class Hero {
  model;
  shoots = [];
  lives;
  points;

  constructor(model) {
    this.model = model;
    this.loadLives();
    this.points = 0;
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
    // exemple: comment positionner un rocket devant le vaisseau
    const p = hero.model.getBBox(); // boite englobante du vaisseau sur l'�cran

    console.log(hero.model.angle);
    console.log("ANGLE   ", hero.model.angle);
    let x;
    let y;

    if (hero.model.angle >= -90 && hero.model.angle <= 45 || hero.model.angle >= 90 && hero.model.angle <= 180 || hero.model.angle >= 280 || hero.model.angle <= -280) {
      x = p[1][0] + 0.02;
    } else {
      x = p[1][0] - 0.02;
    }


    if (
      (hero.model.angle <= 90 && hero.model.angle >= -90) ||
      (hero.model.angle <= 360 &&
        hero.model.angle >= 280 ||
        hero.model.angle >= -360 &&
        hero.model.angle <= -280)
    ) {
      y = p[1][1] - 0.1;
    } else {
      y = p[1][1] + 0.1;
    }
    const z = p[1][2] + 0.005;

    const rocket = new Rocket();

    if (rocket.loaded) {
      this.shoots.push(rocket);
      this.shoots[this.shoots.length - 1].setPosition(x, y, z);
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
}

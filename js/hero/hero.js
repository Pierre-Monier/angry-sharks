class Hero {
  model;
  shoots = [];
  lives;
  points;
  isOutside;
  isHited;
  isInvincible;
  state;


  constructor(model) {
    this.model = model;
    this.loadLives();
    this.points = 0;
    this.isOutside = false;
    this.isHited = false
    this.isShooting = false;
    this.state = 1;
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
    const rocket = new Rocket(this.isShooting);
    if (rocket.loaded) {
      this.shoots.push(rocket);
      rocket.position = hero.model.getModelHead();
    }
  }

  looseLife() {
    if (!this.isHited && !this.isInvincible) {
      this.isHited = true;
      this.lives.pop();
      soundpool.heroDammage.play();
      setTimeout(() => {
        this.isHited = false;
      }, 500);
    }
  }

  getLives() {
    return this.lives.length;
  }

  addPoints(points) {
    this.points += points;
    this.updateHeroState();
  }

  updateHeroState() {
    switch (true) {
      case (this.points > 50 && this.points < 150 && this.state !== 2):
        this.state = 2;
        this.model.scale += 0.01;
        break;

      case (this.points > 150 && this.points < 250 && this.state !== 3):
        this.state = 3;
        this.model.scale += 0.01;
        break;


      case (this.points > 250 && this.points < 350 && this.state !== 4):
        // In this state we can do boss fight
        this.state = 4;
        this.model.scale += 0.01;
        break;

      default:
        break;
    }
  }

  // THIS can be improve
  collision2d(other) {
    const box = this.model.getBBox();
    let x1 = box[0][0];
    let x2 = other.position[0];
    let y1 = box[1][1];
    let y2 = other.position[1];

    let width = Math.abs(box[1][0] - box[0][0] + 0.1);
    let height = Math.abs(box[1][1] - box[0][1] + 0.1);

    return x1 < x2 + width &&
      x1 + width > x2 &&
      y1 < y2 + height &&
      y1 + height > y2;
  }

  addInvincibleBonus() {
    this.isInvincible = true;
    setTimeout(() => this.isInvincible = false, Bonus.invincibleBonusDuration)
  }

  addShootingBonus() {
    this.isShooting = true;
    setTimeout(() => this.isShooting = false, Bonus.killEnemyBonusDuration)
  }

  addBubbleBonus() {
    console.log("TAKE THE BUBBLE");
    this.addPoints(25);
  }
}

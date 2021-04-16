class Hero {
  model;
  shoots = [];
  lives;
  ammos = [];
  points;
  isOutside;
  isHited;
  isHitedIntervalId;
  isInvincible;
  state;


  constructor(model) {
    this.model = model;
    this.loadLives();
    this.addAmmos(3);
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

  addLife() {
    if(this.lives.length < 5) {
      const life = new Life();
      life.setPosition(
        life.position[0] - hero.lives.length * 0.1,
        life.position[1],
        life.position[2]
      );
      this.lives.push(life); 
    } else {
      this.addPoints(50);
    }
  }

  shoot() {
    if(this.ammos.length > 0) {
      const rocket = new Rocket(true);
      if (rocket.loaded) {
        this.shoots.push(rocket);
        rocket.position = hero.model.getModelHead();
        this.ammos.pop();
      }
    } else {
      const rocket = new Rocket(false);
      if (rocket.loaded) {
        this.shoots.push(rocket);
        rocket.position = hero.model.getModelHead();
      }
    }
  }

  looseLife() {
    if (!this.isHited && !this.isInvincible) {
      this.isHited = true;
      this.lives.pop();
      soundpool.heroDammage.play();
      setTimeout(() => {
        this.isHited = false;
      }, 2000);
    }
  }

  getLives() {
    return this.lives.length;
  }

  addPoints(points) {
    this.points += points;
    this.updateHeroState();
    score.updateScore(hero.points);
  }

  addAmmos(number) {
    for (let i = 0; i < number; i++) {
      const ammo = new Ammo();
      ammo.setPosition(
        ammo.position[0] - this.ammos.length * 0.1,
        ammo.position[1],
        ammo.position[2]
      );
      this.ammos.push(ammo);
    }
  }

  updateHeroState() {
    switch (true) {
      case (this.points > 1000 && this.points < 2000 && this.state !== 2):
        this.state = 2;
        break;

      case (this.points > 2000 && this.points < 3000 && this.state !== 3):
        this.state = 3;
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

    let width = Math.abs(box[1][0] - box[0][0]);
    let height = Math.abs(box[1][1] - box[0][1]);

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
    this.addPoints(25);
  }

  draw() {
    hero.model.sendUniformVariables();
    if (this.isHited && !this.isHitedIntervalId) {
      this.isHitedIntervalId = setInterval(() => {
        hero.model.blink();
      }, 100);
    } else if (!this.isHited && this.isHitedIntervalId) {
      clearInterval(this.isHitedIntervalId);
      this.isHitedIntervalId = undefined;
      this.model.maCouleur = blue;
    }

    hero.model.draw();
  }
  
}

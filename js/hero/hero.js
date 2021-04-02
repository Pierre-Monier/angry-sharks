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
            life.setPosition((life.position[0] - (i * 0.1)), life.position[1], life.position[2]);
            lives.push(life);
        }

        this.lives = lives;
    }

    shoot() {
        // exemple: comment positionner un rocket devant le vaisseau
        const p = hero.model.getBBox(); // boite englobante du vaisseau sur l'�cran
        const x = (p[0][0] + p[1][0]) / 2;
        const y = p[1][1];
        // this can be tricky
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

    removePoints(points) {
        this.points -= points;
    }
}
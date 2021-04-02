class BadGuyGenerator {
    badGuys;

    constructor() {
        this.badGuys = [];
        setInterval(() => {this.generateBadGuy()}, 1000);
    }

    generateBadGuy() {
        const enemy = new NaziAirplane();
        enemy.sprite.setPosition(1.2, Math.random() - 0.5, 0);
        this.badGuys.push(enemy);
    }
}
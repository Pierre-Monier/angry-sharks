class BadGuyGenerator {
    badGuys;

    constructor() {
        this.badGuys = [];
        const enemy1 = new NaziAirplane();
        enemy1.sprite.setPosition(0, 0.4, 0);
        const enemy2 = new NaziAirplane();
        enemy2.sprite.setPosition(0, 0, 0);
        const enemy3 = new NaziAirplane();
        enemy3.sprite.setPosition(0, -0.4, 0);
        this.badGuys.push(enemy1, enemy2, enemy3);
    }
}
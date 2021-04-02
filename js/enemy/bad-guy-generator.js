class BadGuyGenerator {
    badGuys;

    constructor() {
        this.badGuys = [];
        setInterval(() => {this.generateBadGuy()}, 10000);
    }

    generateBadGuy() {
        // NazyAirPlane is currently a 3D model, it might our future boss
        // we have keep the sprite naming for the sake of simplicity
        const enemy = new BadFish();
        enemy.sprite.position = [0.2, Math.random() - 0.5, 0];
        const enemy2 = new BadFish();
        enemy2.sprite.position = [0.2, Math.random() - 0.5, 0];
        const enemy3 = new BadFish();
        enemy3.sprite.position = [0.2, Math.random() - 0.5, 0];
        this.badGuys.push(enemy);
        this.badGuys.push(enemy2);
        this.badGuys.push(enemy3);
    }
}
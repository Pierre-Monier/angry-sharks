class BadGuyGenerator {
    badGuys;

    constructor() {
        this.badGuys = [];
        setInterval(() => {this.generateBadGuy()}, 10000);
        this.generateBadGuy()
    }

    generateBadGuy() {
        const enemy = new BadFish1();
        enemy.sprite.position = [Math.random() - 0.5, Math.random() - 0.5, 0];
        const enemy2 = new BadFish2();
        enemy2.sprite.position = [Math.random() - 0.5, Math.random() - 0.5, 0];
        const enemy3 = new BadFish3();
        enemy3.sprite.position = [Math.random() - 0.5, Math.random() - 0.5, 0];
        this.badGuys.push(enemy);
        this.badGuys.push(enemy2);
        this.badGuys.push(enemy3);
    }
}
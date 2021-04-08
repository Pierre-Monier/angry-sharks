class BadGuyGenerator {
    badGuys;

    constructor() {
        this.badGuys = [];
        setInterval(() => {this.generateBadGuy()}, 10000);
        this.generateBadGuy()
    }

    generateBadGuy() {
        const enemy = this.getEnemy();
        if (enemy) {
            console.log('enemy', enemy)
            enemy.sprite.position = [Math.random() - 0.5, Math.random() - 0.5, 0];
            this.badGuys.push(enemy);
        }
    }

    getEnemy() {
        const x = this.getX()
        switch (true) {
            case x <= 33:
                return new BadFish1()
            case x <= 66:
                return new BadFish2()
            case x <= 100:
                return new BadFish3()
            default:
                break;
        }
    }

    getX() {
        switch (hero.state) {
            case 1:
                return Math.random() * (50 - 1) + 1
            case 2:
                return Math.random() * (70 - 20) + 20
            case 3:
                return Math.random() * (100 - 33) + 33
            default:
                return 101;
        }
    }
}
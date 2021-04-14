class BadGuyManager {
    badGuys;
    areSlowed;

    constructor() {
        this.badGuys = [];
        this.areSlowed = false;
        setInterval(() => { this.generateBadGuy() }, 1000);
    }

    generateBadGuy() {
        const enemy = this.getEnemy();
        if (enemy) {
            console.log('enemy', enemy)
            var x = Math.random();
            console.log("x gen",x);
            if (x < 0.5) {
                x = x - 2;
            } else {
                x = x +1;
            }
            enemy.sprite.position = [x, Math.random(), 0];
            if (this.areSlowed) {
                enemy.sprite.speed = 0.3;
            }
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

    slowEnemies() {
        this.badGuys.forEach((badGuy) => {
            badGuy.sprite.speed = 0.3;
            badGuy.isSlowed = true;
        });
        this.areSlowed = true;

        setTimeout(() => {
            this.badGuys.forEach((badGuy) => {
                badGuy.sprite.speed = 1;
                badGuy.isSlowed = false;
            });
            this.areSlowed = false;
        }, Bonus.slowBonusDuration)
    }

    removeBadGuyLife(badGuy) {
        badGuy.life--;
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
class Bonus {
    bonuses;
    data = [
        (params) => { return {tag: 'slow-enemy', sprite: new Sprite(getSlowEnemyBonusTexture, params), isTaken: false} },
        (params) => { return {'tag': 'invincible', sprite: new Sprite(getInvincibleBonusTexure, params), isTaken: false} },
        (params) => { return {'tag': 'kill-enemy', sprite: new Sprite(getKillEnemyBonusTexture, params), isTaken: false} },
    ]

    constructor() {
        this.bonuses = [];
        this.startBonusLoop()
    }

    startBonusLoop() {
        const timeout = Math.random() * (3000 - 1000) + 1000;
        const params = {
            ...Sprite.defaultParams,
            position: [Math.random() * (1 - (-1)) + (-1), -1, 0]
        }

        setTimeout(() => {
            this.bonuses.push(this.data[getRandomInt(3)](params));
            this.startBonusLoop()
        }, timeout)
    }
}
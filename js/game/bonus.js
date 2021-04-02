class Bonus {
    bonuses;
    data = [
        (params) => { return {tag: 'slow-enemy', sprite: new Sprite(getSlowEnemyBonusTexture, params)} },
        (params) => { return {'tag': 'invincible', sprite: new Sprite(getInvincibleBonusTexure, params)} },
        (params) => { return {'tag': 'kill-enemy', sprite: new Sprite(getKillEnemyBonusTexture, params)} },
    ]

    constructor() {
        this.bonuses = [];
    }

    shuffleGetBonus(params) {
        if (getRandomInt(10) > 5) {
            this.bonuses.push(this.data[getRandomInt(3)](params));
        }
    }
}
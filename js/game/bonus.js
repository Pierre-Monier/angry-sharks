class Bonus {
    bonuses;
    displayedBonuses;
    data = [

        (params) => { return { tag: 'life', sprite: new Sprite(getHeartBonusTexture, params), isTaken: false, } },
        (params) => { return { tag: 'slow-enemy', sprite: new Sprite(getSlowEnemyBonusTexture, params), isTaken: false, duration: Bonus.slowBonusDuration } },
        (params) => { return { tag: 'invincible', sprite: new Sprite(getInvincibleBonusTexure, params), isTaken: false, duration: Bonus.invincibleBonusDuration } },
        (params) => { return { tag: 'kill-enemy', sprite: new Sprite(getKillEnemyBonusTexture, params), isTaken: false, } },
        (params) => { return { tag: 'bubble', sprite: new Sprite(getBubbleBonusTexture, params), isTaken: false } },
    ]
    static invincibleBonusDuration = 10000;
    static killEnemyBonusDuration = 1000;
    static slowBonusDuration = 5000;

    constructor() {
        this.bonuses = [];
        this.displayedBonuses = [];
        this.bonusLoop()
    }

    bonusLoop() {
        const timeout = Math.random() * (3000 - 1000) + 1000;
        const params = {
            ...Sprite.defaultParams,
            position: [Math.random() * (1 - (-1)) + (-1), -1, 0]
        }

        setTimeout(() => {
            this.bonuses.push(this.data[this.selectBonusIndex()](params));
            this.bonusLoop()
        }, timeout)
    }

    addDisplayedBonus(bonusIndex) {
        const displayedParams = {
            ...Sprite.defaultParams,
            position: [(0.9 - this.displayedBonuses.length * 0.1), 0.8, 0.0],
        }

        const displayedBonus = this.data[bonusIndex](displayedParams)
        const newArrayLength = this.displayedBonuses.push(displayedBonus);
        setTimeout(() => {
            if (this.displayedBonuses[newArrayLength - 1]) {
                this.displayedBonuses[newArrayLength - 1].sprite.clear();
            }

            this.displayedBonuses = this.displayedBonuses.filter((bonus) => bonus.tag !== displayedBonus.tag)
        }, displayedBonus.duration);
    }

    selectBonusIndex() {
        const x = getRandomInt(3);
        // with this we got 1 chance out of 3 to have a improve bonus
        return x === 2 ? getRandomInt(4) : 4;
    }
}
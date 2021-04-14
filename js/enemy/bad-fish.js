class BadFish {
    sprite;
    life;
    points;
    state;
    isSlowed;
    isEatable;
    isHited;
    damageSprite;

    constructor(getTexture, enemyParams, spriteParams) {
        this.sprite = new Mob(getTexture, spriteParams);
        this.life = enemyParams.life;
        this.points = enemyParams.points;
        this.state = enemyParams.state;
        this.isSlowed = false;
        this.isEatable = enemyParams.isEatable;
        this.isHited = false;

        const damageSpriteParams = {
            ...spriteParams,
            width: 0.4,
            height: 0.4
        }

        this.damageSprite = new Sprite(getMobTexture, damageSpriteParams);
    }

    drawWithMovement() {
        this.sprite.setParameters();
        this.sprite.sendUniformVariables();
        this.sprite.draw();
        if (this.isHited) {
            this.damageSprite.setPosition(this.sprite.position[0], this.sprite.position[1], this.sprite.position[2] - 0.1);
            this.damageSprite.sendUniformVariables();
            this.damageSprite.draw();
        }
    }

    slowSpeed() {
        if (!this.isSlowed) {
            this.sprite.speed = 0.3
            this.isSlowed = true;
            setTimeout(() => {
                this.sprite.speed = 1
                this.isSlowed = false;
            }, 5000);
        }
    }

    looseLife() {
        if (!this.isHited) {
            this.isHited = true;
            this.life--;
            setTimeout(() => {
                this.isHited = false;
            }, 500);
        }
    }
}
class BadFish {
    sprite;
    life;
    points;
    state;
    isSlowed;

    constructor(getTexture, enemyParams, spriteParams) {
        this.sprite = new Mob(getTexture, spriteParams);
        this.life = enemyParams.life;
        this.points = enemyParams.points;
        this.state = enemyParams.state;
        this.isSlowed = false;
    }

    drawWithMovement() {
        this.sprite.setParameters();
        this.sprite.sendUniformVariables();
        this.sprite.draw();
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
}
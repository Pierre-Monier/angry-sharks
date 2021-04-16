class Score {
    scoreSprites;
    ammoNumberSprites;
    baseScoreParam = {
        ...Sprite.defaultParams,
        position: [-0.9, 0.9, 0.0],
    };
    baseAmmosParam = {
        ...Sprite.defaultParams,
        position: [0.825, -0.9, 0.0],
    };
    textureMethods = [
        () => initTexture('./textures/score/0.png'),
        () => initTexture('./textures/score/1.png'),
        () => initTexture('./textures/score/2.png'),
        () => initTexture('./textures/score/3.png'),
        () => initTexture('./textures/score/4.png'),
        () => initTexture('./textures/score/5.png'),
        () => initTexture('./textures/score/6.png'),
        () => initTexture('./textures/score/7.png'),
        () => initTexture('./textures/score/8.png'),
        () => initTexture('./textures/score/9.png'),
    ];

    constructor() {
        this.scoreSprites = [new Sprite(this.textureMethods[0], this.baseScoreParam)];
        this.ammoNumberSprites = [new Sprite(this.textureMethods[hero.ammos], this.baseAmmosParam)];
    }

    updateScore(score) {
        this.scoreSprites = score.toString().split('').map((number, index) => {
            const params = {
                ...Sprite.defaultParams,
                position: [(-0.9 + (index / 10)), 0.9, 0.0],
            }

            return new Sprite(this.textureMethods[number], params);
        });
    }

    updateAmmoNumber(ammoNumber) {
        this.ammoNumberSprites = ammoNumber.toString().split('').reverse().map((number, index) => {
            const params = {
                ...Sprite.defaultParams,
                position: [(0.825 - (index / 10)), -0.9, 0.0],
            }

            return new Sprite(this.textureMethods[number], params);
        });
    }
}
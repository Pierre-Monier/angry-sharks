class BadFish2 extends BadFish {
    constructor() {
        const enemyParams = {
            life: 1,
            points: 50,
            state: 2
        }
        const spriteParams = {
            ...Sprite.defaultParams,
            width: 0.6,
            height: 0.6,
        }

        super(getMobTexture, enemyParams, spriteParams);
    }
}
class BadFish3 extends BadFish {
    constructor() {
        const enemyParams = {
            life: 3,
            points: 100,
            state: 3
        }
        const spriteParams = {
            ...Sprite.defaultParams,
            width: 1,
            height: 1,
        }

        super(getMobTexture, enemyParams, spriteParams);
    }
}
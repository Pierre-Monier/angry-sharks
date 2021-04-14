class Shark extends BadFish {
    constructor() {
        const enemyParams = {
            life: 1,
            points: 50,
            state: 2,
            isEatable: false,
        }
        const spriteParams = {
            ...Sprite.defaultParams,
            width: 0.6,
            height: 0.6,
        }

        super({ regular: getSharkTexture, reverse: getReverseSharkTexture}, enemyParams, spriteParams);
    }
}
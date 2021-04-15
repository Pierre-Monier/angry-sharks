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
            width: 0.4,
            height: 0.4,
        }

        super({ regular: getSharkTexture, reverse: getReverseSharkTexture}, enemyParams, spriteParams);

        this.sprite.setNumberOfFrames(8);
        this.sprite.setAnimationSpeed(200); // lower is faster
    }
}
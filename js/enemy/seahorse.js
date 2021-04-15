class Seahorse extends BadFish {
    constructor() {
        const enemyParams = {
            life: 1,
            points: 25,
            state: 1,
            isEatable: true,
        }

        const spriteParams = {
            ...Sprite.defaultParams,
            width: 0.1,
            height: 0.25,
        }

        super({regular: getSeaHorseTexture, reverse: getReverseSeaHorseTexture}, enemyParams, spriteParams);

        this.sprite.setNumberOfFrames(2);
        this.sprite.setAnimationSpeed(200); // lower is faster
    }
}
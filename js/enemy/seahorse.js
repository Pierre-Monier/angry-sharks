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
            width: 0.2,
            height: 0.2,
        }

        super(getSeaHorseTexture, enemyParams, spriteParams);
    }
}
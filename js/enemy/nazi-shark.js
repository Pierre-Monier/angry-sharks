class NaziShark extends BadFish {
    constructor() {
        const enemyParams = {
            life: 3,
            points: 200,
            state: 3,
            isEatable: false,
        }
        const spriteParams = {
            ...Sprite.defaultParams,
            width: 1,
            height: 1,
        }

        super({regular: getNaziSharkTexture, reverse: getReverseNaziSharkTexture}, enemyParams, spriteParams);
    }
}
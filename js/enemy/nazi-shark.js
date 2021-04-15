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
            xMove : (Math.random() * (Mob.EDGES.right - Mob.EDGES.left) + Mob.EDGES.left) / 100,
            yMove : (Math.random() * (Mob.EDGES.bottom - Mob.EDGES.top) + Mob.EDGES.top) / 100
        }

        super({regular: getNaziSharkTexture, reverse: getReverseNaziSharkTexture}, enemyParams, spriteParams);
    }
}
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
            xMove : (Math.random() * (Mob.EDGES.right - Mob.EDGES.left) + Mob.EDGES.left) / 100,
            yMove : (Math.random() * (Mob.EDGES.bottom - Mob.EDGES.top) + Mob.EDGES.top) / 100
        }

        super({ regular: getSharkTexture, reverse: getReverseSharkTexture}, enemyParams, spriteParams);

        this.sprite.setNumberOfFrames(8);
        this.sprite.setAnimationSpeed(200); // lower is faster
    }
}
class Blobfish extends BadFish {
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
            xMove : (Math.random() * (Mob.EDGES.right - Mob.EDGES.left) + Mob.EDGES.left) / 100,
            yMove : 0.0
        }

        super({regular: getBlobfishTexture, reverse: getReverseBlobfishTexture}, enemyParams, spriteParams);

        this.sprite.setNumberOfFrames(1);
        this.sprite.setAnimationSpeed(200); // lower is faster
    }
}
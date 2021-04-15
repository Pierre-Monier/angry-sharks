class Blobfish extends BadFish {
    constructor() {
        const enemyParams = {
            life: 1,
            points: 300,
            state: 1,
            isEatable: true,
            duration : 5000
        }

        const spriteParams = {
            ...Sprite.defaultParams,
            width: 0.2,
            height: 0.2,
            xMove : (Math.random() * (Mob.EDGES.right - Mob.EDGES.left) + Mob.EDGES.left) / 100,
            yMove : (Math.random() * (Mob.EDGES.right - Mob.EDGES.left) + Mob.EDGES.left) / 100,
        }

        super({regular: getBlobfishTexture, reverse: getReverseBlobfishTexture}, enemyParams, spriteParams);

        this.sprite.setNumberOfFrames(1);
        this.sprite.setAnimationSpeed(200); // lower is faster
    }
}
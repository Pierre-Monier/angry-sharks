class Turtle extends BadFish {
    constructor() {
        const enemyParams = {
            life: 1,
            points: 75,
            state: 1,
            isEatable: true,
            isHearthly: true,
        }

        const spriteParams = {
            ...Sprite.defaultParams,
            width: 0.25,
            height: 0.25,
            xMove : (Math.random() * (Mob.EDGES.right - Mob.EDGES.left) + Mob.EDGES.left) / 200,
            yMove : 0.0
        }

        super({regular: getReverseTurtleTexture, reverse: getTurtleTexture}, enemyParams, spriteParams);

        this.sprite.setNumberOfFrames(24);
        this.sprite.setAnimationSpeed(200); // lower is faster
    }
}
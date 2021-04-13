class BackgroundLayer extends Sprite {
    speed;

    constructor(getTexture, speed = .0001) {
        const params = {
            ...Sprite.defaultParams,
            width: 8,
            height: 5,
            position: [0, 0, 0.9999],
        }
        super(getTexture, params);

        this.speed = speed;
    }

    setParameters() {
        this.offset += this.speed;
    }
}
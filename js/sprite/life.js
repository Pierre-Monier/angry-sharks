class Life extends Sprite {
    constructor() {
        const params = {
            ...Sprite.defaultParams,
            position: [0.9, 0.9, 0.0],
        }

        super(getLifeTexture, params);
    }
}
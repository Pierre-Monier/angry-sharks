class Life extends Sprite {
    constructor() {
        const params = {
            ...Sprite.defaultParams,
            width : 0.15,
            heigth : 0.5,
            position: [0.9, 0.9, 0.0],
        }

        super(getLifeTexture, params);
    }
}
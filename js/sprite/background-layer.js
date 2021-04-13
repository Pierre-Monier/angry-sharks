class BackgroundLayer extends Sprite {
    constructor(getTexture, z = 0.9999) {
        const params = {
            ...Sprite.defaultParams,
            width: 8,
            height: 5,
            position: [0, 0, z],
        }

        super(getTexture, params)
    }
}
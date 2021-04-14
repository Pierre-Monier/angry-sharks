class SeaBackground extends Sprite {
    constructor() {
        const params = {
            ...Sprite.defaultParams,
            position: [0, 0, 0],
        }

        super(getSeaTexture, params)
    }
}

class FarGroundCloud extends Sprite {
    constructor() {
        const params = {
            ...Sprite.defaultParams,
            width: 5,
            height: 0.8,
            position: [0, 0, 0.99999],
        }

        super(getFarGroundCloudTexture, params)
    }
}
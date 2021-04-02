class Mountains extends Sprite {
    constructor() {
        const params = {
            ...Sprite.defaultParams,
            width: 5,
            height: 0.8,
            position: [0, -0.9, 0.9999],
        }

        super(getMountainsTexture, params)
    }
}
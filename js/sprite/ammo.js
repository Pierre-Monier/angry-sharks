class Ammo extends Sprite {
    constructor() {
        const params = {
            ...Sprite.defaultParams,
            width : 0.15,
            height : 0.25,
            position: [0.9, -0.9, 0.0],
        }

        super(getMissileUITexture, params);

        console.log(this.height)
    }
}
class BadFish1 extends BadFish {
    constructor() {
        const enemyParams = {
            life: 1,
            points: 25,
            state: 1
        }
        super(getMobTexture, enemyParams);
    }
}
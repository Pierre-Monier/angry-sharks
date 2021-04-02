class BadFish {
    sprite;
    life;
    points;

    constructor() {
        this.sprite = new Sprite(getMobTexture);
        this.life = 1;
        this.points = 25;
    }
}
class Boss {
    model;
    life;
    points;

    constructor() {
        this.model = new Model(getHeroModel());
        this.life = 1;
        this.points = 25;
    }
}
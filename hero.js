class Hero {
    model;
    shoots = [];
    life = 5;

    constructor(model) {
        this.model = model;
    }

    shoot() {
        // exemple: comment positionner un splat devant le vaisseau
        const p = hero.model.getBBox(); // boite englobante du vaisseau sur l'�cran
        const x = (p[0][0]+p[1][0])/2;
        const y = p[1][1];
        const z = p[1][2]+0.005;

        const splat = new Splat(getSplatTexture())

        if (splat.loaded) {
            this.shoots.push(splat);
            this.shoots[this.shoots.length -1].setPosition(x,y,z);
        }
    }
}
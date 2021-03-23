class Mob extends Sprite {
    isOutSide;

    constructor() {
        // avec cet objet on peut configurer un sprite
        const params = {
            width: 0.2,
            height: 0.2,
            position: [0.0, 0.0, 0.0],
            couleur: [1, 0, 0],
            time: 0.0,
            isOutSide: false
        }

        super(getMobTexture, params);
    }

    setParameters(elapsed) {
        //this.time += 0.01 * elapsed;
        // on peut animer les splats ici. Par exemple :
        //this.position[0] += 0.08; // permet de déplacer le splat vers le haut au fil du temps
        //this.position[0] += 0.02*Math.sin(this.time); // permet de déplacer le splat sur l'axe X
    }
}

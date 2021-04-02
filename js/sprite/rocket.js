class Rocket extends Sprite {
    isOutSide;
    phi = (hero.model.angle + 90) * (Math.PI / 180);

    constructor() {
        const params = {
            ...Sprite.defaultParams,
            position: [10, 0, 0],
        }
        super(getSplatTexture, params);
    }

    // sendUniformVariables() {
    //     // comme ça on peut ajouter des fonctionnalités à sendUniformVariables
    //     const callBack = () => console.log('callBack function');
    //     super.sendUniformVariables(callBack);
    // }

    setParameters(elapsed) {
        //this.time += 0.01 * elapsed;
        // on peut animer les splats ici. Par exemple :
        this.position[0] += 0.08 * Math.sin(this.phi); // permet de déplacer le splat vers le haut au fil du temps
        this.position[1] -= 0.08 * Math.cos(this.phi);
        //this.position[0] += 0.02*Math.sin(this.time); // permet de déplacer le splat sur l'axe X
    }

    draw() {
        if (this.loaded) {
            this.isOutSide = (this.position[0] > 3) || (this.position[0] < -3) || (this.position[1] > 7.3) || (this.position[1] < -7.3);

        }
        super.draw();
    }
}

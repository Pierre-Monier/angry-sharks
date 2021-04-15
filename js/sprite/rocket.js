class Rocket extends Sprite {
    isOutSide;
    phi = (hero.model.angle + 90) * (Math.PI / 180);


    constructor(isShooting) {
        const params = {
            ...Sprite.defaultParams,
            width: 0.1,
            height: 0.15,
            position: [1, 0, 0],
        }

        const texture = isShooting ? getMissileTexture : getSplatTexture
        super(texture, params);
    }

    setParameters() {
        this.position[0] += 0.04 * Math.sin(this.phi); // permet de déplacer le splat dans la direction ou il est tiré
        this.position[1] -= 0.04 * Math.cos(this.phi);
    }

    draw() {
        if (this.loaded) {
            this.isOutSide = (this.position[1] > edges.bottom) || (this.position[1] < edges.top) || (this.position[0] > edges.right) || (this.position[0] < edges.left);
        }
        super.draw();
    }
}

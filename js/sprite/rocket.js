class Rocket extends Sprite {
    isOutSide;
    isDeadly;
    phi = (hero.model.angle + 90) * (Math.PI / 180);


    constructor(isDeadly = false) {
        const params = {
            ...Sprite.defaultParams,
            width: 0.1,
            height: 0.1,
            position: [0, 0, 0],
        }

        const texture = isDeadly ? getMissileTexture : getSplatTexture
        super(texture, params);
        this.isDeadly = isDeadly;
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

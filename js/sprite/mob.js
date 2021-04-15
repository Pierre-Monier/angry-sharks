class Mob extends Sprite {
    isOutSide;
    isInside;
    direction; //false to the right, true to the left
    xMove;
    yMove;
    static EDGES = {
        top: -1,
        bottom: 1,
        right: 1,
        left: -1
    }
    speed;
    textures;

    constructor(textures, spriteParams) {
        super(textures.regular, spriteParams);
        this.xMove = (Math.random() * (Mob.EDGES.right - Mob.EDGES.left) + Mob.EDGES.left) / 100
        this.yMove = (Math.random() * (Mob.EDGES.bottom - Mob.EDGES.top) + Mob.EDGES.top) / 100
        console.log(this.width);
        this.textures = textures;
        this.speed = 1;
    }

    setParameters() {
        if (this.isInside) {
            this.position[0] += this.xMove * this.speed;
        } else {
            const tmp = (this.position[0] > Mob.EDGES.right) ? -0.5 : 0.5;
            this.position[0] += tmp * this.speed;
        }

        this.position[1] += this.yMove * this.speed;
    }

    draw() {
        if (this.isInside === undefined && this.position[0] < Mob.EDGES.right && this.position[0] > Mob.EDGES.left && this.position[1] < Mob.EDGES.bottom && this.position[1] > Mob.EDGES.top) {
            this.isInside = true;
        }
        if (this.loaded && this.isInside) {
            this.handleRandomMovement()
        }
        super.draw();
    }

    handleRandomMovement() {
        if (this.position[0] > Mob.EDGES.right || this.position[0] < Mob.EDGES.left) {
            this.xMove = -this.xMove;
            this.switchTexture(this.xMove);
            this.isOutSide = true
        } else if (this.position[1] > Mob.EDGES.bottom || this.position[1] < Mob.EDGES.top) {
            this.yMove = -this.yMove;
            this.isOutSide = true
        }
    }

    switchTexture(move) {
        if (move > 0) {
            this.texture = this.textures.reverse();
        } else {
            this.texture = this.textures.regular();
        }
    }
}

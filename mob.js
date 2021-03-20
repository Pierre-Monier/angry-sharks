class Mob extends Sprite {
    isOutSide;

    constructor() {
        super(getMobTexture);
    }

    sendUniformVariables() {
        // envoie des variables au shader (position du splat, couleur, texture)
        // fonction appelée à chaque frame, avant le dessin du splat
        if (this.loaded) {
            gl.uniform3fv(Mob.shader.positionUniform, this.position);
            gl.uniform3fv(Mob.shader.couleurUniform, this.couleur);

            // how to send a texture:
            // associe la texture à l'unité de texture 0
            // Si plusieur texture juste change d'unité de texture
            gl.activeTexture(gl.TEXTURE0);
            // Pour faire des animations, changé l'identifiant (this.splatTexture)

            if (this.texture.isLoaded) {
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
            }
            //
            gl.uniform1i(Mob.shader.texUniform, 0);
        }
    }

    setParameters(elapsed) {
        //this.time += 0.01 * elapsed;
        // on peut animer les splats ici. Par exemple :
        //this.position[0] += 0.08; // permet de déplacer le splat vers le haut au fil du temps
        //this.position[0] += 0.02*Math.sin(this.time); // permet de déplacer le splat sur l'axe X
    }
}

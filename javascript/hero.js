"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Splat = void 0;
var Splat = /** @class */ (function () {
    function Splat(texture, gl) {
        this.width = 0.2;
        this.height = 0.2;
        this.position = [0.0, 0.0, 0.0];
        this.couleur = [1, 0, 0];
        this.time = 0.0;
        this.loaded = false;
        this.splatTexture = texture;
        // LOADING (array)
        var wo2 = 0.5 * this.width;
        var ho2 = 0.5 * this.height;
        // les sommets !
        var vertices = [
            -wo2, -ho2, -0.8,
            wo2, -ho2, -0.8,
            wo2, ho2, -0.8,
            -wo2, ho2, -0.8
        ];
        // coordonnées de texture
        var coords = [
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ];
        var tri = [0, 1, 2, 0, 2, 3];
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);
        // cree un nouveau buffer sur le GPU et l'active
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.enableVertexAttribArray(0);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        // meme principe pour les coords
        this.coordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.coordBuffer);
        gl.enableVertexAttribArray(1);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW);
        gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);
        // creation des faces du cube (les triangles) avec les indices vers les sommets
        this.triangles = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triangles);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tri), gl.STATIC_DRAW);
        gl.bindVertexArray(null);
        this.loaded = true;
        console.log("splat initialized");
    }
    Splat.prototype.draw = function (gl) {
        // dessin du splat
        if (this.loaded) {
            gl.bindVertexArray(this.vao);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
            gl.bindVertexArray(null);
        }
    };
    return Splat;
}());
exports.Splat = Splat;

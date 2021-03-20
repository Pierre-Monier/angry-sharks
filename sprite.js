class Sprite {
    static shader;
    texture;
    vao;
    vertexBuffer;
    coordBuffer;
    trianglesBuffer;
    width;
    height;
    position;
    time;
    loaded = false;

    constructor(getTexture) {
        this.texture = getTexture();

        // might be a problem
        this.initParameters();

        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        this.initVertexBuffer();
        this.initCoordBuffer();
        this.initTrianglesBuffer();

        gl.bindVertexArray(null);
        this.loaded = true;
    }

    initParameters() {
        // paramètres par défaut d'un splat (taille, position, couleur)
        this.width = 0.2;
        this.height = 0.2;
        this.position = [0.0, 0.0, 0.0];
        this.couleur = [1, 0, 0];
        this.time = 0.0;
        this.isOutSide = false;
    }

    static initShader() {
        Sprite.shader = initShaders("splat-vs", "splat-fs");

        // active ce shader
        gl.useProgram(Sprite.shader);

        // adresse des variables uniform dans le shader
        Sprite.shader.positionUniform = gl.getUniformLocation(Sprite.shader, "uPosition");
        Sprite.shader.texUniform = gl.getUniformLocation(Sprite.shader, "uTex");
        Sprite.shader.couleurUniform = gl.getUniformLocation(Sprite.shader, "maCouleur");
    }

    initVertexBuffer() {
        const wo2 = 0.2 * this.width;
        const ho2 = 0.2 * this.height;
        // un tableau contenant les positions des sommets (sur GPU donc)
        const vertices = [
            -wo2, -ho2, -0.8,
            wo2, -ho2, -0.8,
            wo2, ho2, -0.8,
            -wo2, ho2, -0.8
        ];

        // cree un nouveau buffer sur le GPU et l'active
        // Code dupliquer dans background.js !
        // noinspection DuplicatedCode
        this.vertexBuffer = gl.createBuffer();
        this.vertexBuffer.itemSize = 3;
        this.vertexBuffer.numItems = 4;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.enableVertexAttribArray(0);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    }

    initCoordBuffer() {
        const coords = [
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ];

        this.coordBuffer = gl.createBuffer();
        this.coordBuffer.itemSize = 2;
        this.coordBuffer.numItems = 4;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.coordBuffer);
        gl.enableVertexAttribArray(1);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW);
        gl.vertexAttribPointer(1, this.coordBuffer.itemSize, gl.FLOAT, false, 0, 0);
    }

    initTrianglesBuffer() {
        const tri = [0, 1, 2, 0, 2, 3];

        this.trianglesBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.trianglesBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tri), gl.STATIC_DRAW);
        this.trianglesBuffer.numItems = 6;
    }

    setPosition(x, y, z) {
        this.position = [x, y, z];
    }

    draw() {
        if (this.loaded) {
            gl.bindVertexArray(this.vao);
            gl.drawElements(gl.TRIANGLES, this.trianglesBuffer.numItems, gl.UNSIGNED_SHORT, 0);
            gl.bindVertexArray(null);
        }
    }

    clear() {
        // clear all GPU memory
        gl.deleteBuffer(this.vertexBuffer);
        gl.deleteBuffer(this.coordBuffer);
        gl.deleteVertexArray(this.vao);
        this.loaded = false;
    }
}
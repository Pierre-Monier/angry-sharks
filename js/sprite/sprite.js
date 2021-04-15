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
    offset = 0;
    numberOfFrames = 1;
    spriteScale = 1;
    animationHasStarted = false;
    loaded = false;

    constructor(getTexture, defaultParams = Sprite.defaultParams) {
        this.texture = getTexture();

        // might be a problem
        this.initParameters(defaultParams);

        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        this.initVertexBuffer();
        this.initCoordBuffer();
        this.initTrianglesBuffer();

        gl.bindVertexArray(null);
        this.loaded = true;
    }

    static defaultParams = {
        width: 0.2,
        height: 0.2,
        position: [0.0, 0.0, 0.0],
        couleur: [1, 0, 0],
        time: 0.0,
        isOutSide: false,
        isInside : false,
        direction : false,
        offset: 0
    }

    initParameters(defaultParams) {
        // paramètres par défaut d'un splat (taille, position, couleur)
        this.width = defaultParams.width;
        this.height = defaultParams.height;
        this.position = defaultParams.position;
        this.couleur = defaultParams.couleur;
        this.time = defaultParams.time;
        this.isOutSide = defaultParams.isOutSide;
    }

    getParams() {
        return  {
            width: this.width,
            height: this.height,
            position: this.position,
            couleur: this.couleur,
            time: this.time,
            isOutSide: this.isOutSide
        }
    }

    static initShader() {
        Sprite.shader = initShaders("splat-vs", "splat-fs");

        // active ce shader
        gl.useProgram(Sprite.shader);

        // adresse des variables uniform dans le shader
        Sprite.shader.positionUniform = gl.getUniformLocation(Sprite.shader, "uPosition");
        Sprite.shader.xOffset = gl.getUniformLocation(Sprite.shader, "xOffset");
        Sprite.shader.spriteScale = gl.getUniformLocation(Sprite.shader, "spriteScale");
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

    sendUniformVariables(callBack) {
        // envoie des variables au shader (position du splat, couleur, texture)
        // fonction appelée à chaque frame, avant le dessin du splat
        if (this.loaded) {
            gl.uniform3fv(Sprite.shader.positionUniform, this.position);
            gl.uniform1f(Sprite.shader.xOffset, this.offset);
            gl.uniform1f(Sprite.shader.spriteScale, this.spriteScale);
            gl.uniform3fv(Sprite.shader.couleurUniform, this.couleur);

            // how to send a texture:
            // associe la texture à l'unité de texture 0
            // Si plusieur texture juste change d'unité de texture

            gl.activeTexture(gl.TEXTURE0);
            // Pour faire des animations, changé l'identifiant (this.splatTexture)
            if (this.texture.isLoaded) {
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
            }
            //
            gl.uniform1i(Rocket.shader.texUniform, 0);

            if (callBack) {
                callBack()
            }
        }
    }

    setPosition(x, y, z) {
        this.position = [x, y, z];
    }

    draw() {
        if (this.loaded) {
            gl.enable(gl.BLEND); // transparence activ�e
            gl.bindVertexArray(this.vao);
            gl.drawElements(gl.TRIANGLES, this.trianglesBuffer.numItems, gl.UNSIGNED_SHORT, 0);
            gl.bindVertexArray(null);
            gl.disable(gl.BLEND);
        }
    }

    clear() {
        // clear all GPU memory
        gl.deleteBuffer(this.vertexBuffer);
        gl.deleteBuffer(this.coordBuffer);
        gl.deleteVertexArray(this.vao);
        this.loaded = false;
    }

    collision(other)
    {
        let x1 = this.position[0];
        let x2 = other.position[0];
        let y1 = this.position[1];
        let y2 = other.position[1];

        return x1 < x2 + other.width - other.width/2 &&
            x1 + this.width > x2 &&
            y1 < y2 + other.height - other.height/2  &&
            y1 + this.height > y2;
    }

    setNumberOfFrames(int) {
        this.numberOfFrames = int;
        this.spriteScale = 1 / int;
    }

    setAnimationSpeed(milliseconds, loop = true) {
        if(loop) {
            setInterval(() => {this.nextFrame()}, milliseconds)
        } else {
            if (!this.animationHasStarted) {
                let animationState = 0;
                setInterval(() => {
                    if(animationState < this.numberOfFrames) {
                        animationState += 1;
                        this.nextFrame();
                    }
                }, milliseconds)
                this.animationHasStarted = true;
            }
        }
    }

    nextFrame() {
        this.offset += this.spriteScale;
    }
}
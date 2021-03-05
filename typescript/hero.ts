export class Splat {
    private splatTexture: WebGLTexture;
    public vao: WebGLVertexArrayObject;
    public vertexBuffer: WebGLBuffer;
    public coordBuffer: WebGLBuffer;
    public triangles: WebGLBuffer;
    public width = 0.2;
    public height = 0.2;
    public position = [0.0, 0.0, 0.0];
    public couleur = [1, 0, 0];
    public time = 0.0;
    private loaded: boolean = false
    public shaders: any;

    constructor(texture: WebGLTexture, gl: WebGL2RenderingContext) {
        this.splatTexture = texture;

        // LOADING (array)

        let wo2 = 0.5*this.width;
        let ho2 = 0.5*this.height;

        // les sommets !
        let vertices = [
            -wo2,-ho2, -0.8,
            wo2,-ho2, -0.8,
            wo2, ho2, -0.8,
            -wo2, ho2, -0.8
        ];

        // coordonnées de texture
        let coords = [
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ];

        let tri = [0,1,2,0,2,3];

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

    draw(gl: WebGL2RenderingContext) {
        // dessin du splat
        if(this.loaded) {
            gl.bindVertexArray(this.vao);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
            gl.bindVertexArray(null);
        }
    }
}

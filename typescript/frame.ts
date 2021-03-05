import { Splat } from './hero';

interface Frame {
    canvas: HTMLCanvasElement,
    gl: WebGL2RenderingContext
}

export class Drawer {
    private gl: WebGL2RenderingContext;
    private canvas: HTMLCanvasElement;
    private texture: WebGLTexture;
    private missile: Splat;

    constructor(frame: Frame) {
        this.gl = frame.gl;
        this.canvas = frame.canvas
        this.texture = this.initTexture('toto');
        this.missile = new Splat(this.texture, this.gl);

        this.missile.shaders = this.initSplatShader();
        // this.load()
    }

    start(): void {
        window.requestAnimationFrame(this.start);
        this.drawScene();
    }

    drawScene(): void {
        console.log("Drawscene called");
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        // clean up
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // draw
        this.gl.clearColor(0, 0, 0, 1);

        this.gl.useProgram(this.missile.shaders);
        this.missile.draw(this.gl);
    }

    initTexture(filename) {
        const texture = this.gl.createTexture();
        const image = new Image(100, 100);

        image.onload = () => {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image)
        }

        // http://localhost:5000/models/missile.png
        // TODO change to filename
        image.src = 'http://localhost:5000/models/missile.png';
        return texture;
    }

    initSplatShader(): WebGLProgram {
        const splatShader = this.initShaders('splat-vs', 'splat-fs')
        this.gl.useProgram(splatShader);

        return splatShader
    }


    initShaders(vsId, fsId): WebGLProgram {
    // recupere les vertex et fragment shaders
    let fragmentShader = this.getShader(this.gl,fsId);
    let vertexShader = this.getShader(this.gl,vsId);

    // cree le programme et lui associe les vertex/fragments
    let shaderProgram = this.gl.createProgram();
    this.gl.attachShader(shaderProgram, vertexShader);
    this.gl.attachShader(shaderProgram, fragmentShader);
    this.gl.linkProgram(shaderProgram);

    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
    alert("Could not initialise shaders");
    }

        return shaderProgram;
    }

    getShader(gl, id): WebGLShader {
        let shaderScript = document.getElementById(id) as HTMLScriptElement;
        if (!shaderScript) {
            return null;
        }

        let str = "";
        let k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        let shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }
}

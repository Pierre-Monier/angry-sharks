"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drawer = void 0;
var hero_1 = require("./hero");
var Drawer = /** @class */ (function () {
    function Drawer(frame) {
        this.gl = frame.gl;
        this.canvas = frame.canvas;
        this.texture = this.initTexture('toto');
        this.missile = new hero_1.Splat(this.texture, this.gl);
        this.missile.shaders = this.initSplatShader();
        // this.load()
    }
    Drawer.prototype.start = function () {
        window.requestAnimationFrame(this.start);
        this.drawScene();
    };
    Drawer.prototype.drawScene = function () {
        console.log("Drawscene called");
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        // clean up
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // draw
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.useProgram(this.missile.shaders);
        this.missile.draw(this.gl);
    };
    Drawer.prototype.initTexture = function (filename) {
        var _this = this;
        var texture = this.gl.createTexture();
        var image = new Image(100, 100);
        image.onload = function () {
            _this.gl.bindTexture(_this.gl.TEXTURE_2D, texture);
            _this.gl.texImage2D(_this.gl.TEXTURE_2D, 0, _this.gl.RGBA, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, image);
        };
        // http://localhost:5000/models/missile.png
        // TODO change to filename
        image.src = 'http://localhost:5000/models/missile.png';
        return texture;
    };
    Drawer.prototype.initSplatShader = function () {
        var splatShader = this.initShaders('splat-vs', 'splat-fs');
        this.gl.useProgram(splatShader);
        return splatShader;
    };
    Drawer.prototype.initShaders = function (vsId, fsId) {
        // recupere les vertex et fragment shaders
        var fragmentShader = this.getShader(this.gl, fsId);
        var vertexShader = this.getShader(this.gl, vsId);
        // cree le programme et lui associe les vertex/fragments
        var shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);
        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }
        return shaderProgram;
    };
    Drawer.prototype.getShader = function (gl, id) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }
        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }
        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        }
        else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        }
        else {
            return null;
        }
        gl.shaderSource(shader, str);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    };
    return Drawer;
}());
exports.Drawer = Drawer;

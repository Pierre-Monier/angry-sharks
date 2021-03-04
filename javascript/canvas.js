window.onload = function () {
    var requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    var drawScene = function () {
        gl.viewport(0, 0, canvas.width, canvas.height);
        // efface les buffers de couleur et de profondeur
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // draw
        gl.clearColor(0, 0, 0, 1);
        // dessin du fond (décommenter pour travailler dessus)
        //gl.useProgram(background.shader());
        //background.sendUniformVariables();
        //background.draw();
        // dessin du vaisseau
        //gl.useProgram(spaceship.shader());
        //spaceship.sendUniformVariables();
        //spaceship.draw();
        // test pour afficher un splat quand on appuie sur espace
        //gl.enable(gl.BLEND); // transparence activée
        //gl.useProgram(shootSample.shader());
        //shootSample.sendUniformVariables();
        //shootSample.draw();
        //gl.disable(gl.BLEND); // transparence désactivée
    };
    function tick() {
        requestAnimFrame(tick, tick);
        drawScene();
    }
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl2");
    tick();
};

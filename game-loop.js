function draw() {
    // initialisation du viewport
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    // efface les buffers de couleur et de profondeur
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // dessin du fond (d�commenter pour travailler dessus)
    gl.useProgram(background.shader());
    background.sendUniformVariables();
    background.draw();

    // dessin du vaisseau
    gl.useProgram(hero.model.shader());
    hero.model.sendUniformVariables();
    hero.model.draw();

    // test pour afficher un splat quand on appuie sur espace
    gl.enable(gl.BLEND); // transparence activ�e
    hero.shoots.forEach((splat, index) => {
        if (splat.isOutSide) {
            splat.clear();
            hero.shoots.splice(index, 1);
        } else {
            gl.useProgram(splat.shader());
            splat.sendUniformVariables();
            splat.draw();
        }

    })
    gl.disable(gl.BLEND);
}

// animation
let lastTime = 0;
function animate() {
    // fonction appel�e � chaque frame, permet d'animer la sc�ne
    const timeNow = new Date().getTime();
    if (lastTime !== 0) {
        // anime chacun des objets de la scene
        // si necessaire (en fonction du temps ecoul�)
        const elapsed = timeNow - lastTime;
        hero.model.setParameters(elapsed);
        background.setParameters(elapsed);
        hero.shoots.forEach((splat) => splat.setParameters(elapsed));
    }

    lastTime = timeNow;
}

function tick() {
    if (hero.life > 0) {
        requestAnimFrame(tick);
        handleKeys();
        draw();
        animate();
    } else {
        endGame();
    }
}
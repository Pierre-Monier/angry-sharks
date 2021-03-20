function startGame(init = true) {
    const menu = document.getElementById("menu");
    menu.setAttribute('style', 'display: none');

    // initialisation du canvas et des objets OpenGL
    const canvas = document.getElementById("SpaceShip");
    canvas.setAttribute('style', 'display: block');
    initGL(canvas);

    initBackgroundShader();
    initModelShader();
    Rocket.initSplatShader();

    //heightfield = new Heightfield();
    background = new Background();
    hero = new Hero(new Model(getHeroModel()));

    // la couleur de fond sera noire
    gl.clearColor(0, 0, 0, 1.0);

    // active le test de profondeur
    gl.enable(gl.DEPTH_TEST);

    // fonction de m�lange utilis�e pour la transparence
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    /* Mouse and keyboard interaction functions */
    //canvas.addEventListener('mousedown', tbMouseDown, true);
    //canvas.addEventListener('mousemove', mouseMove, true);
    //canvas.addEventListener('mouseup', tbMouseUp, true);
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    tick();
}

function endGame() {
    const menu = document.getElementById("menu");
    menu.setAttribute('style', 'display: block');

    const canvas = document.getElementById("SpaceShip");
    canvas.setAttribute('style', 'display: none');

    document.onkeydown = handleMenuKeys;
}
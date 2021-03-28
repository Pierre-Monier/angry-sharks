function startGame() {
    const menu = document.getElementById("menu");
    menu.setAttribute('style', 'display: none');

    // initialisation du canvas et des objets OpenGL
    const canvas = document.getElementById("SpaceShip");
    canvas.setAttribute('style', 'display: block');
    initGL(canvas);

    initBackgroundShader();
    initModelShader();
    Sprite.initShader();

    //heightfield = new Heightfield();
    background = new Background();
    hero = new Hero(new Model(getHeroModel()));
    badGuyGenerator = new BadGuyGenerator();
    bgParallax = new BackgroundParallaxe();
    // la couleur de fond sera noire
    gl.clearColor(99 / 255, 206 / 255, 255 / 255, 1);

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
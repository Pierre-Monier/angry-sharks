function startGame() {
    const menu = document.getElementById("menu");
    menu.setAttribute('style', 'display: none');

    // initialisation du canvas et des objets OpenGL
    const canvas = document.getElementById("SpaceShip");
    canvas.setAttribute('style', 'display: block');
    initGL(canvas);

    //initBackgroundShader();
    initModelShader();
    Sprite.initShader();

    //heightfield = new Heightfield();
    //background = new Background();
    hero = new Hero(new Model(getHeroModel()));
    badGuyManager = new BadGuyManager();
    bgParallax = new BackgroundParallaxe();
    score = new Score();
    bonus = new Bonus();
    soundpool = new Soundpool();

    soundpool.music.play();

    // la couleur de fond
    gl.clearColor(62 / 255, 121 / 255, 221 / 255, 1);

    // active le test de profondeur
    gl.enable(gl.DEPTH_TEST);

    // fonction de m�lange utilis�e pour la transparence
    //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    //gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

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
    menu.setAttribute('style', 'display: flex');

    const canvas = document.getElementById("SpaceShip");
    canvas.setAttribute('style', 'display: none');

    document.onkeydown = handleMenuKeys;
}

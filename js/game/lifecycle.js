function startGame() {
    const menu = document.getElementById("menu");
    const endMenu = document.getElementById("end-menu");

    menu.setAttribute('style', 'display: none');
    endMenu.setAttribute('style', 'display: none');

    // initialisation du canvas et des objets OpenGL
    const canvas = document.getElementById("SpaceShip");
    canvas.setAttribute('style', 'display: block');
    initGL(canvas);

    initModelShader();
    Sprite.initShader();

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
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    tick();
}

function endGame() {
    Object.freeze(hero);

    const endMenu = document.getElementById("end-menu");
    const pointsText = document.getElementById("points");
    const btn = document.querySelector('button[name=button]')
    const points = hero.points;

    endMenu.setAttribute('style', 'display: flex');

    btn.innerHTML = '<img src="models/long-arrow-alt-left-solid.svg" alt="">Save your score and play again :)'

    pointsText.innerHTML = points;

    const canvas = document.getElementById("SpaceShip");
    canvas.setAttribute('style', 'display: none');

    soundpool.music.pause();
    soundpool.music.currentTime = 0;
}

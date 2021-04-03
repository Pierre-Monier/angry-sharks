const currentlyPressedKeys = {};

function handleKeyDown(event) {
    if (event.keyCode === 32) {
        hero.shoot();
    } else {
        currentlyPressedKeys[event.keyCode] = true;
    }
}

function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
}

function handleKeys() {
    if (currentlyPressedKeys[68]) { // D
        hero.model.moveDroite();
    }

    if (currentlyPressedKeys[81]) { // Q
        hero.model.moveGauche();
    }

    if (currentlyPressedKeys[80]) { // P
        console.log('dev testing over here')
    }
}

function handleMenuKeys() {
    startGame()
}

function mouseMove(event) {
    // recup evenement souris
    //var newx = 2.0*(event.clientX/gl.viewportWidth)-1.0;
    //var newy = -(2.0*(event.clientY/gl.viewportHeight)-1.0);
}
const currentlyPressedKeys = {};

function handleKeyDown(event) {
    if (event.keyCode === 32) {
        hero.shoot();
        score.updateAmmoNumber(hero.ammos);
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
        console.log('debug key');
    }
}

function handleMenuKeys() {
    startGame()
}

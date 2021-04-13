function draw() {
    // initialisation du viewport
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    // efface les buffers de couleur et de profondeur
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // dessin du vaisseau
    gl.useProgram(hero.model.shader());
    hero.model.sendUniformVariables();
    hero.model.draw();
    hero.checkIsOutside();

    // charge le shader des sprites
    gl.useProgram(Sprite.shader);

    // dessin de la vie
    hero.lives.forEach((life) => {
        life.sendUniformVariables();
        life.draw();
    })

    bgParallax.draw();

    // dessin des rockets
    hero.shoots.forEach((rocket, index) => {
        if (rocket.isOutSide) {
            rocket.clear();
            hero.shoots.splice(index, 1);
        } else {
            rocket.sendUniformVariables();
            rocket.draw();
        }
    })

    // dessin des enemy,
    badGuyGenerator.badGuys.forEach((badGuy, index) => {
        if (badGuy.life > 0) {
            badGuy.drawWithMovement();
        } else {
            hero.addPoints(badGuy.points);
            score.updateScore(hero.points);

            badGuy.sprite.clear();
            badGuyGenerator.badGuys.splice(index, 1);
        }
    });

    //dessin des bonus
    bonus.bonuses.forEach((bonusItem, index) => {
        if (bonusItem.sprite.position[1] < 1 && !bonusItem.isTaken) {
            bonusItem.sprite.position[1] += 0.002;
            bonusItem.sprite.sendUniformVariables();
            bonusItem.sprite.draw();
        } else {
            bonusItem.sprite.clear();
            bonus.bonuses.slice(index, 1);
        }
    })

    // dessin du score
    score.sprites.forEach((number) => {
        number.sendUniformVariables();
        number.draw();
    });

    checkCollision();
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
        hero.shoots.forEach((rocket) => rocket.setParameters(elapsed));
    }

    lastTime = timeNow;
}

function checkCollision() {
    hero.shoots.forEach((shoot) => {
        badGuyGenerator.badGuys.forEach((badGuy) => {
            if (shoot.collision(badGuy.sprite)) {
                badGuy.slowSpeed()
            }
        })
    })

    badGuyGenerator.badGuys.forEach((badGuy) => {
        if (hero.collision2d(badGuy.sprite)) {
            if (hero.state >= badGuy.state) {
                badGuy.life--;
            } else {
                hero.looseLife();
            }
        }
    })

    // The hero/bonus collision
    bonus.bonuses.forEach((bonusItem) => {
        if (hero.collision2d(bonusItem.sprite)) {
            console.log('BONUS collision with HERO', bonus)
            switch (bonusItem.tag) {
                case "invincible":
                    console.log('Hero took an invicible bonus')
                    break
                case "kill-enemy":
                    console.log('Hero took a kill-enemy bonus')
                    break
                case "slow-enemy":
                    console.log('Hero took a slow enemy bonus')
                    break
                default:
                    break;
            }

            bonusItem.isTaken = true;
        }
    })
}


function tick() {
    if (hero.getLives() > 0) {
        requestAnimFrame(tick);
        handleKeys();
        draw();
        animate();
    } else {
        endGame();
    }
}
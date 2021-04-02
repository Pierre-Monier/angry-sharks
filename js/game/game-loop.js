function draw() {
    // initialisation du viewport
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    // efface les buffers de couleur et de profondeur
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // dessin du vaisseau
    gl.useProgram(hero.model.shader());
    hero.model.sendUniformVariables();
    hero.model.draw();

    // charge le shader des sprites
    gl.useProgram(Sprite.shader);

    // dessin de la vie
    hero.lives.forEach((life) => {
        life.sendUniformVariables();
        life.draw();
    })

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
            badGuy.sprite.sendUniformVariables();
            badGuy.sprite.draw();

            // BadGuy shouldn't go outside the map
            // if(badGuy.sprite.isOutSide) {
            //     hero.removePoints(badGuy.points);
            //     score.updateScore(hero.points);
            //     badGuy.sprite.clear();
            //     badGuyGenerator.badGuys.splice(index, 1);
            // }
        } else {
            hero.addPoints(badGuy.points);
            score.updateScore(hero.points);

            bonus.shuffleGetBonus(badGuy.sprite.getParams())

            badGuy.sprite.clear();
            badGuyGenerator.badGuys.splice(index, 1);
        }
    });

    //dessin des bonus
    bonus.bonuses.forEach((bonu) => {
        bonu.sprite.sendUniformVariables();
        bonu.sprite.draw();
    })

    // dessin du score
    score.sprites.forEach((number) => {
        number.sendUniformVariables();
        number.draw();
    });

    checkCollision();
    bgParallax.draw();
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
                badGuy.life -= 1;
            }
        })
    })

    badGuyGenerator.badGuys.forEach((badGuy) => {
        if (hero.collision2d(badGuy.sprite)) {
            // hero.life -= 1;
            badGuy.life = 0;
            console.log('BadGuy collision with Hero')
        }
    })

    // The hero/bonus collision, but we can't handle 2d/3d collision right now
    // bonus.bonuses.forEach((bonus) => {
    //     if (bonus.sprite.collision(hero.model)) {
    //         switch (bonus.tag) {
    //             case "invincible":
    //                 break
    //             case "kill-enemy":
    //                 break
    //             case "slow-enemy":
    //                 break
    //             default:
    //                 break;
    //         }
    //     }
    // })
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
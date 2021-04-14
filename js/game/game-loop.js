function draw() {
    // initialisation du viewport
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    // efface les buffers de couleur et de profondeur
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // dessin du vaisseau
    gl.useProgram(hero.model.shader());
    hero.draw();

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
            console.log('bonus needed to be cleared');
            bonusItem.sprite.clear();
            bonus.bonuses = bonus.bonuses.slice(index + 1, 1);
        }
    })

    // dessin des bonus en cours
    bonus.displayedBonuses.forEach((bonusItem) => {
        bonusItem.sprite.sendUniformVariables();
        bonusItem.sprite.draw();
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
        bgParallax.setParameters(elapsed);
        hero.shoots.forEach((rocket) => rocket.setParameters(elapsed));
    }

    lastTime = timeNow;
}

function checkCollision() {
    hero.shoots.forEach((shoot) => {
        badGuyGenerator.badGuys.forEach((badGuy) => {
            if (shoot.collision(badGuy.sprite)) {
                if (hero.isShooting) {
                    badGuyGenerator.removeBadGuyLife(badGuy);
                } else {
                    badGuy.slowSpeed()
                }
            }
        })
    })

    badGuyGenerator.badGuys.forEach((badGuy) => {
        if (hero.collision2d(badGuy.sprite)) {
            if (hero.state >= badGuy.state) {
                badGuyGenerator.removeBadGuyLife(badGuy);
            } else {
                hero.looseLife();
            }
        }
    })

    // The hero/bonus collision
    bonus.bonuses.forEach((bonusItem) => {
        if (hero.collision2d(bonusItem.sprite)) {
            console.log(' with bonus', bonus.bonuses);
            switch (bonusItem.tag) {
                case "slow-enemy":
                    if (!badGuyGenerator.areSlowed) {
                        bonus.addDisplayedBonus(0);
                        badGuyGenerator.slowEnemies();
                    }
                    break
                case "invincible":
                    if (!hero.isInvincible) {
                        bonus.addDisplayedBonus(1);
                        hero.addInvincibleBonus();
                    }
                    break
                case "kill-enemy":
                    if (!hero.isShooting) {
                        bonus.addDisplayedBonus(2);
                        hero.addShootingBonus();
                    }
                    break
                case "bubble":
                    console.log("bubble");
                    bonus.addDisplayedBonus(3);
                    hero.addBubbleBonus();
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
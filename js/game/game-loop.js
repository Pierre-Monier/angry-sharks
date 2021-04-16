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

    // dessin des munitions
    hero.ammos.forEach((ammo) => {
        ammo.sendUniformVariables();
        ammo.draw();
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
    badGuyManager.badGuys.forEach((badGuy, index) => {
        if (badGuy.life > 0 || badGuy.isHited) {
            badGuy.drawWithMovement();
        } else {
            if (badGuy.duration != 0) {
                hero.addPoints(badGuy.points);
            }
            badGuy.sprite.clear();
            badGuy.damageSprite.clear();
            badGuyManager.badGuys.splice(index, 1);
        }
    });

    //dessin des bonus
    bonus.bonuses.forEach((bonusItem, index) => {
        if (bonusItem.isTaken || bonusItem.sprite.position[1] > 1) {
            bonusItem.sprite.clear();
            bonus.bonuses.slice(index, 1);
            bonus.bonuses = bonus.bonuses.filter((bonus, i) => i !== index);
        } else {
            bonusItem.sprite.position[1] += 0.002;
            bonusItem.sprite.sendUniformVariables();
            bonusItem.sprite.draw();
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
        badGuyManager.badGuys.forEach((badGuy) => {
            if (shoot.collision(badGuy.sprite)) {
                if (shoot.isDeadly) {
                    badGuy.looseLife();
                } else {
                    badGuy.slowSpeed()
                }
            }
        })
    })

    badGuyManager.badGuys.forEach((badGuy) => {
        if (hero.collision2d(badGuy.sprite)) {
            if (badGuy.isEatable) {
                badGuy.looseLife();
            } else if (badGuy.life > 0) {
                hero.looseLife();
            }
        }
    })

    // The hero/bonus collision
    bonus.bonuses.forEach((bonusItem) => {
        if (hero.collision2d(bonusItem.sprite)) {
            bonusItem.isTaken = true;
            switch (bonusItem.tag) {
                case "life":
                    hero.addLife();
                    break
                case "slow-enemy":
                    if (!badGuyManager.areSlowed) {
                        bonus.addDisplayedBonus(0);
                        badGuyManager.slowEnemies();
                    }
                    break
                case "invincible":
                    if (!hero.isInvincible) {
                        bonus.addDisplayedBonus(1);
                        hero.addInvincibleBonus();
                    }
                    break
                case "kill-enemy":
                    hero.addAmmos(3);
                    break
                case "bubble":
                    hero.addBubbleBonus();
                    break
                default:
                    break;
            }
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
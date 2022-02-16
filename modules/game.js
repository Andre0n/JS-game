import createPlayer from "./player.js";
import createEnemy from "./enemy.js";
import createText from "./text.js";
import createParticle from "./particles.js";
import hud from "./hud.js";
import control from "./control.js";
import vector2 from "./vector2.js";
import utils from "./utils.js";

const ENEMY_SPAWN_RATE = 1.0;
const ENEMY_SPAWN_DISTANCE = 1500;
const DIFFICULTY_RATE_INCREASE = 1.01;
const  KEY_PRESS_DELAY = 0.25/2;

const checkEnemyIsAlive = enemy => enemy.isAlive;
const checkPlayerIsAlive = player => player.isAlive;
const checkParticleIsAlive = particle => particle.lifeTime > 0;
const particlesBurst = (particles,position, color) => {
    let amount = utils.randomInRange(20, 100);
    for (let i=0; i<amount; i++) {
        particles.push(createParticle(position,color));
    }
};

const createGame = () =>{
    let player = createPlayer();
    let enemies = [];
    let enemySpawnTimer = ENEMY_SPAWN_RATE;
    let difficultyRate = ENEMY_SPAWN_RATE;
    let isPaused = false;
    let lastTimePressedKey = null;
    let gameOver = false;
    let particles = [];
    return {
        player: player,
        spawnEnemy(){
            let direction = utils.randomInRange(0, 2*Math.PI);
            let enemyPosition = vector2( ENEMY_SPAWN_DISTANCE
                                         *Math.cos(direction),
                                         ENEMY_SPAWN_DISTANCE
                                         *Math.sin(direction));
             enemies.push(createEnemy(enemyPosition));
        },
        checkGameOver(){
            if (player.health < 1){
                gameOver = true;
            }
        },
        checkSpawnEnemy(delta){
            enemySpawnTimer -= delta;
            if (enemySpawnTimer <= 0 ){
                this.spawnEnemy();
                enemySpawnTimer = difficultyRate;
                difficultyRate /= DIFFICULTY_RATE_INCREASE;
            }
        },
        checkBulletCollision(){
            enemies.forEach(enemy=>{
                if(enemy.isAlive){
                    player.bullets.forEach(bullet => {
                        if(enemy.position.distanceTo(bullet.position)
                            <= bullet.radius + enemy.radius ){
                            bullet.lifeTime = 0;
                            particlesBurst(particles,enemy.position,enemy.color);
                            enemy.isAlive = false;
                            player.increaseScore();
                        }
                    });
                }
            });
        },
        checkPlayerCollision(){
            enemies.forEach(enemy=>{
                if(enemy.isAlive){
                    if(enemy.position.distanceTo(player.position)
                        <= player.radius + enemy.radius ){
                        player.damage();
                        particlesBurst(particles,enemy.position, enemy.color);
                        enemy.isAlive = false;
                    }
                }
            });
        },
        checkKeyPressed() {
            let now = performance.now()*0.001;
            if (lastTimePressedKey === null ) lastTimePressedKey = now;
            if (now-lastTimePressedKey < KEY_PRESS_DELAY ){
                return;
            }
            if (control.isDown("Escape") && !gameOver){
                isPaused = !isPaused;
            }
            else if (control.isDown("Enter") && gameOver){
                this.restart();
            }
            lastTimePressedKey = now;
        },
        restart(){
            player = createPlayer();
            enemies = [];
            enemySpawnTimer = ENEMY_SPAWN_RATE;
            difficultyRate = ENEMY_SPAWN_RATE;
            isPaused = false;
            gameOver = false;
        },
        update(delta){
            this.checkKeyPressed();
            if (isPaused || gameOver){
                return;
            }
            this.checkGameOver();
            this.checkSpawnEnemy(delta);
            this.checkBulletCollision();
            this.checkPlayerCollision();
            enemies = enemies.filter(checkEnemyIsAlive);
            enemies.forEach(enemy => {enemy.update(delta, player.position)});
            particles = particles.filter(checkParticleIsAlive);
            particles.forEach(particle => particle.update(delta));
            player.update(delta);
        },
        drawGameOver(context){
            let gameOverTextPosition = vector2(innerWidth/2-400, innerHeight/2);
            let gameOverdText = createText(`Game Over (Press enter to continue)`,
                                        "#000", 0,  gameOverTextPosition);

            let scoreTextPosition = vector2(innerWidth/2-400, innerHeight/2+50);
            let scoreText = createText(`You Scored: ${player.score}`, "#000", 0,
                                        scoreTextPosition);
            context.fillRect( 0, 0, innerWidth, innerHeight);
            gameOverdText.render(context);
            scoreText.render(context);
        },
        drawPaused(context){
            let pauseTextPosition = vector2(innerWidth/2-400, innerHeight/2);
            let pausedText = createText("Game Paused (Press esc to continue)",
                                        "#000", 0,  pauseTextPosition);

            context.fillRect( 0, 0, innerWidth, innerHeight);
            pausedText.render(context);
        },
        draw(context){
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            enemies.forEach(enemy => {enemy.draw(context)});
            particles.forEach(particle => {particle.draw(context)});
            player.draw(context);
            hud.draw(context, player.health, player.score);
            if (isPaused){
                this.drawPaused(context);
                return;
            }
            if (gameOver){
                this.drawGameOver(context);
                return;
            }
        }
    }
};

export default createGame;

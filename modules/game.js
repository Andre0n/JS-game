import createPlayer from "./player.js";
import createEnemy from "./enemy.js";
import control from "./control.js";
import vector2 from "./vector2.js";
import utils from "./utils.js";

const ENEMY_SPAWN_RATE = 1.0;
const ENEMY_SPAWN_DISTANCE = 1500;
const DIFFICULTY_RATE_INCREASE = 1.01;

const checkEnemyIsAlive = enemy => enemy.isAlive;
const checkPlayerIsAlive = player => player.isAlive;

const createGame = () =>{
    const player = createPlayer();
    let enemies = [];
    let enemySpawnTimer = ENEMY_SPAWN_RATE;
    let difficultyRate = ENEMY_SPAWN_RATE;

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
                            enemy.isAlive = false;
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
                        enemy.isAlive = false;
                    }
                }
            });
        },
        update(delta){
            this.checkSpawnEnemy(delta);
            this.checkBulletCollision();
            enemies = enemies.filter(checkEnemyIsAlive);
            enemies.forEach(enemy => {enemy.update(delta, player.position)});
            player.update(delta);
        },
        draw(context){
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            enemies.forEach(enemy => {enemy.draw(context)});
            this.player.draw(context);
        }
    }
};

export default createGame;

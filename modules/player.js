import createCircle from "./circle.js";
import createBullet  from "./bullet.js";
import vector2 from "./vector2.js";
import control from "./control.js";

const PLAYER_RADIUS = 30;
const PLAYER_SHOOT_DELAY = 0.25/2;
const PLAYER_INITIAL_POS = vector2( innerWidth/2-PLAYER_RADIUS,
    innerHeight/2-PLAYER_RADIUS );
const PLAYER_SPEED = 300;
const PLAYER_COLOR = "#FF0";
const DIRECTION_KEYS = {
    "w" : vector2( 0, -1 ),
    "s" : vector2( 0,  1 ),
    "d" : vector2( 1,  0 ),
    "a" : vector2(-1,  0 ),
};

const getBulletIsAlive = bullet => bullet.lifeTime > 0;

const createPlayer = () => {
    const player = createCircle(PLAYER_RADIUS, PLAYER_SPEED, 
        PLAYER_COLOR, PLAYER_INITIAL_POS);
    player.bullets = [];
    player.lastShot = null;

    player.move = delta => {
        for (let key in DIRECTION_KEYS){
            if (control.isDown(key)) 
                player.velocity = player.velocity.add(DIRECTION_KEYS[key]);
        }
        player.velocity = player.velocity.normalized().scalar(player.speed);
        player.position = player.position.add(player.velocity.scalar(delta));
        player.velocity = vector2();
    };
    player.shoot = () => {
        let now = performance.now() * 0.001;
        if (player.lastShot === null ) player.lastShoot = now;
        if (control.mouseIsDown()) {
            let mousePosition = control.getMousePosition();
            let bulletPosition = vector2(player.position.x,player.position.y);
            if ( now - player.lastShot > PLAYER_SHOOT_DELAY){
                let bullet = createBullet(bulletPosition, mousePosition);
                player.bullets.push(bullet);
                player.lastShot = now;
            }
        }
    };
    player.updateBullets = delta => {
        for (let bullet of player.bullets){
            bullet.update(delta);
        }
        player.bullets = player.bullets.filter(getBulletIsAlive);
    };
    player.renderBullets = context => {
        for (let bullet of player.bullets)
            bullet.render(context);
    };
    player.update = delta => {
        player.move(delta);
        player.shoot();
        player.updateBullets(delta);
    };
    player.draw = context => {
        player.render(context);
        player.renderBullets(context);
    }
    return player;
};

export default createPlayer;

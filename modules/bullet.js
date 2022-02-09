import createCircle from "./circle.js";
import vector2 from "./vector2.js"

const BULLET_RADIUS = 15;
const BULLET_SPEED = 900;
const BULLET_LIFE_TIME = 1.5;
const BULLET_COLOR = "#FF0";

const createBullet = (position, targetPosition) => {
    const bullet = createCircle(BULLET_RADIUS, BULLET_SPEED, 
                                BULLET_COLOR, position);

    bullet.lifeTime = BULLET_LIFE_TIME;
    bullet.direction = position.angleToPoint(targetPosition);
    bullet.velocity = vector2(Math.cos(bullet.direction), Math.sin(bullet.direction));
    bullet.velocity = bullet.velocity.scalar(bullet.speed);

    bullet.update = delta => {
        bullet.lifeTime -= delta;
        bullet.position = bullet.position.add(bullet.velocity.scalar(delta));
    };
    bullet.draw = context => bullet.render(context);
    return bullet;
};

export default createBullet;

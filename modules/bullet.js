import createCircle from "./circle.js";

const BULLET_RADIUS = 15;
const BULLET_SPEED = 900;
const BULLET_LIFE_TIME = 1;
const BULLET_COLOR = "#FF0";

const createBullet = (postion, targetPosition) => {
    const bullet = createCircle(BULLET_RADIUS, BULLET_SPEED, 
                                BULLET_COLOR, position);
    bullet.lifeTime = BULLET_LIFE_TIME;
    bullet.update = delta => {
        this.lifeTime -= delta;
    };
    bullet.draw = context => bullet.render(context);
    return bullet;
};

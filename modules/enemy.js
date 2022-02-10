import createCircle from "./circle.js";
import vector2 from "./vector2.js";

const ENEMY_RADIUS = 30;
const ENEMY_BLUR = 15;
const ENEMY_SPEED = 150;
const ENEMY_COLOR = "#ff4757"

const createEnemy = (position) => {
    const enemy = createCircle(ENEMY_RADIUS, ENEMY_SPEED, ENEMY_COLOR, 
                                ENEMY_BLUR, position);
    enemy.isAlive = true;
    enemy.velocity = vector2();
    enemy.update = (delta, targetPosition) => {
        let direction = enemy.position.angleToPoint(targetPosition);
        enemy.velocity = vector2(Math.cos(direction), Math.sin(direction));
        enemy.velocity = (enemy.velocity.scalar(enemy.speed)).scalar(delta);
        enemy.position = enemy.position.add(enemy.velocity);
    };
    enemy.draw = context => enemy.render(context);
    return enemy;
};

export default createEnemy;

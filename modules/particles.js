import createCircle from "./circle.js";
import vector2 from "./vector2.js";
import utils from "./utils.js";

const PARTICLE_RADIUS = 5;
const PARTICLE_SPEED = 300;
const PARTICLE_MAX_HEALTH = 10;
const PARTICLE_LIFE_TIME = 0.8;
const PARTICLE_DEFAULT_ALPHA = 120;

const createParticle = (position, color) => {
    const particle = createCircle(PARTICLE_RADIUS, PARTICLE_SPEED, 
                                    color, 0, position);
    particle.alpha = PARTICLE_DEFAULT_ALPHA;
    const colorWithoutAlpha = color;

    particle.lifeTime = PARTICLE_LIFE_TIME;
    particle.velocity = 
        vector2(utils.randomInRange(-PARTICLE_SPEED, PARTICLE_SPEED), 
                utils.randomInRange(-PARTICLE_SPEED, PARTICLE_SPEED));

    particle.update = delta => {
        particle.lifeTime -= delta;
        particle.position = particle.position.add(particle.velocity.scalar(delta));
        particle.alpha = particle.alpha > 0 ? particle.alpha - 2 : 0;
    };
    particle.draw = context => {
        particle.color = `${colorWithoutAlpha}${particle.alpha}`;
        particle.render(context);
    }
    return particle;
};
export default createParticle;

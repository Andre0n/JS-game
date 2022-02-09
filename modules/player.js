import createCircle from "./circle.js";
import vector2 from "./vector2.js";
import control from "./control.js";

const PLAYER_RADIUS = 25;
const PLAYER_INITIAL_POS = vector2( innerWidth/2-PLAYER_RADIUS,
    innerHeight/2-PLAYER_RADIUS );
const PLAYER_SPEED = 300;
const PLAYER_COLOR = "#FF0"
const DIRECTION_KEYS = {
    "w" : vector2( 0, -1 ),
    "s" : vector2( 0,  1 ),
    "d" : vector2( 1,  0 ),
    "a" : vector2(-1,  0 ),
};

const createPlayer = () => {
    const player = createCircle(PLAYER_RADIUS, PLAYER_SPEED, 
        PLAYER_COLOR, PLAYER_INITIAL_POS);
    player.update = delta => {
        for (let key in DIRECTION_KEYS){
            if (control.isDown(key)) 
                player.velocity = player.velocity.add(DIRECTION_KEYS[key]);
        }
        player.velocity = player.velocity.normalized().scalar(player.speed);
        player.position = player.position.add(player.velocity.scalar(delta));
        player.velocity = vector2();
    };
    player.draw = context => player.render(context);
    return player;
};

export default createPlayer;

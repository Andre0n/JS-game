import createCircle from "./circle.js";
import vector2 from "./vector2.js";

const createPlayer = () => {
    const player = createCircle(25, 300, "#FF0", vector2(200,200));
    player.update = delta => {};
    player.draw = context => player.render(context);
    return player;
};

export default createPlayer;

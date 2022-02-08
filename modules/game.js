import createPlayer from "./player.js";
import control from "./control.js";

const createGame = () =>{
    const player = createPlayer();
    return {
        player: player,
        update(delta){
            player.update(delta);
        },
        draw(context){
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            this.player.draw(context);
        }
    }
};

export default createGame;

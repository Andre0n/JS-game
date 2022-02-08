import './style.css';
import createCanvas from "./modules/canvas.js";
import createGame from "./modules/game.js";
import control from "./modules/control.js";

const handlleKeydown = event => control.setDown(event.key);
const handlleKeyup = event => control.setUp(event.key);

(function init(){
    const app = document.querySelector('#app');
    const canvas = createCanvas();
    const game = createGame();
    let previousTime = null;

    canvas.setSize(window.innerWidth, window.innerHeight);
    app.appendChild(canvas.element);
    
    const main = now =>{
        if (previousTime === null ) previousTime = now;
        const delta = (now - previousTime) * 0.001; 
        previousTime = now;
        game.update(delta);
        game.draw(canvas.context);
        window.requestAnimationFrame(main);
    };

    window.requestAnimationFrame(main);
    window.addEventListener('resize', event => {
        canvas.setSize(window.innerWidth, window.innerHeight);    
    });
    document.addEventListener('keydown', handlleKeydown, false);
    document.addEventListener('keyup', handlleKeyup, false);
})();

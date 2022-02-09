import './style.css';
import createCanvas from "./modules/canvas.js";
import createGame from "./modules/game.js";
import control from "./modules/control.js";

const handlleKeydown = event => control.setDown(event.key);
const handlleKeyup = event => control.setUp(event.key);
const handlleMouseMove = event => {
    control.setMousePositon(event.clientX, event.clientY);
};

(function init(){
    const app = document.querySelector('#app');
    const canvas = createCanvas();
    const game = createGame();
    let previousTime = null;

    canvas.setSize(innerWidth, innerHeight);
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
        canvas.setSize(innerWidth, innerHeight);
    });
    document.addEventListener('keydown', handlleKeydown, false);
    document.addEventListener('keyup', handlleKeyup, false);
    document.addEventListener('mousemove', handlleMouseMove, false);
})();

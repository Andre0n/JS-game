import './style.css';
import createCanvas from "./modules/canvas.js";
import createGame from "./modules/game.js";
import control from "./modules/control.js";

const handlleKeydown = ({key}) => control.setDown(key);
const handlleKeyup = ({key}) => control.setUp(key);
const handlleMouseMove = ({clientX, clientY}) => {
    control.setMousePositon(clientX, clientY);
};
const handlleMouseDown = () => control.setMouseDown();
const handlleMouseUp = () => control.setMouseUp();

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
    window.addEventListener('resize', () => {
        canvas.setSize(innerWidth, innerHeight);
    });
    window.addEventListener('keydown', handlleKeydown);
    window.addEventListener('keyup', handlleKeyup);
    window.addEventListener('mousemove', handlleMouseMove);
    window.addEventListener('mousedown', handlleMouseDown);
    window.addEventListener('mouseup', handlleMouseUp);
})();

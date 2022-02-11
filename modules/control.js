import vector2 from "./vector2.js";
const mouse = {
    position : vector2(innerWidth / 2, innerHeight / 2),
    isDown : false
};
const keys = {
    "w" : false,
    "a" : false,
    "s" : false,
    "d" : false,
    "Escape" : false,
};

const control = (() => {
    return {
        isDown(key){
            return keys[key];
        },
        setDown(key){
            keys[key] = true;
        },
        setUp(key){
            keys[key] = false;
        },
        setMousePositon(x, y){
            mouse.position = vector2(x, y);
        },
        getMousePosition(){
            return mouse.position;
        },
        setMouseDown(){
           mouse.isDown = true;
        },
        setMouseUp(){
           mouse.isDown = false;
        },
        mouseIsDown(){
           return mouse.isDown;
        }
    }
})();

export default control;

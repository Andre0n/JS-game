const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};
const keys = {
    "w" : false,
    "a" : false,
    "s" : false,
    "d" : false
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
            mouse.x = x;
            mouse.y = y;
        },
        getMousePositon(x, y){
            return { x: mouse.x, y:mouse.y};
        }
    }
})();

export default control;

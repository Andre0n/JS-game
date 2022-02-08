import vector2 from "./vector2.js";
const makePlayer = () => {
    return {
        radius : 25,
        speed : 200,
        color : "#FFFF00",
        position : vector2(200, 200),
        velocity : vector2(),
        update(dt){
        },
        draw (context) {
        },
    }
};

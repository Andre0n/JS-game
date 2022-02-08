import vector2 from "./vector2.js";

const createCircle = (radius, speed, color, position) =>{
    return {
        radius : radius,
        speed : speed,
        color : color,
        position : position,
        velocity : vector2(),
        render(context){
            context.beginPath();
            context.fillStyle = this.color;
            context.shadowColor = this.color;
            context.arc(this.position.x, this.position.y, 
                this.radius, 0, 2 * Math.PI, 0);
            context.fill();
        }
    }
};

export default createCircle;

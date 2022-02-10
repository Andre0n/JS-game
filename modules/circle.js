import vector2 from "./vector2.js";

const createCircle = (radius, speed, color,blur, position) =>{
    return {
        radius : radius,
        speed : speed,
        color : color,
        blur : blur,
        position : position,
        velocity : vector2(),
        render(context){
            context.beginPath();
            context.arc(this.position.x, this.position.y, 
                this.radius, 0, 2 * Math.PI, 0);
            context.fillStyle = this.color;
            context.shadowColor = this.color;
            context.shadowBlur = this.blur;
            context.fill();
            context.closePath()
        }
    }
};

export default createCircle;

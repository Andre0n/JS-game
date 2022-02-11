const createText = (textValue, color = "#FFF", blur = 0, position) => {
    return {
        value : textValue,
        color : color,
        blur : blur,
        position : position,
        render (context) {
            context.fillStyle = this.color;
            context.shadowColor = this.color;
            context.shadowBlur = this.blur;
            context.fillText(this.value, this.position.x, this.position.y);
        }
    }
};

export default createText;

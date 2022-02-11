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
            context.font = "22px 'Press Start 2P'";
            context.fillText(this.value, this.position.x, this.position.y);
        }
    }
};

export default createText;

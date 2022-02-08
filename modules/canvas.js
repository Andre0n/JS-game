const createCanvas = (id) => {
    const canvasElement = document.createElement('canvas');
    const context = canvasElement.getContext('2d');
    return {
        element : canvasElement,
        context: context,
        setSize(width, height){
            this.element.width = width;
            this.element.height = height;
        }
    }
};

export default createCanvas;

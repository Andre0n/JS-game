const vector2 = (x = 0, y = 0) => {
    return {
        x : x,
        y : y,
        add (p_vector){
           return vector2(this.x + p_vector.x, this.y + p_vector.y); 
        },
        angle(){
            return Math.atan2(this.y, this.x);
        },
        angleToPoint(p_vector){
            return (p_vector.sub(this)).angle();
        },
        distanceTo(p_vector){
            return Math.sqrt((this.x - p_vector.x) * (this.x - p_vector.x) + 
                                (this.y - p_vector.y) * (this.y - p_vector.y));
        },
        dot (p_vector){
            return this.x * p_vector.x + this.y * p_vector.y;
        },
        length(){
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        normalize(){
            let length = this.length();
            if (length != 0) {
                this.x /= length;
                this.y /= length;
            }
        },
        normalized(){
            const v = this;
            v.normalize();
            return this;
        },
        scalar(value) {
            return vector2(this.x * value, this.y * value);
        },
        sub(p_vector){
            return vector2(this.x - p_vector.x, this.y - p_vector.y);
        }
    }
};

export default vector2;

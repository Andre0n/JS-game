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
    }
})();

export default control;

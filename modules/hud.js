import vector2  from "./vector2.js";
import createText from "./text.js";

const hud = (() =>{
    return {
        draw(context, playerHealth){
            let playerHealthText = createText(`Health: ${playerHealth}`,
                                               "#ffdd59", 0, vector2(30, 80));
            playerHealthText.render(context);
        }
    }
})();

export default hud;

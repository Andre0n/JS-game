import createText from "./text.js";

const hud =()=>{
    return {
        draw(context, playerHealth){
            let playerHealthText = createText(`Health: ${playerHealth}`,
                                               "#ffdd59", 0, vector2(0, 0));
            playerHealthText.render(context);
        }
    }
};

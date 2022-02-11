import vector2  from "./vector2.js";
import createText from "./text.js";

const hud = (() =>{
    return {
        draw(context, playerHealth, playerScore){
            let playerHealthText = createText(`Health: ${playerHealth}`,
                                               "#ffdd59", 0, vector2(30, 80));
            let playerScoreText = createText(`Health: ${playerScore}`,
                                               "#ffdd59", 1, vector2(30, 100));
            playerHealthText.render(context);
            playerScoreText.render(context);
        }
    }
})();

export default hud;

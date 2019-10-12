import 'phaser';
import { PlayerScene } from './scene/playerScene';
import { SmallNumbersScene } from './scene/smallNumbersScene';
import { Buttons } from './display/buttons';
import { ProblemScene } from './scene/problemScene';
import { Debug } from './debug';
import { MenuScene } from './scene/menuScene';
import { BigNumbersScene } from './scene/bigNumbersScene';
import { PlayerManager } from './utils/playerManager';




// Phaser configuration
var config = {
    type: Phaser.AUTO,
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,

    scene: [PlayerScene, SmallNumbersScene, ProblemScene, MenuScene, BigNumbersScene]
}
// Scene names: global variables
window.SCENES = {
    PLAYER: "PlayerScene",
    MENU: "MenuScene",
    SMALL_NUMBERS: "SmallNumbersScene",
    PROBLEM: "Problem",
    BIG_NUMBERS: "BigNumbersScene"
}
// global Debug class ([overwriteConsole], [logMessages], [logErrors])
window.debug = new Debug(true, true, true);
    // debug.log("test");
    // start phaser game
window.gameData= {
    playerManager: new PlayerManager(),
    isMobile: navigator.userAgent.indexOf("Mobile") != -1 || navigator.userAgent.indexOf("Mobile") != -1,
    backgroundOffsetX: document.documentElement.clientWidth,
    buttonOffsetX: document.documentElement.clientWidth,
    buttonOffsetY: document.documentElement.clientHeight,

}
if(gameData.isMobile){
    gameData.defaultFontSize = document.documentElement.clientWidth*0.05;
    gameData.boardWidth = document.documentElement.clientWidth*0.6;
    gameData.defaultButtonFontSize = document.documentElement.clientWidth * 0.055;
    gameData.numberButtonFontSize = gameData.boardWidth*0.13;
    gameData.backgroundOffsetX = document.documentElement.clientWidth*0.009;
    gameData.backgroundOffsetY = document.documentElement.clientHeight*0.019;
    gameData.backgroundWidth = document.documentElement.clientWidth - 2* gameData.backgroundOffsetX;
    gameData.backgroundHeight = document.documentElement.clientHeight - 2* gameData.backgroundOffsetY;
    gameData.buttonOffsetX = document.documentElement.clientWidth*0.04;
    gameData.buttonOffsetY = document.documentElement.clientHeight*0.5;
    gameData.canvasWidth = document.documentElement.clientWidth;
    gameData.canvasHeight = document.documentElement.clientHeight;

}
else{
    gameData.defaultFontSize = document.documentElement.clientWidth*0.03;
    gameData.boardWidth = document.documentElement.clientWidth*0.6;
    gameData.defaultButtonFontSize = document.documentElement.clientWidth * 0.04;
    gameData.numberButtonFontSize = gameData.boardWidth*0.1;
    gameData.backgroundOffsetX = document.documentElement.clientWidth*0.16;
    gameData.backgroundOffsetY = document.documentElement.clientHeight*0.17;
    gameData.backgroundWidth = document.documentElement.clientWidth - 2 * gameData.backgroundOffsetX;
    gameData.backgroundHeight = document.documentElement.clientHeight - 2 * gameData.backgroundOffsetY;
    gameData.buttonOffsetX = document.documentElement.clientWidth*0.17;
    gameData.buttonOffsetY = document.documentElement.clientHeight*0.55;
    gameData.canvasWidth = document.documentElement.clientWidth;
    gameData.canvasHeight = document.documentElement.clientHeight;
}
console.log('game Data: ', gameData);
var game = new Phaser.Game(config);
window.game = game;
var displayWindowSize = function(){
    // Get width and height of the window excluding scrollbars
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;

    // resize game window
    game.resize(window.innerWidth, window.innerHeight);
}

// Attaching the event listener function to window's resize event
window.addEventListener("resize", displayWindowSize);
// create new Players

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
    playerManager: new PlayerManager()
}
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

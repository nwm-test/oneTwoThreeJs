import 'phaser';
import { PlayerScene } from './scene/playerScene';
import { GameStart } from './scene/startScene';
import { Buttons } from './display/buttons';
import { NumberScene } from './scene/numberScene';
import { Debug } from './debug';



// Phaser configuration
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-qs',
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    // scale: {
    //            mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT ,
    //            autoCenter: Phaser.Scale.CENTER_BOTH
    //        },
    scene: [PlayerScene, GameStart, NumberScene]
}
// Scene names: global variables
window.SCENES = {
    PLAYER: "PlayerScene",
    START: "StartScene",
    NUMBERS: "Numbers",
}
// global Debug class ([overwriteConsole], [logMessages], [logErrors])
window.debug = new Debug(true, true, true);
    debug.log("test");
// start phaser game
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

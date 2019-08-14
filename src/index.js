import 'phaser';
import { PlayerScene } from './playerScene';
import { GameStart } from './gameStart';
import { Buttons } from './buttons';
import { NumberScene } from './numberScene';
import { Debug } from './debug';



// Phaser configuration
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-qs',
    width: 800,
    height: 600,
    scene: [PlayerScene, GameStart, NumberScene]
}
// Scene names: global variables
window.SCENES = {
    PLAYER: "PlayerScene",
    START: "GameStart",
    NUMBERS: "Numbers",
}
// global Debug class ([overwriteConsole], [logMessages], [logErrors])
window.debug = new Debug(true, true, true);
    debug.log("test");
// start phaser game
var game = new Phaser.Game(config);

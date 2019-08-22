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

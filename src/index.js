import 'phaser';
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
    scene: [GameStart, NumberScene]
}
// Scene names: global variables
window.SCENES = {
    START: "GameStart",
    ZAHLEN: "Numbers",
    RECHNEN1: "Arithmetic1",
    RECHNEN2: "Arithmetic2"
}
// global Debug class ([overwriteConsole], [logMessages], [logErrors])
window.debug = new Debug(true, true, true);
    debug.log("test");
// start phaser game
var game = new Phaser.Game(config);

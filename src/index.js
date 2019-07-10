import 'phaser';
import { GameStart } from './gameStart';
import { Buttons } from './buttons';
import { NumberScene } from './numberScene';
//import { Arithmetic1 } from './arithmetic1';
//import { Arithmetic2 } from './arithmetic2';


// Konfiguration für Phaser
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-qs',
    width: 800,
    height: 600,
    scene: [GameStart, NumberScene]
}
// Namen der Szenen: globale Variablen
window.SCENES = {
    START: "GameStart",
    ZAHLEN: "Numbers",
    RECHNEN1: "Arithmetic1",
    RECHNEN2: "Arithmetic2"
}
// Starte das Phaser Spiel
var game = new Phaser.Game(config);

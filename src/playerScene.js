import { PlayerManager } from './playerManager';
export class PlayerScene extends Phaser.Scene {
  constructor() {
    super(SCENES.PLAYER);
  }
  //Lade alle Dateien
  preload() {
    this.load.image('gameStartBackground', 'assets/title_addi.png');
    this.load.image('netzwerkmedien', 'assets/netzwerkmedien.png');
  }
  // Erstelle Objekte
  create() {
    //var width = this.sys.game.canvas.width; var height = this.sys.game.canvas.height;
    var {
      width,
      height
    } = this.sys.game.canvas;
    var background = this.add.image(0, 0, 'gameStartBackground').setOrigin(0, 0);
    var netzwerkmedien = this.add.image(width - 60, height - 16, 'netzwerkmedien');

    // create new Players
    var playerManager = new PlayerManager();
    var newName = prompt('Willkommen bei OneTwoThree! Wie heißt Du?', '');
      playerManager.addPlayer(newName);
      this.scene.start(SCENES.START, { playerManager: playerManager});
      //// TODO: load old player, multiplayer?
  }
}

import { PlayerManager } from '../utils/playerManager';
import { Buttons } from '../display/buttons';

export class PlayerScene extends Phaser.Scene {
  constructor() {
    super(SCENES.PLAYER);
  }
  //Lade alle Dateien
  preload() {
    this.load.image('startSceneBackground', 'assets/title_addi.png');
    this.load.image('netzwerkmedien', 'assets/netzwerkmedien.png');
  }
  // Erstelle Objekte
  create() {
    //var width = this.sys.game.canvas.width; var height = this.sys.game.canvas.height;
    var {
      width,
      height
    } = this.sys.game.canvas;
    var background = this.add.image(0, 0, 'startSceneBackground').setOrigin(0, 0);
    var netzwerkmedien = this.add.image(width - 60, height - 16, 'netzwerkmedien');

    // create new Players
    this.gameData= {
      playerManager: new PlayerManager()
    }
    // already registered users
    var oldPlayer = new Buttons(this, width*0.32, height*0.60, 'Ich habe schon einen Account!', {
      fill: '#fff'
    }, () => this.loadOldPlayer());
    // registration button
    var registryButton = new Buttons(this, width*0.32, height*0.67, 'Neuer Spieler', {
      fill: '#fff'
    }, () => this.createNewUser());

  }
  // create new user
  createNewUser() {
    var newName = prompt('Willkommen bei OneTwoThree! Wie heißt Du?', '');
    this.gameData.playerManager.addPlayer(newName);
    this.scene.start(SCENES.START, this.gameData);
  }

  // load old player, multiplayer?
  loadOldPlayer() {
    var newName = prompt('Willkommen bei OneTwoThree! Wie heißt dein alter Spieler?', '');
    this.gameData.playerManager.addPlayer(newName);
    this.scene.start(SCENES.START, this.gameData);
  }
}

import { Buttons } from '../display/buttons'
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
    var background = this.add.image(width*0.16, height*0.15, 'startSceneBackground').setOrigin(0, 0);
    var netzwerkmedien = this.add.image(width*0.96, height*0.02, 'netzwerkmedien');

    // already registered users
    var oldPlayer = new Buttons(this, width*0.32, height*0.60, 'Ich habe schon einen Account!', {
      fill: '#fff'
    }, () => this.loadOldPlayer());
    // registration button
    var registryButton = new Buttons(this, width*0.32, height*0.63, 'Neuer Spieler', {
      fill: '#fff'
    }, () => this.createNewUser());
    // test scene
    var testScene = new Buttons(this, width*0.32, height*0.67, 'MENU SCENE', {
      fill: '#fff'
    }, () => this.testScenes());



  }
  // create new user
  createNewUser() {
    var newName = prompt('Willkommen bei OneTwoThree! Wie heißt Du?', '');
    gameData.playerManager.addPlayer(newName);
    // this.scenestart(SCENES.PROBLEMS, gameData);
    alert('hallo '+gameData.playerManager.players[0].name+'!', 'Los gehts!');
    this.scene.start(SCENES.MENU);
  }

  // load old player, multiplayer?
  loadOldPlayer() {
    var newName = prompt('Willkommen bei OneTwoThree! Wie heißt dein alter Spieler?', '');
    gameData.playerManager.addPlayer(newName);
    // this.scenestart(SCENES.PROBLEMS, gameData);
    alert('hallo '+gameData.playerManager.players[0].name+'!', 'Los gehts!');
    this.scene.start(SCENES.MENU);
  }
  // testing mode
  testScenes() {
    gameData.playerManager.addPlayer('guest');
    this.scene.start(SCENES.MENU);
    }
}

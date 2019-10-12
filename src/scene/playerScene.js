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
    var background = this.add.image(gameData.backgroundOffsetX, gameData.backgroundOffsetY, 'startSceneBackground').setOrigin(0, 0);
    var netzwerkmedien = this.add.image(gameData.canvasWidth*0.91, gameData.defaultFontSize, 'netzwerkmedien');
    // test scene
    var testScene = new Buttons(this, gameData.buttonOffsetX, gameData.buttonOffsetY, 'Test', {
      fill: '#fff'
    }, () => this.testScenes());
    // already registered users
    var oldPlayer = new Buttons(this, gameData.buttonOffsetX, gameData.buttonOffsetY + gameData.defaultFontSize*3, 'Weiter spielen', {
      fill: '#fff'
    }, () => this.loadOldPlayer());
    // registration button
    var registryButton = new Buttons(this,gameData.buttonOffsetX, gameData.buttonOffsetY + gameData.defaultFontSize*1.5, 'Neues Spiel', {
      fill: '#fff'
    }, () => this.createNewUser());




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
    gameData.problemType = 'bigNumbersDivide';
    this.scene.start(SCENES.BIG_NUMBERS);
    }
}

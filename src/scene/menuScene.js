import { Buttons } from '../display/buttons';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENES.MENU);
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
    var netzwerkmedien = this.add.image(gameData.width*0.96, height*0.02, 'netzwerkmedien');
    // return to playerScene
    var backToPlayer = new Buttons(this, gameData.canvasWidth*0.01, gameData.canvasHeight - gameData.numberButtonFontSize*0.8, 'ZURÜCK', {
    fill: '#FFFF00', fontSize: gameData.defaultButtonFontSize * 1.2
    }, () => {
      this.scene.start(SCENES.PLAYER)
    });
    // button to access easy problems
    var numbersButton = new Buttons(this, gameData.buttonOffsetX, gameData.buttonOffsetY, '1x1', {
      fill: '#fff'
    }, () => this.scene.start(SCENES.SMALL_NUMBERS));

    // button to access advanced problems
    var bigNumbersButton = new Buttons(this, gameData.buttonOffsetX, gameData.buttonOffsetY + gameData.defaultFontSize * 1.5, 'GROßE ZAHLEN', {
      fill: '#fff'
    }, () => this.scene.start(SCENES.BIG_NUMBERS));


  }

}

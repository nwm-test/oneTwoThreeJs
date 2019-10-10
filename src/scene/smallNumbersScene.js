import { Buttons} from '../display/buttons';

export class SmallNumbersScene extends Phaser.Scene {
  constructor() {
    super(SCENES.SMALL_NUMBERS);

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


    // return to menuScene
    var backToMenu = new Buttons(this, width*0.11, height*0.9, 'ZURÜCK', {
      fill: '#fff'
    }, () => {
      this.scene.start(SCENES.MENU)
    });

    // create problem scenes
    var plusButton = new Buttons(this, width*0.32, height*0.6, ' +', {
      fill: '#fff'
    }, () => {
      gameData.problemType = 'plus';
      this.scene.start(SCENES.PROBLEM)
    });
    var minusButton = new Buttons(this, width*0.32, height*0.66, ' -', {
      fill: '#fff'
    }, () => {
      gameData.problemType = 'minus';
      this.scene.start(SCENES.PROBLEM)
    });
    var multiplyButton = new Buttons(this, width*0.52, height*0.6, ' *', {
      fill: '#fff'
    }, () => {
      gameData.problemType = 'multiply';
      this.scene.start(SCENES.PROBLEM)
    });
    var divideButton = new Buttons(this, width*0.52, height*0.66, ' /', {
      fill: '#fff'
    }, () => {
      gameData.problemType = 'divide';
      this.scene.start(SCENES.PROBLEM)
    });
    console.log(gameData);

  }

}

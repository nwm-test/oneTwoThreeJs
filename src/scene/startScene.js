import { Buttons} from '../display/buttons';

export class GameStart extends Phaser.Scene {
  constructor() {
    super(SCENES.START);
  }
  init(data) {
    this.gameData = data;
    console.log(data);
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

    var plusButton = new Buttons(this, width*0.32, height*0.6, 'RECHNEN +', {
      fill: '#fff'
    }, () => {
      this.gameData.problemType = 'plus';
      this.scene.start(SCENES.NUMBERS, this.gameData)
    });
    var minusButton = new Buttons(this, width*0.32, height*0.64, 'RECHNEN -', {
      fill: '#fff'
    }, () => {
      this.gameData.problemType = 'minus';
      this.scene.start(SCENES.NUMBERS, this.gameData)
    });
    var multiplyButton = new Buttons(this, width*0.42, height*0.6, 'RECHNEN *', {
      fill: '#fff'
    }, () => {
      this.gameData.problemType = 'multiply';
      this.scene.start(SCENES.NUMBERS, this.gameData)
    });
    var divideButton = new Buttons(this, width*0.42, height*0.64, 'RECHNEN /', {
      fill: '#fff'
    }, () => {
      this.gameData.problemType = 'divide';
      this.scene.start(SCENES.NUMBERS, this.gameData)
    });
  }
}

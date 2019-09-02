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
    var background = this.add.image(width*0.16, height*0.15, 'startSceneBackground').setOrigin(0, 0);
    var netzwerkmedien = this.add.image(width*0.96, height*0.02, 'netzwerkmedien');
    // return to playerScene
    var backToPlayer = new Buttons(this, width*0.02, height*0.96, 'ZURÜCK', {
      fill: '#fff'
    }, () => {
      this.scene.start(SCENES.PLAYER)
    });
    // button to access easy problems
    var numbersButton = new Buttons(this, width*0.32, height*0.60, 'DIE ZAHLEN', {
      fill: '#fff'
    }, () => this.scene.start(SCENES.SMALL_NUMBERS));

    // button to access advanced problems
    var bigNumbersButton = new Buttons(this, width*0.32, height*0.65, 'DIE GROßEN ZAHLEN', {
      fill: '#fff'
    }, () => this.scene.start(SCENES.BIG_NUMBERS));

  }

}

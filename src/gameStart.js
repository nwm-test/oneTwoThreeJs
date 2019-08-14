import { Buttons} from './buttons';

export class GameStart extends Phaser.Scene {
  constructor() {
    super(SCENES.START);
  }
  init(data) {
    this.gameData = data;
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

    var zahlenButton = new Buttons(this, 240, 370, 'DIE ZAHLEN', {
      fill: '#fff'
    }, () => this.scene.start(SCENES.NUMBERS, this.gameData));
    alert('hallo '+this.gameData.playerManager.players[0].name+'!', 'Los gehts!')
  }
}
//- this: refers to the class and all its defined members and functions & to the extended class (in your case
// the Phaser.Scene). So you can basically access all the public members and functions of Phaser.Scene.
//-`let`: is a signal that the variable may be reassigned, such as a counter in a loop, or a value swap in
// an algorithm. It also signals that the variable will be used only in the block it’s defined in,
// which is not always the entire containing function.
// -`var`: is the weakest signal available when you define a variable in JavaScript. The variable may or may
// not be reassigned, and the variable may or may not be used for an entire function, or just for the purpose
// of a block or loop.
// -`const`: is a signal that the identifier won’t be reassigned.

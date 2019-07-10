import {
  Buttons
} from './buttons';
import {
  Grid
} from './grid';

export class NumberScene extends Phaser.Scene {
  constructor() {
    super(SCENES.ZAHLEN);
  }
  //Lade alle Dateien
  preload() {

  }
  // Erstelle Objekte
  create() {
    //var width = this.sys.game.canvas.width; var height = this.sys.game.canvas.height;
    var {
      width,
      height
    } = this.sys.game.canvas;
    var bordWidth = width * 2 / 3;
    var bordHeight = height * 2 / 3;
    var marginLeft = (width - bordWidth) / 2,
      marginTop = (height - bordHeight) / 2;

    var background = new Phaser.GameObjects.Rectangle(this, 0, 0, width, height, 0xf00, 0.5);
    // Zeichne eine Tafel mit relativen Maßen
    var bord = this.add.graphics()
    bord.lineStyle(5, 0xFF00FF, 1.0);
    bord.fillStyle(0xFFFFFF, 1.0);
    bord.fillRect(marginLeft, marginTop, bordWidth, bordHeight);
    bord.strokeRect(marginLeft, marginTop, bordWidth, bordHeight);


    var zahlenButton = new Buttons(this, marginLeft, height * 8 / 9, 'Back', {
      fill: '#fff'
    }, () => this.scene.start(SCENES.START));
    // Erzeuge Anzeigetafel
    var gridArea = {
      left: marginLeft,
      width: bordWidth,
      top: marginTop,
      height: bordHeight,
      columnCount: 14,
    }
    this.grid = new Grid(this, gridArea);
    //Schreibe von rechts nach links
    this.grid.writeAtCellRightToLeft(13, 0, "Aufgabe 1");
    this.generateProblem()
  }

  generateProblem() {
    //this.grid.clear();
    this.generateProblemPlus();
    this.grid.writeAtCellRightToLeft(12, 1, this.problem);
    this.grid.selectCell(12, 1);
    this.cursorIndex = 0;
    this.input = 0;
  }
  generateProblemPlus() {
    var maxValue = 20 //5 + Math.log(this.difficulty * 2 + 1);
    this.number1 = Math.floor(Math.random() * maxValue);
    this.number2 = Math.floor(Math.random() * maxValue);
    this.operator = '+';
    this.result = this.number1 + this.number2;
    var whiteSpaceResult = ('' + this.result).replace(/[0-9]/g, ' ');
    this.problem = this.number1 + this.operator + this.number2 + '=' + whiteSpaceResult;
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

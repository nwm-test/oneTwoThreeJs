import { Buttons } from './buttons';
import { Board } from './board';

export class NumberScene extends Phaser.Scene {
  constructor() {
    super(SCENES.ZAHLEN);
  }
  //Lade alle Dateien
  preload() {

  }
  // Erzeuge Objekte
  create() {

    this.createBoard()
    // Schreibe von rechts nach links
    //this.board.grid.writeAtCellRightToLeft(13, 0, "Aufgabe 1");
    this.generateProblem()
  //  this.createGrid();
    this.createNumberButtons();
    //this.createTextButton()
  //  this.generateAufgabe();
    this.board.showInfo('Viel Glück!!', '#f80');
  }

  createBoard() {
    this.board = new Board(this);
  }

  createNumberButtons() {
    console.log(this.userInput);
    this.buttons = [];
    this.input.keyboard.on('keydown', (event)=> this.createKeyDown(event));
    for (var i = 0; i < 10; i++) {

      this.input.keyboard.on('keydown-' + i, ()=> this.onButtonPressed(i));
      this.createButton(this.board.grid.gridArea.left+i*45, 540, i)
    }
  }
  createKeyDown(event) {
    console.log(event);
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      this.onButtonPressed(event.keyCode-48);
    }

  }
  createButton(x, y, number) {
    this.buttons[number] = new Buttons(this, x, y, number, { fill: '#fff', fontSize:'30px'}, () => this.onButtonPressed(number));
  }



  onButtonPressed(number) {
    console.log(number, this.result);
    var newInput = this.userInput + number * Math.pow(10, this.cursorIndex)
    var partResult = this.result % Math.pow(10, this.cursorIndex+1)
    console.log(newInput, partResult, this.result);
    if(newInput == partResult) {
      // richtige eingabe
      this.board.grid.writeInCell(this.board.grid.selectionX, this.board.grid.selectionY, number);

      if(newInput != this.result) {
        // richtig aber das ergebnis hat noch mehr stellen
        this.board.grid.selectCell(this.board.grid.selectionX - 1, this.board.grid.selectionY);
        var remainder = Math.floor(((this.number1% Math.pow(10, this.cursorIndex+1))+(this.number2% Math.pow(10, this.cursorIndex+1)))/Math.pow(10, this.cursorIndex+1))
        if(remainder>0)
          this.board.grid.writeRemainder(this.board.grid.selectionX, this.board.grid.selectionY, remainder);
        else
          this.board.grid.writeRemainder(this.board.grid.selectionX, this.board.grid.selectionY, " ");
        this.cursorIndex++;
      } else {
        // richtig -> nächste aufgabe
        this.board.showInfo('richtig! weiter so', '#0f0');
        this.difficulty++;
        this.time.addEvent({
            delay: 1000,                // ms
            callback: this.generateProblem,
            //args: [],
            callbackScope: this,
        });
      }
      this.userInput = newInput;
    } else {
      // falsche eingabe
      this.board.showInfo('leider falsch', '#f00');
      this.difficulty--;
      if(this.difficulty<0)
        this.difficulty = 0;
    }
  }

  generateProblem() {
    this.board.grid.clear();
    this.generateProblemPlus();
    this.board.grid.writeAtCellRightToLeft(12, 1, this.problem);
    this.board.grid.selectCell(12, 1);
    this.cursorIndex = 0;
    this.userInput = 0;
  }
  generateProblemPlus() {
    var maxValue = 20 //5 + Math.log(this.difficulty * 2 + 1);
    this.number1 = Math.floor(Math.random() * maxValue);
    this.number2 = Math.floor(Math.random() * maxValue);
    this.operator = '+';
    this.result = this.number1 + this.number2;
    console.log(this.number1, this.number2, this.result);
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

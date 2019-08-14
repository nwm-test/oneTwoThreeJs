  import { Grid } from './grid';
  import { Board } from './board';
  import { Buttons } from './buttons';

// displays the problem to choisen player on screen; called in "SCENES". Dependencies: playerManager.js, numberScene.js
export class DisplayManager {
  constructor(scene, onProblemSolvedCallback) {
    // parametrize by grid.js and board.js
    this.scene = scene;
    this.board = new Board(scene);
    this.createNumberButtons();
    this.board.showInfo('Viel Glück!!', '#f80');
    this.onProblemSolvedCallback = onProblemSolvedCallback;

  }
    createNumberButtons() {
      debug.log(this.userInput);
      this.buttons = [];
      // listen for key events
      this.scene.input.keyboard.on('keydown', (event)=> this.onKeyDown(event));
      for (var i = 0; i < 10; i++) {

        this.createButton(this.board.grid.gridArea.left+i*45, 540, i);
      }
    }
    // check if pressed key is a number
    onKeyDown(event) {
      debug.log(event);
      if (event.keyCode >= 48 && event.keyCode <= 57) {
        this.onButtonPressed(event.keyCode-48);
      }

    }
    createButton(x, y, number) {
      this.buttons[number] = new Buttons(this.scene, x, y, number, { fill: '#fff', fontSize:'30px'}, () => this.onButtonPressed(number));
    }

    // number == user input: [0,...,9]
    onButtonPressed(number) {
      debug.log(number, this.problem.result);
      // calculate sum of all numbers of user input
      var newInput = this.userInput + number * Math.pow(10, this.cursorIndex);
      // get the last numbers of the result
      var partResult = this.problem.result % Math.pow(10, this.cursorIndex+1);
      debug.log(newInput, partResult, this.problem.result);
      // compare input with right answer
      if(newInput == partResult) {
        // right answer
        this.board.grid.writeInCell(this.board.grid.selectionX, this.board.grid.selectionY, number);
        // right, but the number has more digits
        if(newInput != this.problem.result) {
          this.board.grid.selectCell(this.board.grid.selectionX - 1, this.board.grid.selectionY);
          var remainder = Math.floor(((this.problem.number1% Math.pow(10, this.cursorIndex+1))+(this.problem.number2% Math.pow(10, this.cursorIndex+1)))/Math.pow(10, this.cursorIndex+1))
          if(remainder>0)
            this.board.grid.writeRemainder(this.board.grid.selectionX, this.board.grid.selectionY, remainder);
          else
            this.board.grid.writeRemainder(this.board.grid.selectionX, this.board.grid.selectionY, " ");
          this.cursorIndex++;
        } else {
          // right -> next problem
          this.board.showInfo('richtig! weiter so', '#0f0');
          this.difficulty++;
          this.scene.time.addEvent({
              delay: 1000,                // ms
              callback: this.onProblemSolvedCallback,
              //args: [],
              callbackScope: this.scene,
          });
        }
        this.userInput = newInput;
      } else {
        // wrong answer
        this.board.showInfo('leider falsch', '#f00');
        this.difficulty--;
        if(this.difficulty<0)
          this.difficulty = 0;
      }

    }

  showProblem(problem) {
    this.board.grid.clear();
    this.board.grid.writeAtCellRightToLeft(12, 1, problem.initialText);
    this.board.grid.selectCell(12, 1);
    this.problem = problem;
    this.cursorIndex = 0;
    this.userInput = 0;
  }

}

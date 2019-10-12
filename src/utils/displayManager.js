// In this class the output on the screen is generated
  import { Grid } from '../display/grid';
  import { Board } from '../display/board';
  import { Buttons } from '../display/buttons';
  import { PlayerManager } from '../utils/playerManager';

// displays the problem to choisen player on screen; called in "SCENES". Dependencies: playerManager.js, problemScene.js
export class DisplayManager {
  constructor(scene, onProblemSolvedCallback, onProblemUnsolvedCallback) {
    // parametrise by grid.js and board.js
    this.scene = scene;
    this.canvasWidth = scene.sys.game.canvas.width;
    this.canvasHeight = scene.sys.game.canvas.height;
    this.board = new Board(scene);
    this.playerManager = new PlayerManager();
    this.onProblemSolvedCallback = onProblemSolvedCallback;
    this.onProblemUnsolvedCallback = onProblemUnsolvedCallback;


  }

    // create button to return to startScene

    // create a button to press a number
    createButton(x, y, number) {
      this.buttons[number] = new Buttons(this.scene, x, y, number, { fill: '#fff', fontSize: gameData.numberButtonFontSize}, () => this.onButtonPressed(number));
    }
    // set position of "number buttons" depending on board parameters
    createNumberButtons() {
      this.buttons = [];
      // listen for key events
      this.scene.input.keyboard.on('keydown', (event)=> this.onKeyDown(event));
      for (var i = 0; i < 10; i++) {
        this.createButton(this.board.grid.gridArea.left+i*this.board.grid.gridArea.width/10, this.canvasHeight - gameData.numberButtonFontSize * 1.1,  i);
      }
      // for (var i = 7; i < 10; i++) {
      //   this.createButton(this.board.grid.gridArea.left+i*this.board.grid.gridArea.width/5, this.canvasHeight - gameData.defaultButtonFontSize*3,  i);
      // }
      // for (var i = 4; i < 7; i++) {
      //   this.createButton(this.board.grid.gridArea.left+i*this.board.grid.gridArea.width/5, this.canvasHeight - gameData.defaultButtonFontSize*1.2,  i);
      // }
      // for (var i = 1; i < 4; i++) {
      //   this.createButton(this.board.grid.gridArea.left+i*this.board.grid.gridArea.width/5, this.canvasHeight - gameData.defaultButtonFontSize,  i);
      // }
      // this.createButton(this.board.grid.gridArea.left+i*this.board.grid.gridArea.width, this.canvasHeight - gameData.defaultButtonFontSize * 5,  0);

    }
    // check if pressed key is a number
    onKeyDown(event) {
      if (event.keyCode >= 48 && event.keyCode <= 57) {
        this.onButtonPressed(event.keyCode-48);
      }

    }
    // number == user input: [0,...,9]
    onButtonPressed(number) {
      var lastCell = this.board.grid.gridArea.columnCount - 2;
      var problem = this.problem;
      console.log(problem);
      // handle different problem types
      while (problem.subProblems) {
        problem = problem.subProblems[problem.subProblemIndex];
      }
      // calculate sum of all numbers of user input
      var newInput = this.userInput + number * Math.pow(10, this.cursorIndex);
      // get the last numbers of the result
      var partResult = problem.result % Math.pow(10, this.cursorIndex+1);
      // compare input with right answer
      if(newInput == partResult) {
        this.userInput = newInput;
        // right answer
        this.board.grid.writeInCell(this.board.grid.selectionX, this.board.grid.selectionY, number);
        // right answer, but the number has more digits
        if(newInput != problem.result) {
          this.board.grid.selectCell(this.board.grid.selectionX - 1, this.board.grid.selectionY);
          // write remainder on plus problem
          if (problem.operator == '+') {
            var remainder = Math.floor(((problem.number1% Math.pow(10, this.cursorIndex+1))+(problem.number2% Math.pow(10, this.cursorIndex+1)))/Math.pow(10, this.cursorIndex+1))
            if(remainder>0) {
              this.board.grid.writeRemainder(this.board.grid.selectionX, this.board.grid.selectionY, remainder);
            }
            else {
              this.board.grid.writeRemainder(this.board.grid.selectionX, this.board.grid.selectionY, " ");
            }
          }
          this.cursorIndex++;
          // divide big number multiplication in subProblems
        } else {
          this.board.grid.demarkAllFields();
          if(this.problem.subProblems && this.problem.subProblems.length-1 > this.problem.subProblemIndex) {
            this.problem.subProblemIndex++;
            this.cursorIndex = 0;
            this.userInput = 0;
            var subProblem = this.problem.subProblems[this.problem.subProblemIndex];
            for (var offset of subProblem.markedFields) {
              this.board.grid.markField(lastCell+offset.x, offset.y);
            }
            this.board.grid.selectCell(lastCell+subProblem.selectField.x, subProblem.selectField.y);
            if (subProblem.drawLine) {
              this.board.grid.drawLine(lastCell+subProblem.drawLine.x1, 1+subProblem.drawLine.y1,
                                       lastCell+subProblem.drawLine.x2, 1+subProblem.drawLine.y2);
            }
          } else {
            // right answer -> next problem
            this.board.showInfo('richtig! weiter so', '#0f0');
            this.scene.time.addEvent({
                delay: 700,                // ms
                callback: () => {this.board.grid.clear(),
                                 this.onProblemSolvedCallback.apply(this.scene)},
                //args: [],
                callbackScope: this.scene,
            });
          }
        }
      } else {
        // wrong answer
        //this.board.showInfo(this.problem.subProblems[this.problem.subProblemIndex], ' = ?');
        this.board.showInfo('Bist du sicher? \nVersuchs nochmal! ', '#f00');
        this.scene.time.addEvent({
            delay: 100,                // ms
            callback: this.onProblemUnsolvedCallback,
            //args: [],
            callbackScope: this.scene,
        });
      }

    }

  showProblem(problem) {
    this.gridArea = this.board.buildGrid(12,gameData.cellCountY + 1); //problem.gridAreaWidth, problem.gridAreaHeight);
    this.createNumberButtons();
    this.board.showInfo('Viel Glück!!', '#f80');
    this.board.showScore();
    var lastCell = (this.board.grid.gridArea.columnCount - 2);
    switch(gameData.problemType){
      case 'bigNumbersMinus':
      case 'bigNumbersPlus':
      this.board.grid.writeAtCellRightToLeft(lastCell, 1, problem.number1 + '');
      this.board.grid.writeAtCellRightToLeft(lastCell, 2, problem.operator + problem.number2);
      var length = Math.max((problem.result + '').length, (problem.number2 + '').length);
      this.board.grid.drawLine(lastCell-length,3,lastCell,3);
      var subProblem = problem.subProblems[0];
      this.scene.time.addEvent({
          delay: 700,                // ms
          callback: () => {
            for (var offset of subProblem.markedFields) {
              this.board.grid.markField(lastCell + offset.x, offset.y);
            }
            this.board.grid.selectCell(lastCell+ subProblem.selectField.x, subProblem.selectField.y);
          },
          callbackScope: this.scene
      });
      break;
      case 'bigNumbersMultiply':
        this.board.grid.writeAtCellRightToLeft(lastCell, 1, problem.initialText);
        this.board.grid.drawLine(lastCell - problem.initialText.length,2,lastCell,2);
        var subProblem = problem.subProblems[0];

        this.scene.time.addEvent({
            delay: 700,                // ms
            callback: () => {
              for (var offset of subProblem.markedFields) {
                this.board.grid.markField(lastCell + offset.x, 1 + offset.y);
              }
              this.board.grid.selectCell(lastCell + subProblem.selectField.x, subProblem.selectField.y);
            },
            callbackScope: this.scene
        });
        break;
        case 'bigNumbersDivide':
          lastCell = (this.board.grid.gridArea.columnCount - 2);
          console.log('problem.initialText: ',(problem.initialText + ' ').length);
          this.board.grid.writeAtCellRightToLeft(lastCell, 1, problem.initialText);
          var subProblem = problem.subProblems[0];

          this.scene.time.addEvent({
              delay: 700,                // ms
              callback: () => {
                for (var offset of subProblem.markedFields) {
                  this.board.grid.markField(lastCell + offset.x, offset.y);
                }
                this.board.grid.selectCell(lastCell+ subProblem.selectField.x, subProblem.selectField.y);
              },
              callbackScope: this.scene
          });
          break;
      default:
        this.board.grid.writeAtCellRightToLeft(lastCell, 1, problem.initialText);
        this.board.grid.selectCell(lastCell, 1);
    }

    this.problem = problem;
    this.cursorIndex = 0;
    this.userInput = 0;
  }

}

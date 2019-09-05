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
    this.createReturnButton();
    this.createNumberButtons();
    this.board.showInfo('Viel Glück!!', '#f80');
    this.onProblemSolvedCallback = onProblemSolvedCallback;
    this.onProblemUnsolvedCallback = onProblemUnsolvedCallback;
  }

    // create button to return to startScene
    createReturnButton(){
      var startSceneButton = new Buttons(this.scene, this.canvasWidth*0.04 ,this.canvasHeight*0.96, 'ZURÜCK', {
        fill: '#FFFF00', fontSize:'15px'
      }, () => this.scene.backToStart());
    }
    // set position of "number buttons" depending on board parameters
    createNumberButtons() {
      this.buttons = [];
      // listen for key events
      this.scene.input.keyboard.on('keydown', (event)=> this.onKeyDown(event));
      for (var i = 0; i < 10; i++) {
        this.createButton(this.board.grid.gridArea.left+i*this.board.grid.gridArea.cellSize, this.board.grid.gridArea.height*1.32, i);
      }

    }
    // check if pressed key is a number
    onKeyDown(event) {
      if (event.keyCode >= 48 && event.keyCode <= 57) {
        this.onButtonPressed(event.keyCode-48);
      }

    }
    createButton(x, y, number) {
      this.buttons[number] = new Buttons(this.scene, x, y, number, { fill: '#fff', fontSize: this.board.grid.gridArea.cellSize }, () => this.onButtonPressed(number));
    }

    // number == user input: [0,...,9]
    onButtonPressed(number) {
      var problem = this.problem;
      // handle different problem types
      while (problem.subProblems) {
        problem = this.problem.subProblems[this.problem.subProblemIndex]
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
          // wright remainder on plus problem
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
              this.board.grid.markField(12+offset.x,1+offset.y);
            }
            this.board.grid.selectCell(12+subProblem.selectField.x,1+subProblem.selectField.y);
            if (subProblem.drawLine) {
              this.board.grid.drawLine(12+subProblem.drawLine.x1, 1+subProblem.drawLine.y1, 12+subProblem.drawLine.x2, 1+subProblem.drawLine.y2);
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
        console.log('wrong:', problem);
        console.log('newInput, partResult, this.cursorIndex', newInput, partResult, this.cursorIndex);
        this.board.showInfo('Bist du sicher? Versuchs nochmal! ', '#f00');
        this.scene.time.addEvent({
            delay: 100,                // ms
            callback: this.onProblemUnsolvedCallback,
            //args: [],
            callbackScope: this.scene,
        });
      }

    }

  showProblem(problem) {
    this.board.grid.clear();
    this.showScore();
    switch(gameData.problemType){
      case 'bigNumbersMinus':
      case 'bigNumbersPlus':
        this.board.grid.writeAtCellRightToLeft(12, 1, problem.number1 + '');
        this.board.grid.writeAtCellRightToLeft(12, 2, problem.operator + problem.number2);
        var length = Math.max((problem.result + '').length, (problem.number2 + '').length);
        this.board.grid.drawLine(12-length,3,12,3);
        this.board.grid.selectCell(12, 3);
        break;
      case 'bigNumbersMultiply':
        this.board.grid.writeAtCellRightToLeft(12, 1, problem.initialText);
        this.board.grid.drawLine(12-problem.initialText.length,2,12,2);

        var subProblem = problem.subProblems[0];

        this.scene.time.addEvent({
            delay: 700,                // ms
            callback: () => {
              for (var offset of subProblem.markedFields) {
                this.board.grid.markField(12+offset.x,1+offset.y);
              }
              this.board.grid.selectCell(12+subProblem.selectField.x,1+subProblem.selectField.y);
            },
            callbackScope: this.scene
        });
        break;
        case 'bigNumbersDivide':
          this.board.grid.writeAtCellRightToLeft(12, 1, problem.initialText);
          this.board.grid.drawLine(12-problem.initialText.length,2,12,2);

          var subProblem = problem.subProblems[0];

          this.scene.time.addEvent({
              delay: 700,                // ms
              callback: () => {
                for (var offset of subProblem.markedFields) {
                  this.board.grid.markField(12+offset.x,1+offset.y);
                }
                this.board.grid.selectCell(12+subProblem.selectField.x,1+subProblem.selectField.y);
              },
              callbackScope: this.scene
          });
          break;
      default:
        this.board.grid.writeAtCellRightToLeft(12, 1, problem.initialText);
        this.board.grid.selectCell(12, 1);
    }

    this.problem = problem;
    this.cursorIndex = 0;
    this.userInput = 0;
  }
  showScore() {
    var text= 'Aufgabe: ' + gameData.playerManager.getPlayer().solvedProblems + ' Level: ' + gameData.playerManager.getPlayer().level;
    var style = { fill: '#00ffff', fontSize: '22px'};
    if(this.info)
      this.info.destroy();
    this.info = this.scene.add.text(this.canvasWidth/2, this.canvasHeight*0.04, text, style)
  }
}

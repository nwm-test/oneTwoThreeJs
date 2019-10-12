import { Grid } from './grid';
// import { ProblemManager } from '../utils/ProblemManager';

export class Board {
  constructor(scene) {
    //var width = this.sys.game.canvas.width; var height = this.sys.game.canvas.height;
    this.canvasWidth = scene.sys.game.canvas.width;
    this.canvasHeight = scene.sys.game.canvas.height;
    this.scene = scene;
    this.buildBoard();

  }
  buildBoard(){
    if(this.board){
      this.board.destroy();
    }
    // define board parameter
   //  if(this.canvasWidth< this.canvasHeight){
   // //bitte dreh dein Handy
   //  }
    // else{
    //
    // }
    this.boardWidth = gameData.boardWidth;
    this.boardHeight = this.canvasHeight;
    this.marginLeft = this.canvasWidth - this.boardWidth;
    this.marginTop = 0;
    var board = this.scene.add.graphics();
    if(gameData.isMobile){
    }

    // draw board
    board.lineStyle(5, 0xFF00FF, 0);
    board.fillStyle(0xFFFFFF, 1);
    board.fillRect(this.marginLeft, this.marginTop,
                   this.boardWidth, this.boardHeight - gameData.numberButtonFontSize*1.2);
    board.strokeRect(this.marginLeft,this.marginTop,
                     this.boardWidth, this.boardHeight - gameData.numberButtonFontSize*1.3);

    this.board = board;
  }
  buildGrid(gridWidth, gridHeight){
    if(this.grid){
      this.grid.clear();
      this.grid.destroy();
    }
    //this.buildBoard();
    // define grid area parameter
    var gridArea = {
      left: this.marginLeft,
      width: this.boardWidth,
      top: this.marginTop,
      rowCount: gridHeight,
      columnCount: gridWidth,
    }
    // draw grid
    this.grid = new Grid(this.scene, gridArea);
    return gridArea;
  }

  // infotext on top
  showInfo(text, color) {
    var style = { fill: color, fontSize: this.canvasWidth * 0.03};
    if(this.info){
      this.info.destroy();
    }
    if(gameData.isMobile){
        style = { fill: color, fontSize: this.canvasWidth * 0.08};
        this.info = this.scene.add.text(this.grid.gridArea.left, this.grid.gridArea.top - this.canvasWidth * 0.16, text, style);
    }
    else{
      this.info = this.scene.add.text(this.grid.gridArea.left, this.grid.gridArea.top - this.canvasWidth * 0.08, text, style);
    }
  }
  showScore() {
    var text= 'Aufgabe: ' + gameData.playerManager.getPlayer().solvedProblems + '\n' + 'Level: ' + gameData.playerManager.getPlayer().level;
    var style = { fill: '#00ffff', fontSize: gameData.defaultFontSize};
    if(this.score)
      this.score.destroy();
      if(gameData.isMobile){
        this.score = this.scene.add.text(0,0,text,style);
        //this.scene.add.text(this.grid.gridArea.left + this.grid.gridArea.width, this.grid.gridArea.top*0.04, text, style);
      }
      else{
        this.score = this.scene.add.text(0,0, text, style);
      }
  }

}

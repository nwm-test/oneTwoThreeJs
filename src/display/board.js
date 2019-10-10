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
    if(this.canvasWidth< this.canvasHeight){
      this.boardWidth = this.canvasWidth * 0.8;
      this.boardHeight = this.canvasHeight * 0.4;
    }
    else{
      this.boardWidth = this.canvasWidth * 0.3;
      this.boardHeight = this.canvasHeight * 0.5;
    }
    this.marginLeft = (this.canvasWidth - this.boardWidth) / 2;
    this.marginTop = (this.canvasHeight - this.boardHeight) / 2;
    if(gameData.isMobile){
      this.marginTop = (this.canvasHeight- this.boardHeight)/3;
    }

    // draw board
    var board = this.scene.add.graphics()
    board.lineStyle(5, 0xFF00FF, 0);
    board.fillStyle(0xFFFFFF, 0);
    board.fillRect(this.marginLeft, this.marginTop,
                   this.boardWidth, this.boardHeight*1.8);
    board.strokeRect(this.marginLeft,this.marginTop,
                     this.boardWidth, this.boardHeight*1.8);

    this.board = board;
  }
  buildGrid(gridWidth, gridHeight){
    if(this.grid){
      this.grid.clear();
      this.grid.destroy();
    }
    this.buildBoard();
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
    var text= 'Aufgabe: ' + gameData.playerManager.getPlayer().solvedProblems + ' Level: ' + gameData.playerManager.getPlayer().level;
    var style = { fill: '#00ffff', fontSize: this.canvasWidth * 0.02, rtl: true };

    if(this.score)
      this.score.destroy();
      if(gameData.isMobile){
        var style = { fill: '#00ffff', fontSize: this.canvasWidth * 0.06, rtl: true};
        this.score = this.scene.add.text(this.grid.gridArea.left + this.grid.gridArea.width, this.grid.gridArea.top*0.04, text, style);
      }
      else{
        this.score = this.scene.add.text(this.grid.gridArea.left + this.grid.gridArea.width, this.grid.gridArea.top*0.04, text, style);
      }
  }
}

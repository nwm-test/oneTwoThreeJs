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
    this.boardWidth = this.canvasWidth * 2 / 3;
    this.boardHeight = this.canvasHeight * 2 / 3;
    this.marginLeft = (this.canvasWidth - this.boardWidth) / 2;
    this.marginTop = (this.canvasHeight - this.boardHeight) / 2;



    // draw board
    var board = this.scene.add.graphics()
    board.lineStyle(5, 0xFF00FF, 1.0);
    board.fillStyle(0xFFFFFF, 1.0);
    board.fillRect(this.marginLeft, this.marginTop,
                   this.boardWidth, this.boardHeight);
    board.strokeRect(this.marginLeft,this.marginTop,
                     this.boardWidth, this.boardHeight);

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
    var style = { fill: color, fontSize: '22px'};
    if(this.info)
      this.info.destroy();
    this.info = this.scene.add.text(this.boardWidth/2, this.marginTop/2, text, style)
  }
}

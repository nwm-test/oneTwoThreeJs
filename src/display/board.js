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
    this.boardWidth = gameData.boardWidth - 12;
    this.boardHeight = this.canvasHeight - 15;
    this.marginLeft = (this.canvasWidth - this.boardWidth) - 12;
    this.marginTop = 12;
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
                     board.strokeRect(this.marginLeft,this.marginTop,
                                      this.boardWidth, this.boardHeight - gameData.numberButtonFontSize*1.3);

    this.board = board;
    this.drawBorder(this.marginLeft, this.marginTop, this.boardWidth, this.boardHeight - gameData.numberButtonFontSize*1.2, board);
  }

  // draw border lines
  drawBorder(x, y, width, height, board){
    var borderWidth = 2;
    var middleBorderWidth = 6;
    var outerBorderWidth = 2;

    var offset = 0;
    // color1 => draw rect, color2 => draw top & right
    this.drawBorderLine(x, y, width, height, board, offset++, 0xbfd6ff, 0x174ca9);
    this.drawBorderLine(x, y, width, height, board, offset++, 0xbfd6ff, 0x174ca9);
    this.drawBorderLine(x, y, width, height, board, offset++, 0xbfd6ff, 0x174ca9);

    this.drawBorderLine(x, y, width, height, board, offset++, 0x6398f5, 0x6398f5);
    this.drawBorderLine(x, y, width, height, board, offset++, 0x6398f5, 0x6398f5);
    this.drawBorderLine(x, y, width, height, board, offset++, 0x6398f5, 0x6398f5);
    this.drawBorderLine(x, y, width, height, board, offset++, 0x6398f5, 0x6398f5);
    this.drawBorderLine(x, y, width, height, board, offset++, 0x6398f5, 0x6398f5);

    this.drawBorderLine(x, y, width, height, board, offset++, 0x174ca9, 0xbfd6ff);
    this.drawBorderLine(x, y, width, height, board, offset++, 0x174ca9, 0xbfd6ff);
    this.drawBorderLine(x, y, width, height, board, offset++, 0x174ca9, 0xbfd6ff);
  }
  drawBorderLine(x, y, width, height, board, offset, color1, color2){
      var borderWidth = 1;
      board.lineStyle(borderWidth, color1, 1);
      board.strokeRect(x-offset, y-offset, width + 2 * offset, height+2*offset);
      board.lineStyle(borderWidth, color2, 1);
      board.strokePoints([new Phaser.Geom.Point(x-offset,y-offset), new Phaser.Geom.Point(x + width+offset, y-offset), new Phaser.Geom.Point(x + width + offset, y + height + offset)]);
  }
  //draw Grid to display the problem
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
      top: this.marginTop + gameData.defaultFontSize*1.9,
      rowCount: gridHeight,
      columnCount: gridWidth,
    }
    // draw grid
    this.grid = new Grid(this.scene, gridArea);
    return gridArea;
  }

  // infotext on top
  showInfo(text, color) {
    var style = { fill: color, fontSize: gameData.defaultFontSize};
    if(this.info){
      this.info.destroy();
    }
    if(gameData.isMobile){
        this.info = this.scene.add.text(this.grid.gridArea.left*1.07, this.marginTop + gameData.defaultFontSize*0.8, text, style);
    }
    else{
      this.info = this.scene.add.text(this.grid.gridArea.left*1.07, this.marginTop + gameData.defaultFontSize*0.8, text, style);
    }
  }
  showScore() {
    var text= 'Aufgabe: ' + gameData.playerManager.getPlayer().solvedProblems + '\n' + 'Level: ' + gameData.playerManager.getPlayer().level;
    var style = { fill: '#00ffff', fontSize: gameData.defaultFontSize};
    if(this.score)
      this.score.destroy();
      if(gameData.isMobile){
        this.score = this.scene.add.text(gameData.canvasWidth*0.01,gameData.canvasHeight*0.01,text,style);
        //this.scene.add.text(this.grid.gridArea.left + this.grid.gridArea.width, this.grid.gridArea.top*0.04, text, style);
      }
      else{
        this.score = this.scene.add.text(gameData.canvasWidth*0.01,gameData.canvasHeight*0.01, text, style);
      }
  }

}

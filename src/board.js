import { Grid } from './grid';

export class Board {
  constructor(scene) {
    //var width = this.sys.game.canvas.width; var height = this.sys.game.canvas.height;

    // Definiere Tafelhöhe und -breite
    this.canvasWidth = scene.sys.game.canvas.width;
    this.canvasHeight = scene.sys.game.canvas.height;
    this.boardWidth = this.canvasWidth * 2 / 3;
    this.boardHeight = this.canvasHeight * 2 / 3;
    this.marginLeft = (this.canvasWidth - this.boardWidth) / 2;
    this.marginTop = (this.canvasHeight - this.boardHeight) / 2;
    // Tafel zeichnen
    var board = scene.add.graphics()
    board.lineStyle(5, 0xFF00FF, 1.0);
    board.fillStyle(0xFFFFFF, 1.0);
    board.fillRect(this.marginLeft, this.marginTop, this.boardWidth, this.boardHeight);
    board.strokeRect(this.marginLeft,this.marginTop, this.boardWidth, this.boardHeight);

    // Setze Gitterparameter
    var gridArea = {
      left: this.marginLeft,
      width: this.boardWidth,
      top: this.marginTop,
      height: this.boardHeight,
      columnCount: 14,
    }
    // Übergebe die Parameter an die Funktion aus grid.js
    this.grid = new Grid(scene, gridArea);
    this.scene =scene;

  }
  showInfo(text, color) {
    var style = { fill: color, fontSize: '22px'};
    if(this.info)
      this.info.destroy();
    this.info = this.scene.add.text(this.boardWidth/2, this.marginTop/2, text, style)
  }
}

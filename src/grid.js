export class Grid extends Phaser.GameObjects.Grid {
  //Erzeuge Gitter relativ zum CANVAS
  constructor(scene, gridArea) {
    gridArea.centerX = gridArea.left + gridArea.width/2;
    gridArea.centerY = gridArea.top + gridArea.height/2;
    gridArea.cellSize = gridArea.width/gridArea.columnCount;
    gridArea.fontSize = gridArea.cellSize*0.6;
    debug.log(scene, gridArea);

    super(scene, gridArea.centerX, gridArea.centerY, gridArea.width, gridArea.height, gridArea.cellSize, gridArea.cellSize, 0xe0e0e0, 1, 0xaaaaaa, 1);

    this.gridArea = gridArea;
    this.scene = scene;
    this.writtenText = [];
    var columns = gridArea.width/gridArea.cellSize +1;
    while(columns-- > 0)
      this.writtenText.push([]);

    scene.add.existing(this);
  }
  // Schreibe in ein Kästchen
  writeInCell(x, y, character) {
    var newX = this.gridArea.left + (x+0.5)*this.gridArea.cellSize;
    var newY = this.gridArea.top + (y+0.5)*this.gridArea.cellSize;
    if(this.writtenText[x][y]) {
      this.writtenText[x][y].destroy();
    }
    var newText = this.scene.add.text(-10, -10, character, { fill: '#000', fontSize: this.gridArea.fontSize+'px'});

    newX -= newText.getCenter().x+10;
    newY -= newText.getCenter().y+10;
    newText.setPosition(newX, newY);
    this.writtenText[x][y] = newText;
  }
  // Schreibe in mehrere Kästchen, Startpos: x,y
  writeAtCell(x, y, text) {
    for(var i=0;i<text.length;i++) {
      this.writeInCell(x+i, y, text.charAt(i));
    }
  }
  // Schreibe von rechts nach links
  writeAtCellRightToLeft(x, y, text) {
    for(var i=0;i<text.length;i++) {
      this.writeInCell(x-i, y, text.charAt(text.length - i - 1));
    }
  }
  // Schreibe gemerkte Zahl
  writeRemainder(x,y, number) {
    var newX = this.gridArea.left + (x+0.9)*this.gridArea.cellSize;
    var newY = this.gridArea.top + (y+0.2)*this.gridArea.cellSize;
    debug.log(this.writtenText, x, y)
    debug.log(this.writtenText[x])
    if(this.writtenText[x][y]) {
      this.writtenText[x][y].destroy();
    }
    var newText = this.scene.add.text(-10, -10, number, { fill: '#377422', fontSize: 0.6*this.gridArea.fontSize+'px'});

    newX -= newText.getCenter().x+10;
    newY -= newText.getCenter().y+10;
    newText.setPosition(newX, newY);
    this.writtenText[x][y] = newText;

  }

  selectCell(x, y) {
    this.selectionX = x;
    this.selectionY = y;
    if(this.selection)
      this.selection.destroy();

    var graphics = this.scene.add.graphics();

    graphics.lineStyle(2, 0xFBAB09, 1.0);
    graphics.strokeRect(this.gridArea.left + x*this.gridArea.cellSize, this.gridArea.top + y*this.gridArea.cellSize, this.gridArea.cellSize, this.gridArea.cellSize);
    this.selection = graphics;
  }

  clear() {
    if(this.selection)
      this.selection.destroy();

    for (var x = 0; x < this.writtenText.length; x++) {
      var column = this.writtenText[x]
      for (var y = 0; y < column.length; y++) {
        if(this.writtenText[x][y]) {
          this.writtenText[x][y].destroy();
          this.writtenText[x][y] = null;
        }
      }
    }
  }

}

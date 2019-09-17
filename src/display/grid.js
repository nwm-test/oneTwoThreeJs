export class Grid extends Phaser.GameObjects.Grid {
  //Erzeuge Gitter relativ zum CANVAS
  constructor(scene, gridArea) {
    gridArea.centerX = gridArea.left + gridArea.width/2;
    gridArea.centerY = gridArea.top + gridArea.height/2;
    gridArea.cellSize = gridArea.width/gridArea.columnCount;
    gridArea.fontSize = gridArea.cellSize*0.6;
    //debug.log(scene, gridArea);

    super(scene, gridArea.centerX, gridArea.centerY, gridArea.width, gridArea.height, gridArea.cellSize, gridArea.cellSize, 0xe0e0e0, 1, 0xaaaaaa, 1);

    this.gridArea = gridArea;
    this.scene = scene;
    this.writtenText = [];
    var columns = gridArea.width/gridArea.cellSize +1;
    while(columns-- > 0)
      this.writtenText.push([]);

    scene.add.existing(this);
  }
  // Write into a cell
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
  // wrigth into a number of cells, startpos: x,y
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
    // debug.log(this.writtenText, x, y)
    // debug.log(this.writtenText[x])
    if(this.writtenText[x][y]) {
      this.writtenText[x][y].destroy();
    }
    var newText = this.scene.add.text(-10, -10, number, { fill: '#377422', fontSize: 0.6*this.gridArea.fontSize+'px'});

    newX -= newText.getCenter().x+10;
    newY -= newText.getCenter().y+10;
    newText.setPosition(newX, newY);
    this.writtenText[x][y] = newText;

  }
  // select the position in which will be written
  selectCell(x, y) {
    this.selectionX = x;
    this.selectionY = y;
    if(this.selection)
      this.selection.destroy();

    var graphics = this.scene.add.graphics();

    graphics.lineStyle(3, 0x50c43c, 1.0);
    graphics.strokeRect(this.gridArea.left + x*this.gridArea.cellSize, this.gridArea.top + y*this.gridArea.cellSize, this.gridArea.cellSize, this.gridArea.cellSize);
    this.selection = graphics;
  }


    clear() {
      if(this.selection)
        this.selection.destroy();
        if(this.drawnLines)
          for (var line of this.drawnLines) {
              line.destroy();
          }
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
      // draw Operator
      drawOperator(){
        if (!this.drawnOperater){
          this.drawnOperater = [];
        }
        var graphics = this.scene.add.graphics();
        graphics.lineStyle(2, 0x000000, 1.0);
        var x3 = this.gridArea.left + (x1 + 1)*this.gridArea.cellSize;
        var y3 = this.gridArea.top + y1*this.gridArea.cellSize - 3;
        var x4 = this.gridArea.left + (x2 + 1)*this.gridArea.cellSize;
        var y4 = this.gridArea.top + y2*this.gridArea.cellSize - 3;
        graphics.lineBetween(x3,y3,x4,y4);
        this.drawnOperater.push(graphics);
      }
      // draw a line
      drawLine(x1,y1,x2,y2) {
        if(!this.drawnLines) {
          this.drawnLines = [];
        }
        var graphics = this.scene.add.graphics();
        graphics.lineStyle(3, 0x000000, 1.0);
        var x3 = this.gridArea.left + (x1 + 1)*this.gridArea.cellSize;
        var y3 = this.gridArea.top + y1*this.gridArea.cellSize - 3;
        var x4 = this.gridArea.left + (x2 + 1)*this.gridArea.cellSize;
        var y4 = this.gridArea.top + y2*this.gridArea.cellSize - 3;
        graphics.lineBetween(x3,y3,x4,y4);
        this.drawnLines.push(graphics);

      }

      // mark objects
      markField(x,y){
        if(!this.markedFields) {
          this.markedFields=[];
        }
        var textObject = this.writtenText[x][y];
        if(!textObject){
          return;
        }
        textObject.setColor('#FF0000');
        this.markedFields.push(textObject);
      }
      // delete the marks
      demarkAllFields() {
        if(!this.markedFields) {
          return;
        }
        for ( var textField of this.markedFields) {
          if(textField)
            textField.setColor('#000000')
        }
        this.markedFields=[];

      }


}

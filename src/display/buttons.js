export class Buttons extends Phaser.GameObjects.Text {
  //
  constructor(scene, x, y, text, style, callback, backgroundColor) {
    if(style.fontSize == undefined){
      style.fontSize = gameData.defaultFontSize;
    }
    super(scene, x +14, y, text, style);
    this.background = scene.add.graphics()
    this.background.lineStyle(5, 0xFF00FF, 1.0);
    this.background.fillStyle(backgroundColor?backgroundColor:0xFFFFFF, 1.5);
    this.background.fillRect(this.getTopLeft().x-14, this.getTopLeft().y-1, this.getBounds().width+25, this.getBounds().height+1.5);
    //this.strokeRect(this.marginLeft,this.marginTop, this.boardWidth, this.boardHeight);

    this.setInteractive({ useHandCursor: true })
      .on('pointerover', () => this.enterButtonHoverState() )
      .on('pointerout', () => this.enterButtonRestState() )
      .on('pointerdown', () => this.enterButtonActiveState() )
      .on('pointerup', () => {
        this.enterButtonHoverState();
        callback();
      });

    scene.add.existing(this);
  }

  enterButtonHoverState() {
    this.setStyle({ fill: '#00f'});
  }

  enterButtonRestState() {
    this.setStyle({ fill: '#0f0'});
  }

  enterButtonActiveState() {
    this.setStyle({ fill: '#0ff'});
  }
}

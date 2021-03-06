export class Buttons extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, style, callback) {
    super(scene, x, y, text, style);
    this.background = scene.add.graphics()
    this.background.lineStyle(5, 0xFF00FF, 1.0);
    this.background.fillStyle(0xFFFFFF, 1.0);
    this.background.fillRect(this.getTopLeft().x, this.getTopLeft().y, this.getBounds().width, this.getBounds().height);
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

// in this scene user solves problems
import { Board } from '../display/board';
import { Buttons } from '../display/buttons';
import { DisplayManager } from '../utils/displayManager';
import { ProblemManager } from '../utils/problemManager';

export class BigNumbersScene extends Phaser.Scene {
  constructor() {
    super(SCENES.BIG_NUMBERS);
  }
  // Load all objects
  preload() {

  }
  // Create objects
  create() {

    var background = this.add.image(gameData.backgroundOffsetX, gameData.backgroundOffsetY, 'startSceneBackground').setOrigin(0, 0);
    var netzwerkmedien = this.add.image(gameData.canvasWidth*0.91, gameData.defaultFontSize, 'netzwerkmedien');

    // return to menuScene
    var backToMenu = new Buttons(this, gameData.canvasWidth*0.01, gameData.canvasHeight - gameData.numberButtonFontSize, 'ZURÜCK', {
      fill: '#FFFF00', fontSize: gameData.defaultButtonFontSize * 1.2
    }, () => {
      this.scene.start(SCENES.MENU)
    });

    // create problem scenes
    var plusButton = new Buttons(this, gameData.backgroundOffsetX + gameData.backgroundWidth * 0.3, gameData.backgroundOffsetY + gameData.backgroundHeight * 0.6, '+', {
      fill: '#fff'
    }, () => {
      gameData.problemType = 'bigNumbersPlus';
      this.scene.start(SCENES.PROBLEM)
    }, 0xc0ff00);
    var minusButton = new Buttons(this, gameData.backgroundOffsetX + gameData.backgroundWidth * 0.3, gameData.backgroundOffsetY + gameData.backgroundHeight * 0.6 + gameData.defaultButtonFontSize * 1.1, '-', {
      fill: '#fff'
    }, () => {
      gameData.problemType = 'bigNumbersMinus';
      this.scene.start(SCENES.PROBLEM)
    }, 0xc0ff00);
    var multiplyButton = new Buttons(this, gameData.backgroundOffsetX + gameData.backgroundWidth * 0.6, gameData.backgroundOffsetY + gameData.backgroundHeight * 0.6, '*', {
      fill: '#fff'
    }, () => {
      gameData.problemType = 'bigNumbersMultiply';
      this.scene.start(SCENES.PROBLEM)
    }, 0xc0ff00);
    var divideButton = new Buttons(this, gameData.backgroundOffsetX + gameData.backgroundWidth * 0.6, gameData.backgroundOffsetY + gameData.backgroundHeight * 0.6 + gameData.defaultButtonFontSize * 1.1, '/', {
      fill: '#fff'
    }, () => {
      gameData.problemType = 'bigNumbersDivide';
      this.scene.start(SCENES.PROBLEM)
    }, 0xc0ff00);

  }
}

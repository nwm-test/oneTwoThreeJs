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
    //var width = this.sys.game.canvas.width; var height = this.sys.game.canvas.height;
    var {
      width,
      height
    } = this.sys.game.canvas;
    var background = this.add.image(width*0.16, height*0.15, 'startSceneBackground').setOrigin(0, 0);
    var netzwerkmedien = this.add.image(width*0.96, height*0.02, 'netzwerkmedien');

    // return to menuScene
    var backToMenu = new Buttons(this, width*0.11, height*0.9, 'ZURÜCK', {
      fill: '#fff'
    }, () => {
      this.scene.start(SCENES.MENU)
    });

    // create problem scenes
    var plusButton = new Buttons(this, width*0.32, height*0.6, '+', {
      fill: '#fff'
    }, () => {
      gameData.problemType = 'bigNumbersPlus';
      this.scene.start(SCENES.PROBLEM)
    }, 0xc0ff00);
    var minusButton = new Buttons(this, width*0.32, height*0.66, '-', {
      fill: '#fff'
    }, () => {
      gameData.problemType = 'bigNumbersMinus';
      this.scene.start(SCENES.PROBLEM)
    }, 0xc0ff00);
    var multiplyButton = new Buttons(this, width*0.52, height*0.6, '*', {
      fill: '#fff'
    }, () => {
      gameData.problemType = 'bigNumbersMultiply';
      this.scene.start(SCENES.PROBLEM)
    }, 0xc0ff00);
    var divideButton = new Buttons(this, width*0.52, height*0.66, '/', {
      fill: '#fff'
    }, () => {
      gameData.problemType = 'bigNumbersDivide';
      this.scene.start(SCENES.PROBLEM)
    }, 0xc0ff00);
    console.log(gameData);

  }
}

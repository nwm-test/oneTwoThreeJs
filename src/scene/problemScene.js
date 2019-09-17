// in this scene user solves problems
import { Board } from '../display/board';
import { DisplayManager } from '../utils/displayManager';
import { ProblemManager } from '../utils/problemManager';

export class ProblemScene extends Phaser.Scene {
  constructor() {
    super(SCENES.PROBLEM);
  }
  // Load all objects
  preload() {

  }
  // Create objects
  create() {
    // use problemManager to generate and displayManager to show problems
    this.displayManager = new DisplayManager(this, this.onProblemSolved, this.onProblemUnsolved);
    this.problemManager = new ProblemManager();
    var problem = this.problemManager.generateProblem(gameData.problemType);
    this.displayManager.showProblem(problem);
  }
  // generate next problem
  onProblemSolved() {
    // level up
    gameData.playerManager.changeDifficulty(1);
    gameData.playerManager.getPlayer().solvedProblems++ ;
    var problem = this.problemManager.generateProblem(gameData.problemType, gameData.playerManager.getPlayer().level);
    // check if last problem was the same
    while(this.lastProblem && problem.initialText == this.lastProblem.initialText){
      var problem = this.problemManager.generateProblem(gameData.problemType, gameData.playerManager.getPlayer().level);
    }
    this.displayManager.showProblem(problem);

    this.lastProblem = problem;


  }
  onProblemUnsolved() {
    gameData.playerManager.changeDifficulty(-1);
    this.displayManager.showScore();
  }
  // call bigNumberScene
    backToStart() {
      if (gameData.problemType.indexOf('bigNumbers')>= 0 ) {
        this.scene.start(SCENES.BIG_NUMBERS);
      }
      else
        this.scene.start(SCENES.SMALL_NUMBERS);
  }
}

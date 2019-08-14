import { Buttons } from './buttons';
import { Board } from './board';
import { DisplayManager } from './displayManager';
import { ProblemManager } from './problemManager';

export class NumberScene extends Phaser.Scene {
  constructor() {
    super(SCENES.NUMBERS);
  }
  //Lade alle Dateien
  preload() {

  }
  // Create objects
  create() {
    this.displayManager = new DisplayManager(this, this.onProblemSolved);
    this.problemManager = new ProblemManager();
    var problem = this.problemManager.generateProblem();
    this.displayManager.showProblem(problem);
  }
  onProblemSolved() {
    var problem = this.problemManager.generateProblem();
    this.displayManager.showProblem(problem);
  }
}
//- this: refers to the class and all its defined members and functions & to the extended class (in your case
// the Phaser.Scene). So you can basically access all the public members and functions of Phaser.Scene.
//-`let`: is a signal that the variable may be reassigned, such as a counter in a loop, or a value swap in
// an algorithm. It also signals that the variable will be used only in the block it’s defined in,
// which is not always the entire containing function.
// -`var`: is the weakest signal available when you define a variable in JavaScript. The variable may or may
// not be reassigned, and the variable may or may not be used for an entire function, or just for the purpose
// of a block or loop.
// -`const`: is a signal that the identifier won’t be reassigned.

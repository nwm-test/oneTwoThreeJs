import { Board } from './board';
import { Grid } from './grid';

// class to generate problem, will be called in "SCENES". Dependencies: playerManager.js, numberScene.js
export class ProblemManager {
  constructor() {


  }


  generateProblem() {
    return this.generateProblemPlus();
  }
  generateProblemPlus() {
    //5 + Math.log(this.difficulty * 2 + 1);
    var problem = {};
    var maxValue = 20;
    problem.number1 = Math.floor(Math.random() * maxValue);
    problem.number2 = Math.floor(Math.random() * maxValue);
    problem.operator = '+';
    problem.result = problem.number1 + problem.number2;
    debug.log(problem.number1, problem.number2, problem.result);
    var whiteSpaceResult = ('' + problem.result).replace(/[0-9]/g, ' ');
    problem.initialText = problem.number1 + problem.operator + problem.number2 + '=' + whiteSpaceResult;
    return problem;
  }

}

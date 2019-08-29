import { Board } from '../display/board';
import { Grid } from '../display/grid';

// class to generate problem, will be called in "SCENES". Dependencies: playerManager.js, numberScene.js
export class ProblemManager {
  constructor() {


  }

  generateProblem(problemType) {
    switch (problemType){
      case 'plus':
        return this.generateProblemPlus();
      case 'minus':
        return this.generateProblemMinus();
      case 'multiply':
        return this.generateProblemMultiply();
      case 'divide':
        return this.generateProblemDivide();
      default:
        console.log('error, no problemType set', problemType);
        return this.generateProblemPlus();
    }
    return this.generateProblemMinus();
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
  generateProblemMinus(){
    var problem = {};
    var maxValue = 20;
    var minValue = 1;
    problem.number1 = Math.floor(Math.random() * maxValue)+ minValue;
    problem.number2 = Math.floor(Math.random() * problem.number1);
    problem.operator = '-';
    problem.result = problem.number1 - problem.number2;
    // transfrom numbers in whitespace
    var whiteSpaceResult = ('' + problem.result).replace(/[0-9]/g, ' ');
    problem.initialText = problem.number1 + problem.operator + problem.number2 + '=' + whiteSpaceResult;
    return problem;
  }
  generateProblemMultiply(){
    var problem = {};
    var maxValue = 10;
    // var minValue = 1;
    problem.number1 = Math.floor(Math.random() * maxValue);
    problem.number2 = Math.floor(Math.random() * maxValue);
    problem.operator = '*';
    problem.result = problem.number1 * problem.number2;
    // transfrom numbers in whitespace
    var whiteSpaceResult = ('' + problem.result).replace(/[0-9]/g, ' ');
    problem.initialText = problem.number1 + problem.operator + problem.number2 + '=' + whiteSpaceResult;
    return problem;
  }
  generateProblemDivide(){
    var problem = {};
    var minValue = 1;
    var maxValue = 6;
    // var minValue = 1;
    problem.number1 = Math.floor(Math.random() * maxValue) + minValue;
    problem.number2 = Math.floor(Math.random() * maxValue) + minValue;
    problem.number1 *= problem.number2;
    problem.operator = '/';

    problem.result = problem.number1 / problem.number2;
    // transfrom numbers in whitespace
    var whiteSpaceResult = ('' + problem.result).replace(/[0-9]/g, ' ');
    problem.initialText = problem.number1 + problem.operator + problem.number2 + '=' + whiteSpaceResult;
    return problem;
  }
}

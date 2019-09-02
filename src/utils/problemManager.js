import { Board } from '../display/board';
import { Grid } from '../display/grid';

// class to generate problem, will be called in "SCENES". Dependencies: playerManager.js, problemScene.js
export class ProblemManager {
  constructor() {


  }
  generateProblem(problemType, difficulty) {
    switch (problemType){
      case 'plus':
        return this.generateProblemPlus(difficulty);
      case 'minus':
        return this.generateProblemMinus(difficulty);
      case 'multiply':
        return this.generateProblemMultiply(difficulty);
      case 'divide':
        return this.generateProblemDivide(difficulty);
      case 'bigNumbersPlus':
        return this.generateProblemBigNumbersPlus(difficulty);
      case 'bigNumbersMinus':
        return this.generateProblemBigNumbersMinus(difficulty);
      case 'bigNumbersMultiply':
        return this.generateProblemBigNumbersMultiply(difficulty);
      default:
        console.log('error, no problemType set', problemType);
        return this.generateProblemPlus(difficulty);
    }
  }
  generateProblemPlus(difficulty) {
    var maxValue = 10;
    if (difficulty > 0) {
      //5 + Math.log(this.difficulty * 2 + 1);
      maxValue = difficulty * 10;
    }
    var problem = {};
    problem.number1 = Math.floor(Math.random() * maxValue);
    problem.number2 = Math.floor(Math.random() * maxValue);
    problem.operator = '+';
    problem.result = problem.number1 + problem.number2;
    var whiteSpaceResult = ('' + problem.result).replace(/[0-9]/g, ' ');
    problem.initialText = problem.number1 + problem.operator + problem.number2 + '=' + whiteSpaceResult;
    return problem;
  }
  generateProblemMinus(difficulty){
    if (difficulty == 0) {
      var maxValue = 20;
    }
    else {
      var maxValue = difficulty*10;
    }
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
  generateProblemMultiply(difficulty){
    if (difficulty == 0) {
      var maxValue = 20;
    }
    else {
      var maxValue = difficulty*10;
    }
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
  generateProblemDivide(difficulty){
    var minValue = 1;
    var maxValue = 6;
    if (difficulty > 0) {
      minValue = difficulty * 1;
      maxValue = difficulty* 6;
    }
    var problem = {};
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
  generateProblemBigNumbersPlus(difficulty) {
    var maxValue = 1000;
    var minValue = 100;
    if (difficulty > 0) {
      //5 + Math.log(this.difficulty * 2 + 1);
      maxValue = difficulty * 1000;
    }
    var problem = {};
    problem.number1 = Math.floor(Math.random() * maxValue) + minValue;
    problem.number2 = Math.floor(Math.random() * maxValue)+ minValue;
    problem.operator = '+';
    problem.result = problem.number1 + problem.number2;
    var whiteSpaceResult = ('' + problem.result).replace(/[0-9]/g, ' ');
    problem.initialText = problem.number1 + problem.operator + problem.number2 + '=' + whiteSpaceResult;
    return problem;
  }
  generateProblemBigNumbersMinus(difficulty) {
    var maxValue = 1000;
    var minValue = 100;
    if (difficulty > 0) {
      //5 + Math.log(this.difficulty * 2 + 1);
      maxValue = difficulty * 1000;
    }
    var problem = {};
    problem.number1 = Math.floor(Math.random() * maxValue) + minValue;
    problem.number2 = Math.floor(Math.random() * (problem.number1 - minValue)) + minValue;
    problem.operator = '-';
    problem.result = problem.number1 - problem.number2;
    var whiteSpaceResult = ('' + problem.result).replace(/[0-9]/g, ' ');
    problem.initialText = problem.number1 + problem.operator + problem.number2 + '=' + whiteSpaceResult;
    return problem;
  }
  generateProblemBigNumbersMultiply(difficulty) {
    var maxValue1 = 10;
    var maxValue2 = 1000;
    var minValue2 = 100;
    if (difficulty > 0) {
      //5 + Math.log(this.difficulty * 2 + 1);
      maxValue2 = difficulty * 1000;
    }
    var problem = {};
    problem.number1 = Math.floor(Math.random() * maxValue1);
    problem.number2 = Math.floor(Math.random() * maxValue2)+ minValue2;
    var numberToString = (problem.number2).toString();
    var numberLength = (problem.number2).toString().length;
    problem.operator = '*';
    problem.subProblems = [];
    problem.subProblemIndex = 0;
    problem.result = problem.number1 * problem.number2;
    problem.initialText = problem.number1 + problem.operator + problem.number2;


    for (var i=numberLength-1, j=0; i >=0; i--, j++) {
      var lengthNumber2 = (problem.number2 + problem.operator).length
      var subProblem = {
        number1: problem.number1,
        number2: parseInt(numberToString[i]),
        operator: '*',
        markedFields: [
          { x: 0-j, y: 0},
          { x: -lengthNumber2, y: 0},
        ],
        selectField: { x: 0-j, y: 1+j}
      }
      subProblem.result = subProblem.number1 * subProblem.number2;

      problem.subProblems.push(subProblem);

    }

    var subProblem = {
      number1: problem.number1,
      number2: problem.number2,
      operator: '*',
      markedFields: [
      ],
      selectField: { x: 0, y: 1+numberLength},
      drawLine: {x1: -(problem.result+ '').length, y1: 1+numberLength, x2:0 , y2: 1+numberLength}
    }
    subProblem.result = subProblem.number1 * subProblem.number2;

    problem.subProblems.push(subProblem);

    return problem;
  }
}

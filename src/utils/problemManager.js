// class to generate problem, will be called in "SCENES". Dependencies: playerManager.js, problemScene.js
export class ProblemManager {
  constructor() {


  }
  generateProblems(problemCount, levelCount, problemType, initialDifficulty){
    gameData.cellCountX = 0;
    gameData.cellCountY = 0;

    var problems = [];
    for (var i = initialDifficulty; i < levelCount + initialDifficulty; i++) {
      problems[i] = [];
      for (var j = 0; j < problemCount; j++) {
        var problem = this.generateProblem(problemType, i);
        this.checkCellCount(problem);
        problems[i].push(problem);
      }

    }
    this.problems = problems;
  }
  checkCellCount(problem){
    if(problem.initialText.length > gameData.cellCountX){
      gameData.cellCountX = problem.initialText.length + 1;
    }
    console.log(problem.subProblems);
    var y = 2;
    if(problem.subProblems){
      for (var i = 0; i < problem.subProblems.length; i++) {
        if (problem.subProblems.selectField) {
          if(problem.subProblems[i].selectField.y > y){
            y = problem.subProblems[i].selectField.y;
          }
        }

      }
    }
    if(y > gameData.cellCountY){
      gameData.cellCountY = y;
    }
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
      case 'bigNumbersDivide':
        return this.generateProblemBigNumbersDivide(difficulty);
      default:
        console.log('error, no problemType set', problemType);
        return this.generateProblemPlus(difficulty);
    }
  }
  getNextProblem(difficulty){
    var problems = this.problems[difficulty];
    if(this.currentProblemIndex == undefined || this.currentProblemIndex >= problems.length){
      this.currentProblemIndex = 0;
    }
    return problems[this.currentProblemIndex++];
  }
  generateDivisionPair(x,difficulty) {
    var minNumberToDivide = 2;
    var maxNumberToDivide = 3;
    var minDivisionNumber = 1;
    var maxDivisionNumber = 2;

    if (!difficulty){
      difficulty = 1;
    }
      switch (x) {
        case (1):
        minNumberToDivide = Math.floor(Math.log((15*difficulty+1)));
        maxNumberToDivide = Math.floor(Math.log(20*difficulty^2/2+1));
        minDivisionNumber = Math.floor(Math.log((15*difficulty+1)));
        maxDivisionNumber = Math.floor(Math.log((25*difficulty+2)));
          break;
        case (2):
          minNumberToDivide = Math.floor(10 + Math.log((15*difficulty+2)));
          maxNumberToDivide = Math.floor(15 + Math.log(20*difficulty^2/2) + 1);
          minDivisionNumber = Math.floor(1 + Math.log((15*difficulty+2)));
          maxDivisionNumber = Math.floor(2 + Math.log((15*difficulty+2)));
          break;
        default:
        var minNumberToDivide = 2;
        var maxNumberToDivide = 3;
        var minDivisionNumber = 1;
        var maxDivisionNumber = 2;
      }
    var divisionNumber = Math.floor(Math.random() * maxDivisionNumber) + minDivisionNumber;
    var numberToDivide = divisionNumber * (Math.floor(Math.random() * maxNumberToDivide) + minNumberToDivide);
    var divisionPair = {};
    divisionPair.number1 = numberToDivide;
    divisionPair.number2 = divisionNumber;
    divisionPair.operater = ':';
    divisionPair.result = numberToDivide / divisionNumber;
  return divisionPair;
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
    var subProblem =
    problem.subProblemIndex = 0;
    problem.subProblems = [JSON.parse(JSON.stringify(problem))];
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
    problem.subProblemIndex = 0;
    problem.subProblems = [JSON.parse(JSON.stringify(problem))];
    return problem;
  }
  generateProblemMultiply(difficulty){
    var problem = {};
    var divisionPair = this.generateDivisionPair(1, difficulty);
    var maxValue = 10;
    // var minValue = 1;
    problem.number1 = divisionPair.result;
    problem.number2 = divisionPair.number2;
    problem.operator = '*';
    problem.result = problem.number1 * problem.number2;
    // transfrom numbers in whitespace
    var whiteSpaceResult = ('' + problem.result).replace(/[0-9]/g, ' ');
    problem.initialText = problem.number1 + problem.operator + problem.number2 + '=' + whiteSpaceResult;
    problem.subProblemIndex = 0;
    problem.subProblems = [JSON.parse(JSON.stringify(problem))];
    return problem;
  }
  generateProblemDivide(difficulty){
    var problem = {};
    var divisionPair =  this.generateDivisionPair(1,difficulty);
    while(this.lastDivisionPair && this.lastDivisionPair.number1 ==  divisionPair.number1) {
       divisionPair = this.generateDivisionPair(1,difficulty);
    }
    problem.number1 = divisionPair.number1;
    problem.number2 = divisionPair.number2;
    problem.operator = ':';
    problem.result = problem.number1 / problem.number2;
    this.lastDivisionPair = divisionPair;
    // transfrom numbers in whitespace
    var whiteSpaceResult = ('' + problem.result).replace(/[0-9]/g, ' ');
    problem.initialText = problem.number1 + problem.operator + problem.number2 + '=' + whiteSpaceResult;
    problem.subProblemIndex = 0;
    problem.subProblems = [JSON.parse(JSON.stringify(problem))];
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
    problem.selectField = {x: 0, y: 3};
    problem.markedFields = [];
    var whiteSpaceResult = ('' + problem.result).replace(/[0-9]/g, ' ');
    problem.initialText = whiteSpaceResult;
    var problemLength = (problem.initialText + '').length;
    var numberOneArray = problem.number1.toString();
    var numberTwoArray = problem.number2.toString();
    var numberOneLength = numberOneArray.length;
    var numberTwoLength = numberTwoArray.length;
    var number2Length = (problem.number2 + '').length;
    problem.subProblems = [];
    problem.subProblemIndex = 0;

    //make copy of object 'problem'
    //problem.subProblems = [JSON.parse(JSON.stringify(problem))];

    var remainder = 0;
    var additionProblem = {};
    for (var i=0; i<Math.max(numberOneLength,numberTwoLength); i++) {
      //if number1.length < or > number2.length, pick numbers from right to left, if no entry, set index to 0
      var numberOne = i<numberOneLength ? numberOneArray[numberOneLength-i-1] : 0;
      var numberTwo = i<numberTwoLength ? numberTwoArray[numberTwoLength-i-1] : 0;
      additionProblem={
        number1: parseInt(numberOne),
        number2: parseInt(numberTwo),
        operator: ' + ',
        remainder:  remainder,
          // markedFields: [
          //   { x: 0,           y: 0},
          //   { x: - lengthToNumberOne, y: 0},
          // ],
        selectField: { x: - i, y: 3}
      }
      if(remainder>0){
        additionProblem.initialText = additionProblem.number1 + additionProblem.operator + additionProblem.number2 + additionProblem.operator + remainder + ' = ?';
        additionProblem.result = additionProblem.number1 + additionProblem.number2 + remainder;
      }
      else{
        additionProblem.initialText = additionProblem.number1 + additionProblem.operator + additionProblem.number2 + ' = ?';
        additionProblem.result = additionProblem.number1 + additionProblem.number2;
      }
      if((additionProblem.result+'').length>1){
        remainder = Math.floor(additionProblem.result/10);
        additionProblem.result = additionProblem.result%10;
      }
      else{
        remainder = 0;
      }
      problem.subProblems.push(additionProblem);
    }
    if(remainder>0){
      var remainderProblem = {
        number1: additionProblem.number1,
        number2: additionProblem.number2,
        operator: ' + ',
        remainder:  remainder,
          // markedFields: [
          //   { x: 0,           y: 0},
          //   { x: - lengthToNumberOne, y: 0},
          // ],
        selectField: { x: - i, y: 3},
        result: remainder
      }
      remainderProblem.initialText = additionProblem.number1 + additionProblem.operator + additionProblem.number2 + additionProblem.operator + additionProblem.remainder + ' = ?';
      problem.subProblems.push(remainderProblem);
    }

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
    problem.selectField = {x: 0, y: 3};
    problem.markedFields = [];
    var whiteSpaceResult = ('' + problem.result).replace(/[0-9]/g, ' ');
    problem.initialText = problem.number1 + '';
    problem.subProblemIndex = 0;
    problem.subProblems = [JSON.parse(JSON.stringify(problem))];
    return problem;
  }
  generateProblemBigNumbersMultiply(difficulty) {
    var maxValue1 = 10;
    var maxValue2 = 300;
    var minValue2 = 100;
    if (difficulty > 0) {
      //5 + Math.log(this.difficulty * 2 + 1);
      maxValue2 = difficulty * 100;
    }
    var problem = {};
    problem.number1 = Math.floor(Math.random() * maxValue1);
    problem.number2 = Math.floor(Math.random() * maxValue2)+ minValue2;
    var numberTwoString = (problem.number2).toString();
    var number2Length = (problem.number2).toString().length;
    problem.operator = '*';
    problem.subProblems = [];
    problem.subProblemIndex = 0;
    problem.result = problem.number1 * problem.number2;
    problem.initialText = problem.number1 + problem.operator + problem.number2 + '';

    for (var i=number2Length - 1, j=0; i>=0; i--, j++) {
      var lengthToNumberOne = (problem.number2 + problem.operator).length
      var subProblem = {
        number1: problem.number1,
        number2: parseInt(numberTwoString[i]),
        operator: '*',
        markedFields: [
          { x: 0 - j,           y: 0},
          { x: - lengthToNumberOne, y: 0},
        ],
        selectField: { x: 0-j, y: 2+j}
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
      selectField: { x: 0, y: 2+number2Length},
      drawLine: {x1: -(problem.result+ '').length, y1: 1+number2Length, x2:0 , y2: 1+number2Length}
    }
    subProblem.result = subProblem.number1 * subProblem.number2;
    problem.subProblems.push(subProblem);
    return problem;
  }
  // problem: xy/x
  generateProblemBigNumbersDivide(difficulty) {
      var problem ={};
      var divisionPair = this.generateDivisionPair(2,difficulty);
      problem.number1 = divisionPair.number1;
      problem.number2 = divisionPair.number2;
      problem.operator = ':';
      problem.result = problem.number1 / problem.number2;
      var whiteSpaceResult = ('' + problem.result).replace(/[0-9]/g, ' ');
      problem.initialText = problem.number1 + problem.operator + problem.number2 + '=' + whiteSpaceResult;
      problem.subProblems = [];
      problem.subProblemIndex = 0;
      var numberToDivide = problem.number1;
      var problemLength = (problem.initialText + '').length;
      var numberOneArray = problem.number1.toString();
      var numberOneLength = numberOneArray.length;
      var number2Length = (problem.number2 + '').length;
      if (numberOneLength > 2 || problem.result >= 10)  {
        numberToDivide = Math.floor(problem.number1/10);

        }
      var numberToDivideLength = (numberToDivide + '').length;

       var i= -problemLength +1;
        // find write dividend and divide
        var firstDivision = {
          number1: numberToDivide,
          number2: problem.number2,
          operator: ':',
          markedFields: [
            {x: i, y:1},
            {x: i + (problem.number1 + problem.operator).length , y:1} // mark number2
          ],
          selectField: {x: - (problem.result + '').length + 1, y:1} // select first digit of result
        }
        firstDivision.result = Math.floor(firstDivision.number1 / firstDivision.number2);
        if (numberToDivideLength > 1) {
          firstDivision.markedFields.push({x: i + 1, y: 1});
        }
        problem.subProblems.push(firstDivision);

        // multiply with divisor and write result under first part of dividend
        var firstMultiplication = {
          number1: firstDivision.result,
          number2: problem.number2,
          operator: '*',
          markedFields: [
            {x: firstDivision.selectField.x, y: firstDivision.selectField.y},
            {x: firstDivision.markedFields[1].x, y: firstDivision.markedFields[1].y} // mark number2
          ],
          selectField: {x: i, y: 2}
        }
        firstMultiplication.result = firstMultiplication.number1 * firstMultiplication.number2;
        if(numberToDivideLength > 1) {
          firstMultiplication.selectField = {x: i + 1, y: 2};
        }
        problem.subProblems.push(firstMultiplication);
        // substitute
        var firstSubtraction = {
          number1: firstDivision.number1,
          number2: firstMultiplication.result,
          operator: '-',
          markedFields: [
            {x: firstDivision.markedFields[0].x ,     y: firstDivision.markedFields[0].y},
            {x: firstDivision.markedFields[0].x ,     y: firstDivision.markedFields[0].y + 1},
          ],
          selectField: {x: firstMultiplication.selectField.x, y:  firstMultiplication.selectField.y + 1},
        }
        firstSubtraction.drawLine = { x1: firstSubtraction.markedFields[0].x - 1, y1: firstSubtraction.markedFields[0].y + 1,
                                      x2: firstSubtraction.markedFields[0].x, y2: firstDivision.markedFields[0].y + 1};
        if(firstSubtraction.result == 0) {
          firstSubtraction.markedFields = [
            {x: firstDivision.markedFields[0].x ,     y: firstDivision.markedFields[0].y},
            {x: firstDivision.markedFields[0].x ,     y: firstDivision.markedFields[0].y + 1}
          ];
        }
        if(numberToDivideLength > 1 || (firstMultiplication.result + '').length > 1) {
          firstSubtraction.markedFields = [
            {x: firstDivision.markedFields[0].x ,     y: firstDivision.markedFields[0].y},
            {x: firstDivision.markedFields[0].x ,     y: firstDivision.markedFields[0].y + 1},
            {x: firstDivision.markedFields[0].x + 1,  y: firstDivision.markedFields[0].y},
            {x: firstDivision.markedFields[0].x + 1,  y: firstDivision.markedFields[0].y + 1}
          ];
          firstSubtraction.selectField = {x: firstSubtraction.markedFields[0].x + 1, y: firstSubtraction.markedFields[0].y + 2};
          firstSubtraction.drawLine = { x1: firstSubtraction.markedFields[0].x - 1 , y1: firstSubtraction.markedFields[0].y + 1,
                                        x2: firstSubtraction.markedFields[0].x + 1, y2: firstSubtraction.markedFields[0].y + 1}
        }
        firstSubtraction.result = firstSubtraction.number1 - firstSubtraction.number2;
        problem.subProblems.push(firstSubtraction);

        // write down next digit of divident
        var firstWriteDown = {
          number1: firstSubtraction.result,
          number2: numberOneArray[(numberToDivideLength)],
          operator: ':',
          markedFields: [
            // {x: firstDivision.markedFields[1].x, y: firstDivision.markedFields[1].y + 1}
            {x: i + numberToDivideLength, y: 1},
          ],
          selectField: {x: firstSubtraction.selectField.x + 1, y: firstSubtraction.selectField.y},
        }
        var nextNumberToDivide = (firstWriteDown.number1 + '') + (firstWriteDown.number2 + '');
        firstWriteDown.result = firstWriteDown.number2;
        if(firstSubtraction.result == 0){
          nextNumberToDivide = firstWriteDown.result;
        }
        problem.subProblems.push(firstWriteDown);

        // divide next part of divident
        var secondDivision = {
          number1: nextNumberToDivide,
          number2: problem.number2,
          operator: ':',
          markedFields: [
            {x: firstWriteDown.selectField.x - 1, y: firstWriteDown.selectField.y},
            {x: firstWriteDown.selectField.x , y: firstWriteDown.selectField.y},
            {x: firstDivision.markedFields[1].x, y: firstDivision.markedFields[1].y},
            {x: firstWriteDown.selectField.x , y: firstWriteDown.selectField.y},
            {x: firstDivision.markedFields[1].x, y: firstDivision.markedFields[1].y}
            ],
          selectField: {x: - (problem.result + '').length + 2, y:1}
        }
        if(firstSubtraction.result == 0) {
          secondDivision.markedFields = [
            {x: firstWriteDown.selectField.x , y: firstWriteDown.selectField.y},
            {x: firstDivision.markedFields[1].x, y: firstDivision.markedFields[1].y},
            {x: firstWriteDown.selectField.x , y: firstWriteDown.selectField.y},
            {x: firstDivision.markedFields[1].x, y: firstDivision.markedFields[1].y}
          ];
        }
        secondDivision.result = secondDivision.number1 / secondDivision.number2;
        problem.subProblems.push(secondDivision);

        var secondMultiplication = {
          number1: secondDivision.result,
          number2: problem.number2,
          operator: '*',
          markedFields: [
            {x: firstDivision.selectField.x + 1, y: firstDivision.selectField.y},
            {x: firstDivision.markedFields[1].x, y: firstDivision.markedFields[1].y}
          ],
          selectField: {x: firstMultiplication.selectField.x + 1, y: firstMultiplication.selectField.y + 2}
        }
        secondMultiplication.result = secondMultiplication.number1 * secondMultiplication.number2;

        problem.subProblems.push(secondMultiplication);

        var secondSubtraction = {
          number1: secondDivision.number1,
          number2: secondMultiplication.result,
          operator: '-',
          markedFields: [
            {x: secondMultiplication.selectField.x,       y: secondMultiplication.selectField.y - 1 },
            {x: secondMultiplication.selectField.x - 1,   y: secondMultiplication.selectField.y - 1},
            {x: secondMultiplication.selectField.x,       y: secondMultiplication.selectField.y},
            {x: secondMultiplication.selectField.x - 1,   y: secondMultiplication.selectField.y}
          ],
          selectField: { x: firstWriteDown.selectField.x, y: firstWriteDown.selectField.y + 2},
          drawLine: {x1: secondMultiplication.selectField.x - 2, y1: secondMultiplication.selectField.y,
                     x2: secondMultiplication.selectField.x,     y2: secondMultiplication.selectField.y}
        }
        console.log('markedFields: ', secondSubtraction.markedFields);
        if(firstSubtraction.result == 0) {
          secondSubtraction.markedFields = [
            {x: secondMultiplication.selectField.x,       y: secondMultiplication.selectField.y},
            {x: secondMultiplication.selectField.x,       y: secondMultiplication.selectField.y - 1 },
          ];
          console.log('markedFields: ', secondSubtraction.markedFields);

          secondSubtraction.drawLine = {x1: secondMultiplication.selectField.x - 1, y1: secondMultiplication.selectField.y,
                                        x2: secondMultiplication.selectField.x,     y2: secondMultiplication.selectField.y};
        }
        if (nextNumberToDivide >= 10 || (secondMultiplication.result + '').length > 1 ) {
          secondSubtraction.selectField = {x: firstSubtraction.selectField.x + 1, y: firstSubtraction.selectField.y + 2};
          secondSubtraction.drawLine = {x1: secondMultiplication.selectField.x - 2, y1: secondMultiplication.selectField.y,
                                        x2: secondMultiplication.selectField.x,     y2: secondMultiplication.selectField.y};;
          console.log("nextNumberToDivide: ", nextNumberToDivide, 'drawLine: ', secondSubtraction.drawLine);
          // {x1: secondSubtraction.markedFields[0].x - 1, y1: firstSubtraction.drawLine.y1 + 2,
          //  x2:  secondSubtraction.markedFields[0].x - 1, y2: firstSubtraction.drawLine.y2 + 2};
        }
        secondSubtraction.result = secondSubtraction.number1 - secondSubtraction.number2;
        problem.gridAreaHeight = secondSubtraction.selectField.y;
        problem.gridAreaWidth = problemLength;
        problem.subProblems.push(secondSubtraction);
        console.log('problem Text: ', problem.initialText, 'subProblem: ',  numberToDivide, numberToDivideLength,
                    'problemLength: ', (problem.initialText + '').length,
                    'gridWidth.y: ', secondSubtraction.selectField.y);

      return problem;


    }
  }

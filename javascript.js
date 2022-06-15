const display = document.querySelector(".display");
const allClear = document.querySelector("#allClear");
const clear = document.querySelector('#clear');
const digit = document.querySelectorAll("#digit");
const operatorObj = document.querySelectorAll("#operator");
const equals = document.querySelector("#equals");
let temp = 0;
let operandOne = "0";
let operator = "";
let operandTwo = "";
let solution = "";
display.textContent = `${operandOne} ${operator} ${operandTwo}`;




//Calculator button logic

clear.addEventListener("click", () => clearDisplay(true));
allClear.addEventListener("click", () => clearDisplay());
equals.addEventListener("click", () => calculateExpression());

digit.forEach(item => {
    item.addEventListener('click', event => {
        updateDisplay(item.textContent);
    });
})

operatorObj.forEach(item => {
    item.addEventListener('click', event => {
        updateDisplay(item.textContent);
    });
})

function updateDisplay(output) {
    if (solution) {
        solution = "";
        clearDisplay();
        updateDisplay(output);
    }
    else if (output === "+" || output === "-" || output === "X" || output === "/") {
        operator = output;
        refreshDisplay();
    } else if (operator && (!operandTwo)) {
        operandTwo = output;
    } else if (operandTwo) {
        operandTwo += output;
    } else {
        if (operandOne === "0") {
            operandOne = output;
        } else {
            operandOne += output;
        }
    }
    refreshDisplay();
}

function refreshDisplay(solution) {
    if (solution) {
        display.textContent = solution;
    } else {
        display.textContent = `${operandOne} ${operator} ${operandTwo}`;
    } 
}

function clearDisplay(clearDigits) {
    if (clearDigits) {
        if (operandTwo) {
            operandTwo = "";
            refreshDisplay();
        } else {
            operandOne = "0";
            operator = "";
            refreshDisplay();
        }
    } else {
        operandOne = "0";
        operator = "";
        operandTwo = "";
        refreshDisplay();
    }
}

function calculateExpression() {
    const numberOne = parseInt(operandOne);
    const numberTwo = parseInt(operandTwo);
    let operatorToRun;
    if (operator === "+") {
        operatorToRun = "add";
    } else if (operator === "-") {
        operatorToRun = "sub";
    } else if (operator === "X") {
        operatorToRun = "mult";
    } else if (operator === "/") {
        operatorToRun = "div";
    }
   const solution = operate(operatorToRun, numberOne, numberTwo);
   clearDisplay();
   refreshDisplay(solution);
}















function addNumbers(numOne, numTwo) {
    return numOne + numTwo;
}

function subNumbers(numOne, numTwo) {
    return numOne - numTwo;
}

function multNumbers(numOne, numTwo) {
    return numOne * numTwo
}

function divNumbers(numOne, numTwo) {
    return numOne/numTwo;
}

function operate(operator, numOne, numTwo) {
    switch(operator) {
        case "add":
            return addNumbers(numOne, numTwo);
            break;
        case "sub":
            return subNumbers(numOne, numTwo);
            break;
        case "mult":
            return multNumbers(numOne, numTwo);
            break;
        case "div":
            return divNumbers(numOne, numTwo);
            break;
    }
}
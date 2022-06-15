const display = document.querySelector(".display");
const allClear = document.querySelector("#allClear");
const clear = document.querySelector('#clear');
const digit = document.querySelectorAll("#digit");
const opButton = document.querySelectorAll("#operator");
const equals = document.querySelector("#equals");
const negativeButton = document.querySelector("#negative");
let tempOperandOne = "0";
let tempOperator = "";
let tempOperandTwo = "";
let tempSolution = "";
display.textContent = `${tempOperandOne} ${tempOperator} ${tempOperandTwo}`;




//Calculator button logic

clear.addEventListener("click", () => clearDisplay(true));
allClear.addEventListener("click", () => clearDisplay());
equals.addEventListener("click", () => calculateExpression());
negativeButton.addEventListener("click", () => negative());

digit.forEach(item => {
    item.addEventListener('click', event => {
        updateDisplay(item.textContent);
    });
})

opButton.forEach(item => {
    item.addEventListener('click', event => {
        updateDisplay(item.textContent);
    });
})

function updateDisplay(output) {
    if ((output === "+" || output === "-" || output === "X" || output === "/") &&
    (!tempOperandTwo)) {
        tempOperator = output;
        refreshDisplay();
    } else if (tempOperandTwo) {
        calculateExpression();
        tempOperator = output;
        refreshDisplay();
    } else if (tempOperator && (!tempOperandTwo)) {
        tempOperandTwo = output;
    } else if (tempOperandTwo) {
        tempOperandTwo += output;
    } else {
        if (tempOperandOne === "0") {
            tempOperandOne = output;
        } else {
            tempOperandOne += output;
        }
    }
    refreshDisplay();
}

function negative() {
    console.log('test');
    if (tempOperandTwo && (!tempOperandTwo.includes("-"))) {
        tempOperandTwo = "-" + tempOperandTwo;
        refreshDisplay();
    } else if (tempOperandTwo) {
        tempOperandTwo = tempOperandTwo.replace("-", "");
        refreshDisplay();
    } else if (!tempOperandOne.includes("-")) {
        tempOperandOne = "-" + tempOperandOne;
        refreshDisplay();
    } else {
        tempOperandOne = tempOperandOne.replace("-", "");
        refreshDisplay();
    }
}

function refreshDisplay(solution) {
    if (solution) {
        tempSolution = "";
        tempOperandOne = solution;
        display.textContent = `${tempOperandOne} ${tempOperator} ${tempOperandTwo}`;
    } else {
        display.textContent = `${tempOperandOne} ${tempOperator} ${tempOperandTwo}`;
    } 
}

function clearDisplay(clearDigits) {
    if (clearDigits) {
        if (tempOperandTwo) {
            tempOperandTwo = "";
            refreshDisplay();
        } else {
            tempOperandOne = "0";
            tempOperandTwo = "";
            tempSolution = "";
            tempOperator = "";
            refreshDisplay();
        }
    } else if (!tempSolution) {
        tempOperandOne = "0";
        tempOperator = "";
        tempOperandTwo = "";
        refreshDisplay();
    } else {
        tempOperandOne = tempSolution;
        tempOperator = "";
        tempOperandTwo = "";
        refreshDisplay();
    }
}

function calculateExpression() {
    const numberOne = parseInt(tempOperandOne);
    const numberTwo = parseInt(tempOperandTwo);
    let tempOperatorToRun;
    if (tempOperator === "+") {
        tempOperatorToRun = "add";
    } else if (tempOperator === "-") {
        tempOperatorToRun = "sub";
    } else if (tempOperator === "X") {
        tempOperatorToRun = "mult";
    } else if (tempOperator === "/") {
        tempOperatorToRun = "div";
    }
   tempSolution = operate(tempOperatorToRun, numberOne, numberTwo);
   clearDisplay();
   refreshDisplay(tempSolution);
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

function operate(tempOperator, numOne, numTwo) {
    switch(tempOperator) {
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
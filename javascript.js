const display = document.querySelector(".display");
const allClear = document.querySelector("#allClear");
const clear = document.querySelector('#clear');
const inputButton = document.querySelectorAll("#inputButton");
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

inputButton.forEach(item => {
    item.addEventListener('click', event => {
        handleInput(item.textContent);
    });
})

function handleInput(input) {
    if (input === ".") {
        addDecimal();
    } else if (input === "+" || input === "-" || input === "X" || input === "/") {
        addOperator(input);
    } else if (tempOperator && (!tempOperandTwo)) {
        tempOperandTwo = input;
    } else if (tempOperandTwo) {
        tempOperandTwo += input;
    } else {
        if (tempOperandOne === "0") {
            tempOperandOne = input;
        } else {
            tempOperandOne += input;
        }
    }
    refreshDisplay();
}


function addDecimal() {
    if ((tempOperandTwo) && ((!tempOperandTwo.includes(".")))) {
        tempOperandTwo += ".";
        refreshDisplay();
    } else if ((tempOperandOne) && ((!tempOperandOne.includes(".")))) {
        tempOperandOne += ".";
        refreshDisplay();
    }
}

function addOperator(input) {
    if (!tempOperandTwo) {
        tempOperator = input;
        refreshDisplay();
    } else {
        calculateExpression();
        tempOperator = input;
        refreshDisplay();
    }
}
function negative() {
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

//Display logic. refreshDisplay is called through the application to reflect
//user input in real time as a calculator would. clearDisplay handles logic
//for the C and AC keys, but is called whenever the screen neds to be cleared.

function refreshDisplay(solution) {
    if (solution) {
        tempSolution = "";
        tempOperandOne = String(solution);
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
    const numberOne = parseFloat(tempOperandOne);
    const numberTwo = parseFloat(tempOperandTwo);
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













//Math logic

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
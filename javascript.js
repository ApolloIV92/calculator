const display = document.querySelector(".output");
const displaySmall = document.querySelector(".outputSmall");
const allClear = document.querySelector("#allClear");
const clear = document.querySelector('#clear');
const inputButton = document.querySelectorAll("#inputButton");
const equals = document.querySelector("#equals");
const negativeButton = document.querySelector("#negative");
let tempOperandOne = "0";
let storedOperandOne = "";
let tempOperator = "";
let storedOperator = "";
let tempOperandTwo = "";
let tempSolution = "";
display.textContent = `${tempOperandOne} ${tempOperator} ${tempOperandTwo}`;
displaySmall.textContent = `${storedOperandOne} ${storedOperator}`;




//Calculator button logic

clear.addEventListener("click", () => clearCharacter());

allClear.addEventListener("click", () => fullClearDisplay());

equals.addEventListener("click", () => calculateExpression());

negativeButton.addEventListener("click", () => negative());

document.addEventListener("keydown", (e) => keyInput(e.key));

inputButton.forEach(item => {
    item.addEventListener('click', event => {
        handleInput(item.textContent);
    });
})

function keyInput(key) {
    switch (key) {
        case "+":
            handleInput(key);
            break;
        case "-":
            handleInput(key);
            break;
        case "*":
            handleInput(key);
            break;
        case "/":
            handleInput(key);
            break;
        case ".":
            handleInput(key);
            break;
        case "1":
            handleInput(key);
            break;
        case "2":
            handleInput(key);
            break;
        case "3":
            handleInput(key);
            break;
        case "4":
            handleInput(key);
            break;
        case "5":
            handleInput(key);
            break;
        case "6":
            handleInput(key);
            break;
        case "7":
            handleInput(key);
            break;
        case "8":
            handleInput(key);
            break;
        case "9":
            handleInput(key);
            break;
        case "0":
            handleInput(key);
            break;
        case "Enter":
            calculateExpression();
            break;
        case "Backspace":
            fullClearDisplay();
            break;
        case "Delete":
            clearCharacter();
            break;
        default:
            break;
        }
    }
//console.log(Boolean(parseInt(key)));



function handleInput(input) {
    if (input === ".") {
        addDecimal();
    } else if (input === "+" || input === "-" || input === "X" || input === "/") {
        addOperator(input);
    } else {
        addInteger(input);
    }
    refreshDisplay();
}

function addInteger(input) {
    if (storedOperator && (!tempOperandTwo) || tempOperandTwo === "0") {
        tempOperandTwo = input;
    } else if (tempOperandTwo) {
        if (display.textContent.length<15) {
            tempOperandTwo += input;
        } else {
            return;
        }
    } else {
        if (tempOperandOne === "0") {
            tempOperandOne = input;
        } else {
            if (display.textContent.length<15) {
                tempOperandOne += input;
        } else {
            return;
        }
        }
    }
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
        storedOperator = input;
        storedOperandOne = tempOperandOne;
        tempOperandOne = "0";
        refreshDisplay();
    } else {
        calculateExpression();
        storedOperator = input;
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
//user input in real time as a calculator would. fullClearDisplay handles logic
//for the C and AC keys, but is called whenever the screen neds to be cleared.


function fullClearDisplay() {
    tempOperandOne = "0";
    tempOperandTwo = "";
    tempOperator = "";
    storedOperandOne = "";
    storedOperator = "";
    refreshDisplay();
    }

function clearCharacter() {
    if (tempOperandTwo) {
        tempOperandTwo = "0";
        refreshDisplay();
    } else {
        tempOperandOne = "0";
        refreshDisplay();
    }
}

//function refreshDisplay(solution) {
//    if (solution) {
//        tempSolution = "";
//        tempOperandOne = String(solution);
//        display.textContent = `${tempOperandOne}`;
//        displaySmall.textContent = "";
//   } else if (tempOperator) {
//        displaySmall.textContent = `${tempOperandOne} ${tempOperator}`;
//    }
//    if (tempOperandTwo) {
//        display.textContent = `${tempOperandTwo}`;
//    } else {
//        display.textContent = `${tempOperandOne}`
//    }
//}

function refreshDisplay(solution) {
    if (solution) {
        tempSolution = "";
        tempOperandOne = String(solution);
        display.textContent = `${tempOperandOne}`;
        displaySmall.textContent = "";
        return;
    } 
    displaySmall.textContent = `${storedOperandOne} ${storedOperator}`;
    if (!tempOperandTwo) {
    display.textContent = `${tempOperandOne}`;
    } else {
        display.textContent = `${tempOperandTwo}`;
    }
}

function calculateExpression() {
    if (!storedOperandOne) {
        refreshDisplay(tempOperandOne);
        return;
    } else if (storedOperandOne && storedOperator) {
        refreshDisplay(storedOperandOne);
        return;
    }
    const numberOne = parseFloat(storedOperandOne);
    const numberTwo = parseFloat(tempOperandTwo);
    let tempOperatorToRun;
    if (storedOperator === "+") {
        tempOperatorToRun = "add";
    } else if (storedOperator === "-") {
        tempOperatorToRun = "sub";
    } else if (storedOperator === "X") {
        tempOperatorToRun = "mult";
    } else if (storedOperator === "/") {
        tempOperatorToRun = "div";
    }
   tempSolution = operate(tempOperatorToRun, numberOne, numberTwo);
   fullClearDisplay();
   if (tempSolution === Infinity) {
    tempSolution = "ERROR";
   }
   if (tempSolution > 9999999999999) {
    tempSolution = scientificNotation(tempSolution);
   }
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

function scientificNotation(input) {
    const numInSciNot = {};
    [numInSciNot.coefficient, numInSciNot.exponent] =
      input.toExponential().split('e').map(item => Number(item));
      return `${numInSciNot.coefficient.toFixed(7)} x 10^${numInSciNot.exponent}`;
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
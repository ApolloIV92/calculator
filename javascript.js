const display = document.querySelector(".display");
const allClear = document.querySelector("#allClear");
const clear = document.querySelector('#clear');
const digit = document.querySelectorAll("#digit");
const operatorObj = document.querySelectorAll("#operator");
let temp = 0;
let operandOne = "0";
let operator = "";
let operandTwo = "";
display.textContent = `${operandOne} ${operator} ${operandTwo}`;




//Calculator button logic

clear.addEventListener("click", () => clearDisplay(true));
allClear.addEventListener("click", () => clearDisplay());

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
    if (output === "+" || output === "-" || output === "X" || output === "/") {
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

function refreshDisplay() {
    display.textContent = `${operandOne} ${operator} ${operandTwo}`;
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
        case operator="add":
            return addNumbers(numOne, numTwo);
            break;
        case operator="sub":
            return subNumbers(numOne, numTwo);
            break;
        case operator="mult":
            return multNumbers(numOne, numTwo);
            break;
        case operator="div":
            return multNumbers(numOne, numTwo);
            break;
    }
}
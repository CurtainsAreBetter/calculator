/*========================
        Math Functions
========================*/

// verify two inputs are numbers
function numVerify(a, b) {
    if (typeof a == 'number' && typeof b == 'number') {
        return true;
    }
    return false;
}

function add(a, b) {
    if (numVerify(a, b)) {
        return a + b;
    }
    return 'ERROR';
}

function subtract(a ,b) {
    if (!numVerify(a, b)) {
        return 'ERROR'
    }
    return a - b;
}

function multiply(a ,b) {
    if (!numVerify(a, b)) {
        return 'ERROR'
    }
    return a * b;
}

function divide(a ,b) {
    if (!numVerify(a, b)) {
        return 'ERROR'
    }
    return a / b;
}

function operate (operator, a, b){
    switch(operator) {
        case '+':
            return add(a, b);
        case '−':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            return 'ERROR';
    }
}

/*===========================
        GLOBAL VARIABLES
============================*/
        
const screen = document.querySelector('.screen');
let currentOperator; // see operate function for acceptable values
let screenMemory;
let clearScreenOnNumberPress = true; 

    
/*======================================
        Event Handler declarations 
========================================*/
// Number buttons
document.querySelectorAll('.number')
        .forEach((num) => {
            num.addEventListener('click', numberButtonAction);
        });

// clear button
document.querySelector('#clear')
        .addEventListener('click', clearButtonAction);

// equals button
document.querySelector('#equals')
        .addEventListener('click', equalsButtonAction);

// Operator buttons
document.querySelectorAll('.operator')
        .forEach((op) => {
            op.addEventListener('click', operatorButtonAction);
        });


/*=================================
            Utility Funcitons
===================================*/
function clearScreen() {
    screen.innerText = '';
}

/* ==================================
             Button Actions
=====================================*/

function numberButtonAction(e) {
    if(clearScreenOnNumberPress) {
        clearScreen();
        clearScreenOnNumberPress = false;
    }
    console.log(e.target.innerText);
    screen.innerText += e.target.innerText;
}

function clearButtonAction() {
    clearScreen();
    // empty global variables
    currentOperator = ''// see operate function for acceptable values
    screenMemory = ''
}

function equalsButtonAction() {
    return;
}


function operatorButtonAction(e) {
    return;
}




/*
                OUTLINE
 - Calculator should be able to handle standard input (num) (operator) (num) equals-sign 

 - Pressing operator to create a chain equation
    - When user has entered a number, an operator, another number, and then an operator
    - The equation should be evaluated
    - its answer should be set to the 'left side' of the equation
    - user should be able to then change the operator they chose without effecting this left side
    - up until a number is entered


                    BETTER OUTLINE
 - basic equations x (op) y = ans
 - chain equations a (op1) b (op2) c (op3) d = ans
                - a (op1) b ans is presented on op2 key press
                - calc waits for a number input before being willing to change (screenMemory)

*/

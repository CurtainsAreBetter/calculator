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
let lastNumberEntry;
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
    screen.textContent = '';
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
    screen.textContent += e.target.innerText;
}

function clearButtonAction() {
    clearScreen();
    // empty global variables
    currentOperator = ''// see operate function for acceptable values
    lastNumberEntry = ''
    clearScreenOnNumberPress = true;
}

function equalsButtonAction() {
    console.log('=');
    // evaluate
    // only evaluate if there's a current operator
    // and
    // two numbers to operate with
    
    // for future ref:
    // maybe add a check of clear button press
    // because what if you enter 100 and hit '+' then 
    // you hit '='?
    // you'd possibley get 200, idk yet because I can't test it yet
    if (currentOperator && lastNumberEntry) {
        const answer = operate(currentOperator, Number(lastNumberEntry), Number(screen.textContent));
        
        // place screen to past entry
        lastNumberEntry = screen.textContent;
        //update screen
        screen.textContent = answer;
        // set numberpress clear
        clearScreenOnNumberPress = true;

    }
}

function operatorButtonAction(e) {
    currentOperator = e.target.textContent
    if (lastNumberEntry){
        ans = operate(currentOperator, Number(lastNumberEntry), Number(screen.textContent))
        screen.textContent = ans;
    }
    lastNumberEntry = screen.textContent;
    clearScreenOnNumberPress = true;

    return;
    // this works without multi press funcitonality
    // update the current operator
    currentOperator = e.target.textContent;
    // add current screen to last number
    lastNumberEntry = screen.textContent;
    // set screen to clear on number press
    clearScreenOnNumberPress = true;


    return;
    // get which button of the operators was pressed
    const operator = e.target.innerText;
    console.log(operator);
    // set screen to clear on number press
    clearScreenOnNumberPress = true;
    // update global variable: currentOperator
    currentOperator = operator;
    // check if an evaluation should be run


    // do the operation
    // update the screen  
    
    // clear the previous # entry
    // don't set screen to clear
}
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
    const ans = operate(currentOperator, Number(screenMemory), Number(screen.innerText));
    if (typeof ans == 'number'){
        screen.innerText = ans;
    }
}


function operatorButtonAction(e) {
    //load current screen to screenMemory
    screenMemory = screen.innerText;
    // clear screen on the next number click
    clearScreenOnNumberPress = true;
    // save operator 
    currentOperator = e.target.innerText;
}






function oldequalsButtonAction() {
    if (currentOperator && screenMemory) {
        console.log('ye')
        const ans = operate(currentOperator, Number(screenMemory), Number(screen.innerText));
        screenMemory = screen.innerText;
        screen.innerText = ans;
        clearScreenOnNumberPress = true;
    }


    return;
    //old code
    console.log('=');
    // take previous number and evaluate with the # on screen
    // only do this is there is a previous number and an operator
    if (currentOperator && screenMemory) {
        // eval answer
        ans = operate(currentOperator, Number(screenMemory), Number(screen.innerText));
        // put what's on screen into lastNumber
        screenMemory = screen.innerText;
        // update screen with the answer
        screen.innerText = ans;
    }

    return;
    // evaluate
    // only evaluate if there's a current operator
    // and
    // two numbers to operate with
    
    // for future ref:
    // maybe add a check of clear button press
    // because what if you enter 100 and hit '+' then 
    // you hit '='?
    // you'd possibley get 200, idk yet because I can't test it yet
    if (currentOperator && screenMemory) {
        const answer = operate(currentOperator, Number(screenMemory), Number(screen.innerText));
        
        // place screen to past entry
        screenMemory = screen.innerText;
        //update screen
        screen.innerText = answer;
        // set numberpress clear
        clearScreenOnNumberPress = true;

    }
}

function oldoperatorButtonAction(e) {
    operator = e.target.innerText;
    currentOperator = operator;
    screenMemory = screen.innerText;
    clearScreenOnNumberPress = true;



    //old code
    return;
    
    // the code under here allows for eval at 2nd operator press but only if operator is same type
    // if not same type it takes on the new type
    currentOperator = e.target.innerText
    if (screenMemory){
        ans = operate(currentOperator, Number(screenMemory), Number(screen.innerText));
        screen.innerText = ans;
        currentOperator = '';
    }
    screenMemory = screen.innerText;
    clearScreenOnNumberPress = true;
}

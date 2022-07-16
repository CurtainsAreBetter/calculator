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
    return '';
}

function subtract(a ,b) {
    if (!numVerify(a, b)) {
        return '';
    }
    return a - b;
}

function multiply(a ,b) {
    if (!numVerify(a, b)) {
        return '';
    }
    return a * b;
}

function divide(a ,b) {
    if (!numVerify(a, b)) {
        return '';
    }
    return a / b;
}

function operate (operator, a, b){
    switch(operator) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
        default:
            return '';
    }
}

/*===========================
        GLOBAL VARIABLES
============================*/
        
const screen = document.querySelector('.screen');
let clearScreenOnNumberPress = true; 
// equation object
const eq = {
    leftSide: '',
    rightSide: '',
    operator: ''
}

// side actively taking input
leftSideActive = true;
    
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
            Utility Functions
===================================*/
function clearScreen() {
    screen.innerText = '';
}

function equate () {
    // check if possible
    for (key in eq) {
        if (!eq[key]) return;
    }
    // get answer, clear right side, set left side to answer, return answer
    const ans = operate(eq.operator, Number(eq.leftSide), Number(eq.rightSide));
    eq.rightSide = '';
    eq.leftSide = ans;
    // clear operator
    eq.operator = '';
    return ans;
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
    // reset eq obj
    for (const key in eq) {eq[key] = '';}
}

function equalsButtonAction() {
    const answer = equate();
    // debug
    if (answer) {
        console.log(answer);
    } else {console.log('Nothing to equate.');}
}


function operatorButtonAction(e) {
    if (eq.leftSide) {
        // if left side has content
        // check if operator has data
        if (eq.)

    } else {
        // if left side is empty
        // put what's on the screen into left side
        eq.leftSide = screen.innerText;
        // set the operator
        eq.leftSide = e.target.id;
        // set the screen to clear on press
        clearScreenOnNumberPress = true;
    }
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

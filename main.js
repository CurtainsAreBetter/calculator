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
    if (!numVerify(a, b)) {
        return NaN;
    }
    return a + b;
}

function subtract(a ,b) {
    if (!numVerify(a, b)) {
        return NaN;
    }
    return a - b;
}

function multiply(a ,b) {
    if (!numVerify(a, b)) {
        return NaN;
    }
    return a * b;
}

function divide(a ,b) {
    //const ROUNDINGPRECISION = 3;
    //const rp = 10
    if (!numVerify(a, b)) {
        return NaN;
    }
    //const num = a / b;
    // round
    //const out = Math.round((num + Number.EPSILON) * 10) / 10; 
    return a /b;
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
            return NaN;
    }
}


/*===========================
        GLOBAL VARIABLES
============================*/
const screen = document.querySelector('.screen');
let listenForNumberPress = true;
const eq = {
    leftSide: NaN,
    rightSide: NaN,
    operator: ''
}

/*=================================
            Utility Functions
===================================*/
function clearScreen() {
    screen.innerText = '';
}

function reset() {
    clearScreen();
    eq.leftSide = NaN;
    eq.rightSide = NaN;
    eq.operator = '';
    listenForNumberPress = true;
}

function equate() {

    const ans = operate(eq.operator, Number(eq.leftSide), Number(eq.rightSide));
    // check if operate could run
    if (!ans) {
        // debug
        console.log('operate could not provide a number');
        console.log(eq);
        return;
    }
    // if you can't get an answer, nothing happens
    // Otherwise...
    // reset without clearing the screen and update leftSide
    eq.rightSide = NaN;
    eq.leftSide = ans;
    eq.operator = '';
    listenForNumberPress = true;

    // return answer
    return ans;
}

/*=================================
          Action Functions
===================================*/
function decimalAction() {
    let out = screen.innerText;
    if (!out.includes('.')){
        screen.innerText += '.';
    }
}

function backspaceAction() {
    let out = screen.innerText;
    screen.innerText = out.slice(0, out.length-1);
}

function numberButtonAction(e) {
    if (listenForNumberPress) {
        clearScreen();
        listenForNumberPress = false;
    }
    // if statement to future proof for key press addon
    if (typeof e == 'object') {
        screen.innerText += e.target.innerText;
    } else {
        screen.innerText += e;
    }
}

function equalsButtonAction() {
    // set .rightSide if operator has been set
    if (eq.operator) {
        eq.rightSide = screen.innerText;
    }

    console.log('equate called by equalsButtonAction()');
    
    // handle zero
    if (eq.operator == 'divide' && eq.rightSide == 0) {
        equate();
        screen.innerText = "💀";
    }
    const ans = equate();
    if (ans) {
        screen.innerText = ans;
    }
}

function operatorButtonAction(e) {
    // if statement to future proof for keypress addon
    if (typeof e == 'object') {
        enteredOperator = e.target.id;
    } else {
        enteredOperator = e;
    }

    // if left side empty and screen has content
    if (!eq.leftSide) {
        if (screen.innerText) {
            // maybe try an && later but for now I'm worried it could mess with the else
            eq.leftSide = screen.innerText;
            eq.operator = enteredOperator;
            listenForNumberPress = true;   
        } 
    } else {
        // if left side has content
        // check for operator and that a number has been entered since the last operator call
        if (eq.operator && !listenForNumberPress) {
            console.log('chain triggered');
            // set rightSide 
            eq.rightSide = screen.innerText;
            screen.innerText = equate();
            eq.operator = enteredOperator;
        } else {
            //  no operator has been pressed but there IS a left side entry
            // this would be caused by an equals statement
            if (!(screen.innerText == eq.leftSide)) {
                // checks if the number on the screen is the same as on the leftSide
                // if not, change the leftSide to what's on the screen
                eq.leftSide = screen.innerText;
            }
            eq.operator = enteredOperator;
            listenForNumberPress = true;
        }
    }
}

function keyDownAction(e) {
    const key = e.key;
    // numbers 
    if (Number(key) || key == 0) {
        numberButtonAction(key);
        return;
    }
    // operators
    let opEntry = '';
    switch(key) {
        case '/':
            opEntry = 'divide';
            operatorButtonAction(opEntry);
            break;
        case '*':
            opEntry = 'multiply';
            operatorButtonAction(opEntry);
            break;
        case '+':
            opEntry = 'add';
            operatorButtonAction(opEntry);
            break;
        case '-':
            opEntry = 'subtract';
            operatorButtonAction(opEntry);
            break;
    }
    // equals
    // use = and enter
    if (key == '=' || key == 'Enter') {
        equalsButtonAction();
        return;
    }
    if (key.toUpperCase() == 'C') {
        reset();
        return;
    }
    if (key == 'Backspace') {
        backspaceAction();
        return;
    }
    // decimal
    if (key == '.') {
        decimalAction();
        return;
    }
}

/*======================================
        Event Handler declarations 
========================================*/
// Decimal
document.querySelector('#decimal')
        .addEventListener('click', decimalAction);
// Backspace
document.querySelector('#delete')
        .addEventListener('click', backspaceAction);
// Numbers
document.querySelectorAll('.number')
        .forEach((num) => {
            num.addEventListener('click',
            numberButtonAction);
        });

// Clear
document.querySelector('#clear')
        .addEventListener('click', reset);

// Equals
document.querySelector('#equals')
        .addEventListener('click', equalsButtonAction);

// Operators
document.querySelectorAll('.operator')
        .forEach((op) => {
            op.addEventListener('click',
            operatorButtonAction);
        });

// Keypress
document.addEventListener('keydown', keyDownAction);
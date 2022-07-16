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

numAfterOpSet = false;
    
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
        if (!eq[key]) return screen.innerText;
    }
    // get answer, clear right side, set left side to answer, return answer
    const ans = operate(eq.operator, Number(eq.leftSide), Number(eq.rightSide));
    eq.rightSide = '';
    eq.leftSide = ans;
    // clear operator
    eq.operator = '';
    // set screen to clear on number press
    clearScreenOnNumberPress = true;
    numAfterOpSet = false;
    return ans;
}

// NOTE TO SELF
// clearScreenOnNum and numAfterOp
// I think I can combine them...
// read through the code once you've got this working

/* ==================================
             Button Actions
=====================================*/

function numberButtonAction(e) {
    if (!numAfterOpSet) {
        numAfterOpSet = true;
    }
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
    // get right side
    // only get right side if there's an operator
    if (eq.operator) {
        eq.rightSide = screen.innerText;
    }
    if (!numAfterOpSet) {
        console.log('skipped because no number after operater press');
        return;
    }
    const answer = equate();
    screen.innerText = answer;
    // debug
    if (answer) {
        console.log(answer);
    } else {console.log('Nothing to equate.');}
}


function operatorButtonAction(e) {
    const enteredOperator = e.target.id;
    
    if (eq.leftSide) {
        // if left side has content
        // check if an operator has been chosen and if a number has been entered afterwards
        if (eq.operator && numAfterOpSet) {
            // if so
            // set rightSide, equate, update screen, set new operator, and set numAfterOpSet to false
            eq.rightSide = screen.innerText;
            screen.innerText = equate();
            console.log('chain gang');
            console.log(enteredOperator);
            eq.operator = enteredOperator;
            numAfterOpSet = false;
        } else {
            // no operator has been chosen yes or number hasn't been entered yet
            // either way, change the operator and...
            // set numAfterOpSet to false
            // set clear screen on number to true
            console.log('wha');
            eq.operator = enteredOperator;
            numAfterOpSet = false;
            clearScreenOnNumberPress = true;
        }
    } else {
        // if there's no number on the left side
        // check if there's a number on the screen
        if (screen.innerText) {
            // if number on the screen, add it to the left side
            eq.leftSide = screen.innerText;
            // set operator
            eq.operator = enteredOperator;
            // set numAfterOpSet and clearScreenOnNumberPress
            numAfterOpSet = false;
            clearScreenOnNumberPress = true;
        }
    }
}

function oldoperatorButtonAction(e) {
    if (eq.leftSide) {
        // if left side has content
        // check if operator has data
        // no operator means an equation has just run (or clear was run)
        if (eq.operator && numAfterOpSet) {
            // if there's an operator
            // and a number has been entered after setting that operator (i.e operator wasn't just being changed)
            // set right side
            eq.rightSide = screen.innerText;
            // equate
            screen.innerText = equate();

        } else {
            // if no operator
            // add operator... 
            // and set number entry after operator entry to false
            eq.operator = e.target.id;
            numAfterOpSet = false;
        }

    } else {
        // if left side is empty
        // put what's on the screen into left side
        eq.leftSide = screen.innerText;
        // set the operator
        eq.operator = e.target.id;
        // set the screen to clear on press
        clearScreenOnNumberPress = true;
        // set number after operator pressed to false
        numAfterOpSet = false;
    }
}


clearButtonAction();
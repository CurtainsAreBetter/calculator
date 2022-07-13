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
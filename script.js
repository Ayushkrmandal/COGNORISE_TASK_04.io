let currentInput = '';
let firstOperand = null;
let operator = null;

function updateDisplay() {
    let displayText = '';

     if (firstOperand !== null) {
        displayText = `${firstOperand} ${operator || ''} ${currentInput}`;
    } else {
        displayText = currentInput;
    }

    if (operator === null && firstOperand === null) {
        displayText = currentInput; 
    }

    document.getElementById('display').textContent = displayText;
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return; 
    
    if (number === '0' || number === '00') {
               if (currentInput === '0') {
            currentInput = number; 
        } else {
            currentInput = currentInput + number; 
        }
    } else {
        
        if (currentInput === '0') {
            currentInput = number; 
        } else {
            console.log(currentInput);
            currentInput += number; 
            console.log(currentInput);
        }
    }

    updateDisplay();
}

function setOperation(op) {
    if (currentInput === '') return; 
    
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else if (operator) {
        calculate(); 
    }
    operator = op;
    currentInput = '';
    updateDisplay();
}

function calculate() {
    if (firstOperand === null || currentInput === '' || operator === null) return;
    
    let result;
    const secondOperand = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            if (secondOperand === 0) {
                alert('Cannot divide by zero');
                clearDisplay();
                return;
            }
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = null;
    firstOperand = null;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    firstOperand = null;
    operator = null;
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0'; 
    }
    updateDisplay();
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('operator')) {
            setOperation(this.textContent);
        } else if (this.classList.contains('clear')) {
            clearDisplay();
        } else if (this.classList.contains('backspace')) {
            backspace();
        } else if (this.textContent === '=') {
            calculate();
        } else {
            appendNumber(this.textContent);
        }
    });
});

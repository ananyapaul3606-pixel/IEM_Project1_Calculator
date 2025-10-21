let display = document.getElementById('display');
let history = document.getElementById('history');
let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function updateHistory(text) {
    history.textContent = text;
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }

    if (num === 'π') {
        currentInput = currentInput === '0' ? Math.PI.toString() : currentInput + '*' + Math.PI.toString();
    } else if (num === 'e') {
        currentInput = currentInput === '0' ? Math.E.toString() : currentInput + '*' + Math.E.toString();
    } else {
        currentInput = currentInput === '0' && num !== '.' ? num : currentInput + num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (shouldResetDisplay) {
        shouldResetDisplay = false;
    }

    if (currentInput !== '' && !isNaN(currentInput.slice(-1))) {
        currentInput += op;
        updateDisplay();
    }
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
    updateDisplay();
    updateHistory('');
}

function clearEntry() {
    currentInput = '0';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculateFunction(func) {
    try {
        let result;
        let num = parseFloat(currentInput);

        switch (func) {
            case 'sin':
                result = Math.sin(num * Math.PI / 180);
                break;
            case 'cos':
                result = Math.cos(num * Math.PI / 180);
                break;
            case 'tan':
                result = Math.tan(num * Math.PI / 180);
                break;
            case 'log':
                result = Math.log10(num);
                break;
            case 'ln':
                result = Math.log(num);
                break;
            case 'sqrt':
                result = Math.sqrt(num);
                break;
            case 'pow2':
                result = Math.pow(num, 2);
                break;
            case 'pow':
                // For x^y, we'll use the current input as base and prompt for exponent
                let exponent = prompt('Enter exponent:');
                result = Math.pow(num, parseFloat(exponent));
                break;
            case 'factorial':
                result = factorial(Math.floor(num));
                break;
            case 'inverse':
                result = 1 / num;
                break;
            case 'percent':
                result = num / 100;
                break;
        }

        updateHistory(`${func}(${currentInput}) =`);
        currentInput = result.toString();
        shouldResetDisplay = true;
        updateDisplay();
    } catch (error) {
        display.innerHTML = '<span class="error">Error</span>';
        currentInput = '0';
    }
}

function factorial(n) {
    if (n < 0) throw new Error('Factorial of negative number');
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function calculate() {
    try {
        // Replace display symbols with JavaScript operators
        let expression = currentInput
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/π/g, Math.PI)
            .replace(/e/g, Math.E);

        // Evaluate the expression
        let result = eval(expression);

        updateHistory(`${currentInput} =`);
        currentInput = result.toString();
        shouldResetDisplay = true;
        updateDisplay();
    } catch (error) {
        display.innerHTML = '<span class="error">Error</span>';
        currentInput = '0';
    }
}

// Keyboard support
document.addEventListener('keydown', function (event) {
    const key = event.key;

    if ('0123456789'.includes(key)) {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+') {
        appendOperator('+');
    } else if (key === '-') {
        appendOperator('-');
    } else if (key === '*') {
        appendOperator('*');
    } else if (key === '/') {
        event.preventDefault();
        appendOperator('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

// Initialize display
updateDisplay();
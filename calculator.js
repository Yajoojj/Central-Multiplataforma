// Calculadora
let currentValue = '0';
let history = [];
const maxHistory = 5;

// Elementos
const display = document.getElementById('display');
const historyElement = document.getElementById('history');

// Funções
const updateDisplay = () => {
    display.textContent = currentValue;
    historyElement.textContent = history.slice(0, maxHistory).join(' → ');
};

const addNumber = (num) => {
    if (currentValue === '0' || currentValue === 'Erro') {
        currentValue = num.toString();
    } else {
        currentValue += num.toString();
    }
    updateDisplay();
};

const addOperation = (op) => {
    const lastChar = currentValue.slice(-1);
    const operators = ['+', '-', '*', '/', '^'];
    
    if (operators.includes(lastChar)) {
        currentValue = currentValue.slice(0, -1) + op;
    } else {
        currentValue += op;
    }
    updateDisplay();
};

const addDecimal = () => {
    if (!currentValue.includes('.')) {
        currentValue += '.';
        updateDisplay();
    }
};

const clearDisplay = () => {
    currentValue = '0';
    updateDisplay();
};

const calculate = () => {
    try {
        let expression = currentValue
            .replace(/√/g, 'Math.sqrt')
            .replace(/π/g, Math.PI)
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/log/g, 'Math.log10')
            .replace(/ln/g, 'Math.log')
            .replace(/\^/g, '**');

        const result = eval(expression).toString();
        history.unshift(`${currentValue} = ${result}`);
        currentValue = result;
        updateDisplay();
    } catch (error) {
        currentValue = 'Erro';
        updateDisplay();
        setTimeout(clearDisplay, 1500);
    }
};

// Event Listeners
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') addNumber(parseInt(e.key));
    if (['+', '-', '*', '/'].includes(e.key)) addOperation(e.key);
    if (e.key === 'Enter') calculate();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === '.') addDecimal();
});

// Inicialização
updateDisplay();

// Conversor de Unidades
const converterElements = {
    input: document.getElementById('converterInput'),
    type: document.getElementById('converterType'),
    result: document.getElementById('conversionResult'),
    button: document.getElementById('convertButton')
};

const conversions = {
    celsiusToFahrenheit: (val) => (val * 9/5) + 32,
    fahrenheitToCelsius: (val) => (val - 32) * 5/9,
    kmToMiles: (val) => val * 0.621371,
    milesToKm: (val) => val * 1.60934,
    kgToPounds: (val) => val * 2.20462,
    poundsToKg: (val) => val * 0.453592
};

function convertUnits() {
    const inputValue = parseFloat(converterElements.input.value);
    
    if (isNaN(inputValue)) {
        converterElements.result.textContent = "Insira um valor válido!";
        return;
    }

    const conversionType = converterElements.type.value;
    const result = conversions[conversionType](inputValue);
    const [fromUnit, toUnit] = converterElements.type.options[converterElements.type.selectedIndex].text.split(' → ');
    
    converterElements.result.innerHTML = `
        ${inputValue.toFixed(2)} ${fromUnit} = 
        <strong>${result.toFixed(2)} ${toUnit}</strong>
    `;
}

// Event Listeners
converterElements.button.addEventListener('click', convertUnits);
converterElements.input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') convertUnits();
});
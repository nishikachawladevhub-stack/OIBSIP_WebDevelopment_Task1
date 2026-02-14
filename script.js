const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn, .btn-light, .btn-equal");

let currentInput = "0";
let previousInput = null;
let operator = null;
let justCalculated = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function clearAll() {
  currentInput = "0";
  previousInput = null;
  operator = null;
  justCalculated = false;
  updateDisplay();
}

function deleteLast() {
  if (justCalculated) return;
  if (currentInput.length === 1) {
    currentInput = "0";
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

function inputNumber(value) {
  if (justCalculated) {
    currentInput = value;
    justCalculated = false;
  } else if (currentInput === "0" && value !== ".") {
    currentInput = value;
  } else {
    // Prevent multiple decimals
    if (value === "." && currentInput.includes(".")) return;
    currentInput += value;
  }
  updateDisplay();
}

function chooseOperator(op) {
  if (previousInput === null) {
    previousInput = currentInput;
  } else if (!justCalculated) {
    // If an operator is pressed twice, calculate intermediate result
    calculate();
    previousInput = currentInput;
  }
  operator = op;
  justCalculated = false;
  currentInput = "0";
}

function calculate() {
  if (operator === null || previousInput === null) return;

  const a = parseFloat(previousInput);
  const b = parseFloat(currentInput);
  let result = 0;

  if (operator === "+") {
    result = a + b;
  } else if (operator === "-") {
    result = a - b;
  } else if (operator === "*") {
    result = a * b;
  } else if (operator === "/") {
    if (b === 0) {
      currentInput = "Error";
      previousInput = null;
      operator = null;
      updateDisplay();
      justCalculated = true;
      return;
    }
    result = a / b;
  }

  currentInput = String(result);
  previousInput = null;
  operator = null;
  justCalculated = true;
  updateDisplay();
}

// Attach event listeners
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const value = button.dataset.value || button.textContent;

    if (action === "clear") {
      clearAll();
    } else if (action === "delete") {
      deleteLast();
    } else if (action === "operator") {
      chooseOperator(value);
    } else if (action === "equals") {
      calculate();
    } else {
      // Number or decimal
      inputNumber(value);
    }
  });
});

// Initialize display
updateDisplay();



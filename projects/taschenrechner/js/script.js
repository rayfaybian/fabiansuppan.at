const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");

const display = document.querySelector(".calculator__display");

function doLog() {
  console.log("firstValue: " + calculator.dataset.firstValue);
  console.log("operator: " + calculator.dataset.operator);
  console.log("secondValue: " + calculator.dataset.secondValue);
  console.log("modValue: " + calculator.dataset.modValue);
  console.log("calcValue: " + calculator.dataset.calcValue);
  console.log("previousKeyType: " + calculator.dataset.previousKeyType);
}

// Perform calculation and return calculated value
const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === "add") return firstNum + secondNum;
  if (operator === "subtract") return firstNum - secondNum;
  if (operator === "multiply") return firstNum * secondNum;
  if (operator === "divide") return firstNum / secondNum;
};

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-pressed")
    );

    

    if (!action) {
      if (
        displayedNum === "0" ||
        calculator.dataset.previousKeyType === "operator" ||
        calculator.dataset.previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
      console.log("number key!");
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      key.classList.add("is-pressed");

      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (
        firstValue &&
        operator &&
        calculator.dataset.previousKeyType !== "operator" &&
        calculator.dataset.previousKeyType !== "calculate"
      ) {
        let calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;

        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;

      console.log("operator key!");
      console.log(calculator.dataset.previousKeyType);
      doLog();
    }

    if (action === "decimal") {
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (
        calculator.dataset.previousKeyType === "operator" ||
        calculator.dataset.previousKeyType === "calculate"
      ) {
        display.textContent = "0.";
      }
      calculator.dataset.previousKeyType = "decimal";
      console.log("decimal key!");
      console.log(calculator.dataset.previousKeyType);
    }

    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
  
      } else {
        key.textContent = "AC";
      }
      Array.from(display.parentNode.children).forEach((d) =>
      d.classList.remove("error")
    );
      display.textContent = 0;
      calculator.dataset.previousKeyType = "clear";

      console.log("clear key!");
      calculator.dataset.previousKeyType = "clear";
    }

    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue) {
        if (calculator.dataset.previousKeyType === "calculate") {
          calculator.dataset.firstValue = displayedNum;
          calculator.dataset.secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }

      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";

      doLog();

      console.log("equal key!");
    }
    var n = display.textContent.length;

    if (n > 10) {
      display.textContent = 'ERROR' +  + "Number to long";
      display.classList.add("error");
    }

    console.log("LÄNGE: " + n);

    if (action !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }
  }
});

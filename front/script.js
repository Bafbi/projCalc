class Calculator {
  calcule = '';
  resultat = '';
  previousCalcule = '';
  timer = 0;

  constructor(calculeTextElement, resultatTextElement, scoreboard) {
    this.calculeTextElement = calculeTextElement;
    this.resultatTextElement = resultatTextElement;
    this.scoreboard = scoreboard;
    this.clear();
  }

  clear() {
    this.previousCalcule = this.calcule;
    this.calcule = '';
    this.resultat = '';
    this.timer = Date.now();
  }

  delete() {
    // if there is no calcule, get the last calcule
    if (this.calcule === '') {
      this.calcule = this.previousCalcule;
      return;
    }
    this.calcule = this.calcule.toString().slice(0, -1);
  }

  appendNumber(number) {
    this.calcule = this.calcule.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.calcule === '') {
      if (this.resultat === '') return;
      this.calcule = this.resultat;
    }
    this.calcule = this.calcule.toString() + operation.toString();
  }

  async compute() {
    try {
      this.resultat = eval(
        this.calcule
          .replace(new RegExp('x', 'g'), '*')
          .replace(new RegExp('÷', 'g'), '/'),
      ).toFixed(2);
      const res = await fetch('/time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          calcule: this.calcule,
          time: Date.now() - this.timer,
        }),
      });
      const [top, mean] = await res.json();

      this.timer = Date.now();
      scoreboard.innerHTML = `Your last calcule: ${this.calcule
        } was faster than ${Math.floor(top * 100)}% of the players, because the mean is ${mean}ms}`;
    } catch (error) {
      this.resultat = 'Err';
      const res = await fetch('/error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const errors = await res.json();
      scoreboard.innerHTML = `Your last calcule: ${this.calcule
        } has an error, you have make ${errors[0]
        } errors, the last time was ${new Date(errors[1])}`;
    }
    this.previousCalcule = this.calcule;
    this.calcule = '';


  }

  updateDisplay() {
    this.calculeTextElement.value = this.calcule;
    this.resultatTextElement.value = this.resultat;
  }
}

// get the buttons and the display
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const calculeTextElement = document.querySelector('[data-calcule]');
const resultatTextElement = document.querySelector('[data-resultat]');
const scoreboard = document.querySelector('[data-scoreboard]');
// create a new calculator
const calculator = new Calculator(
  calculeTextElement,
  resultatTextElement,
  scoreboard,
);

// add event listeners to the buttons
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.attributes['data-number'].value);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.attributes['data-operation'].value);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

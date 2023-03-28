class Calculator {

    calcule = ''
    resultat = ''
    previousCalcule = ''

    constructor(calculeTextElement, resultatTextElement) {
        this.calculeTextElement = calculeTextElement
        this.resultatTextElement = resultatTextElement
        this.clear()
    }

    clear() {
        this.previousCalcule = this.calcule
        this.calcule = ''
        this.resultat = ''
    }

    delete() {
        // if there is no calcule, get the last calcule
        if (this.calcule === '') {
            this.calcule = this.previousCalcule
            return
        }
        this.calcule = this.calcule.toString().slice(0, -1)
    }

    appendNumber(number) {
        this.calcule = this.calcule.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.calcule === '') {
            if (this.resultat === '') return
            this.calcule = this.resultat
        }
        this.calcule = this.calcule.toString() + operation.toString()
    }

    compute() {
        let resultat
        try {
            resultat = eval(this.calcule.replace('x', '*').replace('÷', '/'))
        }
        catch (error) {
            resultat = 'Err'
            console.log(error);
        }
        this.resultat = resultat.toFixed(2)
        this.previousCalcule = this.calcule
        this.calcule = ''
    }

    updateDisplay() {
        this.calculeTextElement.value = this.calcule
        this.resultatTextElement.value = this.resultat
    }
}

// get the buttons and the display
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const calculeTextElement = document.querySelector('[data-calcule]')
const resultatTextElement = document.querySelector('[data-resultat]')
// create a new calculator
const calculator = new Calculator(calculeTextElement, resultatTextElement)

// add event listeners to the buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.attributes['data-number'].value)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.attributes['data-operation'].value)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})



class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.operations = ['+', '-', '*', '÷'];
        this.clear()
        this.allowZero = true
        this.computation = ''
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = ''
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.') || !this.allowZero) return
        
        if (this.currentOperand === '0' && number !== '.') return (this.currentOperand = '')

        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        const updatedOperand = this.previousOperand + this.currentOperand;
        if (this.operations.some((op) => updatedOperand.charAt(updatedOperand.length - 1) === op)) return;

        this.previousOperand = updatedOperand + operation
        this.currentOperand = ''
        // this.currentOperand = operation

    }

    compute() {
        let operation = this.previousOperand.charAt(this.previousOperand.length - 1);
        const prev = parseFloat(this.previousOperand.slice(0, this.previousOperand.length - 1))
        const current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) return

        let computation
        switch (operation) {
            case '÷':
                computation = prev / current
                break
            case '*':
                computation = prev * current
                break;
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            default:
                return;
        }

        this.currentOperand = String(computation);
        this.previousOperand = ''
    }   

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', event => {
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
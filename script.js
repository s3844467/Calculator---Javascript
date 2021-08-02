class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
  
    addNumberToScreen(number) {
      if (number == '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  
    chooseOperation(operation) {
      if (this.currentOperand == '') return
      if (this.previousOperand != '')
      {
        this.calculate()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
      
    }
  
    calculate() {
      let calc 
      const previousNumber = parseFloat(this.previousOperand)
      const currentNumber = parseFloat(this.currentOperand)
      if (isNaN(previousNumber) || isNaN(currentNumber)) return
      switch (this.operation) {
        case '+':
          calc = previousNumber + currentNumber
          break
        case '-':
          calc = previousNumber - currentNumber
          break
        case '*':
          calc = previousNumber * currentNumber
          break
        case '÷':
          calc = previousNumber / currentNumber
          break
        default:
          return
      }

      this.currentOperand = calc
      this.operation = undefined
      this.previousOperand = ''
    }

    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
    }
  }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
      }

      this.previousOperandTextElement.innerText = this.previousOperand
  }
}
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const acButton = document.querySelector('[data-ac]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.addNumberToScreen(button.innerText)
      calculator.updateDisplay()
    })
  })

  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })

  equalsButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.updateDisplay()
  })

  acButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })

  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export default class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = undefined;
        this.styles = ['orange', 'blue', 'pink'];
        this.nextStyle = 1;
        this.updateDisplay();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const keys = document.querySelector('.calculator__keys');
        keys.addEventListener('click', e => {
            if (e.target.matches('button')) {
                const action = e.target.dataset.action;
                const number = e.target.dataset.number;

                if (number) this.handleNumber(number);
                if (action) this.handleAction(action);
                this.updateDisplay();
            }
        });
    }

    handleNumber(number) {
        if (this.currentValue === 'Error') return;
        if (this.currentValue === '0' || this.operation === 'calculated') {
            this.operation = undefined;
            this.currentValue = number;
        } else {
            if (this.currentValue === '.') {
                return;
            }
            this.currentValue += number;
        }
    }

    handleAction(action) {
        if (this.currentValue === 'Error' && action !== 'clear') return;
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'percentage':
                this.percentage();
                break;
            case 'sign':
                this.sign();
                break;
            case 'changeStyle':
                this.changeStyle(
                    '.calculator__keys',
                    this.styles[this.nextStyle],
                );
                if (this.nextStyle < this.styles.length - 1) {
                    this.nextStyle++;
                } else {
                    this.nextStyle = 0;
                }
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                this.setOperation(action);
                break;
            case 'calculate':
                this.calculate();
                break;
        }
    }

    changeStyle(parentSelector, className) {
        const parent = document.querySelector(parentSelector);
        const children = parent.children;

        for (const child of children) {
            this.styles.forEach(e => {
                child.classList.remove(e);
            });
            child.classList.add(className);
        }
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = undefined;
    }

    sign() {
        if (this.currentValue === '0') {
            return;
        }
        this.currentValue = -this.currentValue;
    }

    percentage() {
        if (this.currentValue === '0') {
            return;
        }
        this.currentValue = parseFloat(this.currentValue) / 100;
    }

    setOperation(operation) {
        if (this.currentValue === '') {
            this.operation = operation;
            return;
        }
        if (this.previousValue !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }

    calculate() {
        let computation;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case 'add':
                computation = prev + current;
                computation = parseFloat(computation.toFixed(10));
                break;
            case 'subtract':
                computation = prev - current;
                computation = parseFloat(computation.toFixed(10));
                break;
            case 'multiply':
                computation = prev * current;
                computation = parseFloat(computation.toFixed(10));
                break;
            case 'divide':
                if (current === 0) {
                    this.currentValue = 'Error';
                    return;
                }
                computation = prev / current;
                computation = parseFloat(computation.toFixed(10));
                break;
            default:
                return;
        }

        this.currentValue = computation.toString();
        this.operation = 'calculated';
        this.previousValue = '';
    }

    updateDisplay() {
        const currentDisplay = document.querySelector('.calculator__current');
        const historyDisplay = document.querySelector('.calculator__history');

        if (this.currentValue) {
            currentDisplay.textContent = this.currentValue;
        } else {
            currentDisplay.textContent = this.previousValue;
        }
        if (this.operation) {
            historyDisplay.textContent = `${this.previousValue} ${this.getOperationSymbol(this.operation)}`;
        } else {
            historyDisplay.textContent = '';
        }
    }

    getOperationSymbol(operation) {
        const symbols = {
            add: '+',
            subtract: '−',
            multiply: '×',
            divide: '÷',
        };
        return symbols[operation] || '';
    }
}

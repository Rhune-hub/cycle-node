'use strict'

// Calculator buttons handler functions
function calcButtonHandler(e) {
    if (e.target.classList.contains('system')) {
        systemButtonHandler(e.target.value);
    } else if (e.target.classList.contains('operator')) {
        operatorButtonHandler(e.target.value);
    } else if (e.target.classList.contains('number')) {
        numberButtonHandler(e.target.value);
    } else if (e.target.id == 'calculator-point') {
        pointButtonHandler(e.target.value);
    } else {
        console.error('Error. Incorrect button pressed.');
    }
}
//Function handle buttons system
function systemButtonHandler(value) {
    let input = document.getElementById('calculator-input');
    let output = document.getElementById('calculator-output');
    switch (value) {
        case '=': 
            if (input.value == 0) return;
            output.value = calculate(input.value);
            results.push(input.value + '=' + output.value);
            if (results.length > 0) {
                document.getElementById('calculator-result').disabled = false;
                document.getElementById('calculator-server').disabled = false;
            }
            break;
        case '<=':
            if (input.value.length > 0) {
                input.value = input.value.slice(0,input.value.length-1);
            }
            break;
        case 'C': 
            input.value = '';
            output.value = '';
            break;
        case 'CE':
            let offset = 0;
            let expression = input.value;
            for(let i = expression.length - 1; i >= 0; i--) {
                if(isOperator(expression[i])) {
                    break;
                }
                offset++;
            }
            input.value = input.value.slice(0,input.value.length-offset);
            break;
        default:
            console.error('Error. Incorrect system button.');
            break;
    }
}
//Function calculate the expression
function calculate(expression) {
    let parts = expression.match(/^(\-?\d*([.]?\d*))|[\+\-\*\/]|(\d*([.]?\d*))|(\d*([.]?\d*))/g);
    parts.pop();
    let ops=[],queue=[];
    for (let i = 0; i < parts.length; i++) {
        if (!isNaN(parts[i])) {
            queue.push(+parts[i]);
        } else if (isOperator(parts[i])) {
            if(parts[i] == '-') {
                parts[i] = '+';
                parts[i+1] *= -1;
            }
            if(!isPriority) {
                if(ops.length>0)queue.push(ops.shift());
                ops.unshift(parts[i]);
            } else if (ops.length == 0 
                || operatorsPriority[ops[0]] < operatorsPriority[parts[i]]) {
                    ops.unshift(parts[i]);
                } else {
                    while (ops.length > 0 
                        && operatorsPriority[ops[0]] > operatorsPriority[parts[i]]) {
                            queue.push(ops.shift());
                        }
                        ops.unshift(parts[i]);
                    }    
        }
    }
    while (ops.length > 0) {
        queue.push(ops.shift());
    }
    let stack = [];
    for(let q of queue) {
        if(isOperator(q)) {
            let result = methods[q](stack[1],stack[0]);
            stack.shift();
            stack.shift();
            stack.unshift(result);
        } else {
            stack.unshift(q);
        }
    }
    let answer = stack[0];
    return isFloat ? answer : parseInt(answer);
}
//Function handle buttons operations
function operatorButtonHandler(value) {
    let input = document.getElementById('calculator-input');
    let expression = input.value;
    let exprLen = () => { return expression.length; };

    if (expression[exprLen()-1] == '.') {
        expression = expression.slice(0,exprLen()-1);
    }
    switch (value) {
        case '+':
        case '*': 
        case '/': 
        if (exprLen() == 0) return;
        if (expression[exprLen()-1] == '-') {
            expression = expression.slice(0,exprLen()-1);
            if (expression[exprLen()-1] == '*' || expression[exprLen()-1] == '/') {
                expression = expression.slice(0,exprLen()-1);   
            }
        } else if (isOperator(expression[exprLen()-1])) {
            expression = expression.slice(0,exprLen()-1);   
        }
        break;
        case '-':
            if (isNaN(expression[exprLen()-1]) && !(expression[exprLen()-1] == '*' || expression[exprLen()-1] == '/')) {
                expression = expression.slice(0,exprLen()-1);   
            }
            break;            
    }
    if(exprLen() == 0 && value != '-') {
        return;
    }
    expression += value;
    input.value = expression;
}
//Function handle buttons numbers
function numberButtonHandler(value) {
    document.getElementById('calculator-input').value += value;
}
//Function handle button point
function pointButtonHandler(value) {
    if (value != '.') {
        console.error('Error. Incorrect symbol of point.');
        return;
    }
    let input = document.getElementById('calculator-input');
    if (isFloat && checkForNewPoint(input.value)) {
            input.value += value;
    }
}
//Function control points count
function checkForNewPoint(input) {
    if (input == 0) {
        return false;
    } else {
        let i = input.length - 1;
        do {
            if (input[i] == '.') {
                return false;
            }
            i--;  
        } while (!isOperator(input[i]) && i >= 0)
    }
    return true;
}
//Function checked value on operators
function isOperator(value) {
    return operators.includes(value);
}
// Calculator mods handler functions
function calcModeHandler(e) {
    switch(e.target.id)
    {
        case 'calculator-mode-int':
            document.getElementById('calculator-point').disabled = true;
            isFloat = false;
            break;
        case 'calculator-mode-float':
            document.getElementById('calculator-point').disabled = false;
            isFloat = true;
            break;
        case 'calculator-mode-priority':
            isPriority = !isPriority;
            break;
        default: 
            console.error('Error. Incorrect mode id.');
            break;
    }
}
// Calculator hands input handler functions
function calcHandsHandler(e) {
    let key = e.key;
    switch(key) {
        case 'Delete': key = 'CE'; 
            break;  
        case 'Escape': key = 'C'; 
            break;
        case 'Backspace': key = '<='; 
            break;
        case 'Enter' : key = '='; 
            break;
        case 'f' : case 'а': case 'А':
        case 'F' : document.getElementById('calculator-mode-float').click();
            return;
        case 'i' : case 'ш': case 'Ш':
        case 'I' : document.getElementById('calculator-mode-int').click();
            return;
        case 'p' : case 'з': case 'З':
        case 'P' : document.getElementById('calculator-mode-priority').click();
            return;
        default: break;
    }
  let el = document.querySelector(`input[value="${key}"]`);
  if(el) el.click(); 
}
//Function send result to new window
function resultHandler(e) {
    let resultWindow = window.open('about:blank','Calcualtor results','width=600,height=400,top=200,left=650,menubar=no,location=no');
    resultWindow.onload = () => {
        const tdStyle = 'border: 1px solid black';
        let div = resultWindow.document.createElement('div');
        div.style.cssText = 'margin: 10px auto;';
        let table = resultWindow.document.createElement('table');
        table.style.cssText = 'border: 1px solid black; border-collapse: collapse;font-size:2em;';
        let header = resultWindow.document.createElement('tr');
        let numHead = resultWindow.document.createElement('td');
        numHead.textContent = ' # '; 
        numHead.style.cssText = tdStyle;
        let exprHead = resultWindow.document.createElement('td');
        exprHead.textContent = 'Calculated expressions';
        exprHead.style.cssText = tdStyle;
        header.appendChild(numHead);
        header.appendChild(exprHead);
        table.appendChild(header);
        for (let i = 0; i < results.length; i++) {
            let row = resultWindow.document.createElement('tr');
            let num = resultWindow.document.createElement('td');
            num.textContent = i+1;
            num.style.cssText = tdStyle;
            let expression = resultWindow.document.createElement('td');
            expression.textContent = results[i];
            expression.style.cssText = tdStyle;
            row.appendChild(num);
            row.appendChild(expression);
            table.appendChild(row);
        }
        div.appendChild(table);
        resultWindow.document.body.appendChild(div);
    };
}
//Function send results to server
async function sendToServer() {
    let json = JSON.stringify(results);
    let response = await fetch('postjson.php', {
        method: 'POST',
        body: json,
      })
    .then(response => response.text())
    .catch(err => console.error(err))
    alert(response || "Server isn't available!")
}

// Script main part
const operators = [ '+', '-', '*', '/' ];
const operatorsPriority = { '+':2, '-':2, '*':3, '/':3 };
const methods = {
    '-': (a,b) => a - b,
    '+': (a,b) => a + b,
    '/': (a,b) => a / b,
    '*': (a,b) => a * b,
};
let isFloat = false;
let isPriority = false;
let results = [];

//Add events to buttons
document.querySelectorAll('input[type=text]')
            .forEach(element => element.readOnly = true);
document.querySelector('.calculator-buttons-container')
            .addEventListener('click',calcButtonHandler,true);
document.querySelector('.calculator-mode-container')
            .addEventListener('change',calcModeHandler,true);
document.body.addEventListener('keydown',calcHandsHandler,true);
document.querySelector('#calculator-result')
            .addEventListener('click',resultHandler);
document.querySelector('#calculator-server')
            .addEventListener('click',sendToServer);
document.body.addEventListener('keydown',(e)=>{if(e.key=='Tab' || e.key=='Enter') e.preventDefault()});
document.forms['calculator'].addEventListener('submit',(e) => {e.preventDefault();return false;});
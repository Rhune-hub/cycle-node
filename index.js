"use strict"

let isValid = 
{
    'Name':false,
    'Email':false,
    'Password':false
}

function handleKeyDown(event) {
     if (event.key == 'Enter') upload(event)
}

function getAddInfo(attrName) {
    let o = {}
    switch (attrName) {
        case 'Name': {
            o.regex = /^[a-zа-я]{2,25}$/i
            o.attention = 'Введите имя'
            o.error = 'Некорректое имя'
        } break
        case 'Email': {
            o.regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            o.attention = 'Введите адрес электронной почты'
            o.error = 'Некорректный адрес электронной почты'
        } break
        case 'Password': {
            o.regex = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[#?!@$%^&*-])\S{8,40}$/
            o.attention = 'Введите пароль'
            o.error = 'Некорректный пароль'
        } break
    }
    return o   
}
function validateInput(text,re) {
    return re.test(text)
}
function setInputOK(attrName) {
    document.getElementById(attrName).style.border = '2px solid lawngreen'
    document.getElementById('error'+attrName).hidden = true
    
}
function setInputAttention(attrName,attention) {
    document.getElementById('error'+attrName).innerHTML = attention
    document.getElementById(attrName).style.border = '2px solid orange'
    document.getElementById('error'+attrName).hidden = false  
}
function setInputError(attrName,error) {
    document.getElementById('error'+attrName).innerHTML = error
    document.getElementById(attrName).style.border = '2px solid red'
    document.getElementById('error'+attrName).hidden = false
}
function checkInput(attrName,value) {
    
    let inputInfo = getAddInfo(attrName)
    isValid[attrName] = false
    if (value == '') {
        setInputAttention(attrName, inputInfo.attention)
    } 
    else if(validateInput(value,inputInfo.regex)) {
        setInputOK(attrName)
        isValid[attrName] = true
    }
    else {
        setInputError(attrName, inputInfo.error)
    }
}
function checkElement(event) {
    let attrName = event.target.getAttribute('id')
    let value = event.target.value
    checkInput(attrName,value)
}

async function upload(event) {
    let isFormValid = true;
    for(let attrName in isValid) {
        if(!isValid[attrName]) {
            checkInput(attrName,document.getElementById(attrName).value)
            isFormValid = false
        }
    }

    if(!isFormValid) return false
           
    let formData = new FormData(document.forms.userInfo)
    let user = {}
    formData.forEach( (value, key) => user[key] = value)
    let response = await fetch('upload.php', {
        method: 'POST',
        body: JSON.stringify(user),
      })
    .then(response => response.text())
    .catch(err => console.error(err))
      
    alert(response || "Server isn't available!")
}

/** Вывод даты */
    const d = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; 
    const curDate = document.createTextNode('Сегодня ' + d.toLocaleDateString('ru-RU', options));
    let dateContainer = document.getElementById('date')
    dateContainer.appendChild(curDate);

/** Изменение стиля таблицы */
    let currentStyleInput = document.getElementById('style-selector');
    if(currentStyleInput) {
        currentStyleInput.addEventListener('change',changeStyle);
    }  
     
    function changeStyle() {
        document.getElementById('price-info').className = currentStyleInput.value;
    }

/** Вывод даты */
    const d = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; 
    const curDate = document.createTextNode('Сегодня ' + d.toLocaleDateString('ru-RU', options));
    let dateContainer = document.getElementById('date')
    dateContainer.appendChild(curDate);
    
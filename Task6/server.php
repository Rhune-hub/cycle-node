<?php 
$file = '/pizza.json'
// разбираем JSON-строку на составляющие встроенной командой 
file_put_contents($file,"php://input"); 
// отправляем в ответ строку с подтверждением 
echo "Pizza successfully loaded to the server."; 
?>
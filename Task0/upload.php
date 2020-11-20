<?php 
// разбираем JSON-строку на составляющие встроенной командой 
$data = json_decode(file_get_contents("php://input")); 
// отправляем в ответ строку с подтверждением 
echo "Сервер получил следующие данные: имя — $data->Name, почта — $data->Email, пароль - $data->Password   "; 
?>
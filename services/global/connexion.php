<?php

$dsn = "mysql:host=localhost;dbname=projetwebl2;charset=UTF8";
$user = 'delauwv';
$password = 'delauwv';

return $db = new PDO($dsn, $user, $password);

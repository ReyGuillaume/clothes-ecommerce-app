<?php

$dsn = "mysql:host=http://10.103.1.200/phpmyadmin/;dbname=projetwebl2;charset=UTF8";
$user = 'info302';
$password = 'info302!';

$db = new PDO($dsn, $user, $password);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");
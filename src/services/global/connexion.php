<?php

$dsn = "mysql:host=localhost;dbname=projetwebl2;charset=UTF8";
$user = 'user';
$password = 'user';

$db = new PDO($dsn, $user, $password);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Headers: Content-Type");
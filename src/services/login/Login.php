<?php

include_once "../global/connexion.php";
include_once 'loginFunctions.php';  

$login = $_GET['mail'];
$pwd = $_GET['password'];

$checkUser = CheckUser($db, $login, $pwd);

?>
<?php
include_once 'loginFunctions.php';  

$connexionPDO = Connexion();
$login = $_GET['mail'];
$pwd = $_GET['password'];

$checkUser = CheckUser($connexionPDO, $login, $pwd);

?>
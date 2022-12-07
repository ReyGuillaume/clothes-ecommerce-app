<?php

include "../global/connexion.php";

$firstname = $_GET["firstname"];
$lastname = $_GET["lastname"];
$mail = $_GET["mail"];
$phone_number = $_GET["phone_number"];
$password = $_GET["password"];


if(empty($firstname) || empty($lastname) || empty($mail) || empty($phone_number) || empty($password)){
    echo "An input is empty";
    return;
}

$password = hash('sha256', $password)

if(!filter_var($_GET["mail"], FILTER_VALIDATE_EMAIL)) {
    return;
}

if(emailExists($db)){
    echo "EAU";
    return;
}

create($db);

function create($db) {
    $stm = $db->prepare("INSERT INTO `user`(`firstname`, `lastname`, `mail`, `phone_number`, `password`) VALUES (:firstname, :lastname, :mail, :phone_number, :password)");

    $stm->bindValue(":firstname", $firstname);
    $stm->bindValue(":lastname", $lastname);
    $stm->bindValue(":mail", $mail);
    $stm->bindValue(":phone_number", $phone_number);
    $stm->bindValue(":password", $password);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

function emailExists($db) {
    $stm = $db->prepare("SELECT * FROM `user` WHERE mail = :mail");
    $stm->bindValue(":mail", $mail);
    $stm->execute();

    if( $stm->rowCount() > 0 ) { # If rows are found for query
        return (int)True;
    } else {
            return (int)False;
    }
}

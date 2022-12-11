<?php

include "../global/connexion.php";

if(empty($_GET["firstname"]) || empty($_GET["lastname"]) || empty($_GET["mail"]) || empty($_GET["phone_number"]) || empty($_GET["password"])){
    echo "An input is empty";
    return;
}

if(!filter_var($_GET["mail"], FILTER_VALIDATE_EMAIL)) {
    echo "Invalid e-mail";
    return;
}

if(emailExists($db)){
    echo "E-mail already used.";
    return;
}

create($db);

function create($db) {
    $stm = $db->prepare("INSERT INTO `user`(`firstname`, `lastname`, `mail`, `phone_number`, `password`) VALUES (:firstname, :lastname, :mail, :phone_number, :password)");

    $stm->bindValue(":firstname", $_GET["firstname"]);
    $stm->bindValue(":lastname", $_GET["lastname"]);
    $stm->bindValue(":mail", $_GET["mail"]);
    $stm->bindValue(":phone_number", $_GET["phone_number"]);
    $stm->bindValue(":password", $_GET["password"]);

    if($stm->execute()){
        $lastId = $dbh->lastInsertId();
        $cuc = $db->prepare("INSERT INTO `cart`(`id_user`) VALUES (:password)");
        $cuc->bindValue(":id_user", $lastId);
        $cuc->execute()
    }
    else{
        echo json_encode($stm->fetchAll());
    }
}

function emailExists($db) {
    $stm = $db->prepare("SELECT * FROM `user` WHERE mail = :mail");
    $stm->bindValue(":mail", $_GET["mail"]);
    $stm->execute();

    if( $stm->rowCount() > 0 ) { # If rows are found for query
        return (int)True;
   }
   else {
        return (int)False;
   }
}

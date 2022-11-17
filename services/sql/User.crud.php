<?php

$db = new PDO("mysql:host=localhost;dbname=projetwebl2","root","root");

// ======================= Create User =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `user`(`id`, `firstname`, `lastname`, `mail`, `phone_number`, `password`) VALUES (:id, :firstname, :lastname, :mail, :phone_number, :password)");

    $stm->bindValue(":id", "null");
    $stm->bindValue(":firstname", $_GET["firstname"]);
    $stm->bindValue(":lastname", $_GET["lastname"]);
    $stm->bindValue(":mail", $_GET["mail"]);
    $stm->bindValue(":phone_number", $_GET["phone_number"]);
    $stm->bindValue(":password", $_GET["password"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update User =======================
function update($db) {
    $stm = $db->prepare("UPDATE `user` SET `firstname`=:firstname, `lastname`=:lastname,`mail`=:mail,`phone_number`=:phone_number,`password`=:password WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":firstname", $_GET["firstname"]);
    $stm->bindValue(":lastname", $_GET["lastname"]);
    $stm->bindValue(":mail", $_GET["mail"]);
    $stm->bindValue(":phone_number", $_GET["phone_number"]);
    $stm->bindValue(":password", $_GET["password"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read User Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `user`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete Article =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `user` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

switch($_GET["function"]) {
    case 'create': create($db); break;
    case 'read': read($db); break;
    case 'update': update($db); break;
    case 'delete': delete($db); break;
    default: echo "Not found!"; break;
}
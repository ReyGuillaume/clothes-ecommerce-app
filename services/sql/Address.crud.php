<?php

$db = new PDO("mysql:host=localhost;dbname=projetwebl2","root","root");

// ======================= Create User =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `address`(`id`, `number`, `street`, `city`, `country`, `id_user`) VALUES (:id, :number, :street, :city, :country, :id_user)");

    $stm->bindValue(":id", "null");
    $stm->bindValue(":number", $_GET["number"]);
    $stm->bindValue(":street", $_GET["street"]);
    $stm->bindValue(":city", $_GET["city"]);
    $stm->bindValue(":country", $_GET["country"]);
    $stm->bindValue(":id_user", $_GET["id_user"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update User =======================
function update($db) {
    $stm = $db->prepare("UPDATE `address` SET `id_user`=:id_user, `number`=:number,`street`=:street,`city`=:city,`country`=:country WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":number", $_GET["number"]);
    $stm->bindValue(":street", $_GET["street"]);
    $stm->bindValue(":city", $_GET["city"]);
    $stm->bindValue(":country", $_GET["country"]);
    $stm->bindValue(":id_user", $_GET["id_user"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read User Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `address` WHERE id_user = :id_user");
    $stm->bindValue(":id_user", $_GET["id_user"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete Article =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `address` WHERE id = :id");
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
<?php

$db = new PDO("mysql:host=localhost;dbname=projetwebl2".';charset=UTF8',"root","root");

// ======================= Create category =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `category`(`name`) VALUES (:name)");

    $stm->bindValue(":name", $_GET["name"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read category Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `category` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update category =======================
function update($db) {
    $stm = $db->prepare("UPDATE `category` SET `name`=:name WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":name", $_GET["name"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete category =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `category` WHERE id = :id");
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
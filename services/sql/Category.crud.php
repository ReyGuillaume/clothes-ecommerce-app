<?php

$db = new PDO("mysql:host=localhost;dbname=projetwebl2;charset=UTF8","root","root");

// ======================= Create Category =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `category`(`name`) VALUES (:name)");

    $stm->bindValue(":name", $_GET["name"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read Category Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `category` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Category Id =======================
function readAll($db) {
    $stm = $db->prepare("SELECT `id` FROM `category`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Category Data =======================
function readAllData($db) {
    $stm = $db->prepare("SELECT * FROM `category`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update Category =======================
function update($db) {
    $stm = $db->prepare("UPDATE `category` SET `name`=:name WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":name", $_GET["name"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete Category =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `category` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

switch($_GET["function"]) {
    case 'create': create($db); break;
    case 'read': read($db); break;
    case 'readAll': readAll($db); break;
    case 'readAllData': readAllData($db); break;
    case 'update': update($db); break;
    case 'delete': delete($db); break;
    default: echo "Not found!"; break;
}
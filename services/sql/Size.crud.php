<?php

$db = new PDO("mysql:host=localhost;dbname=projetwebl2;charset=UTF8","root","root");

// ======================= Create Size =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `size`(`name`) VALUES (:name)");
    $stm->bindValue(":name", $_GET["name"]);    
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read Size Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `size` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Size Id =======================
function readAll($db) {
    $stm = $db->prepare("SELECT `id` FROM `size`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update Size =======================
function update($db) {
    $stm = $db->prepare("UPDATE `size` SET `name`=:name WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":name", $_GET["name"]);
    
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete Size =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `size` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

switch($_GET["function"]) {
    case 'create': create($db); break;
    case 'read': read($db); break;
    case 'readAll': readAll($db); break;
    case 'update': update($db); break;
    case 'delete': delete($db); break;
    default: echo "Not found!"; break;
}

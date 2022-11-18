<?php

$db = new PDO("mysql:host=localhost;dbname=projetwebl2;charset=UTF8","root","root");

// ======================= Create Size =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `size`(`name`, `id_stock`) VALUES (:name, :id_stock)");

    $stm->bindValue(":name", $_GET["name"]);
    $stm->bindValue(":id_stock", $_GET["id_stock"]);
    
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
    $stm = $db->prepare("SELECT `id` FROM `size` WHERE 1");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update Size =======================
function update($db) {
    $stm = $db->prepare("UPDATE `size` SET `name`=:name,`id_stock`=:id_stock WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":name", $_GET["name"]);
    $stm->bindValue(":id_stock", $_GET["id_stock"]);
    
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
    case 'readall': readAll($db); break;
    case 'update': update($db); break;
    case 'delete': delete($db); break;
    default: echo "Not found!"; break;
}

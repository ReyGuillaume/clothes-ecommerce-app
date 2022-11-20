<?php

$db = new PDO("mysql:host=localhost;dbname=projetwebl2;charset=UTF8","root","root");

// ======================= Create Subcategory =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `subcategory`(`name`, `id_category`) VALUES (:name, :id_category)");

    $stm->bindValue(":name", $_GET["name"]);
    $stm->bindValue(":id_category", $_GET["id_category"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read Subcategory Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `subcategory` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Subcategory Id =======================
function readAll($db) {
    $stm = $db->prepare("SELECT `id` FROM `subcategory` WHERE 1");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update Subcategory =======================
function update($db) {
    $stm = $db->prepare("UPDATE `subcategory` SET `name`=:name,`id_category`=:id_category WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":name", $_GET["name"]);
    $stm->bindValue(":id_category", $_GET["id_category"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete Subcategory =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `subcategory` WHERE id = :id");
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
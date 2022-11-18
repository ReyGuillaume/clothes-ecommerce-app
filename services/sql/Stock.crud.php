<?php

$db = new PDO("mysql:host=localhost;dbname=projetwebl2;charset=UTF8","root","root");

// ======================= Create Stock =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `stock`(`qty_stock`) VALUES (:qty_stock)");

    $stm->bindValue(":qty_stock", $_GET["qty_stock"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read Stock Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `stock` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Stock Id =======================
function readAll($db) {
    $stm = $db->prepare("SELECT `id` FROM `stock` WHERE 1");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update Stock =======================
function update($db) {
    $stm = $db->prepare("UPDATE `stock` SET `qty_stock`=:qty_stock WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":qty_stock", $_GET["qty_stock"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete Stock =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `stock` WHERE id = :id");
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

<?php

$db = new PDO("mysql:host=localhost;dbname=projetwebl2;charset=UTF8","root","root");

// ======================= Create OrderStatus =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `order_status`(`status`) VALUES (:status)");

    $stm->bindValue(":status", $_GET["status"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read OrderStatus Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `order_status` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All OrderStatus Id =======================
function readAll($db) {
    $stm = $db->prepare("SELECT `id` FROM `order_status` WHERE 1");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update OrderStatus =======================
function update($db) {
    $stm = $db->prepare("UPDATE `order_status` SET `status`=:status WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":status", $_GET["status"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete OrderStatus =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `order_status` WHERE id = :id");
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
<?php

$db = new PDO("mysql:host=localhost;dbname=projetwebl2".';charset=UTF8',"root","root");

// ======================= Create User =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `order_status`(`status`) VALUES (:status)");

    $stm->bindValue(":status", $_GET["status"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update User =======================
function update($db) {
    $stm = $db->prepare("UPDATE `order_status` SET `status`=:status WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":status", $_GET["status"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read User Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `order_status`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete Article =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `order_status` WHERE id = :id");
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
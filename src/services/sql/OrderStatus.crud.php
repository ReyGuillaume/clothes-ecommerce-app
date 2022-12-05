<?php

include "../global/connexion.php";

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
    $stm = $db->prepare("SELECT `id` FROM `order_status`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All OrderStatus Data =======================
function readAllData($db) {
    $stm = $db->prepare("SELECT * FROM `order_status`");
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

include "./switch.php";
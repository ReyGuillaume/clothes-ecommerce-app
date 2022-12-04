<?php

include "../global/connexion.php";

// ======================= Create Cart =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `cart`(`id_user`) VALUES (:id_user)");

    $stm->bindValue(":id_user", $_GET["id_user"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read Cart Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `cart` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Cart Id =======================
function readAll($db) {
    $stm = $db->prepare("SELECT `id` FROM `cart`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Cart Data =======================
function readAllData($db) {
    $stm = $db->prepare("SELECT * FROM `cart`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update Cart =======================
function update($db) {
    $stm = $db->prepare("UPDATE `cart` SET `id_user`=:id_user WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":id_user", $_GET["id_user"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete Cart =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `cart` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

include "./switch.php";
<?php

include "./connexion.php";

// ======================= Create Brand =======================
function create($db) {
    $stm = $db->prepare("INSERT INTO `brand`(`name`) VALUES (:name)");

    $stm->bindValue(":name", $_GET["name"]);
   
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read Brand Data =======================
function read($db) {
    $stm = $db->prepare("SELECT * FROM `brand` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Brand Id =======================
function readAll($db) {
    $stm = $db->prepare("SELECT `id` FROM `brand`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Read All Brand Data =======================
function readAllData($db) {
    $stm = $db->prepare("SELECT * FROM `brand`");
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Update Brand =======================
function update($db) {
    $stm = $db->prepare("UPDATE `brand` SET `name`=:name WHERE id =:id");

    $stm->bindValue(":id", $_GET["id"]);
    $stm->bindValue(":name", $_GET["name"]);

    $stm->execute();
    echo json_encode($stm->fetchAll());
}

// ======================= Delete Brand =======================
function delete($db) {
    $stm = $db->prepare("DELETE FROM `brand` WHERE id = :id");
    $stm->bindValue(":id", $_GET["id"]);
    $stm->execute();
    echo json_encode($stm->fetchAll());
}

include "./switch.php";